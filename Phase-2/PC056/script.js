PC56 — Async/Await: Modern Async JavaScript
This is THE WAY to write async code in modern JavaScript! Async/await makes asynchronous code look synchronous and clean. Once you learn this, you'll never want to go back to Promise chains! 💪

1. The Evolution of Async JavaScript
Level 1: Callbacks (Hell) 
javascriptfetchUser(1, (error, user) => {
  if (error) return console.error(error);
  fetchPosts(user.id, (error, posts) => {
    if (error) return console.error(error);
    fetchComments(posts[0].id, (error, comments) => {
      if (error) return console.error(error);
      console.log(comments); // Finally!
    });
  });
});

Level 2: Promises (Better) 
javascriptfetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error));

Level 3: Async/Await (Best!) 
javascriptasync function loadData() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}
Look how clean! It reads like synchronous code! 

2. The async Keyword
Basic Rules
Rule 1: async makes a function return a Promise
javascriptasync function hello() {
  return 'Hello!';
}

console.log(hello()); // Promise { 'Hello!' }

hello().then(result => console.log(result)); // "Hello!"
It's the same as:
javascriptfunction hello() {
  return Promise.resolve('Hello!');
}
Always Returns a Promise
javascript// Return a value → Promise resolves with that value
async function getValue() {
  return 42;
}

getValue().then(value => console.log(value)); // 42

// Throw an error → Promise rejects
async function getError() {
  throw new Error('Oops!');
}

getError().catch(error => console.log(error.message)); // "Oops!"

// Return a Promise → Returns that Promise
async function getPromise() {
  return Promise.resolve('From promise');
}

getPromise().then(result => console.log(result)); // "From promise"

3. The await Keyword
Basic Rules
Rule 1: await only works inside async functions
javascript// ❌ ERROR: Cannot use await outside async function
const data = await fetch('/api/data');

// ✅ CORRECT
async function getData() {
  const data = await fetch('/api/data');
  return data;
}
Rule 2: await pauses execution until Promise resolves
javascriptasync function example() {
  console.log('Start');
  
  const result = await delay(2000); // ⏸️ Waits here for 2 seconds
  
  console.log('End'); // Only runs after 2 seconds
}

// Output:
// "Start"
// [2 seconds pause]
// "End"
Rule 3: await unwraps the Promise value
javascript// Without await (returns Promise)
async function withoutAwait() {
  const promise = fetch('/api/user');
  console.log(promise); // Promise { <pending> }
}

// With await (returns actual value)
async function withAwait() {
  const response = await fetch('/api/user');
  console.log(response); // Response object (not a Promise!)
  const user = await response.json();
  console.log(user); // Actual user data
}

4. Converting Promises to Async/Await
Example 1: Simple Fetch
Promise version:
javascriptfunction getUser() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
Async/Await version:
javascriptasync function getUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
Example 2: Chained Operations
Promise version:
javascriptfetchUser(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts.length);
    return fetchComments(posts[0].id);
  })
  .then(comments => {
    console.log('Comments:', comments);
  })
  .catch(error => {
    console.error('Error:', error);
  });
Async/Await version:
javascriptasync function loadData() {
  try {
    const user = await fetchUser(1);
    console.log('User:', user.name);
    
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts.length);
    
    const comments = await fetchComments(posts[0].id);
    console.log('Comments:', comments);
  } catch (error) {
    console.error('Error:', error);
  }
}
So much cleaner! 🎯

5. Error Handling with Try/Catch
Basic Pattern
javascriptasync function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error; // Re-throw or handle
  }
}
Multiple Try/Catch Blocks
javascriptasync function loadProfile() {
  let user;
  let posts = [];
  
  // Critical: User must load
  try {
    user = await fetchUser(1);
  } catch (error) {
    console.error('Failed to load user:', error);
    throw error; // Cannot continue without user
  }
  
  // Optional: Posts can fail
  try {
    posts = await fetchPosts(user.id);
  } catch (error) {
    console.warn('Could not load posts:', error);
    // Continue with empty posts
  }
  
  return { user, posts };
}
Finally Block
javascriptasync function uploadFile(file) {
  const loadingSpinner = showSpinner();
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: file
    });
    return await response.json();
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  } finally {
    hideSpinner(loadingSpinner); // ✅ Always runs
  }
}

6. Parallel Execution with Async/Await
❌ WRONG: Sequential (Slow)
javascriptasync function loadData() {
  const user = await fetchUser(1);      // Wait 1s
  const posts = await fetchPosts(1);    // Wait 1.5s
  const comments = await fetchComments(1); // Wait 0.8s
  
  return { user, posts, comments };
}
// Total: 3.3 seconds 💀
✅ CORRECT: Parallel (Fast)
javascriptasync function loadData() {
  // Start all requests at once
  const userPromise = fetchUser(1);
  const postsPromise = fetchPosts(1);
  const commentsPromise = fetchComments(1);
  
  // Wait for all to complete
  const user = await userPromise;
  const posts = await postsPromise;
  const comments = await commentsPromise;
  
  return { user, posts, comments };
}
// Total: 1.5 seconds (longest request) 🚀
✅ EVEN BETTER: Promise.all with Async/Await
javascriptasync function loadData() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  
  return { user, posts, comments };
}
// Total: 1.5 seconds 🚀

