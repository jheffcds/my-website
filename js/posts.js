document.addEventListener('DOMContentLoaded', async () => {
    const API_BASE_URL = 'https://my-website-backend-l922.onrender.com';
    const username = localStorage.getItem('username');
    const profilePicture = localStorage.getItem('profilePicture');
    const userId = localStorage.getItem('userId');

    if (username && profilePicture && userId) {
        document.querySelector('.username').textContent = username;
        document.querySelector('.profile-picture').src = profilePicture;

        try {
            const response = await fetch(`${API_BASE_URL}/user-posts/${userId}`);
            const posts = await response.json();
            const postsContainer = document.getElementById('posts-container');

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-header">
                        <div class="post-header-left">
                            <img src="${post.userId.profilePicture}" alt="Profile Picture" class="profile-pic"> 
                            <div class="post-info">
                                <span class="post-author">${post.userId.username}</span>
                                <span class="post-date">${new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button class="delete-post-button" data-post-id="${post._id}">Delete</button>
                    </div>
                    <div class="post-content">
                        <p>${post.content}</p>
                        <div class="media-container">
                            ${post.imageUrl && post.imageUrl.length ? post.imageUrl.map(url => {
                                if (url.endsWith('.mp4')) {
                                    return `<video controls><source src="${url}" type="video/mp4"></video>`;
                                } else {
                                    return `<img src="${url}" alt="Post Media">`;
                                }
                            }).join('') : ''}
                        </div>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });

            // Attach event listeners to delete buttons
            document.querySelectorAll('.delete-post-button').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const postId = event.target.getAttribute('data-post-id');
                    await deletePost(postId);
                    event.target.closest('.post').remove();
                });
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    } else {
        window.location.href = 'login.html';
    }

    async function deletePost(postId) {
        try {
            const response = await fetch(`${API_BASE_URL}/delete-post/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    // Placeholder text array
    const placeholders = [
        "What's on your to-do list today?",
        "What tasks are you planning to tackle?",
        "What is your priority for the day?",
        "What goals are you aiming to achieve today?",
        "What cities are you visiting today?"
    ];

    // Function to rotate placeholder text
    let currentIndex = 0;
    const inputElement = document.getElementById('post-text');

    function changePlaceholder() {
        inputElement.placeholder = placeholders[currentIndex];
        currentIndex = (currentIndex + 1) % placeholders.length;
    }

    // Change placeholder every 4 seconds
    setInterval(changePlaceholder, 4000);

    // Initial placeholder text
    changePlaceholder();

    // User search functionality
    const searchInput = document.getElementById('search-user');
    const searchButton = document.getElementById('search-button');
    const userList = document.getElementById('user-list');

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            try {
                const response = await fetch(`${API_BASE_URL}/search-users?query=${query}`);
                const users = await response.json();
                displayUserList(users);
            } catch (error) {
                console.error('Error searching users:', error);
            }
        }
    });

    function displayUserList(users) {
        userList.innerHTML = '';
        if (users.length > 0) {
            userList.style.display = 'block';
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = user.username;
                userDiv.addEventListener('click', () => {
                    localStorage.setItem('searchedUserId', user._id);
                    window.location.href = `user-posts.html?userId=${user._id}`;
                });
                userList.appendChild(userDiv);
            });
        } else {
            userList.style.display = 'none';
        }
    }

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

    changeProfileButton.addEventListener('click', () => {
        changeProfileInput.click();
    });

    changeProfileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('profilePicture', file);

            try {
                const response = await fetch(`${API_BASE_URL}/update-profile-picture`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Error updating profile picture');
                }

                const result = await response.json();
                profilePictureElement.src = result.profilePicture;
                localStorage.setItem('profilePicture', result.profilePicture);
                modal.style.display = 'none';
                location.reload();  // Reload the page to reflect the new profile picture
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        }
    });

    document.getElementById('signout-button').addEventListener('click', () => {
        localStorage.removeItem('username');
        localStorage.removeItem('profilePicture');
        localStorage.removeItem('userId');
        window.location.href = 'login.html';
    });

    document.getElementById('custom-file-button').addEventListener('click', () => {
        document.getElementById('post-media').click();
    });

    document.getElementById('post-media').addEventListener('change', (event) => {
        const files = event.target.files;
        const previewContainer = document.getElementById('media-preview');
        previewContainer.innerHTML = '';
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    previewContainer.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.controls = true;
                    video.src = e.target.result;
                    previewContainer.appendChild(video);
                }
            };
            reader.readAsDataURL(file);
        });
    });

    document.getElementById('post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const content = document.getElementById('post-text').value;
        const media = document.getElementById('post-media').files;

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('content', content);
        Array.from(media).forEach(file => formData.append('media', file));

        try {
            const response = await fetch(`${API_BASE_URL}/create-post`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message);

            // Reload the page to show the newly created post
            location.reload();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    });
    
    // Add the event listener for the hamburger menu
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleMenu);
});
