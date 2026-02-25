(function () {
  var sections = [
    { key: 'intl',     title: 'International Journals \u0026 Conferences', id: 'international-journals--conferences' },
    { key: 'other',    title: 'Other International Publications',           id: 'other-international-publications' },
    { key: 'domestic', title: 'Domestic Publications',                      id: 'domestic-publications' },
  ];

  // Parse **bold** and [text](url) inline markers
  function parseInline(text) {
    if (!text) return '';
    // [text](url) → <a>
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    // **text** → <strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return text;
  }

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function renderPub() {
    var container = document.getElementById('pub-container');
    if (!container || !window.pubData) return;
    container.innerHTML = '';

    sections.forEach(function (sec) {
      var entries = pubData.filter(function (p) { return p.type === sec.key; });
      if (entries.length === 0) return;

      // Stable sort: year desc, month desc
      entries.sort(function (a, b) {
        if (b.year !== a.year) return b.year - a.year;
        return (b.month || 0) - (a.month || 0);
      });

      // Section heading with anchor id
      var h2 = el('h2');
      h2.id = sec.id;
      h2.textContent = sec.title;
      container.appendChild(h2);

      var section = el('div', 'pub-section');

      // Collect ordered unique years
      var orderedYears = [];
      var seenYears = {};
      entries.forEach(function (p) {
        if (!seenYears[p.year]) {
          seenYears[p.year] = true;
          orderedYears.push(p.year);
        }
      });

      orderedYears.forEach(function (year) {
        var yearDiv = el('div', 'pub-year');
        yearDiv.textContent = year;
        section.appendChild(yearDiv);

        entries.filter(function (p) { return p.year === year; }).forEach(function (p) {
          var isDomestic = (p.type === 'domestic');
          var card = el('div', isDomestic ? 'pub-card pub-card--domestic' : 'pub-card');

          // Teaser image (international/other only)
          if (!isDomestic && p.image) {
            var img = el('img', 'pub-card__img');
            img.src = p.image;
            img.alt = p.title || '';
            card.appendChild(img);
          }

          var body = el('div', 'pub-card__body');

          // Title
          var titleP = el('p', 'pub-card__title');
          titleP.textContent = p.title || '';
          body.appendChild(titleP);

          // Authors (with inline formatting)
          if (p.authors) {
            var authP = el('p', 'pub-card__authors');
            authP.innerHTML = parseInline(p.authors);
            body.appendChild(authP);
          }

          // Venue (wrapped in <em>, with inline formatting)
          // Auto-append ", Mon YYYY" from year/month unless venue already embeds a year (**YYYY**)
          if (p.venue) {
            var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var venueP = el('p', 'pub-card__venue');
            var venueHtml = '<em>' + parseInline(p.venue) + '</em>';
            var hasEmbeddedYear = /\*\*\d{4}\*\*/.test(p.venue);
            if (!hasEmbeddedYear && p.year) {
              var mon = p.month ? MONTHS[p.month - 1] + ' ' : '';
              venueHtml += ', ' + mon + '<strong>' + p.year + '</strong>';
            }
            venueP.innerHTML = venueHtml;
            body.appendChild(venueP);
          }

          // Award
          if (p.award) {
            var awardP = el('p', 'pub-card__award');
            awardP.textContent = '[' + p.award + ']';
            body.appendChild(awardP);
          }

          // Links
          if (p.links && p.links.length > 0) {
            var linksP = el('p', 'pub-card__links');
            p.links.forEach(function (lnk) {
              if (lnk.url) {
                var a = el('a');
                a.href = lnk.url;
                a.target = '_blank';
                a.textContent = '[' + lnk.label + ']';
                linksP.appendChild(a);
              } else {
                var span = el('span', 'pub-link--unavailable');
                span.textContent = '[' + lnk.label + ']';
                linksP.appendChild(span);
              }
            });
            body.appendChild(linksP);
          }

          card.appendChild(body);
          section.appendChild(card);
        });
      });

      container.appendChild(section);

      container.appendChild(el('hr'));
    });
  }

  renderPub();

  // Floating "Back to Top" button
  var floatBtn = document.getElementById('pub-float-top');
  if (floatBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        floatBtn.classList.add('visible');
      } else {
        floatBtn.classList.remove('visible');
      }
    });
    floatBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
