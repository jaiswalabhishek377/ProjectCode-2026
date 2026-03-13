PC58 — Fetch API: POST, PUT, DELETE Requests
Now you'll learn to CREATE, UPDATE, and DELETE data! This completes the CRUD (Create, Read, Update, Delete) operations. After this, you can build full-stack applications! 💪

1. The Fetch Options Object
GET vs POST/PUT/DELETE
javascript// GET (default) - just URL
fetch('https://api.example.com/users')

// POST/PUT/DELETE - need options object
fetch('https://api.example.com/users', {
  method: 'POST',           // HTTP method
  headers: {                // Request headers
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({    // Request body (data to send)
    name: 'Alex',
    email: 'alex@example.com'
  })
})
Options Object Structure
javascriptconst options = {
  method: 'POST',           // GET, POST, PUT, PATCH, DELETE
  headers: {                // Headers object
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({}), // Request body (for POST/PUT/PATCH)
  mode: 'cors',             // cors, no-cors, same-origin
  credentials: 'include',   // include, same-origin, omit
  cache: 'no-cache'         // default, no-cache, reload, force-cache
};

fetch(url, options);

2. POST Requests — Creating Data
Basic POST Request
javascriptasync function createUser() {
  const newUser = {
    name: 'Alex Smith',
    email: 'alex@example.com',
    age: 25
  };
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const createdUser = await response.json();
    console.log('Created user:', createdUser);
    // Returns: { name: 'Alex Smith', email: 'alex@example.com', age: 25, id: 11 }
    
    return createdUser;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

createUser();
Why JSON.stringify?
javascript// ❌ WRONG: Sending JavaScript object
body: { name: 'Alex', email: 'alex@example.com' }

// ✅ CORRECT: Sending JSON string
body: JSON.stringify({ name: 'Alex', email: 'alex@example.com' })

// JavaScript object → JSON string
const obj = { name: 'Alex' };
const json = JSON.stringify(obj);
console.log(json); // '{"name":"Alex"}' (string!)
Content-Type Header
javascript// Tells server: "I'm sending JSON data"
headers: {
  'Content-Type': 'application/json'
}

// Without this header, server might not parse the body correctly!

3. POST Real-World Examples
Example 1: Create a Post
javascriptasync function createPost(title, body, userId) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const newPost = await response.json();
    console.log('Created post:', newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Usage
createPost('My First Post', 'This is the content of my post', 1);
Example 2: Form Submission
html<form id="user-form">
  <input type="text" id="name" placeholder="Name" required>
  <input type="email" id="email" placeholder="Email" required>
  <button type="submit">Create User</button>
</form>
<div id="result"></div>
javascriptdocument.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const resultDiv = document.getElementById('result');
  
  try {
    resultDiv.textContent = 'Creating user...';
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const user = await response.json();
    resultDiv.innerHTML = `
      <p style="color: green;">User created successfully!</p>
      <p>ID: ${user.id}</p>
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email}</p>
    `;
    
    // Clear form
    document.getElementById('user-form').reset();
    
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});

4. PUT Requests — Updating Data (Replace)
PUT replaces the ENTIRE resource
javascriptasync function updateUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        name: 'Updated Name',
        email: 'updated@example.com',
        username: 'updateduser'
        // ⚠️ PUT requires ALL fields!
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const updatedUser = await response.json();
    console.log('Updated user:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
}

updateUser(1);

5. PATCH Requests — Partial Updates
PATCH updates only specified fields
javascriptasync function patchUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'newemail@example.com'
        // ✅ PATCH only updates this field, keeps others unchanged
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const updatedUser = await response.json();
    console.log('Patched user:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Failed to patch user:', error);
    throw error;
  }
}

patchUser(1);
PUT vs PATCH
javascript// PUT - Replace entire resource
await fetch('/api/users/1', {
  method: 'PUT',
  body: JSON.stringify({
    name: 'Alex',
    email: 'alex@example.com',
    age: 25,
    phone: '123-456-7890'
    // Must send ALL fields
  })
})

// PATCH - Update specific fields
await fetch('/api/users/1', {
  method: 'PATCH',
  body: JSON.stringify({
    email: 'newemail@example.com'
    // Only send fields to update
  })
})

6. DELETE Requests — Deleting Data
Basic DELETE Request
javascriptasync function deleteUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // DELETE often returns empty response or { success: true }
    console.log('User deleted successfully');
    
    // Some APIs return the deleted resource
    if (response.status !== 204) { // 204 = No Content
      const deletedUser = await response.json();
      console.log('Deleted user:', deletedUser);
    }
    
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
}

