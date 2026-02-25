(function () {
  var CATEGORY_NAMES = {
    phd:               'Ph.D. Student',
    ms:                'M.S. Student',
    undergrad:         'Undergraduate Student',
    researcher:        'Researcher',
    staff:             'Research Staff',
    alumni:            'Alumni',
    former_researcher: 'Former Researcher',
    former_undergrad:  'Former Undergraduate Researcher'
  };

  var ACTIVE_CATEGORIES = { phd: 1, ms: 1, undergrad: 1, researcher: 1, staff: 1 };

  var CATEGORY_PRIORITY = [
    'phd', 'ms', 'undergrad', 'researcher', 'staff',
    'alumni', 'former_researcher', 'former_undergrad'
  ];

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function makeSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // Remove spaces, hyphens, dots then lowercase for author matching
  function normName(name) {
    return name.toLowerCase().replace(/[\s\-\.]/g, '');
  }

  function parseInline(text) {
    if (!text) return '';
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return text;
  }

  function rv(s) { return s.split('').reverse().join(''); }

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function run() {
    if (!window.teamData || !window.pubData) return;

    var slug = new URLSearchParams(window.location.search).get('name');
    if (!slug) { window.location.href = '/team/'; return; }

    var entries = teamData.filter(function (m) { return makeSlug(m.name) === slug; });
    if (entries.length === 0) { window.location.href = '/team/'; return; }

    // Sort by end date descending; active entries (no end date) come first via Infinity
    function entryEndDate(entry) {
      if (ACTIVE_CATEGORIES[entry.category]) return Infinity;
      var src = '';
      if (entry.graduation) {
        src = entry.graduation;
      } else if (entry.period) {
        var parts = entry.period.split('~');
        src = parts.length > 1 ? parts[1] : parts[0];
      }
      var m = src.match(/(\d{4})\.(\d{2})/);
      return m ? parseInt(m[1]) * 100 + parseInt(m[2]) : 0;
    }
    entries.sort(function (a, b) {
      var da = entryEndDate(a), db = entryEndDate(b);
      if (db !== da) return db - da;
      return CATEGORY_PRIORITY.indexOf(a.category) - CATEGORY_PRIORITY.indexOf(b.category);
    });
    var primary = entries[0];

    // Update hero title
    document.title = primary.name + ' | VIPLab';
    var heroEl = document.querySelector('.hero--small .hero__title');
    if (heroEl) heroEl.textContent = primary.name + ' (' + primary.name_kr + ')';

    // ── Match publications ────────────────────────────────────────────────────
    var memberNorm = normName(primary.name);
    var memberNormKr = primary.name_kr ? primary.name_kr.replace(/\s/g, '') : '';
    var memberPubs = pubData.filter(function (pub) {
      if (!pub.authors) return false;
      var re = /\*\*([^*]+)\*\*/g, m;
      while ((m = re.exec(pub.authors)) !== null) {
        // Split by comma to handle "**A, B, C**" grouped bold patterns
        var parts = m[1].split(',');
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i].trim();
          if (normName(part) === memberNorm) return true;
          if (memberNormKr && part.replace(/\s/g, '') === memberNormKr) return true;
        }
      }
      return false;
    }).sort(function (a, b) {
      if (b.year !== a.year) return b.year - a.year;
      return (b.month || 0) - (a.month || 0);
    });

    // ── Render ────────────────────────────────────────────────────────────────
    var container = document.getElementById('member-container');
    if (!container) return;

    // ─ Profile ───────────────────────────────────────────────────────────────
    var profile = el('div', 'member-profile');

    if (primary.photo && primary.photo.indexOf('dummy') === -1) {
      var photo = el('img', 'member-profile__photo');
      photo.src = primary.photo;
      photo.alt = primary.name;
      profile.appendChild(photo);
    }

    var info = el('div', 'member-profile__info');

    var nameDiv = el('div', 'member-profile__name');
    nameDiv.textContent = primary.name + (primary.badge ? ' ' + primary.badge : '');
    info.appendChild(nameDiv);

    var nameKrDiv = el('div', 'member-profile__name-kr');
    nameKrDiv.textContent = primary.name_kr;
    info.appendChild(nameKrDiv);

    // All roles as badges (show only period/graduation/role, not affiliation)
    var rolesDiv = el('div', 'member-profile__roles');
    entries.forEach(function (entry) {
      var badge = el('span',
        'member-profile__role ' +
        (ACTIVE_CATEGORIES[entry.category]
          ? 'member-profile__role--current'
          : 'member-profile__role--past'));
      var label, extra = '';
      if (entry.category === 'alumni') {
        label = entry.gender === 'f' ? 'Alumna' : 'Alumnus';
        if (entry.graduation) extra += ' \u00b7 ' + entry.graduation;
      } else if (entry.category === 'former_researcher') {
        label = entry.role || 'Researcher';
        if (entry.period) extra += ' \u00b7 ' + entry.period;
      } else if (entry.category === 'former_undergrad') {
        label = 'Undergraduate Researcher';
        if (entry.period) extra += ' \u00b7 ' + entry.period;
      } else {
        label = CATEGORY_NAMES[entry.category] || entry.category;
        if (entry.integrated) label += ' (Integrated)';
      }
      badge.textContent = label + extra;
      rolesDiv.appendChild(badge);
    });
    info.appendChild(rolesDiv);

    if (primary.research) {
      var resDiv = el('div', 'member-profile__meta');
      resDiv.textContent = '\uD83D\uDD0E ' + primary.research;
      info.appendChild(resDiv);
    }

    if (primary.c1 && primary.c2) {
      var emlDiv = el('div', 'member-profile__meta');
      emlDiv.appendChild(document.createTextNode('\uD83D\uDCEB '));
      var at = String.fromCharCode(95, 97, 116, 95);
      var emlText = rv(primary.c1) + at + rv(primary.c2);
      var canvas = document.createElement('canvas');
      canvas.style.verticalAlign = '-2px';
      var ctx = canvas.getContext('2d');
      var font = '13.6px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
      ctx.font = font;
      canvas.width = Math.ceil(ctx.measureText(emlText).width) + 4;
      canvas.height = 18;
      ctx.font = font;
      ctx.fillStyle = '#838c8d';
      ctx.fillText(emlText, 2, 14);
      emlDiv.appendChild(canvas);
      info.appendChild(emlDiv);
    }

    if (primary.homepage) {
      var hpDiv = el('div', 'member-profile__meta');
      var hpA = el('a');
      hpA.href = primary.homepage;
      hpA.target = '_blank';
      hpA.textContent = '\uD83C\uDF10 Homepage';
      hpDiv.appendChild(hpA);
      info.appendChild(hpDiv);
    }

    // Current affiliation for past members — skip if person is still active in the lab
    var isActive = entries.some(function (e) { return !!ACTIVE_CATEGORIES[e.category]; });
    var affiliation = null;
    if (!isActive) {
      for (var ai = 0; ai < entries.length; ai++) {
        if (entries[ai].affiliation) { affiliation = entries[ai].affiliation; break; }
      }
    }
    if (affiliation) {
      var affDiv = el('div', 'member-profile__meta');
      affDiv.textContent = '\uD83D\uDCBC ' + affiliation;
      info.appendChild(affDiv);
    }

    profile.appendChild(info);
    container.appendChild(profile);

    // ─ Publications ───────────────────────────────────────────────────────────
    if (memberPubs.length === 0) return;

    var pubSection = el('div', 'member-pubs');
    var h2 = el('h2', 'member-pubs__heading');
    h2.textContent = 'Publications';
    pubSection.appendChild(h2);

    var PUB_SECTIONS = [
      { key: 'intl',     title: 'International Journals \u0026 Conferences' },
      { key: 'other',    title: 'Other International Publications' },
      { key: 'domestic', title: 'Domestic Publications' }
    ];

    function renderPubCard(p, parent) {
      var isDomestic = (p.type === 'domestic');
      var card = el('div', isDomestic ? 'pub-card pub-card--domestic' : 'pub-card');

      if (!isDomestic && p.image) {
        var pImg = el('img', 'pub-card__img');
        pImg.src = p.image;
        pImg.alt = p.title || '';
        card.appendChild(pImg);
      }

      var body = el('div', 'pub-card__body');

      var titleP = el('p', 'pub-card__title');
      titleP.textContent = p.title || '';
      body.appendChild(titleP);

      if (p.authors) {
        var authP = el('p', 'pub-card__authors');
        authP.innerHTML = parseInline(p.authors);
        body.appendChild(authP);
      }

      if (p.venue) {
        var venueP = el('p', 'pub-card__venue');
        var venueHtml = '<em>' + parseInline(p.venue) + '</em>';
        if (!/\*\*\d{4}\*\*/.test(p.venue) && p.year) {
          var mon = p.month ? MONTHS[p.month - 1] + ' ' : '';
          venueHtml += ', ' + mon + '<strong>' + p.year + '</strong>';
        }
        venueP.innerHTML = venueHtml;
        body.appendChild(venueP);
      }

      if (p.award) {
        var awardP = el('p', 'pub-card__award');
        awardP.textContent = '[' + p.award + ']';
        body.appendChild(awardP);
      }

      if (p.links && p.links.length > 0) {
        var linksP = el('p', 'pub-card__links');
        p.links.forEach(function (lnk) {
          if (lnk.url) {
            var la = el('a');
            la.href = lnk.url;
            la.target = '_blank';
            la.textContent = '[' + lnk.label + ']';
            linksP.appendChild(la);
          } else {
            var sp = el('span', 'pub-link--unavailable');
            sp.textContent = '[' + lnk.label + ']';
            linksP.appendChild(sp);
          }
        });
        body.appendChild(linksP);
      }

      card.appendChild(body);
      parent.appendChild(card);
    }

    PUB_SECTIONS.forEach(function (sec) {
      var entries = memberPubs.filter(function (p) { return p.type === sec.key; });
      if (entries.length === 0) return;

      var secHeading = el('h3', 'member-pubs__subheading');
      secHeading.textContent = sec.title;
      pubSection.appendChild(secHeading);

      var seenYears = {}, orderedYears = [];
      entries.forEach(function (p) {
        if (!seenYears[p.year]) { seenYears[p.year] = true; orderedYears.push(p.year); }
      });

      orderedYears.forEach(function (year) {
        var yearDiv = el('div', 'pub-year');
        yearDiv.textContent = year;
        pubSection.appendChild(yearDiv);
        entries.filter(function (p) { return p.year === year; }).forEach(function (p) {
          renderPubCard(p, pubSection);
        });
      });
    });

    container.appendChild(pubSection);
  }

  run();
})();
