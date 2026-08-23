#!/usr/bin/env python3
"""Add a gallery entry: resize/rename photos into assets/img/gallery and update _data/gallery.yml.

Usage:
  # multi-day event (writes start_date/end_date)
  python3 script/add_gallery.py --title "KCCV 2026" --slug kccv \
      --start 2026-08-03 --end 2026-08-05 --dir ~/Pictures/kccv2026

  # single-day event (writes date)
  python3 script/add_gallery.py --title "2026년 6월 석사학위 논문심사" --slug defense \
      --date 2026-06-19 --dir ~/Pictures/defense

--slug is the text part; the date prefix is added automatically and drives both
the slug and the image filenames:
  --slug kccv --start 2026-08-03 --end 2026-08-05
      -> slug 260803-260805-kccv  /  260803_260805_kccv_01.jpg, _02.jpg, ...
  --slug "ucwit forum" --date 2023-11-24
      -> slug 231124-ucwit-forum  /  231124_ucwit_forum_01.jpg, _02.jpg, ...

Requires Pillow:  pip install Pillow
"""

import argparse
import re
import sys
from datetime import date
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "assets" / "img" / "gallery"
YML = ROOT / "_data" / "gallery.yml"
MAX_SIDE = 600
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".webp", ".bmp", ".tif", ".tiff"}


def natural_key(p):
    return [int(s) if s.isdigit() else s.lower() for s in re.split(r"(\d+)", p.name)]


def slugify(text):
    return re.sub(r"_+", "_", re.sub(r"[^a-z0-9]+", "_", text.lower())).strip("_")


def yaml_str(text):
    """Quote only when the value would otherwise be ambiguous YAML."""
    if text and not re.search(r'^[\s>|@`%&*!#-]|[:#]\s|["\']|:$', text):
        return text
    return '"' + text.replace("\\", "\\\\").replace('"', '\\"') + '"'


def resize_images(src_dir, prefix, dry_run):
    """Copy photos from src_dir into IMG_DIR, downscaled so the long side is MAX_SIDE."""
    srcs = sorted((p for p in src_dir.iterdir() if p.suffix.lower() in EXTS), key=natural_key)
    if not srcs:
        sys.exit(f"no image files found in {src_dir}")

    names = []
    for i, src in enumerate(srcs, 1):
        name = f"{prefix}_{i:02d}.jpg"
        names.append(name)
        if dry_run:
            print(f"  {src.name} -> {name}")
            continue
        img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        scale = MAX_SIDE / max(img.size)
        if scale < 1:
            img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
        img.save(IMG_DIR / name, "JPEG", quality=90, optimize=True)
        print(f"  {src.name} -> {name} ({img.width}x{img.height})")
    return names


def build_entry(args, slug, start, end, names):
    lines = [f"- title: {yaml_str(args.title)}", f"  slug: {slug}"]
    if end:
        lines += [f"  start_date: {start}", f"  end_date: {end}"]
    else:
        lines += [f"  date: {start}"]
    lines += [f"  description: {yaml_str(args.description) if args.description else ''}".rstrip()]
    lines += ["  images:"] + [f'    - "/assets/img/gallery/{n}"' for n in names]
    lines += ["  videos: []", ""]
    return "\n".join(lines) + "\n"


def check_slug(slug):
    if re.search(rf"^  slug: {re.escape(slug)}\s*$", YML.read_text(encoding="utf-8"), re.M):
        sys.exit(f"slug '{slug}' already exists in {YML.name}")


def insert_entry(entry, new_date):
    """Insert the entry into gallery.yml, keeping the file sorted newest-first."""
    lines = YML.read_text(encoding="utf-8").splitlines(keepends=True)
    if lines and not lines[-1].endswith("\n"):
        lines[-1] += "\n"
        lines.append("\n")
    pos = len(lines)
    for i, line in enumerate(lines):
        if not line.startswith("- title:"):
            continue
        m = re.search(r"^  (?:start_)?date: (\d{4}-\d{2}-\d{2})", "".join(lines[i:i + 5]), re.M)
        if m and date.fromisoformat(m.group(1)) < new_date:
            pos = i
            break
    lines.insert(pos, entry if pos < len(lines) else entry.rstrip("\n") + "\n")
    YML.write_text("".join(lines), encoding="utf-8")
    return pos


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--title", required=True, help="entry title shown on the gallery card")
    p.add_argument("--slug", metavar="TEXT", help="text part of the slug and the image filenames "
                                                  "(default: from --title); the date prefix is added "
                                                  "automatically")
    p.add_argument("--date", metavar="YYYY-MM-DD", help="date of a single-day entry")
    p.add_argument("--start", metavar="YYYY-MM-DD", help="first day of a multi-day entry (with --end)")
    p.add_argument("--end", metavar="YYYY-MM-DD", help="last day of a multi-day entry (with --start)")
    p.add_argument("--dir", required=True, type=Path, help="folder containing the source photos")
    p.add_argument("--description", default="", help="optional description")
    p.add_argument("--dry-run", action="store_true", help="show what would happen, write nothing")
    args = p.parse_args()

    if args.date:
        if args.start or args.end:
            sys.exit("use either --date, or --start with --end")
        start, end = date.fromisoformat(args.date), None
    elif args.start and args.end:
        start, end = date.fromisoformat(args.start), date.fromisoformat(args.end)
        if end < start:
            sys.exit("--end must not be earlier than --start")
        if end == start:
            sys.exit("--start and --end are the same day; use --date instead")
    elif args.start or args.end:
        sys.exit("--start and --end go together; for a single day use --date")
    else:
        sys.exit("give --date, or --start with --end")

    text = slugify(args.slug or args.title)
    if not text:
        sys.exit(f"--slug '{args.slug}' has no usable ascii characters" if args.slug
                 else "could not derive a slug from --title; pass --slug explicitly")

    src_dir = args.dir.expanduser().resolve()
    if not src_dir.is_dir():
        sys.exit(f"not a directory: {src_dir}")

    stamp = start.strftime("%y%m%d") + (end.strftime("_%y%m%d") if end else "")
    prefix = f"{stamp}_{text}"
    slug = prefix.replace("_", "-")

    print(f"slug: {slug}")
    check_slug(slug)  # fail before writing any image
    names = resize_images(src_dir, prefix, args.dry_run)
    entry = build_entry(args, slug, start, end, names)

    if args.dry_run:
        print(f"\n--- would insert into {YML.relative_to(ROOT)} ---\n{entry}")
        return

    line_no = insert_entry(entry, start)
    print(f"\n{len(names)} image(s) -> {IMG_DIR.relative_to(ROOT)}")
    print(f"entry inserted at {YML.relative_to(ROOT)}:{line_no + 1}")


if __name__ == "__main__":
    main()
