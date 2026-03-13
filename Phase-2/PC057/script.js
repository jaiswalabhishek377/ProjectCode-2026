Let's MASTER PC57 — Fetch API: GET Requests! 🔥🔥
This is where everything comes together! You'll make REAL HTTP requests to REAL APIs and display the data! This is what you'll do every single day in real web development! 💪

1. What is the Fetch API?
Fetch is the modern way to make HTTP requests in JavaScript.
Old Way (XMLHttpRequest) - DON'T USE
javascript// ❌ Old, verbose, callback-based
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users');
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();
New Way (Fetch API) - USE THIS!
javascript// ✅ Modern, clean, Promise-based
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// ✅ Even better with async/await
async function getUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

2. Basic Fetch - GET Request
Simplest Form
javascriptfetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data));
With Async/Await (Recommended)
javascriptasync function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);
}

fetchUsers();
Understanding the Response Object
javascriptasync function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  
  console.log(response.status);      // 200
  console.log(response.statusText);  // "OK"
  console.log(response.ok);          // true (status 200-299)
  console.log(response.headers);     // Headers object
  console.log(response.url);         // Full URL
  
  const data = await response.json(); // Parse JSON
  console.log(data);
}

3. Response Methods
response.json() - Parse JSON
javascriptconst response = await fetch('https://jsonplaceholder.typicode.com/users/1');
const user = await response.json();
console.log(user.name); // "Leanne Graham"
response.text() - Get Raw Text
javascriptconst response = await fetch('https://example.com');
const html = await response.text();
console.log(html); // HTML string
response.blob() - Get Binary Data (Images, Files)
javascriptconst response = await fetch('https://picsum.photos/200');
const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);

const img = document.createElement('img');
img.src = imageUrl;
document.body.appendChild(img);

4. Error Handling - CRITICAL!
⚠️ Important: Fetch Does NOT Reject on HTTP Errors!
javascript// ❌ WRONG: This will NOT catch 404 errors!
async function fetchUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/999999');
    const user = await response.json(); // This runs even on 404!
    console.log(user);
  } catch (error) {
    console.log('This will NOT run on 404!');
  }
}
Fetch only rejects on:

Network failure
DNS lookup failure
Server not responding

Fetch does NOT reject on:

404 Not Found
500 Server Error
403 Forbidden

✅ CORRECT Error Handling
javascriptasync function fetchUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    
    // ✅ Check if response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Fetch failed:', error.message);
    throw error;
  }
}

// Test with invalid ID
fetchUser(999999); // Will throw "HTTP error! Status: 404"
Complete Error Handling Pattern
javascriptasync function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      console.error('Network error - check your connection');
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}

5. Real APIs to Practice With (Free, No Auth Required!)
JSONPlaceholder - Fake REST API
javascript// Users
fetch('https://jsonplaceholder.typicode.com/users')

// Posts
fetch('https://jsonplaceholder.typicode.com/posts')

// Comments
fetch('https://jsonplaceholder.typicode.com/comments')

// Single user
fetch('https://jsonplaceholder.typicode.com/users/1')
Random User API - Generate Random Users
javascript// Get 10 random users
fetch('https://randomuser.me/api/?results=10')
Rick and Morty API
javascript// Get all characters
fetch('https://rickandmortyapi.com/api/character')

// Get single character
fetch('https://rickandmortyapi.com/api/character/1')
Pokémon API
javascript// Get Pokémon
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
Public APIs (No Auth)
javascript// Random dog image
fetch('https://dog.ceo/api/breeds/image/random')

// Random cat fact
fetch('https://catfact.ninja/fact')

// GitHub user info
fetch('https://api.github.com/users/torvalds')

6. Displaying Data in the DOM
Example 1: User List
html<div id="users"></div>
javascriptasync function displayUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const users = await response.json();
    const usersDiv = document.getElementById('users');
    
    // Clear existing content
    usersDiv.innerHTML = '';
    
    // Create HTML for each user
    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Website: ${user.website}</p>
      `;
      usersDiv.appendChild(userCard);
    });
    
  } catch (error) {
    console.error('Failed to load users:', error);
    document.getElementById('users').innerHTML = 
      `<p class="error">Failed to load users: ${error.message}</p>`;
  }
}

displayUsers();
Example 2: Posts with Loading State
html<button id="load-posts">Load Posts</button>
<div id="posts"></div>
javascriptasync function loadPosts() {
  const postsDiv = document.getElementById('posts');
  const button = document.getElementById('load-posts');
  
  try {
    // Show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    postsDiv.innerHTML = '<p>Loading posts...</p>';
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const posts = await response.json();
    
    // Display posts
    postsDiv.innerHTML = posts.slice(0, 10).map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `).join('');
    
  } catch (error) {
    postsDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  } finally {
    button.disabled = false;
    button.textContent = 'Load Posts';
  }
}

document.getElementById('load-posts').addEventListener('click', loadPosts);

7. Query Parameters
Building URLs with Query Params
javascript// Method 1: String concatenation
const userId = 1;
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

// Method 2: URLSearchParams (recommended for multiple params)
const params = new URLSearchParams({
  userId: 1,
  _limit: 5
});
fetch(`https://jsonplaceholder.typicode.com/posts?${params}`)
// URL: https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5
Example: Search with Query Params
javascriptasync function searchUsers(searchTerm) {
  const params = new URLSearchParams({
    q: searchTerm
  });
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?${params}`);
  const users = await response.json();
  return users;
}

8. Pagination
javascriptasync function fetchPosts(page = 1, limit = 10) {
  const params = new URLSearchParams({
    _page: page,
    _limit: limit
  });
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${params}`);
  const posts = await response.json();
  return posts;
}

// Usage
const page1 = await fetchPosts(1, 10); // First 10 posts
const page2 = await fetchPosts(2, 10); // Next 10 posts

9. Real-World Complete Example
html<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .user-card {
      border: 1px solid #ddd;
      padding: 20px;
      margin: 10px 0;
      border-radius: 8px;
    }
    .loading {
      text-align: center;
      color: #666;
    }
    .error {
      color: red;
      padding: 20px;
      background: #fee;
      border-radius: 8px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <h1>User Directory</h1>
  <button id="load-btn">Load Users</button>
  <div id="users"></div>
  
  <script>
    async function loadUsers() {
      const usersDiv = document.getElementById('users');
      const loadBtn = document.getElementById('load-btn');
      
      try {
        // Loading state
        loadBtn.disabled = true;
        loadBtn.textContent = 'Loading...';
        usersDiv.innerHTML = '<p class="loading">Loading users...</p>';
        
        // Fetch data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const users = await response.json();
        
        // Display users
        usersDiv.innerHTML = '';
        users.forEach(user => {
          const card = document.createElement('div');
          card.className = 'user-card';
          card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
          `;
          usersDiv.appendChild(card);
        });
        
      } catch (error) {
        usersDiv.innerHTML = `
          <div class="error">
            <h3>Failed to load users</h3>
            <p>${error.message}</p>
          </div>
        `;
      } finally {
        loadBtn.disabled = false;
        loadBtn.textContent = 'Load Users';
      }
    }
    
    document.getElementById('load-btn').addEventListener('click', loadUsers);
  </script>
</body>
</html>