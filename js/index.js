let currentImageIndex = 0;
let currentInfoIndex = 0;
let infoData = [];
let images = [];

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleMenu);
    
    loadImages(); // Load gallery images
    loadInfoData(); // Load info data

    // Add event listener to open modal on current gallery image click
    const currentImage = document.getElementById('currentImageContainer');
    currentImage.addEventListener('click', openModal);

    // Add event listeners to images in the image-container
    const imageContainerImages = document.querySelectorAll('.image-container img');
    imageContainerImages.forEach(image => {
        image.addEventListener('click', function() {
            openModalWithImage(image);
        });
    });

    // Add event listener to close modal
    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', closeModal);
});

// Function to change the gallery image
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

// Function to update the media element (image or GIF)
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

// Function to change the information display
function changeInfo(direction) {
    if (infoData.length === 0) return;

    currentInfoIndex = (currentInfoIndex + direction + infoData.length) % infoData.length;

    const infoText = document.getElementById('infoText');
    const description = document.getElementById('description');
    const fixedImage = document.getElementById('fixedImage');

    infoText.textContent = infoData[currentInfoIndex].text;
    description.textContent = infoData[currentInfoIndex].description;
    fixedImage.src = infoData[currentInfoIndex].image;
}

// Function to load information data
function loadInfoData() {
    fetch('assets/data/info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            infoData = data;
            changeInfo(0); // Initialize with the first data
        })
        .catch(error => console.error('Error loading info data:', error));
}

// Function to load gallery images
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

// Function to open modal
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

// Function to open modal with specific image
function openModalWithImage(image) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = "block";
    updateMediaElement('modalImage', image.src);
    captionText.innerHTML = image.alt || '';
    document.body.classList.add('body-modal-open');
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
    document.body.classList.remove('body-modal-open'); // Remove class from body
}
