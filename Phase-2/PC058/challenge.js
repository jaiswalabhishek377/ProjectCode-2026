// ==========================================
// Mock Database Setup (Runs on load)
// ==========================================
function initDB() {
  if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify([
      { id: 1, title: 'My First Post', body: 'Learning local storage!', userId: 1 },
      { id: 2, title: 'Road to Fullstack', body: 'Grinding code every day.', userId: 1 }
    ]));
  }
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify([
      { id: 1, title: 'Master JavaScript', completed: true },
      { id: 2, title: 'Build a real backend', completed: false }
    ]));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
}
initDB();

// Helper to get/set data
const getDB = (key) => JSON.parse(localStorage.getItem(key));
const setDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Simulate network delay (feels like a real API)
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));


// ==========================================
// Challenge 1 — Create Post
// ==========================================
async function createPost() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const resultDiv = document.getElementById('create-result');

  if (!title || !body) return resultDiv.innerHTML = '<span class="error">Fill in all fields.</span>';

  resultDiv.innerHTML = '<span>Saving to database...</span>';
  await delay(); // Simulate network

  try {
    const posts = getDB('posts');
    const newPost = { 
      id: Date.now(), // Generate a real, unique ID
      title, 
      body, 
      userId: 1 
    };
    
    posts.push(newPost);
    setDB('posts', posts);

    resultDiv.innerHTML = `
      <div class="item success">
        <strong>Created Post (ID: ${newPost.id})</strong><br>
        <strong>Title:</strong> ${newPost.title}<br>
        <strong>Body:</strong> ${newPost.body}
      </div>`;
    
    document.getElementById('post-title').value = '';
    document.getElementById('post-body').value = '';
  } catch (error) {
    resultDiv.innerHTML = `<span class="error">Error saving post.</span>`;
  }
}
document.getElementById('create-post-btn').addEventListener('click', createPost);


// ==========================================
// Challenge 2 — Update Post (PATCH)
// ==========================================
async function updatePost() {
  const id = parseInt(document.getElementById('update-post-id').value);
  const title = document.getElementById('new-title').value;
  const resultDiv = document.getElementById('update-result');

  if (!id || !title) return resultDiv.innerHTML = '<span class="error">Provide ID and title.</span>';
  resultDiv.innerHTML = '<span>Updating...</span>';
  await delay();

  const posts = getDB('posts');
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return resultDiv.innerHTML = `<span class="error">Post ${id} not found in database.</span>`;
  }

  posts[postIndex].title = title;
  setDB('posts', posts);

  resultDiv.innerHTML = `
    <div class="item success">
      <strong>Updated Post ${id}</strong><br>
      <strong>New Title:</strong> ${title}
    </div>`;
}
document.getElementById('update-btn').addEventListener('click', updatePost);


// ==========================================
// Challenge 3 — Delete Post
// ==========================================
async function deletePost() {
  const id = parseInt(document.getElementById('delete-post-id').value);
  const resultDiv = document.getElementById('delete-result');

  if (!id) return resultDiv.innerHTML = '<span class="error">Provide a Post ID.</span>';
  if (!confirm(`Delete post ${id}?`)) return;
  
  resultDiv.innerHTML = '<span>Deleting...</span>';
  await delay();

  let posts = getDB('posts');
  const initialLength = posts.length;
  posts = posts.filter(p => p.id !== id);

  if (posts.length === initialLength) {
    return resultDiv.innerHTML = `<span class="error">Post ${id} not found.</span>`;
  }

  setDB('posts', posts);
  resultDiv.innerHTML = `<span class="success">Post ${id} deleted successfully!</span>`;
  document.getElementById('delete-post-id').value = '';
}
document.getElementById('delete-btn').addEventListener('click', deletePost);


// ==========================================
// Challenge 4 — Todo List (Full CRUD)
// ==========================================
const todosContainer = document.getElementById('todos');

async function loadTodos() {
  await delay(300); // Simulate load
  displayTodos();
}

async function addTodo() {
  const titleInput = document.getElementById('todo-input');
  const title = titleInput.value;
  if (!title) return;

  const todos = getDB('todos');
  todos.unshift({ id: Date.now(), title, completed: false });
  setDB('todos', todos);
  
  titleInput.value = '';
  displayTodos();
}

async function toggleTodo(todoId) {
  const todos = getDB('todos');
  const todo = todos.find(t => t.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    setDB('todos', todos);
    displayTodos();
  }
}

async function deleteTodo(todoId) {
  let todos = getDB('todos');
  todos = todos.filter(t => t.id !== todoId);
  setDB('todos', todos);
  displayTodos();
}

