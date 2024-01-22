


document.addEventListener('DOMContentLoaded', async function () {

    const profileInfo = document.getElementById('profileInfo');
    const userSelect = document.getElementById('userSelect');
    const postsContainer = document.getElementById('postsContainer');
    const commentsContainer = document.getElementById('commentsContainer');

    let users = []; 

    // Fetching all users
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const userData = await response.json();
            users = userData;
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.name;
                userSelect.add(option);
            });

            // Display profile and posts for user 1  default
            const defaultUser = users.find(user => user.id === 1);
            if (defaultUser) {
                displayUserProfile(defaultUser);
                await displayUserPosts(defaultUser.id);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    await fetchUsers();

    
    userSelect.addEventListener('change', async function () {
        const selectedUserId = parseInt(userSelect.value);
        await displayUserPosts(selectedUserId);

       
        const selectedUser = users.find(user => user.id === selectedUserId);
        displayUserProfile(selectedUser);
    });

    
    function displayUserProfile(user) {
        profileInfo.innerHTML = `
        <img id="profile1" class="ab" src="/user2.png" alt="" srcset=""> 
            <h1> ${user.name}</h1>
            <p> @${user.username}</p>
            <p> ${user.company.catchPhrase}</p>
            <p> ${user.address.city}</p>
        `;
    }

    async function displayUserPosts(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Error fetching posts');
            }

            const posts = await response.json();
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('posts');
                postElement.innerHTML = `

            <div class="posts" id="posts" >

                <div class="badge" >
                <img id="profile1" src="/user2.png" alt="" srcset=""> 
                </div>    
                

                <div class="partpost">
                    <div class="head">
                    <h1></h1>
                        <h6><svg width="40px" height="64px" viewBox="-12 -12 144.00 144.00" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke="#000000" stroke-width="0.0012000000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.2"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#00D566;} .st1{opacity:0.15;} .st2{fill:#FFFFFF;} </style> <g> <path class="st0" d="M99.5,52.8l-1.9,4.7c-0.6,1.6-0.6,3.3,0,4.9l1.9,4.7c1.1,2.8,0.2,6-2.3,7.8L93,77.8c-1.4,1-2.3,2.5-2.7,4.1 l-0.9,5c-0.6,3-3.1,5.2-6.1,5.3l-5.1,0.2c-1.7,0.1-3.3,0.8-4.5,2l-3.5,3.7c-2.1,2.2-5.4,2.7-8,1.2l-4.4-2.6 c-1.5-0.9-3.2-1.1-4.9-0.7l-5,1.2c-2.9,0.7-6-0.7-7.4-3.4l-2.3-4.6c-0.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8 l0.5-5.1c0.2-1.7-0.3-3.4-1.4-4.7l-3.2-4c-1.9-2.4-1.9-5.7,0-8.1l3.2-4c1.1-1.3,1.6-3,1.4-4.7l-0.5-5.1c-0.3-3,1.5-5.8,4.4-6.8 l4.8-1.6c1.6-0.5,2.9-1.7,3.7-3.2l2.3-4.6c1.4-2.7,4.4-4.1,7.4-3.4l5,1.2c1.6,0.4,3.4,0.2,4.9-0.7l4.4-2.6c2.6-1.5,5.9-1.1,8,1.2 l3.5,3.7c1.2,1.2,2.8,2,4.5,2l5.1,0.2c3,0.1,5.6,2.3,6.1,5.3l0.9,5c0.3,1.7,1.3,3.2,2.7,4.1l4.2,2.9C99.7,46.8,100.7,50,99.5,52.8z "></path> <g class="st1"> <path d="M43.4,93.5l-2.3-4.6c-0.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8l0.5-5.1c0.2-1.7-0.3-3.4-1.4-4.7l-3.2-4 c-1.9-2.4-1.9-5.7,0-8.1l3.2-4c1.1-1.3,1.6-3,1.4-4.7l-0.5-5.1c-0.3-3,1.5-5.8,4.4-6.8l4.8-1.6c1.6-0.5,2.9-1.7,3.7-3.2l2.3-4.6 c0.8-1.6,2.2-2.7,3.7-3.2c-2.7-0.4-5.4,1-6.6,3.5l-2.3,4.6c-0.8,1.5-2.1,2.7-3.7,3.2l-4.8,1.6c-2.9,1-4.7,3.8-4.4,6.8l0.5,5.1 c0.2,1.7-0.3,3.4-1.4,4.7l-3.2,4c-1.9,2.4-1.9,5.7,0,8.1l3.2,4c1.1,1.3,1.6,3,1.4,4.7l-0.5,5.1c-0.3,3,1.5,5.8,4.4,6.8l4.8,1.6 c1.6,0.5,2.9,1.7,3.7,3.2l2.3,4.6c1.4,2.7,4.4,4.1,7.4,3.4l0.6-0.1C46.3,96.7,44.4,95.5,43.4,93.5z"></path> <path d="M60.6,22.5l4.4-2.6c0.4-0.2,0.8-0.4,1.2-0.5c-1.4-0.2-2.9,0.1-4.1,0.8l-4.4,2.6c-0.4,0.2-0.8,0.4-1.2,0.5 C57.9,23.5,59.3,23.3,60.6,22.5z"></path> <path d="M81,92c-0.5,0-1,0.1-1.4,0.2l3.6-0.2c0.5,0,0.9-0.1,1.4-0.2L81,92z"></path> <path d="M65,98.9l-4.4-2.6c-1.5-0.9-3.2-1.1-4.9-0.7l-0.6,0.1c0.9,0.1,1.7,0.4,2.5,0.8l4.4,2.6c1.7,1,3.6,1.1,5.4,0.5 C66.6,99.6,65.8,99.4,65,98.9z"></path> </g> <polyline class="st0" points="44,53.6 56.5,67.9 82.1,47.3 "></polyline> <path class="st2" d="M53.5,75.3c-1.4,0-2.8-0.6-3.8-1.7L37.2,59.3c-1.8-2.1-1.6-5.2,0.4-7.1c2.1-1.8,5.2-1.6,7.1,0.4l9.4,10.7 l21.9-17.6c2.1-1.7,5.3-1.4,7,0.8c1.7,2.2,1.4,5.3-0.8,7L56.6,74.2C55.7,74.9,54.6,75.3,53.5,75.3z"></path> </g> </g></svg></h6>
                        <h6><svg fill="#14aef0"  height="64px" style="width:40%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 32 32" xml:space="preserve" stroke="#14aef0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M0,0v32h32V0H0z M23.754,12.022c0.008,0.172,0.012,0.345,0.012,0.519c0,5.285-4.021,11.383-11.383,11.383 c-2.26,0-4.361-0.66-6.133-1.797c0.314,0.035,0.632,0.055,0.955,0.055c1.875,0,3.599-0.639,4.968-1.712 c-1.75-0.032-3.228-1.188-3.736-2.776c0.244,0.047,0.494,0.07,0.752,0.07c0.365,0,0.719-0.049,1.054-0.143 c-1.828-0.367-3.209-1.983-3.209-3.922c0-0.017,0-0.033,0-0.05c0.541,0.3,1.157,0.479,1.813,0.5 c-1.073-0.717-1.779-1.942-1.779-3.332c0-0.731,0.197-1.42,0.542-2.01c1.972,2.42,4.921,4.015,8.245,4.18 c-0.067-0.293-0.104-0.598-0.104-0.911c0-2.209,1.791-4,4.002-4c1.147,0,2.188,0.485,2.919,1.264 c0.91-0.18,1.768-0.514,2.541-0.971c-0.3,0.935-0.934,1.719-1.759,2.213c0.81-0.097,1.58-0.312,2.297-0.629 C25.214,10.756,24.536,11.459,23.754,12.022z"></path> </g> </g></svg></h6>
                    </div>

                    <div id="postbody" class="postbody"> 
                        ${post.body}
                    </div>
                    
                    <div class="footicons">
                    <div> <svg width="64px" height="64px" viewBox="-15.12 -15.12 54.24 54.24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 9.5H15M8 13.5H13M18 20L21 21L19.1 15.3C19.1 15.3 20 14 20 11.5C20 8.90308 18.8354 6.57817 17 5.01903M11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20C14.0847 20 15.3 19.1 15.3 19.1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>200</div>
                   <div><svg width="64px" height="64px" viewBox="-51.84 -51.84 167.68 167.68" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M52.94,42.93V18.3a5.54,5.54,0,0,0-5.54-5.54H11.83"></path><path d="M11.83,20.14V44.77a5.54,5.54,0,0,0,5.54,5.54H52.94"></path><polyline points="4.15 26.39 12.09 20.14 19.51 26.88"></polyline><polyline points="60.36 36.12 52.91 42.94 45 36.76"></polyline></g></svg>200</div> 
                   <div> <svg width="64px" height="64px" viewBox="-1024 -1024 3072.00 3072.00" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#e01a1a" stroke="#e01a1a" stroke-width="0.01024"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M933.387 517.868C950.274 477.276 960 431.509 960 382.887c0-165.301-109.993-299.305-245.677-299.305-83.964 0-158.011 51.39-202.323 129.684-44.31-78.295-118.357-129.685-202.321-129.685C173.994 83.581 64 217.586 64 382.887c0 57.701 13.632 111.398 36.851 157.102 56.694 135.957 196.112 269.389 414.1 400.428 149.872-95.245 273.613-208.473 368.923-341.271 14.435-16.802 49.513-81.278 49.513-81.278z" fill="#FF3B30"></path><path d="M484 254.385c8.327-14.713 17.706-28.474 28-41.12-57.022-96.69-134.136-129.682-202.321-129.682-9.409 0-18.659 0.786-27.794 2.039C354.075 95.7 444.727 184.995 484 254.385zM714.323 83.583c-9.547 0-18.946 0.75-28.206 2.039C808.697 102.462 904 229.049 904 382.888c0 48.623-9.724 94.386-26.613 134.982 0 0-35.08 64.473-49.515 81.277-89.475 124.668-204.315 231.88-342.002 323.366 9.592 5.971 19.163 11.942 29.079 17.905 149.872-95.244 273.613-208.474 368.923-341.271 14.434-16.805 49.514-81.277 49.514-81.277C950.276 477.274 960 431.511 960 382.888c0-165.302-109.993-299.305-245.677-299.305z" fill=""></path></g></svg>200</div>
                    </div>
                </div>

            </div>
            
            `;

                postElement.addEventListener('click', () => displayPostComments(post.id));
                postsContainer.appendChild(postElement);
            });


            if (posts.length > 0) {
                await displayPostComments(posts[0].id);
            } else {
                commentsContainer.innerHTML = '';
            }
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    }

    async function displayPostComments(postId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

            if (!response.ok) {
                throw new Error('Error fetching comments');
            }

            const comments = await response.json();

            commentsContainer.innerHTML = '';
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comments');

                commentElement.innerHTML = `

                <div class="comments">
                <strong>${comment.name}</strong>: ${comment.body}
                <div class="footicons">
                    <div> <svg width="64px" height="64px" viewBox="-15.12 -15.12 54.24 54.24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 9.5H15M8 13.5H13M18 20L21 21L19.1 15.3C19.1 15.3 20 14 20 11.5C20 8.90308 18.8354 6.57817 17 5.01903M11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20C14.0847 20 15.3 19.1 15.3 19.1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>0</div>
                   <div><svg width="64px" height="64px" viewBox="-51.84 -51.84 167.68 167.68" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M52.94,42.93V18.3a5.54,5.54,0,0,0-5.54-5.54H11.83"></path><path d="M11.83,20.14V44.77a5.54,5.54,0,0,0,5.54,5.54H52.94"></path><polyline points="4.15 26.39 12.09 20.14 19.51 26.88"></polyline><polyline points="60.36 36.12 52.91 42.94 45 36.76"></polyline></g></svg>0</div> 
                   <div> <svg width="64px" height="64px" viewBox="-1024 -1024 3072.00 3072.00" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#e01a1a" stroke="#e01a1a" stroke-width="0.01024"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M933.387 517.868C950.274 477.276 960 431.509 960 382.887c0-165.301-109.993-299.305-245.677-299.305-83.964 0-158.011 51.39-202.323 129.684-44.31-78.295-118.357-129.685-202.321-129.685C173.994 83.581 64 217.586 64 382.887c0 57.701 13.632 111.398 36.851 157.102 56.694 135.957 196.112 269.389 414.1 400.428 149.872-95.245 273.613-208.473 368.923-341.271 14.435-16.802 49.513-81.278 49.513-81.278z" fill="#FF3B30"></path><path d="M484 254.385c8.327-14.713 17.706-28.474 28-41.12-57.022-96.69-134.136-129.682-202.321-129.682-9.409 0-18.659 0.786-27.794 2.039C354.075 95.7 444.727 184.995 484 254.385zM714.323 83.583c-9.547 0-18.946 0.75-28.206 2.039C808.697 102.462 904 229.049 904 382.888c0 48.623-9.724 94.386-26.613 134.982 0 0-35.08 64.473-49.515 81.277-89.475 124.668-204.315 231.88-342.002 323.366 9.592 5.971 19.163 11.942 29.079 17.905 149.872-95.244 273.613-208.474 368.923-341.271 14.434-16.805 49.514-81.277 49.514-81.277C950.276 477.274 960 431.511 960 382.888c0-165.302-109.993-299.305-245.677-299.305z" fill=""></path></g></svg>0</div>
                    </div>
                </div>
                
                `;
                commentsContainer.appendChild(commentElement);
            });
        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }
    }
});
