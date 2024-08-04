// Define toggleSection globally
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

// Data for the charts
const programmingSkillsData = {
    labels: ['JavaScript', 'Python', 'Java', 'C++', 'PHP', 'MongoDB', 'SQL','HTML','React','Github'],
    datasets: [{
        label: 'Competence (%)',
        data: [85, 75, 80, 70, 65,60,70,100,50,90],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

const officeSkillsData = {
    labels: ['Word', 'PowerPoint', 'Excel', 'Outlook', 'Teams'],
    datasets: [{
        label: 'Competence (%)',
        data: [90, 95, 85, 90,100],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const languageSkillsData = {
    labels: ['Portuguese', 'Italian', 'English', 'Spanish', 'French'],
    datasets: [{
        label: 'Competence (%)',
        data: [100, 100, 90, 65, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

// Create the charts
const ctx1 = document.getElementById('programmingSkillsChart').getContext('2d');
new Chart(ctx1, {
    type: 'radar',
    data: programmingSkillsData,
    options: {
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

const ctx2 = document.getElementById('officeSkillsChart').getContext('2d');
new Chart(ctx2, {
    type: 'radar',
    data: officeSkillsData,
    options: {
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

const ctx3 = document.getElementById('languageSkillsChart').getContext('2d');
new Chart(ctx3, {
    type: 'radar',
    data: languageSkillsData,
    options: {
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Add the event listener for the hamburger menu
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleMenu);
});
