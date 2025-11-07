---
layout: page
title: Research
permalink: /research/
---

<div id="research-container"></div>

<div class="pagination-controls"></div>

<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<script>
const researchData = {{ site.data.research | jsonify }};

const perPage = 8;
const range = 2;

const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get('page')) || 1;

function updateURL() {
  const url = new URL(window.location);
  url.searchParams.set('page', currentPage);
  window.history.pushState({}, '', url);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updateURL();
    renderResearch();
  }
}

function nextPage() {
  if (currentPage < Math.ceil(researchData.length / perPage)) {
    currentPage++;
    updateURL();
    renderResearch();
  }
}

function renderResearch() {
  const totalPages = Math.max(1, Math.ceil(researchData.length / perPage));

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageItems = researchData.slice(start, end);

  const research = document.getElementById('research-container');
  research.innerHTML = '';

  pageItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.addEventListener('click', () => {
      window.location.href = `/research/${item.slug}/`;
    });

    const swiperId = `swiper-${start + index}`;
    let slides = '';

    if (item.images) {
      slides += item.images.map(img => `<div class="swiper-slide"><img src="${img}" /></div>`).join('');
    }

    card.innerHTML = `
      <div class="swiper ${swiperId}">
        <div class="swiper-wrapper">
          ${slides}
        </div>
        <div class="swiper-button-next" onclick="event.stopPropagation()"></div>
        <div class="swiper-button-prev" onclick="event.stopPropagation()"></div>
      </div>
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.description || ''}</p>
      </div>
    `;

    research.appendChild(card);

    const swiper = new Swiper(`.${swiperId}`, {
      loop: true,
      autoplay: { delay: 2000 },
      navigation: {
        nextEl: `.${swiperId} .swiper-button-next`,
        prevEl: `.${swiperId} .swiper-button-prev`,
      },
    });

    const nextEl = document.querySelector(`.${swiperId} .swiper-button-next`);
    const prevEl = document.querySelector(`.${swiperId} .swiper-button-prev`);

    if (nextEl && prevEl) {
      nextEl.innerHTML = '<i class="fas fa-chevron-right"></i>';
      prevEl.innerHTML = '<i class="fas fa-chevron-left"></i>';
    }
  });

  const pagination = document.querySelector('.pagination-controls');
  pagination.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.innerText = 'Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = prevPage;
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - range && i <= currentPage + range)
    ) {
      const pageBtn = document.createElement('button');
      pageBtn.innerText = i;
      if (i === currentPage) {
        pageBtn.classList.add('active');
        pageBtn.disabled = true;
      }
      pageBtn.onclick = () => {
        currentPage = i;
        updateURL();
        renderResearch();
      };
      pagination.appendChild(pageBtn);
    } else if (
      i === currentPage - range - 1 ||
      i === currentPage + range + 1
    ) {
      const dots = document.createElement('span');
      dots.innerText = '...';
      dots.className = 'dots';
      pagination.appendChild(dots);
    }
  }

  const nextBtn = document.createElement('button');
  nextBtn.innerText = 'Next';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = nextPage;
  pagination.appendChild(nextBtn);
}

renderResearch();
</script>

{% include card-style.html %}