7. Common Patterns
Pattern 1: Sequential with Dependencies
javascript// Each step needs the previous result
async function loadUserData() {
  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id); // Needs user.id
  const comments = await fetchComments(posts[0].id); // Needs post.id
  
  return { user, posts, comments };
}
Pattern 2: Parallel Independent Requests
javascript// Requests don't depend on each other
async function loadDashboard() {
  const [user, stats, notifications] = await Promise.all([
    fetchUser(1),
    fetchStats(),
    fetchNotifications()
  ]);
  
  return { user, stats, notifications };
}
Pattern 3: Mixed Sequential and Parallel
javascriptasync function loadProfile() {
  // Step 1: Get user (required first)
  const user = await fetchUser(1);
  
  // Step 2: Get posts and settings in parallel (both need user.id)
  const [posts, settings] = await Promise.all([
    fetchPosts(user.id),
    fetchSettings(user.id)
  ]);
  
  return { user, posts, settings };
}
Pattern 4: Loop with Await (Sequential)
javascript// ❌ Slow: Processes one at a time
async function processUsers(userIds) {
  const results = [];
  
  for (const id of userIds) {
    const user = await fetchUser(id); // Waits for each
    results.push(user);
  }
  
  return results;
}
// If 5 users, 1s each = 5 seconds total
Pattern 5: Loop with Promise.all (Parallel)
javascript// ✅ Fast: Processes all at once
async function processUsers(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  const results = await Promise.all(promises);
  return results;
}
// If 5 users, 1s each = 1 second total 🚀

8. Real-World Examples
Example 1: Fetch User Profile
javascriptasync function getUserProfile(userId) {
  try {
    // Parallel: Get user and their posts at the same time
    const [user, posts] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/posts`).then(r => r.json())
    ]);
    
    // Sequential: Get comments for first post (needs posts data)
    let comments = [];
    if (posts.length > 0) {
      const response = await fetch(`/api/posts/${posts[0].id}/comments`);
      comments = await response.json();
    }
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Failed to load profile:', error);
    throw error;
  }
}
Example 2: Form Submission with Validation
javascriptasync function submitForm(formData) {
  const submitBtn = document.getElementById('submit-btn');
  
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Validate on server
    const validationResponse = await fetch('/api/validate', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const validation = await validationResponse.json();
    
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Submit
    const submitResponse = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await submitResponse.json();
    
    alert('Success!');
    return result;
    
  } catch (error) {
    alert('Error: ' + error.message);
    throw error;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }
}
Example 3: Retry Logic
javascriptasync function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error.message);
      
      if (i === maxRetries - 1) {
        throw new Error(`Failed after ${maxRetries} attempts`);
      }
      
      // Wait before retry (exponential backoff)
      await delay(1000 * Math.pow(2, i)); // 1s, 2s, 4s
    }
  }
}
Example 4: Pagination
javascriptasync function fetchAllPages(baseUrl) {
  const allData = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await response.json();
    
    allData.push(...data.results);
    
    hasMore = data.hasMore;
    page++;
  }
  
  return allData;
}

9. Common Mistakes and Pitfalls
Mistake 1: Forgetting await
javascript// ❌ WRONG: Forgot await
async function getUser() {
  const user = fetchUser(1); // Returns Promise, not data!
  console.log(user.name); // undefined (user is a Promise)
}

// ✅ CORRECT
async function getUser() {
  const user = await fetchUser(1);
  console.log(user.name); // Works!
}
Mistake 2: Sequential When Should Be Parallel
javascript// ❌ WRONG: Sequential (3 seconds)
async function loadData() {
  const user = await fetchUser(1);      // 1s
  const posts = await fetchPosts(1);    // 1s
  const comments = await fetchComments(1); // 1s
}

// ✅ CORRECT: Parallel (1 second)
async function loadData() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
}
Mistake 3: Using await in Loops Unnecessarily
javascript// ❌ WRONG: Sequential loop (5 seconds for 5 users)
async function getUsers(ids) {
  const users = [];
  for (const id of ids) {
    const user = await fetchUser(id);
    users.push(user);
  }
  return users;
}

// ✅ CORRECT: Parallel (1 second for 5 users)
async function getUsers(ids) {
  return await Promise.all(ids.map(id => fetchUser(id)));
}
Mistake 4: Not Handling Errors
javascript// ❌ WRONG: No error handling
async function loadData() {
  const data = await fetch('/api/data');
  return data.json();
} // If fetch fails, unhandled rejection!

// ✅ CORRECT
async function loadData() {
  try {
    const data = await fetch('/api/data');
    return await data.json();
  } catch (error) {
    console.error('Failed to load data:', error);
    throw error;
  }
}
Mistake 5: Returning Without await
javascript// ❌ SUBTLE BUG
async function getData() {
  try {
    return fetch('/api/data'); // Returns Promise, not unwrapped!
  } catch (error) {
    console.log('Never catches fetch errors!');
  }
}

// ✅ CORRECT
async function getData() {
  try {
    return await fetch('/api/data'); // Unwraps, catch works
  } catch (error) {
    console.log('Catches errors!');
  }
}

10. Async/Await with Older APIs
Top-Level Await (Modern)
javascript// ✅ In ES2022+ modules
const user = await fetchUser(1);
console.log(user);
IIFE Pattern (Older Environments)
javascript// Wrap in async IIFE
(async () => {
  const user = await fetchUser(1);
  console.log(user);
})();
Event Handlers
javascript// ✅ Can make event handlers async
button.addEventListener('click', async (e) => {
  try {
    const data = await fetchData();
    displayData(data);
  } catch (error) {
    console.error(error);
  }
});