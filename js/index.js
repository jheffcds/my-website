let currentImageIndex = 0;
let currentInfoIndex = 0;
let infoData = [];
let images = [];
let loadingMessages = [
    "loading contents...",
    "We are almost there...",
    "hold on, it's almost ready...",
    "oh boy, we are almost there...",
    "and... Voilà!",
    "not yet?"
];
let loadingMessageIndex = 0;
let loadingTextInterval;

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleMenu);
    
    showLoading(); // Show loading animation
    startLoadingTextAnimation(); // Start the loading text animation
    Promise.all([loadImages(), loadInfoData()])
        .then(() => {
            hideLoading(); // Hide loading animation
            stopLoadingTextAnimation(); // Stop the loading text animation
        })
        .catch(error => {
            console.error('Error loading data:', error);
            hideLoading(); // Ensure loading animation is hidden even if there's an error
            stopLoadingTextAnimation(); // Stop the loading text animation
        });

    // Add event listener to open modal on current gallery image click
    const currentImage = document.getElementById('currentImage');
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

// Function to show loading animation
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// Function to hide loading animation
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Function to start the loading text animation
function startLoadingTextAnimation() {
    const loadingTextElement = document.getElementById('loading-text');
    loadingTextInterval = setInterval(() => {
        loadingMessageIndex = (loadingMessageIndex + 1) % loadingMessages.length;
        loadingTextElement.textContent = loadingMessages[loadingMessageIndex];
    }, 3000);
}

// Function to stop the loading text animation
function stopLoadingTextAnimation() {
    clearInterval(loadingTextInterval);
}

// Function to preload images
function preloadImages(data) {
    return Promise.all(data.map(item => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = item.image;
            img.onload = () => resolve(item);
            img.onerror = reject;
        });
    }));
}

// Function to load gallery images
function loadImages() {
    return fetch('assets/data/gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => preloadImages(data))
        .then(preloadedData => {
            images = preloadedData;
            changeImage(0); // Initialize with the first image
        });
}

// Function to change the gallery image
function changeImage(direction) {
    if (images.length === 0) return;

    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;

    const prevImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const nextImageIndex = (currentImageIndex + 1) % images.length;

    const prevImageElement = document.getElementById('prevImage');
    const currentImageElement = document.getElementById('currentImage');
    const nextImageElement = document.getElementById('nextImage');

    // Update image sources
    prevImageElement.src = images[prevImageIndex].image;
    nextImageElement.src = images[nextImageIndex].image;

    // Update the current image and text after the image has loaded
    const newImage = new Image();
    newImage.src = images[currentImageIndex].image;
    newImage.onload = () => {
        currentImageElement.src = newImage.src;
        document.getElementById('currentDescription').textContent = images[currentImageIndex].description;
        document.getElementById('currentText').textContent = images[currentImageIndex].text;
    };

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => item.classList.remove('current'));
    galleryItems[1].classList.add('current');
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
    return fetch('assets/data/info.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            infoData = data;
            changeInfo(0); // Initialize with the first data
        });
}

// Function to open modal
function openModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = "block";
    modalImg.src = images[currentImageIndex].image;
    captionText.innerHTML = images[currentImageIndex].description;
    document.body.classList.add('body-modal-open'); // Add class to body
}

// Function to open modal with specific image
function openModalWithImage(image) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = "block";
    modalImg.src = image.src;
    captionText.innerHTML = image.alt || ''; // Use alt text as description if available
    document.body.classList.add('body-modal-open'); // Add class to body
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
    document.body.classList.remove('body-modal-open'); // Remove class from body
}
