---
layout: page
title: Team
permalink: /team/
---

# Professor

<div class="team-card team-card--professor">
  <img class="team-card__photo" src="/assets/img/team/prof.jpg" alt="Jinsun Park">
  <div class="team-card__info">
    <div class="team-card__name">Jinsun Park, Ph.D.</div>
    <div class="team-card__meta"><a href="https://pnu-viplab.github.io/" target="_blank">Visual Intelligence and Perception Laboratory</a></div>
    <div class="team-card__meta"><a href="https://cse.pusan.ac.kr/" target="_blank">School of Computer Science and Engineering</a></div>
    <div class="team-card__meta"><a href="https://www.pusan.ac.kr/" target="_blank">Pusan National University</a></div>
    <div class="team-card__meta" style="margin-top:0.4rem;">E-mail : <canvas id="eml-prof1" style="vertical-align:-2px"></canvas> / <canvas id="eml-prof2" style="vertical-align:-2px"></canvas></div>
    <div class="team-card__links">
      <a href="https://zzangjinsun.github.io/cv/CV_JSPark.pdf" target="_blank">[CV]</a>
      <a href="https://zzangjinsun.github.io/" target="_blank">[Homepage]</a>
      <a href="https://www.linkedin.com/in/jinsun-park-6aa043aa/" target="_blank">[LinkedIn]</a>
      <a href="https://scholar.google.co.kr/citations?user=OYTOe58AAAAJ" target="_blank">[Google Scholar]</a>
      <a href="https://github.com/zzangjinsun" target="_blank">[Github]</a>
    </div>
  </div>
</div>
<script>
(function(){
  var d=String.fromCharCode;
  function drawEml(id,u,m){var a=d(95,97,116,95),t=u+a+m,c=document.getElementById(id),x=c.getContext('2d'),f='13.6px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';x.font=f;c.width=Math.ceil(x.measureText(t).width)+4;c.height=18;x.font=f;x.fillStyle='#838c8d';x.fillText(t,2,14);}
  drawEml('eml-prof1',d(106,115,112,97,114,107),d(112,117,115,97,110,46,97,99,46,107,114));
  drawEml('eml-prof2',d(122,122,97,110,103,106,105,110,115,117,110),d(103,109,97,105,108,46,99,111,109));
})();
</script>

<div class="professor-bio" markdown="1">

### Short Biography

Prof. Jinsun Park is an associate professor at the School of Computer Science and Engineering, Pusan National University, Busan, Republic of Korea. From Mar. 2021 to Aug. 2021, he worked as a postdoctoral researcher at the Korea Advanced Institute of Science and Technology (KAIST), Daejeon, Republic of Korea. He received his M.S. and Ph.D. degrees from the [Robotics and Computer Vision Lab.](http://rcv.kaist.ac.kr/){:target="_blank" style="color: black; text-decoration: underline; border: none"}, School of Electrical Engineering, KAIST, Daejeon, Republic of Korea, in 2016 and 2021, respectively (Advisor: [Prof. In So Kweon](https://scholar.google.com/citations?user=XA8EOlEAAAAJ&hl=en){:target="_blank" style="color: black; text-decoration: underline; border: none"} / former advisor: [Prof. Yu-Wing Tai](https://scholar.google.com/citations?user=nFhLmFkAAAAJ&hl=en){:target="_blank" style="color: black; text-decoration: underline; border: none"}). From Jul. 2019 to Jan. 2020, he worked as a full-time research intern at HikVision USA, CA, USA (Mentor: [Dr. Zhe Hu](https://scholar.google.com/citations?user=4gC0czQAAAAJ&hl=en){:target="_blank" style="color: black; text-decoration: underline; border: none"}). He received his B.S. degree from the Department of Electronic Engineering, Hanyang University, Seoul, Republic of Korea, in 2014.

</div>

<div id="team-container"></div>
<script>var teamData = {{ site.data.team | jsonify }};</script>
<script src="/assets/js/team.js"></script>
