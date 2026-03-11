Let's GOOO! 🔥🔥
PC55 — Promise.all, .race, .any & .allSettled
These are the Promise Combinators — powerful tools to coordinate multiple promises! Master these and you can build lightning-fast parallel data fetching! 💪

1. The Problem — Multiple Async Operations
Scenario: Load user, posts, and settings simultaneously
❌ Sequential (Slow - 6 seconds total)
javascriptasync function loadData() {
  const user = await fetchUser();      // 2 seconds
  const posts = await fetchPosts();    // 2 seconds  
  const settings = await fetchSettings(); // 2 seconds
  
  return { user, posts, settings };
}
// Total: 6 seconds 💀
✅ Parallel (Fast - 2 seconds total)
javascriptasync function loadData() {
  const [user, posts, settings] = await Promise.all([
    fetchUser(),      // All start at the same time!
    fetchPosts(),     
    fetchSettings()   
  ]);
  
  return { user, posts, settings };
}
// Total: 2 seconds (longest promise) 🚀

2. Promise.all() — Wait for ALL
"Run all promises in parallel, succeed if ALL succeed, fail if ANY fails"
Basic Example
javascriptconst promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve(42), 1000));
const promise3 = Promise.resolve('Hello');

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // [3, 42, 'Hello']
    // Results are in the SAME ORDER as input promises
  });
Real-World: Load Multiple Resources
javascriptfunction loadDashboard() {
  return Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/stats').then(r => r.json()),
    fetch('/api/notifications').then(r => r.json())
  ])
  .then(([user, stats, notifications]) => {
    console.log('User:', user);
    console.log('Stats:', stats);
    console.log('Notifications:', notifications);
    return { user, stats, notifications };
  })
  .catch(error => {
    console.error('One of the requests failed:', error);
  });
}
Key Characteristics
✅ All must succeed — Returns array of all results
❌ Any fails — Immediately rejects with that error
⏱️ Timing — Completes when the SLOWEST promise finishes
javascriptconst fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 100));
const slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 2000));

Promise.all([fast, slow])
  .then(results => {
    console.log(results); // ['Fast', 'Slow'] after 2 seconds
  });
Fail-Fast Behavior
javascriptconst success1 = Promise.resolve('OK 1');
const success2 = Promise.resolve('OK 2');
const failure = Promise.reject('ERROR!');
const success3 = Promise.resolve('OK 3');

Promise.all([success1, success2, failure, success3])
  .then(results => {
    console.log('Never runs');
  })
  .catch(error => {
    console.log('Failed:', error); // "Failed: ERROR!"
    // Other promises still run, but results are ignored!
  });

3. Promise.race() — First to Settle Wins
"First promise to settle (resolve OR reject) wins"
Basic Example
javascriptconst slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 100));

Promise.race([slow, fast])
  .then(result => {
    console.log(result); // "Fast" (after 100ms)
  });
Real-World: Timeout Pattern
javascriptfunction fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout!')), timeout)
    )
  ]);
}

// If fetch takes > 5 seconds, timeout wins
fetchWithTimeout('/api/slow-endpoint', 5000)
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.log('Error:', error.message)); // "Timeout!"
Real-World: Fastest Server Wins
javascriptconst servers = [
  fetch('https://api-us.example.com/data'),
  fetch('https://api-eu.example.com/data'),
  fetch('https://api-asia.example.com/data')
];

Promise.race(servers)
  .then(response => response.json())
  .then(data => {
    console.log('Got data from fastest server:', data);
  });
Key Characteristics
🏁 First wins — Returns result of first settled promise
⚡ Fast or Slow — Can resolve OR reject
⏱️ Timing — Completes when FIRST promise settles
javascriptconst reject = Promise.reject('Error!');
const resolve = new Promise(resolve => setTimeout(() => resolve('OK'), 100));

Promise.race([reject, resolve])
  .then(result => console.log('Never runs'))
  .catch(error => console.log('Failed:', error)); // "Failed: Error!"
// Rejection was faster!

4. Promise.any() — First Success Wins
"First promise to RESOLVE wins, ignores rejections"
Basic Example
javascriptconst fail1 = Promise.reject('Error 1');
const fail2 = Promise.reject('Error 2');
const success = new Promise(resolve => setTimeout(() => resolve('Success!'), 1000));

Promise.any([fail1, fail2, success])
  .then(result => {
    console.log(result); // "Success!" (ignores the failures)
  });
Real-World: Fallback APIs
javascriptPromise.any([
  fetch('https://primary-api.com/data'),
  fetch('https://backup-api-1.com/data'),
  fetch('https://backup-api-2.com/data')
])
  .then(response => response.json())
  .then(data => {
    console.log('Got data from one of the APIs:', data);
  })
  .catch(error => {
    console.log('All APIs failed:', error);
    // AggregateError with all rejection reasons
  });
Key Characteristics
✅ First success — Returns first successful result
❌ All fail — Rejects with AggregateError
⏱️ Timing — Completes when FIRST promise resolves
All Promises Fail
javascriptconst fail1 = Promise.reject('Error 1');
const fail2 = Promise.reject('Error 2');
const fail3 = Promise.reject('Error 3');