deleteUser(1);
DELETE with Confirmation
javascriptasync function deletePostWithConfirmation(postId) {
  if (!confirm('Are you sure you want to delete this post?')) {
    return;
  }
  
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    alert('Post deleted successfully!');
    
    // Remove from DOM
    document.getElementById(`post-${postId}`)?.remove();
    
  } catch (error) {
    alert('Failed to delete post: ' + error.message);
  }
}

7. Complete CRUD Example
html<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 20px; }
    .post { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
    button { padding: 8px 15px; margin: 5px; cursor: pointer; }
    .delete-btn { background: #ff4444; color: white; border: none; }
    .edit-btn { background: #4444ff; color: white; border: none; }
    input, textarea { display: block; width: 100%; margin: 10px 0; padding: 8px; }
  </style>
</head>
<body>
  <h1>Posts Manager (CRUD)</h1>
  
  <!-- Create Form -->
  <div>
    <h2>Create New Post</h2>
    <input type="text" id="title" placeholder="Title">
    <textarea id="body" placeholder="Body" rows="3"></textarea>
    <button id="create-btn">Create Post</button>
  </div>
  
  <!-- Posts List -->
  <div id="posts"></div>
  
  <script>
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    
    // CREATE
    document.getElementById('create-btn').addEventListener('click', async () => {
      const title = document.getElementById('title').value;
      const body = document.getElementById('body').value;
      
      if (!title || !body) {
        alert('Please fill in all fields');
        return;
      }
      
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body, userId: 1 })
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const newPost = await response.json();
        displayPost(newPost);
        
        // Clear form
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
        
        alert('Post created!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
    
    // READ (Load initial posts)
    async function loadPosts() {
      try {
        const response = await fetch(`${API_URL}?_limit=5`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const posts = await response.json();
        posts.forEach(displayPost);
      } catch (error) {
        alert('Error loading posts: ' + error.message);
      }
    }
    
    // UPDATE
    async function updatePost(postId) {
      const newTitle = prompt('Enter new title:');
      if (!newTitle) return;
      
      try {
        const response = await fetch(`${API_URL}/${postId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle })
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const updatedPost = await response.json();
        document.querySelector(`#post-${postId} h3`).textContent = updatedPost.title;
        alert('Post updated!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
    
    // DELETE
    async function deletePost(postId) {
      if (!confirm('Delete this post?')) return;
      
      try {
        const response = await fetch(`${API_URL}/${postId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        document.getElementById(`post-${postId}`).remove();
        alert('Post deleted!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
    
    // Display post in DOM
    function displayPost(post) {
      const postsDiv = document.getElementById('posts');
      const postDiv = document.createElement('div');
      postDiv.id = `post-${post.id}`;
      postDiv.className = 'post';
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="edit-btn" onclick="updatePost(${post.id})">Edit</button>
        <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
      `;
      postsDiv.prepend(postDiv);
    }
    
    // Load posts on page load
    loadPosts();
  </script>
</body>
</html>

8. Common Headers
Content-Type
javascript// JSON data
headers: {
  'Content-Type': 'application/json'
}

// Form data
headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
}

// Multipart (file uploads)
headers: {
  'Content-Type': 'multipart/form-data'
}
Authorization
javascript// Bearer token
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}

// API Key
headers: {
  'X-API-Key': 'your-api-key-here'
}

// Basic Auth
headers: {
  'Authorization': 'Basic ' + btoa('username:password')
}
Custom Headers
javascriptheaders: {
  'Content-Type': 'application/json',
  'X-Custom-Header': 'custom-value',
  'X-Request-ID': generateUUID()
}

9. FormData for File Uploads
Sending Files
html<input type="file" id="file-input">
<button id="upload-btn">Upload</button>
javascriptdocument.getElementById('upload-btn').addEventListener('click', async () => {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a file');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', 1);
  
  try {
    const response = await fetch('https://example.com/api/upload', {
      method: 'POST',
      // ⚠️ Don't set Content-Type header for FormData!
      // Browser sets it automatically with boundary
      body: formData
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const result = await response.json();
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
});
FormData with Multiple Fields
javascriptconst formData = new FormData();
formData.append('name', 'Alex');
formData.append('email', 'alex@example.com');
formData.append('avatar', fileInput.files[0]);
formData.append('resume', resumeInput.files[0]);

await fetch('/api/submit', {
  method: 'POST',
  body: formData
});

10. Error Handling Best Practices
Complete Error Handling
javascriptasync function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    // Check HTTP status
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response isn't JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
    
  } catch (error) {
    // Network error or parsing error
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error - check your connection');
    }
    throw error;
  }
}

// Usage
try {
  const data = await apiRequest('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alex' })
  });
  console.log('Success:', data);
} catch (error) {
  console.error('Error:', error.message);
}