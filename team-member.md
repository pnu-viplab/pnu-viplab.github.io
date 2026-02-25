---
layout: page
title: Team Member
permalink: /team/member/
---

<div id="member-container"></div>

<script>
var teamData = {{ site.data.team | jsonify }};
var pubData  = {{ site.data.publication | jsonify }};
</script>
<script src="/assets/js/team-member.js"></script>
