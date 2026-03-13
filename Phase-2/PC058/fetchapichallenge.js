const API_URL = 'https://jsonplaceholder.typicode.com';

// ==========================================
// Challenge 1 — Create Post
// ==========================================
async function createPost() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const resultDiv = document.getElementById('create-result');

  if (!title || !body) {
    resultDiv.innerHTML = '<span class="error">Please fill in both the title and body.</span>';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body, userId: 1 }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (!response.ok) throw new Error('Failed to create post');
    
    const data = await response.json();
    
    // Assign a temporary unique ID so it doesn't default to 101 every time
    data.id = Date.now(); 

    resultDiv.innerHTML = `
      <div class="item success">
        <strong>Created Post (Temp ID: ${data.id})</strong><br>
        <strong>Title:</strong> ${data.title}<br>
        <strong>Body:</strong> ${data.body}
      </div>`;
    
    document.getElementById('post-title').value = '';
    document.getElementById('post-body').value = '';
  } catch (error) {
    resultDiv.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

document.getElementById('create-post-btn').addEventListener('click', createPost);

// ==========================================
// Challenge 2 — Update Post (PATCH)
// ==========================================
async function updatePost() {
  const id = document.getElementById('update-post-id').value;
  const title = document.getElementById('new-title').value;
  const resultDiv = document.getElementById('update-result');

  if (!id || !title) {
    resultDiv.innerHTML = '<span class="error">Please provide both an ID and a new title.</span>';
    return;
  }

  try {
    // If it's a real JSONPlaceholder ID (1-100), send the network request
    if (id <= 100) {
        const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ title }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        if (!response.ok) throw new Error('Post not found on server');
    }

    resultDiv.innerHTML = `
      <div class="item success">
        <strong>Updated Post ${id}</strong><br>
        <strong>New Title:</strong> ${title}
      </div>`;
  } catch (error) {
    resultDiv.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

document.getElementById('update-btn').addEventListener('click', updatePost);

// ==========================================
// Challenge 3 — Delete Post
// ==========================================
async function deletePost() {
  const id = document.getElementById('delete-post-id').value;
  const resultDiv = document.getElementById('delete-result');

  if (!id) {
    resultDiv.innerHTML = '<span class="error">Please provide a Post ID.</span>';
    return;
  }

  if (!confirm(`Are you sure you want to delete post ${id}?`)) return;

  try {
    if (id <= 100) {
        const response = await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete post on server');
    }
    
    resultDiv.innerHTML = `<span class="success">Post ${id} deleted successfully!</span>`;
    document.getElementById('delete-post-id').value = '';
  } catch (error) {
    resultDiv.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

document.getElementById('delete-btn').addEventListener('click', deletePost);

// ==========================================
// Challenge 4 — Todo List (Full CRUD)
// ==========================================
let todos = [];
const todosContainer = document.getElementById('todos');

async function loadTodos() {
  try {
    const response = await fetch(`${API_URL}/todos?_limit=5`);
    todos = await response.json();
    displayTodos();
  } catch (error) {
    todosContainer.innerHTML = '<span class="error">Failed to load initial todos.</span>';
  }
}

async function addTodo() {
  const titleInput = document.getElementById('todo-input');
  const title = titleInput.value;
  if (!title) return;

  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify({ title, completed: false, userId: 1 }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    
    const newTodo = await response.json();
    newTodo.id = Date.now(); // Temp ID for UI logic
    
    todos.unshift(newTodo);
    displayTodos();
    titleInput.value = '';
  } catch (error) {
    alert('Failed to add todo');
  }
}

async function toggleTodo(todoId) {
  const todo = todos.find(t => t.id === todoId);
  if (!todo) return;

  const previousStatus = todo.completed;
  todo.completed = !todo.completed;
  displayTodos();

  try {
    if (todoId <= 200) { // JSONPlaceholder only has 200 real todos
        const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: todo.completed }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        if (!response.ok) throw new Error('Failed to sync');
    }
  } catch (error) {
    todo.completed = previousStatus;
    displayTodos();
    alert('Failed to update status on server');
  }
}

async function deleteTodo(todoId) {
  try {
    if (todoId <= 200) {
        const response = await fetch(`${API_URL}/todos/${todoId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error();
    }
    
    todos = todos.filter(t => t.id !== todoId);
    displayTodos();
  } catch (error) {
    alert('Failed to delete todo');
  }
}

function displayTodos() {
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
loadTodos(); // Initialize

// ==========================================
// Challenge 5 — Create User with Validation
// ==========================================
async function createUser() {
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const resultDiv = document.getElementById('create-user-result');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 3) {
    return resultDiv.innerHTML = '<span class="error">Name must be at least 3 characters.</span>';
  }
  if (!emailRegex.test(email)) {
    return resultDiv.innerHTML = '<span class="error">Please enter a valid email address.</span>';
  }

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    data.id = Date.now(); // Temp ID for UI

    resultDiv.innerHTML = `<span class="success">User successfully created! (Temp ID: ${data.id})</span>`;
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
  } catch (error) {
    resultDiv.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
}

document.getElementById('create-user-btn').addEventListener('click', createUser);

// ==========================================
// Challenge 6 — Batch Delete
// ==========================================
async function batchDelete() {
  const inputStr = document.getElementById('batch-ids').value;
  const resultDiv = document.getElementById('batch-result');
  
  if (!inputStr) {
    return resultDiv.innerHTML = '<span class="error">Please provide comma-separated IDs.</span>';
  }

  const ids = inputStr.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
  resultDiv.innerHTML = '<span>Processing deletions...</span>';

  const results = { deleted: [], failed: [] };

  const deletePromises = ids.map(async (id) => {
    try {
      if (id <= 100) { // Only fetch delete if it's a real JSONPlaceholder ID
          const response = await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
          if (response.ok) {
            results.deleted.push(id);
          } else {
            results.failed.push(id);
          }
      } else {
          // Assume fake UI items delete successfully
          results.deleted.push(id); 
      }
    } catch (error) {
      results.failed.push(id);
    }
  });

  await Promise.all(deletePromises);

  resultDiv.innerHTML = `
    <div class="success">Successfully deleted IDs: ${results.deleted.join(', ') || 'None'}</div>
    <div class="error" style="margin-top: 5px;">Failed IDs: ${results.failed.join(', ') || 'None'}</div>
  `;
}

document.getElementById('batch-delete-btn').addEventListener('click', batchDelete);

// ==========================================
// Challenge 7 — Optimistic Update
// ==========================================
let currentOptimisticPost = null;

async function setupOptimisticDemo() {
  const id = document.getElementById('optimistic-post-id').value || 1;
  const demoDiv = document.getElementById('optimistic-demo');
  demoDiv.innerHTML = 'Fetching post...';

  try {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    
    currentOptimisticPost = await response.json();
    renderOptimisticPost();
    document.getElementById('optimistic-result').innerHTML = ''; 
  } catch (error) {
    demoDiv.innerHTML = '<span class="error">Failed to load demo post. Please use an ID from 1 to 100.</span>';
  }
}

function renderOptimisticPost() {
  if (!currentOptimisticPost) return;
  document.getElementById('optimistic-demo').innerHTML = `
    <div class="item">
      <strong>Post ${currentOptimisticPost.id}</strong><br>
      <span style="font-size: 1.1em;">${currentOptimisticPost.title}</span>
    </div>
  `;
}

async function optimisticUpdate() {
  if (!currentOptimisticPost) return alert('Please setup the demo post first!');
  
  const newTitle = document.getElementById('optimistic-title').value;
  const resultDiv = document.getElementById('optimistic-result');
  
  if (!newTitle) return resultDiv.innerHTML = '<span class="error">Enter a new title.</span>';

  const originalTitle = currentOptimisticPost.title;

  // 1. Optimistic UI update (Instant)
  currentOptimisticPost.title = newTitle;
  renderOptimisticPost();
  resultDiv.innerHTML = '<span style="color: #666;">Syncing with server...</span>';

  // 2. Background Network Request
  try {
    const response = await fetch(`${API_URL}/posts/${currentOptimisticPost.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: newTitle }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (!response.ok) throw new Error('Server rejected update');
    
    resultDiv.innerHTML = '<span class="success">Successfully synced with JSONPlaceholder!</span>';
    document.getElementById('optimistic-title').value = '';
  } catch (error) {
    // 3. Rollback on failure
    currentOptimisticPost.title = originalTitle;
    renderOptimisticPost();
    resultDiv.innerHTML = '<span class="error">Network error. Reverted to original state.</span>';
  }
}

document.getElementById('setup-optimistic-btn').addEventListener('click', setupOptimisticDemo);
document.getElementById('optimistic-update-btn').addEventListener('click', optimisticUpdate);