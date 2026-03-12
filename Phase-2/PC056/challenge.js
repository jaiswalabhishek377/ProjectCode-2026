// Helper functions (same as before)
function fetchUser(id, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, delay);
  });
}

function fetchPosts(userId, delay = 1500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId },
        { id: 2, title: 'Post 2', userId }
      ]);
    }, delay);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Challenge 1 — Basic Async/Await
// Convert this Promise chain to async/await:
function getUserDataPromise() {
  return fetchUser(1)
    .then(user => {
      console.log('User:', user.name);
      return fetchPosts(user.id);
    })
    .then(posts => {
      console.log('Posts:', posts.length);
      return posts;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

async function getUserDataAsync() {
  // Your code here
  try {
    const user = await fetchUser(1);
    console.log('User:', user.name);
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts.length);
    return posts;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
getUserDataAsync();
// Test: getUserDataAsync() should log user and posts, and return posts array
//output:
// User: User 1
// Posts: 2


// Challenge 2 — Error Handling
// Create an async function that:
// - Tries to fetch user with ID -1 (will fail)
// - Catches the error and logs it
// - Returns null instead of throwing

async function getSafeUser(id) {
  // Your code here
  try {
    const user = await fetchUser(id);
    return user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
// Test: getSafeUser(-1) should log error and return null
getSafeUser(-1).then(result => console.log('Result:', result));
//output:
// Error: Error: Invalid user ID
// Result: null

// Challenge 3 — Sequential vs Parallel
// Create TWO versions:
// A) Sequential: Fetch user, THEN posts, THEN comments (slow)
// B) Parallel: Fetch all three at once (fast)
// Time both and log the difference

async function loadSequential() {
  // Your code here
  const start = Date.now();
  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  const comments = await delay(500).then(() => ['Comment 1', 'Comment 2']);
  const end = Date.now();
  console.log('Sequential Time:', end - start, 'ms');
}

async function loadParallel() {
  // Your code here
  const start = Date.now();
  const userPromise = fetchUser(1);
  const postsPromise = fetchPosts(1);
  const commentsPromise = delay(500).then(() => ['Comment 1', 'Comment 2']);
  const [user, posts, comments] = await Promise.all([userPromise, postsPromise, commentsPromise]);
  const end = Date.now();
  console.log('Parallel Time:', end - start, 'ms');
}
// Test: loadSequential() should take ~2500ms, loadParallel() should take ~1500ms
loadSequential().then(() => loadParallel());


// Challenge 4 — Process Array in Parallel
// Given array of user IDs, fetch ALL users in parallel means using Promise.all to fetch multiple users at the same time, 
// instead of waiting for each fetch to complete before starting the next one.
//  This allows for faster overall execution when fetching multiple users.
// Return array of user objects

async function fetchMultipleUsers(userIds) {
  // Your code here
  const userPromises = userIds.map(id => fetchUser(id));
  return Promise.all(userPromises);
}

// Test: fetchMultipleUsers([1, 2, 3, 4, 5])
fetchMultipleUsers([1, 2, 3, 4, 5])
.then(users => console.log('Users:', users))
.catch(error => console.error('Error:', error));


// Challenge 5 — Retry Logic with Async/Await
// Create a function that retries up to 3 times
// Wait 1 second between retries

async function fetchWithRetry(fetchFn, maxRetries = 3) {
  // Your code here
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      return await fetchFn(); // Attempt to fetch fetchFn is a function that returns a promise.
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error);
      if (attempts < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  throw new Error('Max retries exceeded');
}

// Test with:
let attempts = 0;
async function unreliableFetch() {
  attempts++;
  if (attempts < 3) {
    throw new Error('Failed');
  }
  return { data: 'Success!' };
}
fetchWithRetry(unreliableFetch)
.then(result => console.log(result))
.catch(error => console.error(error));


// Challenge 6 — Timeout with Async/Await
// Fetch user but timeout after 2 seconds
// Use Promise.race

async function fetchUserWithTimeout(id, timeout = 2000) {
  // Your code here
  const fetchPromise = fetchUser(id);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout);
  });
  return Promise.race([fetchPromise, timeoutPromise]);
}
// Test: fetchUserWithTimeout(1) should succeed, fetchUserWithTimeout(-1) should timeout
fetchUserWithTimeout(1)
.then(user => console.log('User:', user))
.catch(error => console.error('Error:', error));


// Challenge 7 — Real-World Form Submission
// Simulate form submission:
// 1. Validate data (takes 500ms)
// 2. If valid, submit (takes 1000ms)
// 3. Show success message
// Handle all errors with try/catch

async function submitUserForm(formData) {
  // Simulated validation
  function validateForm(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!data.name) {
          reject(new Error('Name is required'));
        } else {
          resolve({ valid: true });
        }
      }, 500);
    });
  }
  
  // Simulated submission
  function submitForm(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: 123, status: 'success' });
      }, 1000);
    });
  }
  
  // Your code here
  try {
    await validateForm(formData);
    const result = await submitForm(formData);
    console.log('Form submitted successfully:', result);
  } catch (error) {
    console.error('Form submission error:', error);
  }
}

// Test: submitUserForm({ name: 'Alex' })


// Challenge 8 — Paginated Data Fetching
// Fetch all pages of data until no more pages
// Each page takes 800ms
// API returns: { data: [...], hasMore: true/false }

async function fetchAllData() {
  // Simulated API
  let currentPage = 0;
  function fetchPage(page) {
    return new Promise(resolve => {
      setTimeout(() => {
        currentPage++;
        resolve({
          data: [`Item ${page * 10 + 1}`, `Item ${page * 10 + 2}`],
          hasMore: page < 2 // Only 3 pages total
        });
      }, 800);
    });
  }
  
  // Your code here: Fetch all pages until hasMore is false
  let allData = [];
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetchPage(currentPage);
    allData = allData.concat(response.data);
    hasMore = response.hasMore;
  }
  
  return allData;
}

// Test: fetchAllData() should return all items from all pages
fetchAllData().then(data => console.log('All Data:', data));