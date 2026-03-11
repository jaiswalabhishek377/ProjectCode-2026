Let's MASTER PC54 — Promises! 🔥🔥
Promises are THE solution to callback hell! This is where modern JavaScript begins. Let's unlock it! 💪

1. What is a Promise?
A Promise is an object representing the eventual completion (or failure) of an async operation.
Think of it like a real-world promise:

"I promise to give you the data when it's ready"
It might succeed (fulfill) or fail (reject)
Once settled, the result doesn't change


2. Creating a Promise
Basic Syntax
javascriptconst promise = new Promise((resolve, reject) => {
  // Do async work here
  
  const success = true;
  
  if (success) {
    resolve('Operation successful!'); // ✅ Success
  } else {
    reject('Operation failed!');      // ❌ Failure
  }
});
Simple Example
javascriptconst promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();
    
    if (randomNumber > 0.5) {
      resolve(randomNumber); // Success!
    } else {
      reject('Number too small'); // Failure!
    }
  }, 2000);
});

console.log(promise); // Promise { <pending> }

// After 2 seconds:
// Either: Promise { 0.847... } (fulfilled)
// Or: Promise { <rejected> 'Number too small' }

3. Promise States
A Promise is always in one of 3 states:
javascript// 1️⃣ PENDING — Initial state, operation ongoing
const pending = new Promise((resolve, reject) => {
  // Still running...
});
console.log(pending); // Promise { <pending> }

// 2️⃣ FULFILLED — Operation succeeded
const fulfilled = new Promise((resolve, reject) => {
  resolve('Success!');
});
console.log(fulfilled); // Promise { 'Success!' }

// 3️⃣ REJECTED — Operation failed
const rejected = new Promise((resolve, reject) => {
  reject('Failed!');
});
console.log(rejected); // Promise { <rejected> 'Failed!' }
Once settled (fulfilled or rejected), a promise CANNOT change state!
javascriptconst promise = new Promise((resolve, reject) => {
  resolve('First');
  resolve('Second'); // ❌ Ignored!
  reject('Error');   // ❌ Ignored!
});

promise.then(result => {
  console.log(result); // "First" (first resolve wins)
});

4. Consuming Promises — .then() and .catch()
Using .then()
javascriptconst promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Data loaded!');
  }, 2000);
});

promise.then((result) => {
  console.log(result); // "Data loaded!" (after 2 seconds)
});

console.log('Waiting...'); // Runs immediately!

// Output:
// "Waiting..."
// [2 seconds later]
// "Data loaded!"
Using .catch()
javascriptconst promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Loading failed!');
  }, 2000);
});

promise
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.log('Error:', error); // "Error: Loading failed!"
  });
Using .finally()
javascriptpromise
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.log('Error:', error);
  })
  .finally(() => {
    console.log('Promise settled (success or failure)');
    // ✅ ALWAYS runs (like finally in try/catch)
  });

5. Promises vs Callbacks — The Difference
❌ Callback Version (Callback Hell)
javascriptfetchUser(1, (error, user) => {
  if (error) {
    console.error('User error:', error);
  } else {
    fetchPosts(user.id, (error, posts) => {
      if (error) {
        console.error('Posts error:', error);
      } else {
        fetchComments(posts[0].id, (error, comments) => {
          if (error) {
            console.error('Comments error:', error);
          } else {
            console.log('Final result:', comments);
          }
        });
      }
    });
  }
});
✅ Promise Version (Clean!)
javascriptfetchUser(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchPosts(user.id); // Return next promise
  })
  .then(posts => {
    console.log('Posts:', posts.length);
    return fetchComments(posts[0].id);
  })
  .then(comments => {
    console.log('Final result:', comments);
  })
  .catch(error => {
    console.error('Error at any step:', error);
  });
Benefits:

✅ Flat instead of nested
✅ ONE .catch() for all errors
✅ Easy to read top-to-bottom
✅ Easy to add/remove steps


6. Promise Chaining — The Superpower
Each .then() returns a NEW Promise
javascriptconst promise = new Promise((resolve) => {
  resolve(5);
});

promise
  .then(num => {
    console.log(num); // 5
    return num * 2;   // Return value for next .then()
  })
  .then(num => {
    console.log(num); // 10
    return num + 5;
  })
  .then(num => {
    console.log(num); // 15
  });

// Output:
// 5
// 10
// 15
Returning a Promise in .then()
javascriptfunction delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Promise.resolve('Start')
  .then(result => {
    console.log(result); // "Start"
    return delay(1000);  // Return a promise!
  })
  .then(() => {
    console.log('After 1 second');
    return delay(1000);
  })
  .then(() => {
    console.log('After 2 seconds');
  });
