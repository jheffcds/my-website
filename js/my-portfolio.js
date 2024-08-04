
document.addEventListener('DOMContentLoaded', (event) => {
let originalText = '';

function toggleSection(sectionId, buttonId) {
    const section = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);

    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        button.innerHTML = '&#10094;'; // Change to "expand less" symbol
    } else {
        section.style.display = 'none';
        button.innerHTML = '&#10095;'; // Change to "expand more" symbol
    }
}


    // Add the event listener for the hamburger menu
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleMenu);
});
