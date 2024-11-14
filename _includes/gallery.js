function openPopup(title, date, imgArray) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-date').textContent = date;
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';

    // add images
    imgArray.forEach(imgSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.classList.add('popup-img');
        imageContainer.appendChild(imgElement);
    });

    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Esc 키로 팝업 닫기
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});