Real-World API Chain
javascriptfetch('/api/user/1')
  .then(response => response.json()) // Parse JSON
  .then(user => {
    console.log('User:', user.name);
    return fetch(`/api/users/${user.id}/posts`); // Next request
  })
  .then(response => response.json())
  .then(posts => {
    console.log('Posts:', posts.length);
  })
  .catch(error => {
    console.error('Error:', error);
  });

7. Error Handling in Chains
Error Bubbles Down
javascriptPromise.resolve(5)
  .then(num => {
    console.log(num); // 5
    throw new Error('Something broke!');
  })
  .then(num => {
    console.log('This will not run'); // ❌ Skipped
  })
  .then(num => {
    console.log('This too'); // ❌ Skipped
  })
  .catch(error => {
    console.error('Caught:', error.message); // ✅ Catches error
  });
Recovering from Errors
javascriptPromise.reject('Initial error')
  .catch(error => {
    console.log('Caught error:', error);
    return 'Recovered!'; // ✅ Recovery value
  })
  .then(result => {
    console.log('Continuing:', result); // "Continuing: Recovered!"
  });
Multiple .catch() Blocks
javascriptfetchUser(1)
  .then(user => fetchPosts(user.id))
  .catch(error => {
    console.error('User or posts failed:', error);
    return []; // Return empty array as fallback
  })
  .then(posts => {
    console.log('Posts (or empty):', posts);
  })
  .catch(error => {
    console.error('Final catch:', error);
  });

8. Creating Promises for Async Operations
Wrapping setTimeout
javascriptfunction delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Usage
delay(2000)
  .then(() => {
    console.log('2 seconds passed!');
  });
Wrapping Callbacks (Promisify)
javascript// Old callback-based function
function fetchUserOld(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: 'Alex' });
  }, 1000);
}

// ✅ Promisified version
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    fetchUserOld(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

// Now use with .then()
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
Real-World: Image Loading
javascriptfunction loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(img); // ✅ Image loaded
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`)); // ❌ Failed
    };
    
    img.src = url;
  });
}

// Usage
loadImage('https://example.com/image.jpg')
  .then(img => {
    document.body.appendChild(img);
    console.log('Image loaded!');
  })
  .catch(error => {
    console.error(error.message);
  });

9. Promise Static Methods
Promise.resolve() — Instant Success
javascript// Creates an already-resolved promise
const promise = Promise.resolve('Instant value');

promise.then(value => {
  console.log(value); // "Instant value"
});

// Useful for wrapping non-promise values
function getData() {
  return Promise.resolve({ id: 1, name: 'Alex' });
}
Promise.reject() — Instant Failure
javascriptconst promise = Promise.reject('Instant error');

promise.catch(error => {
  console.log(error); // "Instant error"
});

10. Common Patterns
Pattern 1: Sequential Execution
javascriptfunction step1() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Step 1 done'), 1000);
  });
}

function step2() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Step 2 done'), 1000);
  });
}

function step3() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Step 3 done'), 1000);
  });
}

// Execute one after another
step1()
  .then(result => {
    console.log(result);
    return step2();
  })
  .then(result => {
    console.log(result);
    return step3();
  })
  .then(result => {
    console.log(result);
  });

// Total time: 3 seconds (1 + 1 + 1)
Pattern 2: Retry Logic
javascriptfunction fetchWithRetry(url, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    function attempt() {
      attempts++;
      
      fetch(url)
        .then(response => resolve(response))
        .catch(error => {
          if (attempts >= maxRetries) {
            reject(new Error(`Failed after ${maxRetries} attempts`));
          } else {
            console.log(`Retry ${attempts}...`);
            setTimeout(attempt, 1000); // Retry after 1 second
          }
        });
    }
    
    attempt();
  });
}

// Usage
fetchWithRetry('/api/data', 3)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error.message));
Pattern 3: Timeout Wrapper
javascriptfunction withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    // Timeout promise
    const timeout = setTimeout(() => {
      reject(new Error('Operation timed out'));
    }, ms);
    
    // Original promise
    promise
      .then(result => {
        clearTimeout(timeout);
        resolve(result);
      })
      .catch(error => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}

// Usage
const slowFetch = fetch('/api/slow-endpoint');

withTimeout(slowFetch, 5000)
  .then(response => console.log('Success!'))
  .catch(error => console.log(error.message)); // "Operation timed out"