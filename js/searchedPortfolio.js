document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://my-website-backend-l922.onrender.com';
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (!userId) {
        console.error('User ID not found in the URL');
        return;
    }

    fetchData(userId);
    // Add the event listener for the hamburger menu
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleMenu);
});

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

async function fetchData(userId) {
    const API_BASE_URL = 'https://my-website-backend-l922.onrender.com';
    try {
        // Retrieve user info from localStorage
        const userInfo = JSON.parse(localStorage.getItem('searchedUser'));

        if (!userInfo) {
            console.error('No user info found in localStorage');
            return;
        }

        document.getElementById('profile-picture').src = `${API_BASE_URL}${userInfo.profilePicture}`;
        document.getElementById('welcome-portfolio').innerText = `Welcome to ${userInfo.username}'s Portfolio!`;

        // Fetch and set sections content
        const response = await fetch(`${API_BASE_URL}/get-sections/${userId}`);
        const data = await response.json();

        document.getElementById('intro-text-about-me').innerText = data['intro-text-about-me'] || '';
        document.getElementById('personal-info').innerText = data['personal-info'] || '';
        document.getElementById('journey').innerText = data['journey'] || '';
        document.getElementById('passions').innerText = data['passions'] || '';
        document.getElementById('learning-innovation').innerText = data['learning-innovation'] || '';
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

