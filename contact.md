---
layout: page
title: Contact
permalink: /contact/
---

<div class="contact-grid">

  <div class="contact-card">
    <div class="contact-card__icon">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
    <div class="contact-card__content">
      <p class="contact-card__label">Address</p>
      <p class="contact-card__value">Room 616, IT Bldg. (Bldg. 102)<br>Pusan National University<br>2, Busandaehak-ro 63beon-gil<br>Geumjeong-gu, Busan 46241<br>Republic of Korea</p>
    </div>
  </div>

  <div class="contact-card">
    <div class="contact-card__icon">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </div>
    <div class="contact-card__content">
      <p class="contact-card__label">E-Mail</p>
      <p class="contact-card__value"><canvas id="eml-contact" style="vertical-align:-2px"></canvas></p>
    </div>
  </div>

  <div class="contact-card">
    <div class="contact-card__icon">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    </div>
    <div class="contact-card__content">
      <p class="contact-card__label">Phone</p>
      <p class="contact-card__value"><canvas id="phone-contact" style="vertical-align:-2px"></canvas></p>
    </div>
  </div>

</div>

<div class="contact-map">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.9146567115372!2d129.08236233643908!3d35.23068679768282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568930014f9f367%3A0xea79b066b7eb63eb!2z67aA7IKw64yA7ZWZ6rWQIElU6rSA!5e0!3m2!1sko!2skr!4v1772026990102!5m2!1sko!2skr" allowfullscreen="" loading="lazy"></iframe>
</div>

<script>
(function(){
  var d = String.fromCharCode;
  function drawText(id, t) {
    var c = document.getElementById(id), x = c.getContext('2d');
    var f = '14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';
    x.font = f;
    c.width = Math.ceil(x.measureText(t).width) + 4;
    c.height = 20;
    x.font = f;
    x.fillStyle = '#343851';
    x.fillText(t, 2, 15);
  }
  function drawEml(id, u, m) {
    drawText(id, u + d(95,97,116,95) + m);
  }
  drawEml('eml-contact', d(106,115,112,97,114,107), d(112,117,115,97,110,46,97,99,46,107,114));
  drawText('phone-contact', d(43,56,50,45,53,49,45,53,49,48,45,50,51,54,48));
})();
</script>
