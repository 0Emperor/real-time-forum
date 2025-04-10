import { initauth } from "./auth.js";

export { auth, comment, post, postinput, header, userBubble, persoChat }
let auth = () => `<div class="tabs">
            <div class="tab active" id="login-tab">Login</div>
            <div class="tab" id="register-tab">Register</div>
        </div>
        
        <div class="tab-content">
            <form id="login-form">
                <div class="form-group">
                    <label for="login-username">Username or Email</label>
                    <input type="text" id="login-username" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" required>
                </div>
                <button type="submit">Login</button>
            </form>
            
            <form id="register-form" class="hidden">
                <div class="form-group">
                    <label for="nickname">Nickname</label>
                    <input type="text" id="nickname" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstname">First Name</label>
                        <input type="text" id="first-name" required>
                    </div>
                    <div class="form-group">
                        <label for="lastname">Last Name</label>
                        <input type="text" id="last-name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="text" id="age" pattern="[0-9]+" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit">Register</button>
            </form>
                </div>`
let comment = (comment) => `<div class="comment">
    <div class="comment-header">
        <span class="comment-author">${comment.sender}</span>
        <span class="comment-date">${comment.date}</span>
    </div>
    <div class="comment-content">
        <p>${comment.content}</p>
    </div>
                </div>`

function post(postData) {
    // Extract initials for avatar
    const nameParts = postData.publisher.split(' ');
    const initials = nameParts.map(part => part[0]).join('').toUpperCase();

    // Format categories
    const categoriesHTML = postData.categories.map(category =>
        `<div class="category">${category}</div>`
    ).join('');

    // Create post HTML
    const postHTML = `
                        <div class="publisher">
                          <div class="name">${postData.publisher}</div>
                          <div class="avatar">${initials}</div>
                        </div>
                        <div class="post-title">${postData.title}</div>
                        <div class="post-content">${postData.content}</div>
                        <div class="categories">
                          ${categoriesHTML}
                        </div>
                    `;
    let post = document.createElement('div')
    post.classList.add('post')
    post.id = postData.id
    post.innerHTML = postHTML
    return post;
}
function postinput(categories) {
    // Create a container div and set innerHTML
    const container = document.createElement('div');
    container.innerHTML = `<div class="post-form-container">
                    <h2 class="form-title">Create New Post</h2>
                    <form id="postForm">
                        <div class="form-group">
                            <label for="post-title">Post Title</label>
                            <input 
                                type="text" 
                                id="post-title" 
                                name="title" 
                                placeholder="Enter a title for your post"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <label for="post-content">Post Content</label>
                            <textarea 
                                id="post-content" 
                                name="content" 
                                placeholder="Write your post content here..."
                                required
                            ></textarea>
                        </div>
                        <div class="form-group">
                            <label>Categories</label>
                            <div class="categories-container">
                                <div class="categories-grid">
                                    ${categories.map(cat => `
                                        <div class="category-option">
                                            <input type="checkbox" id="category-${cat}" name="categories" value="${cat}">
                                            <label for="category-${cat}">${cat}</label>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="submit-button">Publish Post</button>
                    </form>
                </div>`;

    // Get the actual form element from within the container
    const form = container.querySelector('#postForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Extract form values
        const title = form.querySelector('#post-title').value.trim();
        const content = form.querySelector('#post-content').value.trim();

        // Extract selected categories
        const selectedCategories = Array.from(
            form.querySelectorAll('input[name="categories"]:checked')
        ).map(input => input.value);

        // Prepare JSON body
        const postData = {
            title,
            content,
            categories: selectedCategories
        };

        try {
            const response = await fetch('/addpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Post created successfully:', result);
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    });

    return container.firstElementChild;
}
let userBubble = (uData, personalChat) => {
    let uBuble = document.createElement('div')
    uBuble.id = uData.name
    uBuble.dataset.time = uData.time
    uBuble.classList.add("user")
    if (uData.active) { uBuble.classList.add(on) }
    uBuble.textContent = uData.name
    uBuble.onClick(() => {
        personalChat.id = uData.name
        personalChat.classList.add("shown")
    })
    return uBuble
}
let persoChat = (ws) => {
    let pChat = document.createElement('div')
    pChat.classList.add('chatholder','show')

    let chat = document.createElement('div')
chat.classList.add('messages')
let mesg1 =document.createElement('div')
mesg1.classList.add('sent')
mesg1.innerHTML = `<div class="author">
<div class="avatar">y</div>
    <div class="name">you</div>
    
    <div class="time">1s ago</div
</div>
<div class="content">hiiiii</div>`
let mesg2 =document.createElement('div')
mesg2.classList.add('recieved')
mesg2.innerHTML = `<div class="author">
<div class="avatar">my</div>
    <div class="name">not you</div>
    
    <div class="time">1s ago</div>
</div>
<div class="content">hiiiii</div>`
chat.append(mesg1,mesg2)
    // Create input field
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    input.classList.add('chat-input');
    let cancel = document.createElement('button');
    cancel.textContent = 'Close';
    cancel.classList.add('cancel');
    pChat.append(cancel, chat, input);
    cancel.onclick = () => {
        pChat.classList.remove('shown');
        chat.innerHTML = "";
        input.value = "";
    };
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== "") {
            let msg = document.createElement('msg');
            msg.classList.add('messageSent');
            let data = input.value.trim()
            msg.textContent = data;
            chat.appendChild(msg);
            chat.scrollTop = chat.scrollHeight;
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: "message",
                    reciever: pChat.id,
                    content: data
                }));
            }
            input.value = "";
        } else if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: "signal",
                reciever: pChat.id,
                content: "typing"
            }));
        }
    });
    return pChat
}
let header = () => {
    let header = document.createElement('header')
    let logout = document.createElement('button')
    logout.innerText = "logout"
    logout.addEventListener('click', () => {
        window.dispatchEvent(new Event('logout'))
        fetch('/logout',{method:"POST"}).then(() => {
            initauth()
        }).catch(err => {
            throw err
        })
    })
    let spe = document.createElement('div')
    spe.innerText = "fake-time forum"
    header.appendChild(spe)
    header.appendChild(logout)
    return header
}
