// <!DOCTYPE html>
// <html>
// <body>
//   <h1>Callback Challenges</h1>
  
//   <div id="user-info"></div>
//   <button id="load-data">Load User Data</button>
  
//   <div id="output"></div>
  
//   <script src="callbacks.js"></script>
// </body>
// </html>

// Helper: Simulate async operations
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulated API functions (use these in challenges)
function fetchUser(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) {
      callback(new Error('Invalid user ID'), null);
    } else {
      callback(null, { id: userId, name: 'Alex', email: 'alex@example.com' });
    }
  }, 1000);
}

function fetchPosts(userId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, userId, title: 'First Post' },
      { id: 2, userId, title: 'Second Post' }
    ]);
  }, 1500);
}

function fetchComments(postId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, postId, text: 'Great post!' },
      { id: 2, postId, text: 'Thanks for sharing' }
    ]);
  }, 800);
}

// Challenge 1 — Basic Callback
// Create a function that:
// - Takes a number and a callback
// - After 1 second, calls callback with number * 2
// - Test it with console.log

function doubleAfterDelay(num, callback) {
  // Your code here
  setTimeout(() => {
    callback(num * 2);
  }, 1000);
}


// Test:
// doubleAfterDelay(5, (result) => {
//   console.log(result); // Should log 10 after 1 second
// });


// Challenge 2 — Error-First Callback
// Create a function that:
// - Takes a number and an error-first callback
// - If number is negative, call callback with error
// - Otherwise, call callback with null and number squared
// - After 500ms

function squareNumber(num, callback) {
  // Your code here
  setTimeout(() => {
    if (num < 0) {
      callback(new Error('Number must be positive'), null);
    } else {
      callback(null, num * num);
    }
  }, 500);
}

// Test:
// squareNumber(4, (error, result) => {
//   if (error) console.error(error.message);
//   else console.log(result); // 16
// });
//
// squareNumber(-3, (error, result) => {
//   if (error) console.error(error.message); // "Number must be positive"
//   else console.log(result);
// });


// Challenge 3 — Callback Hell (Experience the Pain!)
// Use the provided functions to:
// 1. Fetch user with ID 1
// 2. Then fetch their posts
// 3. Then fetch comments for the first post
// 4. Log the final result
// Use nested callbacks (experience callback hell!)

function loadUserData() {
  // Your code here (nest the callbacks)
  fetchUser(1, (userError, user) => {
    if (userError) {
      console.error(userError);
      return;
    }

    fetchPosts(user.id, (postsError, posts) => {
      if (postsError) {
        console.error(postsError);
        return;
      }

      fetchComments(posts[0].id, (commentsError, comments) => {
        if (commentsError) {
          console.error(commentsError);
          return;
        }

        console.log({ user, posts, comments });
      });
    });
  });
}


// Challenge 4 — Flatten Callback Hell
// Rewrite Challenge 3 using named functions
// to reduce nesting (make it more readable)

function handleUser(error, user) {
  // Your code here
  if (error) {
    console.error(error);
    return;
  }
  fetchPosts(user.id, handlePosts);
}

function handlePosts(error, posts) {
  // Your code here
  if (error) {
    console.error(error);
    return;
  }
  fetchComments(posts[0].id, handleComments);
}

function handleComments(error, comments) {
  // Your code here
  if (error) {
    console.error(error);
    return;
  }
  // Do something with the comments, e.g., display them
}

function loadUserDataFlattened() {
  fetchUser(1, handleUser);
}


// Challenge 5 — Parallel Callbacks
// Create a function that:
// - Fetches BOTH user (ID 1) AND posts (user ID 1) in parallel
// - Waits for BOTH to complete
// - Then calls callback with combined data { user, posts }
// - Handle errors from either

function fetchUserAndPosts(userId, callback) {
  // Your code here
  // Hint: You need to track when both complete
  let userComplete = false;
  let postsComplete = false;
  let userData = null;
  let postsData = null;

  fetchUser(userId, (userError, user) => {
    if (userError) {
      callback(userError, null);
      return;
    }
    userData = user;
    userComplete = true;
    if (postsComplete) {
      callback(null, { user: userData, posts: postsData });
    }
  });

  fetchPosts(userId, (postsError, posts) => {
    if (postsError) {
      callback(postsError, null);
      return;
    }
    postsData = posts;
    postsComplete = true;
    if (userComplete) {
      callback(null, { user: userData, posts: postsData });
    }
  });
}


// Challenge 6 — Sequential Operations
// Create a waterfall of operations:
// 1. Get a number (start with 5)
// 2. Double it (after 500ms)
// 3. Add 10 (after 500ms)
// 4. Square it (after 500ms)
// 5. Log final result
// Use callbacks for each step

function processNumber(callback) {
  // Your code here
  const startNumber = 5;

  setTimeout(() => {
    const doubled = startNumber * 2;
    setTimeout(() => {
      const added = doubled + 10;
      setTimeout(() => {
        const squared = added * added;
        callback(squared);
      }, 500);
    }, 500);
  }, 500);
}


// Challenge 7 — Retry Logic with Callbacks
// Create a function that:
// - Calls an async operation
// - If it fails, retry up to 3 times
// - If all retries fail, call callback with error
// - If any attempt succeeds, call callback with result

function retryOperation(operation, maxRetries, callback) {
  // Your code here
  let attempts = 0;

  function attempt() {
    operation((error, result) => {
      if (error) {
        attempts++;
        if (attempts < maxRetries) {
          attempt(); // Retry
        } else {
          callback(new Error('All retries failed'), null);
        }
      } else {
        callback(null, result); // Success
      }
    });
  }
}

// Test with a function that fails twice then succeeds:
let attempts = 0;
function unreliableOperation(callback) {
  attempts++;
  setTimeout(() => {
    if (attempts < 3) {
      callback(new Error('Failed'), null);
    } else {
      callback(null, 'Success!');
    }
  }, 500);
}

// retryOperation(unreliableOperation, 3, (error, result) => {
//   if (error) console.error('All retries failed');
//   else console.log(result); // "Success!" after 3 attempts
// });


// Challenge 8 — Real-World: Load User Profile
// When button clicked:
// 1. Fetch user (ID 1)
// 2. Fetch their posts
// 3. Display user info and post count in #user-info
// 4. Handle any errors by showing error message
// Use proper error-first callbacks

document.getElementById('load-data').addEventListener('click', () => {
  // Your code here
  fetchUser(1, (userError, user) => {
    if (userError) {
      document.getElementById('user-info').textContent = 'Error loading user';
      console.error(userError);
      return;
    }
    fetchPosts(user.id, (postsError, posts) => {
      if (postsError) {
        document.getElementById('user-info').textContent = 'Error loading posts';
        console.error(postsError);
        return;
      }
      document.getElementById('user-info').innerHTML = `
        <h2>${user.name}</h2>
        <p>Posts: ${posts.length}</p>
      `;
    });
  });
});