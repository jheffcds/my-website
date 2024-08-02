document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    // Attach click event listeners to all edit buttons
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const sectionId = event.target.getAttribute('data-section');
            openModal(sectionId);
        });
    });

    const modal = document.getElementById('edit-modal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
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

function openModal(sectionId) {
    const modal = document.getElementById('edit-modal');
    const textarea = document.getElementById('edit-textarea');
    const sectionContent = document.getElementById(sectionId).innerText;

    textarea.value = sectionContent;
    document.getElementById('edit-section-id').value = sectionId;

    modal.style.display = 'block';
}

async function saveContent() {
    const sectionId = document.getElementById('edit-section-id').value;
    const content = document.getElementById('edit-textarea').value;
    const userId = localStorage.getItem('userId');
    const API_BASE_URL = 'https://my-website-backend-l922.onrender.com';

    const response = await fetch(`${API_BASE_URL}/save-section`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, sectionId, content }),
    });

    if (response.ok) {
        document.getElementById(sectionId).innerText = content;
        document.getElementById('edit-modal').style.display = 'none';
    } else {
        console.error('Error saving content');
    }
}

async function fetchData() {
    const userId = localStorage.getItem('userId');
    const API_BASE_URL = 'https://my-website-backend-l922.onrender.com';

    const response = await fetch(`${API_BASE_URL}/get-sections/${userId}`);
    const data = await response.json();

    document.getElementById('intro-text-about-me').innerText = data['intro-text-about-me'] || '';
    document.getElementById('personal-info').innerText = data['personal-info'] || '';
    document.getElementById('journey').innerText = data['journey'] || '';
    document.getElementById('passions').innerText = data['passions'] || '';
    document.getElementById('learning-innovation').innerText = data['learning-innovation'] || '';

    // Fetch and set profile picture
    const userInfoResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
    const userInfo = await userInfoResponse.json();
    document.getElementById('profile-picture').src = `${API_BASE_URL}${userInfo.profilePicture}`;
}
