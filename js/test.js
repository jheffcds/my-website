function loadImages() {
    fetch('assets/data/gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            images = data;
            changeImage(0); // Initialize with the first image
        })
        .catch(error => console.error('Error loading images:', error));
}

function changeImage(direction) {
    if (images.length === 0) return;

    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;

    const prevImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const nextImageIndex = (currentImageIndex + 1) % images.length;

    updateMediaElement('prevImageContainer', images[prevImageIndex].image);
    updateMediaElement('currentImageContainer', images[currentImageIndex].image);
    updateMediaElement('nextImageContainer', images[nextImageIndex].image);
    document.getElementById('currentDescription').textContent = images[currentImageIndex].description;
    document.getElementById('currentText').textContent = images[currentImageIndex].text;

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => item.classList.remove('current'));
    galleryItems[1].classList.add('current');
}

function updateMediaElement(containerId, mediaSrc) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const mediaType = mediaSrc.split('.').pop().toLowerCase();
    
    if (mediaType === 'gif') {
        const video = document.createElement('video');
        video.src = mediaSrc;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        container.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = mediaSrc;
        container.appendChild(img);
    }
}

function openModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = "block";
    const mediaSrc = images[currentImageIndex].image;
    updateMediaElement('modalImage', mediaSrc);
    captionText.innerHTML = images[currentImageIndex].description;
    document.body.classList.add('body-modal-open');
}

function openModalWithImage(image) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = "block";
    updateMediaElement('modalImage', image.src);
    captionText.innerHTML = image.alt || '';
    document.body.classList.add('body-modal-open');
}

function updateMediaElement(containerId, mediaSrc) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const mediaType = mediaSrc.split('.').pop().toLowerCase();
    
    if (mediaType === 'gif') {
        const video = document.createElement('video');
        video.src = mediaSrc;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        container.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = mediaSrc;
        container.appendChild(img);
    }
}
