document.addEventListener('DOMContentLoaded', async () => {
    const API_BASE_URL = 'https://my-website-backend-l922.onrender.com';
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (!userId) {
        console.error('User ID not found in the URL');
        return;
    }

    try {
        // Fetch user info
        const userInfoResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
        const userInfo = await userInfoResponse.json();

        document.querySelector('.username').textContent = userInfo.username;
        document.querySelector('.profile-picture').src = `${API_BASE_URL}${userInfo.profilePicture}`;

        // Store user info in localStorage for the searched user
        localStorage.setItem('searchedUser', JSON.stringify(userInfo));

        // Fetch user posts
        const postsResponse = await fetch(`${API_BASE_URL}/user-posts/${userId}`);
        const posts = await postsResponse.json();
        displayPosts(posts);

        // Add event listener to view portfolio button
        const viewPortfolioButton = document.getElementById('view-portfolio-button');
        viewPortfolioButton.addEventListener('click', () => {
            window.location.href = `searchedPortfolio.html?userId=${userId}`;
        });
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
                    <img src="${API_BASE_URL}${post.userId.profilePicture}" alt="Profile Picture" class="profile-pic"> 
                    <div class="post-info">
                        <span class="post-author">${post.userId.username}</span>
                        <span class="post-date">${new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.imageUrl && post.imageUrl.length ? post.imageUrl.map(url => {
                        const fullUrl = `${API_BASE_URL}${url}`;
                        if (url.endsWith('.mp4')) {
                            return `<video controls><source src="${fullUrl}" type="video/mp4"></video>`;
                        } else {
                            return `<img src="${fullUrl}" alt="Post Media">`;
                        }
                    }).join('') : ''}
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }
    // Add the event listener for the hamburger menu
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleMenu);
});
