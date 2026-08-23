---
layout: page
title: Team Member
permalink: /team/member/
---

<div id="member-container"></div>

<script>
var teamData      = {{ site.data.team | jsonify }};
var pubData       = {{ site.data.publication | jsonify }};
var researchSlugs = {{ site.research | map: "slug" | jsonify }};
</script>
<script src="/assets/js/pub-render.js"></script>
<script src="/assets/js/team-member.js"></script>
