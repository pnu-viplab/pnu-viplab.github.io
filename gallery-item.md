---
layout: page
title: Gallery
permalink: /gallery/item/
---

<div id="gallery-item-container"></div>

<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<script>
const galleryData = {{ site.data.gallery | jsonify }};

const slug = new URLSearchParams(window.location.search).get('slug');
const idx = galleryData.findIndex(function(g) { return g.slug === slug; });

if (idx === -1) {
  window.location.href = '/gallery/';
} else {
  const item = galleryData[idx];

  document.title = item.title + ' | VIPLab';
  const heroTitle = document.querySelector('.hero--small .hero__title');
  if (heroTitle) heroTitle.textContent = item.title;

  const dateStr = item.start_date && item.end_date
    ? item.start_date + ' ~ ' + item.end_date
    : (item.date || '');

  let imagesHtml = '';
  if (item.images && item.images.length > 1) {
    imagesHtml = '<div class="gallery-detail-grid">'
      + item.images.map(function(img) { return '<img src="' + img + '" alt="" />'; }).join('')
      + '</div>';
  } else if (item.images && item.images.length === 1) {
    imagesHtml = '<div class="gallery-detail-single"><img src="' + item.images[0] + '" alt="" /></div>';
  }

  const descHtml = item.description
    ? '<div class="gallery-detail-description"><p>' + item.description + '</p></div>'
    : '';

  const newerItem = idx > 0 ? galleryData[idx - 1] : null;
  const olderItem = idx < galleryData.length - 1 ? galleryData[idx + 1] : null;

  const navHtml = '<div class="post-content controls__inner">'
    + '<div class="controls__item next">'
    + (newerItem ? '<span>Newer</span><a href="/gallery/item/?slug=' + newerItem.slug + '">' + newerItem.title.substring(0, 40) + '</a>' : '')
    + '</div>'
    + '<div class="controls__item prev">'
    + (olderItem ? '<span>Older</span><a href="/gallery/item/?slug=' + olderItem.slug + '">' + olderItem.title.substring(0, 40) + '</a>' : '')
    + '</div>'
    + '</div>';

  document.getElementById('gallery-item-container').innerHTML =
    (dateStr ? '<div class="gallery-item-date"><span>' + dateStr + '</span></div>' : '')
    + imagesHtml
    + descHtml
    + navHtml;
}
</script>
