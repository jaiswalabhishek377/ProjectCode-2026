// Simulated async functions (use these for challenges)
function fetchUser(id, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}` });
      } else {
        reject('Invalid user ID');
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

function fetchComments(postId, delay = 800) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Great!', postId },
        { id: 2, text: 'Nice!', postId }
      ]);
    }, delay);
  });
}

// Challenge 1 — Promise.all Basics
// Fetch users 1, 2, and 3 in parallel
// Log all results when ALL complete
// Time the operation

async function challenge1() {
  // Your code here
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  console.log(user1, user2, user3);
}
// Test it:
challenge1();
// Expected: Logs all 3 users after ~1 second 

// Challenge 2 — Promise.race for Timeout
// Create a function that races a fetch against a timeout
// If fetch takes longer than 2 seconds, reject with "Timeout!"

function fetchWithTimeout(promise, timeout = 2000) {
  // Your code here
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("Timeout!");
    }, timeout);
    promise.then(result => {
      clearTimeout(timer);
      resolve(result);
    }).catch(error => {
      clearTimeout(timer);
      reject(error);
    });
  });
}
// Test:
// fetchWithTimeout(fetchUser(1, 3000), 2000)
//   .catch(error => console.log(error)); // "Timeout!"


// Challenge 3 — Promise.any for Fallback
// Try to fetch from 3 different user IDs (5, -1, 3)
// User 5 takes 3 seconds
// User -1 fails (invalid ID)
// User 3 takes 1 second
// Get the FIRST successful result

async function challenge3() {
  // Your code here
    try {
        const user = await Promise.any([
            fetchUser(5, 3000),
            fetchUser(-1, 1000),
            fetchUser(3, 1000)
        ]);
        console.log('First successful user:', user);
    } catch (error) {
        console.error('All fetches failed:', error);
    } 
}
//output: First successful user: { id: 3, name: 'User 3' }

// Challenge 4 — Promise.allSettled for Batch
// Try to fetch users 1, -5, 3, -2, 5
// Some will fail (negative IDs)
// Return report: { successful: [...], failed: [...] }

async function challenge4() {
  // Your code here
    const results = await Promise.allSettled([
        fetchUser(1),
        fetchUser(-5),
        fetchUser(3),
        fetchUser(-2),
        fetchUser(5)
    ]);
    
    const successful = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value);
    
    const failed = results
      .filter((r) => r.status === 'rejected')
      .map((r) => r.reason);
    
    console.log({ successful, failed });
}
// Test it:
challenge4();
// Expected: Logs { successful: [User 1, User 3, User 5], failed: ['Invalid user ID', 'Invalid user ID'] }

// Challenge 5 — Sequential vs Parallel Timing
// Compare loading user → posts → comments
// Both sequentially AND in parallel
// Log time difference

async function challenge5() {
  // Your code here
    console.time('Sequential');
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.timeEnd('Sequential');
    console.time('Parallel');
    const [userP, postsP, commentsP] = await Promise.all([
        fetchUser(1),
        fetchPosts(1),
        fetchComments(1)
    ]);
    console.timeEnd('Parallel');
}
//here sequential will take ~3.3 seconds (1s + 1.5s + 0.8s) while parallel will take ~1.5 seconds (the longest individual time)
//parallel is promise.all while sequential is chaining promises with then
//Test it:
challenge5();

// Challenge 6 — Fastest Server Simulation
// Create 3 promises with different delays:
// - Server 1: 300ms, returns { server: 1, data: 'Data A' }
// - Server 2: 100ms, returns { server: 2, data: 'Data B' }
// - Server 3: 500ms, returns { server: 3, data: 'Data C' }
// Use Promise.race to get fastest
//promise.race gives the result of the first promise that settles (either resolves or rejects). In this case, it will return the result of Server 2 since it has the shortest delay of 100ms.
async function challenge6() {
  // Your code here
    const server1 = new Promise(resolve => setTimeout(() => resolve({ server: 1, data: 'Data A' }), 300));
    const server2 = new Promise(resolve => setTimeout(() => resolve({ server: 2, data: 'Data B' }), 100));
    const server3 = new Promise(resolve => setTimeout(() => resolve({ server: 3, data: 'Data C' }), 500));
    
    const fastest = await Promise.race([server1, server2, server3]);
    console.log('Fastest server response:', fastest);
}
// Test it:
challenge6();
// Expected: Logs { server: 2, data: 'Data B' } after ~100ms


// Challenge 7 — Real-World Dashboard
// Load dashboard data with these requirements:
// - User data is CRITICAL (must succeed)
// - Stats, notifications, and ads are OPTIONAL
// Use Promise.all for critical, Promise.allSettled for optional
// Return: { user, optional: { stats?, notifications?, ads? } }

async function loadDashboard() {
  function fetchStats() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject('Stats service down'), 1000);
    });
  }
  
  function fetchNotifications() {
    return new Promise(resolve => {
      setTimeout(() => resolve(['Notification 1', 'Notification 2']), 800);
    });
  }
  
  function fetchAds() {
    return new Promise(resolve => {
      setTimeout(() => resolve(['Ad 1', 'Ad 2']), 500);
    });
  }
  
  // Your code here
    try {
        const user = await fetchUser(1); // Critical
        const optionalResults = await Promise.allSettled([
            fetchStats(),
            fetchNotifications(),
            fetchAds()
        ]);
        const optional = {};
        optionalResults.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                if (index === 0) optional.stats = result.value;
                else if (index === 1) optional.notifications = result.value;
                else if (index === 2) optional.ads = result.value;
            }
        });
        return { user, optional };
    } catch (error) {
        console.error('Failed to load dashboard:', error);
        throw error; // Critical failure, rethrow
    }
}
// Test it:
loadDashboard()
  .then(data => console.log('Dashboard data:', data))
  .catch(error => console.error('Error loading dashboard:', error));
// Expected: Logs user data and optional notifications and ads, but stats will be missing due to failure.


// Challenge 8 — Retry with Promise.any
// Create 3 promises that try to fetch user:
// - Attempt 1: Fails after 500ms
// - Attempt 2: Fails after 500ms
// - Attempt 3: Succeeds after 500ms
// Use Promise.any to get first success
// the first one that succeeds!
async function challenge8() {
  // Your code here
    const attempt1 = new Promise((resolve, reject) => setTimeout(() => reject('Attempt 1 failed'), 500));
    const attempt2 = new Promise((resolve, reject) => setTimeout(() => reject('Attempt 2 failed'), 500));
    const attempt3 = new Promise(resolve => setTimeout(() => resolve({ id: 1, name: 'User 1' }), 500));
    return Promise.any([attempt1, attempt2, attempt3]);
}
// Test it:
challenge8()
  .then(user => console.log('Fetched user:', user))
  .catch(error => console.error('All attempts failed:', error));
// Expected: Logs { id: 1, name: 'User 1' } after ~500ms, ignoring the first two failures.