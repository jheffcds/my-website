document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (!userId) {
        console.error('User ID not found in the URL');
        return;
    }

    try {
        // Fetch user info
        const userInfoResponse = await fetch(`http://localhost:8080/users/${userId}`);
        const userInfo = await userInfoResponse.json();

        document.querySelector('.username').textContent = userInfo.username;
        document.querySelector('.profile-picture').src = `http://localhost:8080${userInfo.profilePicture}`;

        // Store user info in localStorage for the searched user
        localStorage.setItem('searchedUser', JSON.stringify(userInfo));

        // Fetch user posts
        const postsResponse = await fetch(`http://localhost:8080/user-posts/${userId}`);
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
                    <img src="http://localhost:8080${post.userId.profilePicture}" alt="Profile Picture" class="profile-pic"> 
                    <div class="post-info">
                        <span class="post-author">${post.userId.username}</span>
                        <span class="post-date">${new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.imageUrl && post.imageUrl.length ? post.imageUrl.map(url => {
                        const fullUrl = `http://localhost:8080${url}`;
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
});
