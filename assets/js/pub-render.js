// Shared rendering helpers for publication cards, used by both the publication
// page and the member detail page.
//
// Authors: strings in _data/publication.yml reference lab members by ID
// ("@heeju_han_2024") instead of a hard-coded name. Each ID is resolved against
// _data/team.yml and rendered as a bold, linked name — in English for
// international publications and in Korean for domestic ones. Non-members are
// written out as plain text and pass through untouched.
//
// Research: a publication may name the research topic it belongs to via its
// "research" field, which holds the slug of a document in _research/.
(function () {
  var ID_TOKEN = /@([A-Za-z0-9_]+)/g;

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // id → { name, name_kr, isProfessor }. First entry wins; a member with
  // several team entries (e.g. M.S. student → alumni) shares one ID.
  function buildIndex(teamData) {
    var index = {};
    (teamData || []).forEach(function (m) {
      if (!m.id || index[m.id]) return;
      index[m.id] = {
        name: m.name,
        name_kr: m.name_kr,
        isProfessor: m.category === 'professor'
      };
    });
    return index;
  }

  // Members are shown in Korean on domestic publications, in English elsewhere.
  function displayName(entry, type) {
    if (type === 'domestic' && entry.name_kr) return entry.name_kr;
    return entry.name;
  }

  // Parse the **bold** and [text](url) markers used across the data files.
  function parseInline(text) {
    if (!text) return '';
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return text;
  }

  // Returns the HTML for a publication's author line.
  function renderAuthors(pub, teamData) {
    if (!pub || !pub.authors) return '';
    var index = buildIndex(teamData);

    var resolved = pub.authors.replace(ID_TOKEN, function (token, id) {
      var entry = index[id];
      // Unknown ID: leave the raw token visible so the typo is easy to spot.
      if (!entry) {
        if (window.console) console.warn('[authors] unknown member ID: ' + token);
        return token;
      }
      var label = escapeHtml(displayName(entry, pub.type) || id);
      // Member pages are addressed by ID, so renaming a member never breaks a
      // link. The professor has no detail page and points at the team page.
      var href = entry.isProfessor
        ? '/team/'
        : '/team/member/?id=' + encodeURIComponent(id);
      return '<strong><a class="pub-author" href="' + href + '">' + label + '</a></strong>';
    });

    return parseInline(resolved);
  }

  // URL of the research page a publication belongs to, or null when it has no
  // "research" field or that field names a slug the research collection lacks.
  function researchUrl(pub, researchSlugs) {
    var slug = pub && pub.research;
    if (!slug) return null;
    if (researchSlugs && researchSlugs.indexOf(slug) === -1) {
      if (window.console) console.warn('[pub] unknown research slug: ' + slug);
      return null;
    }
    return '/research/' + encodeURIComponent(slug) + '/';
  }

  // True when the publication lists the given member ID as an author.
  function hasAuthorId(pub, id) {
    if (!pub || !pub.authors || !id) return false;
    return new RegExp('@' + id + '(?![A-Za-z0-9_])').test(pub.authors);
  }

  window.VIPPub = {
    renderAuthors: renderAuthors,
    researchUrl: researchUrl,
    hasAuthorId: hasAuthorId,
    parseInline: parseInline
  };
})();
