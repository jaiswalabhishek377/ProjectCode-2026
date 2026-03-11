// Challenge 1 — Create a Basic Promise
// Create a promise that:
// - Waits 2 seconds
// - Resolves with "Success!" if Math.random() > 0.5
// - Rejects with "Failed!" otherwise

function randomPromise() {
  // Your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Success!");
      } else {
        reject("Failed!");
      }
    }, 2000);
  });
}

// Test it:
randomPromise()
  .then(result => console.log(result))
  .catch(error => console.error(error));


// Challenge 2 — Promisify setTimeout
// Create a delay function that returns a promise
// delay(2000).then(() => console.log('2 seconds passed'))

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
delay(2000).then(() => console.log('2 seconds passed'));

// Challenge 3 — Sequential Promises
// Create 3 promises that resolve after 1s, 2s, and 3s
// Chain them to log: "Step 1", "Step 2", "Step 3"

function challenge3() {
  // Your code here
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1");
      resolve();
    }, 1000);
  })
    .then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Step 2");
          resolve();
        }, 2000);
      });
    })
    .then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Step 3");
          resolve();
        }, 3000);
      });
    });
}


// Challenge 4 — Promise Chain Math
// Start with 10
// Then multiply by 2
// Then add 5
// Then square the result
// Each step takes 500ms
// Log final result

function mathChain() {
  return Promise.resolve(10)
    .then(num => {
      return delay(500).then(() => {
        console.log('Start:', num); // 10
        return num * 2;
      });
    })
    .then(num => {
      return delay(500).then(() => {
        console.log('After multiply:', num); // 20
        return num + 5;
      });
    })
    .then(num => {
      return delay(500).then(() => {
        console.log('After add:', num); // 25
        return num * num;
      });
    })
    .then(num => {
      return delay(500).then(() => {
        console.log('Final result:', num); // 625
        return num;
      });
    });
}

// Total time: 2000ms (500 + 500 + 500 + 500)
//OR

function mathChain() {
  return delay(500)
    .then(() => 10 * 2)     // 20
    .then(num => delay(500).then(() => num + 5))   // 25
    .then(num => delay(500).then(() => num * num)) // 625
    .then(num => {
      console.log('Final result:', num);
      return num;
    });
}

// Challenge 5 — Error Handling
// Create a promise chain:
// 1. Fetch user (resolve with { id: 1, name: 'Alex' })
// 2. Fetch posts (REJECT with "Posts service down")
// 3. Fetch comments (should not run)
// Catch the error and log "Error recovered"
// Then continue with a final .then()

function errorChallenge() {
  // Your code here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Alex' });
    }, 500);
  })
}

errorChallenge()
  .then(user => {
    console.log('User fetched:', user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Posts service down");
      }, 500);
    });
  })
  .then(posts => {
    console.log('Posts fetched:', posts);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Comment 1', 'Comment 2']);
      }, 500);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    console.log('Error recovered');
  })
  .then(() => {
    console.log('Continuing with final step');
  });



// Challenge 6 — Promisify Callback Function
// Convert this callback function to return a promise:

function getUserCallback(id, callback) {
  setTimeout(() => {
    if (id > 0) {
      callback(null, { id, name: 'Alex' });
    } else {
      callback(new Error('Invalid ID'), null);
    }
  }, 1000);
}

// Create getUserPromise that returns a promise
function getUserPromise(id) {
  // Your code here
  return new Promise((resolve, reject) => {
    getUserCallback(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  } );
}

// Test it:
getUserPromise(1)
  .then(user => console.log('User:', user))
  .catch(error => console.error('Error:', error));

// Challenge 7 — Retry Logic
// Create a function that retries a promise up to 3 times
// If all fail, reject with "All retries failed"

function retryPromise(promiseFn, maxRetries = 3) {
  // Your code here
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attempt() {
      promiseFn()
        .then(resolve)
        .catch((error) => {
          attempts++;
          if (attempts < maxRetries) {
            console.log(`Retrying... Attempt ${attempts}`);
            attempt();
          }
          else {
            reject("All retries failed");
          }
        });
    }
    attempt();
  });
}

// Test with:
let attempts = 0;
function unreliable() {
  return new Promise((resolve, reject) => {
    attempts++;
    if (attempts < 3) {
      reject('Failed');
    } else {
      resolve('Success!');
    }
  });
}