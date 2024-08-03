let originalText = '';
function toggleSection(id) {
    const sectionContent = document.getElementById(id);
    const button = document.getElementById(id + 'Button');

    if (sectionContent.style.display === 'block' || sectionContent.style.display === '') {
        sectionContent.style.display = 'none';
        button.innerHTML = '&#10095;';
    } else {
        sectionContent.style.display = 'block';
        button.innerHTML = '&#10094;';
        if (id === 'aboutMe') {
            if (!originalText) {
                // Save the original HTML content only once
                originalText = document.getElementById('typeEffect').innerHTML;
            }
        }
    }
}

// Add the event listener for the hamburger menu
const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('click', toggleMenu);
