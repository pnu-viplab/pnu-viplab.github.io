function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

var sections = [
  { key: 'phd',              title: 'Ph.D. Students',                  cols: 2, compact: false },
  { key: 'ms',               title: 'M.S. Students',                   cols: 2, compact: false },
  { key: 'undergrad',        title: 'Undergraduate Students',          cols: 2, compact: false },
  { key: 'researcher',      title: 'Researchers',                     cols: 2, compact: false },
  { key: 'staff',            title: 'Research Staffs',                 cols: 2, compact: false },
  { key: 'alumni',           title: 'Alumni',                          cols: 3, compact: true },
  { key: 'former_researcher',title: 'Former Researchers',              cols: 3, compact: true },
  { key: 'former_undergrad', title: 'Former Undergraduate Researchers',cols: 3, compact: true, mini: true },
];

function addMeta(parent, text) {
  var div = document.createElement('div');
  div.className = 'team-card__meta';
  div.textContent = text;
  parent.appendChild(div);
}

function rv(s) { return s.split('').reverse().join(''); }

function addEmailMeta(parent, c1, c2) {
  var at = String.fromCharCode(95, 97, 116, 95);
  var text = rv(c1) + at + rv(c2);

  var div = document.createElement('div');
  div.className = 'team-card__meta';

  // Emoji prefix as text node
  div.appendChild(document.createTextNode('\uD83D\uDCEB '));

  // Canvas for email (spam-proof rendering)
  var canvas = document.createElement('canvas');
  canvas.style.verticalAlign = '-2px';
  var ctx = canvas.getContext('2d');
  var f = '12.8px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
  ctx.font = f;
  canvas.width = Math.ceil(ctx.measureText(text).width) + 4;
  canvas.height = 17;
  ctx.font = f;
  ctx.fillStyle = '#838c8d';
  ctx.fillText(text, 2, 13);

  div.appendChild(canvas);
  parent.appendChild(div);
}

function addHomepageMeta(parent, url) {
  var div = document.createElement('div');
  div.className = 'team-card__meta';
  var a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.textContent = '\uD83C\uDF10 Homepage';
  a.style.color = 'inherit';
  a.style.textDecoration = 'none';
  a.style.borderBottom = 'none';
  div.appendChild(a);
  parent.appendChild(div);
}

function renderTeam() {
  var container = document.getElementById('team-container');
  if (!container) return;
  container.innerHTML = '';

  sections.forEach(function(sec) {
    var members = teamData.filter(function(m) { return m.category === sec.key; });
    if (members.length === 0) return;

    // Section heading
    if (sec.key === 'former_undergrad') {
      var h3 = document.createElement('h3');
      h3.textContent = sec.title;
      container.appendChild(h3);
    } else {
      var h1 = document.createElement('h1');
      h1.textContent = sec.title;
      container.appendChild(h1);
    }

    // Grid cards
    var grid = document.createElement('div');
    grid.className = 'team-grid team-grid--' + sec.cols + 'col';

    members.forEach(function(m) {
      var card = document.createElement('div');
      var cls = 'team-card';
      if (sec.compact) cls += ' team-card--compact';
      if (sec.mini) cls += ' team-card--mini';
      card.className = cls;

      // Photo (skip if no photo field)
      if (m.photo) {
        var img = document.createElement('img');
        img.className = 'team-card__photo';
        img.src = m.photo;
        img.alt = m.name;
        card.appendChild(img);
      }

      // Info
      var info = document.createElement('div');
      info.className = 'team-card__info';

      var nameDiv = document.createElement('div');
      nameDiv.className = 'team-card__name';
      nameDiv.textContent = m.name + ' (' + m.name_kr + ')' + (m.badge ? ' ' + m.badge : '');
      info.appendChild(nameDiv);

      // Category-specific fields
      if (sec.key === 'alumni') {
        if (m.graduation) addMeta(info, '\uD83D\uDCC5 ' + m.graduation);
        if (m.c1 && m.c2) addEmailMeta(info, m.c1, m.c2);
        if (m.affiliation) addMeta(info, '\uD83D\uDCBC ' + m.affiliation);
      } else if (sec.key === 'former_researcher') {
        if (m.period) addMeta(info, '\uD83D\uDCC5 ' + m.period);
        if (m.c1 && m.c2) addEmailMeta(info, m.c1, m.c2);
        if (m.role) addMeta(info, '\uD83D\uDCBB ' + m.role);
        if (m.affiliation) addMeta(info, '\uD83D\uDCBC ' + m.affiliation);
      } else if (sec.key === 'former_undergrad') {
        if (m.period) addMeta(info, '\uD83D\uDCC5 ' + m.period);
        if (m.affiliation) addMeta(info, '\uD83D\uDCBC ' + m.affiliation);
      } else {
        if (m.c1 && m.c2) addEmailMeta(info, m.c1, m.c2);
        if (m.homepage) addHomepageMeta(info, m.homepage);
        if (m.research) addMeta(info, '\uD83D\uDD0E ' + m.research);
      }

      card.appendChild(info);

      // Navigate to member page on card click (ignore clicks on links/canvas)
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'CANVAS') return;
        window.location.href = '/team/member/?name=' + makeSlug(m.name);
      });

      grid.appendChild(card);
    });

    container.appendChild(grid);
    container.appendChild(document.createElement('br'));
  });
}

renderTeam();