function displayTodos() {
  const todos = getDB('todos');
  todosContainer.innerHTML = todos.map(todo => `
    <div class="item" style="display: flex; justify-content: space-between; align-items: center;">
      <label style="cursor: pointer;">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
        <span style="${todo.completed ? 'text-decoration: line-through; color: gray;' : ''}">${todo.title}</span>
      </label>
      <button onclick="deleteTodo(${todo.id})" style="background: #ff4c4c; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer;">Delete</button>
    </div>
  `).join('');
}

document.getElementById('add-todo-btn').addEventListener('click', addTodo);
loadTodos();


// ==========================================
// Challenge 5 — Create User with Validation
// ==========================================
async function createUser() {
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const resultDiv = document.getElementById('create-user-result');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 3) return resultDiv.innerHTML = '<span class="error">Name must be at least 3 characters.</span>';
  if (!emailRegex.test(email)) return resultDiv.innerHTML = '<span class="error">Please enter a valid email address.</span>';

  resultDiv.innerHTML = '<span>Creating user...</span>';
  await delay();

  const users = getDB('users');
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  setDB('users', users);

  resultDiv.innerHTML = `<span class="success">User successfully created! (ID: ${newUser.id})</span>`;
  document.getElementById('user-name').value = '';
  document.getElementById('user-email').value = '';
}
document.getElementById('create-user-btn').addEventListener('click', createUser);


// ==========================================
// Challenge 6 — Batch Delete
// ==========================================
async function batchDelete() {
  const inputStr = document.getElementById('batch-ids').value;
  const resultDiv = document.getElementById('batch-result');
  
  if (!inputStr) return resultDiv.innerHTML = '<span class="error">Please provide comma-separated IDs.</span>';

  const idsToDelete = inputStr.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
  resultDiv.innerHTML = '<span>Processing batch delete...</span>';
  await delay(800);

  let posts = getDB('posts');
  const results = { deleted: [], failed: [] };

  idsToDelete.forEach(id => {
    const exists = posts.some(p => p.id === id);
    if (exists) {
      posts = posts.filter(p => p.id !== id);
      results.deleted.push(id);
    } else {
      results.failed.push(id);
    }
  });

  setDB('posts', posts);

  resultDiv.innerHTML = `
    <div class="success">Successfully deleted IDs: ${results.deleted.join(', ') || 'None'}</div>
    <div class="error" style="margin-top: 5px;">Failed IDs: ${results.failed.join(', ') || 'None'}</div>
  `;
}
document.getElementById('batch-delete-btn').addEventListener('click', batchDelete);


// ==========================================
// Challenge 7 — Optimistic Update
// ==========================================
let demoPostId = null;

async function setupOptimisticDemo() {
  const id = parseInt(document.getElementById('optimistic-post-id').value) || 1;
  const demoDiv = document.getElementById('optimistic-demo');
  demoDiv.innerHTML = 'Fetching post...';
  await delay();

  const posts = getDB('posts');
  const post = posts.find(p => p.id === id);

  if (!post) {
    return demoDiv.innerHTML = '<span class="error">Post not found in local database. Try ID 1 or create a new one above.</span>';
  }

  demoPostId = post.id;
  renderOptimisticPost(post.title);
  document.getElementById('optimistic-result').innerHTML = ''; 
}

function renderOptimisticPost(title) {
  document.getElementById('optimistic-demo').innerHTML = `
    <div class="item">
      <strong>Post ${demoPostId}</strong><br>
      <span style="font-size: 1.1em;">${title}</span>
    </div>
  `;
}

async function optimisticUpdate() {
  if (!demoPostId) return alert('Please setup the demo post first!');
  
  const newTitle = document.getElementById('optimistic-title').value;
  const resultDiv = document.getElementById('optimistic-result');
  if (!newTitle) return resultDiv.innerHTML = '<span class="error">Enter a new title.</span>';

  const posts = getDB('posts');
  const originalPost = posts.find(p => p.id === demoPostId);
  const originalTitle = originalPost.title;

  // 1. Optimistic UI update (Instant)
  renderOptimisticPost(newTitle);
  resultDiv.innerHTML = '<span style="color: #666;">Syncing with database...</span>';

  // 2. Simulated Background Request
  await delay(1000); 

  // Let's create a fake 20% chance the "server" fails just so you can see the rollback work!
  const serverFails = Math.random() < 0.2; 

  if (serverFails) {
    // 3. Rollback on failure
    renderOptimisticPost(originalTitle);
    resultDiv.innerHTML = '<span class="error">Network error simulating. Reverted to original state.</span>';
  } else {
    // 4. Success
    originalPost.title = newTitle;
    setDB('posts', posts);
    resultDiv.innerHTML = '<span class="success">Successfully saved!</span>';
    document.getElementById('optimistic-title').value = '';
  }
}

document.getElementById('setup-optimistic-btn').addEventListener('click', setupOptimisticDemo);
document.getElementById('optimistic-update-btn').addEventListener('click', optimisticUpdate);