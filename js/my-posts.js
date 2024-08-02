document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data from the JSON file
        const response = await fetch('assets/data/posts.json');
        const data = await response.json();

        const userInfo = data.userInfo;
        const posts = data.posts;

        // Update the username in the profile and title
        document.querySelector('.username').textContent = userInfo.username;
        document.querySelector('.profile-picture').src = userInfo.profilePicture;
        document.querySelector('.section-header span').textContent = `${userInfo.username}'s Posts`;

        // Display the posts
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching user info or posts:', error);
    }

    function displayPosts(posts) {
        const postsContainer = document.getElementById('user-posts-container');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="post-header">
                    <div class="post-header-left">
                        <img src="${userInfo.profilePicture}" alt="Profile Picture" class="profile-pic"> 
                        <div class="post-info">
                            <span class="post-author">${userInfo.username}</span>
                            <span class="post-date">${new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.imageUrl && post.imageUrl.length ? post.imageUrl.map(url => {
                        if (url.endsWith('.mp4')) {
                            return `<video controls><source src="${url}" type="video/mp4"></video>`;
                        } else {
                            return `<img src="${url}" alt="Post Media">`;
                        }
                    }).join('') : ''}
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Sign-in/Register functionality
    document.getElementById('signin-register-button').addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // Modal functionality
    const modal = document.getElementById('profileModal');
    const closeBtn = modal.querySelector('.close');
    const profilePictureElement = document.querySelector('.profile-picture');
    const changeProfileInput = document.getElementById('change-profile-input');
    const viewProfileButton = document.getElementById('view-profile-button');
    const changeProfileButton = document.getElementById('change-profile-button');

    profilePictureElement.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    viewProfileButton.addEventListener('click', () => {
        window.open(profilePictureElement.src, '_blank');
    });

    // Show error message modal for change profile picture
    changeProfileButton.addEventListener('click', () => {
        showErrorModal("Operation not allowed. Please login or create an account and try our features!");
    });

    function showErrorModal(message) {
        const errorModal = document.createElement('div');
        errorModal.classList.add('modal');
        errorModal.innerHTML = `
            <div class="modal-content">
                <span class="close-error">&times;</span>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(errorModal);

        const closeErrorBtn = errorModal.querySelector('.close-error');
        closeErrorBtn.addEventListener('click', () => {
            errorModal.style.display = 'none';
            errorModal.remove();
        });

        window.addEventListener('click', (event) => {
            if (event.target === errorModal) {
                errorModal.style.display = 'none';
                errorModal.remove();
            }
        });

        errorModal.style.display = 'block';
    }
});