Promise.any([fail1, fail2, fail3])
  .catch(error => {
    console.log(error); // AggregateError
    console.log(error.errors); // ['Error 1', 'Error 2', 'Error 3']
  });

5. Promise.allSettled() — Wait for All, Never Fails
"Wait for ALL promises to settle, returns status of each"
Basic Example
javascriptconst success = Promise.resolve('OK');
const failure = Promise.reject('Error');

Promise.allSettled([success, failure])
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 'OK' },
    //   { status: 'rejected', reason: 'Error' }
    // ]
  });
Real-World: Batch Operations with Partial Failures
javascriptconst uploads = [
  uploadFile('file1.jpg'),
  uploadFile('file2.jpg'),
  uploadFile('file3.jpg')
];

Promise.allSettled(uploads)
  .then(results => {
    const successful = results.filter(r => r.status === 'fulfilled');
    const failed = results.filter(r => r.status === 'rejected');
    
    console.log(`Uploaded: ${successful.length}`);
    console.log(`Failed: ${failed.length}`);
    
    failed.forEach(result => {
      console.error('Upload error:', result.reason);
    });
  });
Real-World: Independent API Calls
javascriptasync function loadOptionalData() {
  const results = await Promise.allSettled([
    fetch('/api/user-stats').then(r => r.json()),
    fetch('/api/recommendations').then(r => r.json()),
    fetch('/api/trending').then(r => r.json())
  ]);
  
  const data = {};
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const keys = ['stats', 'recommendations', 'trending'];
      data[keys[index]] = result.value;
    } else {
      console.warn(`Failed to load ${['stats', 'recommendations', 'trending'][index]}`);
    }
  });
  
  return data; // Returns partial data if some requests fail
}
Key Characteristics
✅ Always succeeds — Never rejects
📊 Full report — Returns status of each promise
⏱️ Timing — Completes when ALL promises settle

6. Comparison Table
Method          ResolvesWhen        RejectsWhen                 UseCase 
Promise.all()     ALLsucceed         ANY fails             Critical data - need everything
Promise.race()    FIRST settles    FIRST settles           Timeout, fastest server
Promise.any()     FIRST succeeds      ALL fail             Fallback APIs, redundancy
Promise.allSettled()ALL settle      NEVER                   Batch ops, optional data
7. Performance Examples
Sequential vs Parallel
javascript// ❌ Sequential: 6 seconds
async function loadSequential() {
  const user = await fetchUser();      // 2s
  const posts = await fetchPosts();    // 2s
  const comments = await fetchComments(); // 2s
  return { user, posts, comments };
}

// ✅ Parallel: 2 seconds
async function loadParallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),      // All run at once!
    fetchPosts(),
    fetchComments()
  ]);
  return { user, posts, comments };
}

// Speedup: 3x faster! 🚀
Timing Visualization
javascriptconsole.time('Sequential');
await loadSequential();
console.timeEnd('Sequential'); // Sequential: 6000ms

console.time('Parallel');
await loadParallel();
console.timeEnd('Parallel'); // Parallel: 2000ms

8. Advanced Patterns
Pattern 1: Partial Success with Promise.allSettled
javascriptasync function batchProcessUsers(userIds) {
  const results = await Promise.allSettled(
    userIds.map(id => processUser(id))
  );
  
  const successful = [];
  const failed = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successful.push({ id: userIds[index], data: result.value });
    } else {
      failed.push({ id: userIds[index], error: result.reason });
    }
  });
  
  return { successful, failed };
}

// Usage
const { successful, failed } = await batchProcessUsers([1, 2, 3, 4, 5]);
console.log(`Processed ${successful.length} users`);
console.log(`Failed ${failed.length} users`);
Pattern 2: Timeout with Promise.race
javascriptfunction timeout(ms) {
  return new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
}

async function fetchWithTimeout(url, ms = 5000) {
  try {
    const response = await Promise.race([
      fetch(url),
      timeout(ms)
    ]);
    return response;
  } catch (error) {
    if (error.message === 'Timeout') {
      console.error(`Request timed out after ${ms}ms`);
    }
    throw error;
  }
}
Pattern 3: Fastest Successful Response
javascriptasync function getFastestResponse(urls) {
  return Promise.any(
    urls.map(url => fetch(url).then(r => r.json()))
  );
}

// Usage
const data = await getFastestResponse([
  'https://api-us.com/data',
  'https://api-eu.com/data',
  'https://api-asia.com/data'
]);
Pattern 4: All or Nothing vs Best Effort
javascript// All or Nothing (Promise.all)
async function loadCriticalData() {
  const [user, permissions, settings] = await Promise.all([
    fetchUser(),
    fetchPermissions(),
    fetchSettings()
  ]);
  // If ANY fails, entire operation fails
  return { user, permissions, settings };
}

// Best Effort (Promise.allSettled)
async function loadOptionalData() {
  const results = await Promise.allSettled([
    fetchRecommendations(),
    fetchTrending(),
    fetchAds()
  ]);
  
  const data = {};
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      const keys = ['recommendations', 'trending', 'ads'];
      data[keys[i]] = result.value;
    }
  });
  // Returns whatever data is available
  return data;
}