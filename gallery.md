---
layout: page
title: Gallery
permalink: /gallery/
---

<div id="gallery-container"></div>

<div class="pagination-controls"></div>

<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<script>
const galleryData = {{ site.data.gallery | jsonify }};

const perPage = 9;
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
    renderGallery();
  }
}

function nextPage() {
  if (currentPage < Math.ceil(galleryData.length / perPage)) {
    currentPage++;
    updateURL();
    renderGallery();
  }
}

function renderGallery() {
  const totalPages = Math.max(1, Math.ceil(galleryData.length / perPage));

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageItems = galleryData.slice(start, end);

  const gallery = document.getElementById('gallery-container');
  gallery.innerHTML = '';

  pageItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.addEventListener('click', () => {
      window.location.href = `/gallery/${item.slug}/`;
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
        <div class="card-date">${
          item.start_date && item.end_date
            ? `${item.start_date} ~ ${item.end_date}`
            : (item.date || '')
        }</div>
      </div>
      <div class="card-content">
        <h3>${item.title}</h3>
      </div>
    `;

    gallery.appendChild(card);

    new Swiper(`.${swiperId}`, {
      loop: true,
      autoplay: { delay: 2000 },
      navigation: {
        nextEl: `.${swiperId} .swiper-button-next`,
        prevEl: `.${swiperId} .swiper-button-prev`,
      },
    });
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
        renderGallery();
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

renderGallery();
</script>

{% include card-style.html %}