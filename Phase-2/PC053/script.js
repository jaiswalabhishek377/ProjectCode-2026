PC53 — Callbacks & Callback Hell
This is THE lesson that explains why modern JavaScript evolved the way it did! Understanding callback hell is what makes you appreciate Promises and async/await. Let's master it! 💪

1. What is a Callback?
A callback is a function passed as an argument to another function.
Simple Example
javascript// greet is a callback
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// processUserInput accepts a callback
function processUserInput(callback) {
  const name = 'Alex';
  callback(name);
}

processUserInput(greet);
// Output: "Hello, Alex!"
With Anonymous Function
javascriptprocessUserInput(function(name) {
  console.log(`Hi, ${name}!`);
});

// Or with arrow function
processUserInput((name) => {
  console.log(`Hey, ${name}!`);
});

2. Why Callbacks? — Asynchronous Operations
Problem: JavaScript is single-threaded. Long operations would block everything!
Without Callbacks (Synchronous - Bad!)
javascript// ❌ This would FREEZE the browser for 2 seconds!
function getData() {
  // Imagine this is a real network request
  sleep(2000); // Block for 2 seconds
  return { name: 'Alex', age: 25 };
}

console.log('Fetching data...');
const data = getData(); // 💀 BLOCKS HERE
console.log(data);
console.log('Done!');
With Callbacks (Asynchronous - Good!)
javascript// ✅ Browser stays responsive!
function getData(callback) {
  console.log('Fetching data...');
  
  setTimeout(() => {
    const data = { name: 'Alex', age: 25 };
    callback(data);
  }, 2000);
}

getData((data) => {
  console.log('Received:', data);
});

console.log('Doing other things...'); // ✅ Runs immediately!

// Output:
// "Fetching data..."
// "Doing other things..."
// [2 seconds later]
// "Received: { name: 'Alex', age: 25 }"

3. Real-World Callback Examples
DOM Event Listeners
javascriptconst button = document.getElementById('btn');

// The arrow function is a callback!
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
Array Methods
javascriptconst numbers = [1, 2, 3, 4, 5];

// The arrow function is a callback!
numbers.forEach((num) => {
  console.log(num * 2);
});

const doubled = numbers.map((num) => num * 2);
// [2, 4, 6, 8, 10]
File Reading (Node.js)
javascriptconst fs = require('fs');

// readFile is async, takes a callback
fs.readFile('data.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('File contents:', data);
  }
});

console.log('Reading file...'); // Runs immediately!

4. Error-First Callbacks — The Node.js Convention
Convention: First parameter is error, second is result.
javascriptfunction fetchUser(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      // Error occurred
      callback(new Error('Invalid user ID'), null);
    } else {
      // Success
      const user = { id, name: 'Alex' };
      callback(null, user);
    }
  }, 1000);
}

// Usage
fetchUser(1, (error, user) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('User:', user);
  }
});

5. The Problem — Callback Hell (Pyramid of Doom)
Scenario: Fetch user → Fetch posts → Fetch comments
javascript// ❌ CALLBACK HELL!
fetchUser(1, (error, user) => {
  if (error) {
    console.error('User error:', error);
  } else {
    console.log('User:', user.name);
    
    fetchPosts(user.id, (error, posts) => {
      if (error) {
        console.error('Posts error:', error);
      } else {
        console.log('Posts:', posts.length);
        
        fetchComments(posts[0].id, (error, comments) => {
          if (error) {
            console.error('Comments error:', error);
          } else {
            console.log('Comments:', comments.length);
            
            fetchLikes(comments[0].id, (error, likes) => {
              if (error) {
                console.error('Likes error:', error);
              } else {
                console.log('Likes:', likes.length);
                
                // 😱😱😱 IT KEEPS GOING...
              }
            });
          }
        });
      }
    });
  }
});
This is called "Pyramid of Doom" or "Callback Hell" 🔥

6. Why Callback Hell is Bad
Problem 1: Hard to Read
javascript// Which level are we at? What's the flow?
// Eyes have to jump all over the place!
doSomething(function(result1) {
  doSomethingElse(result1, function(result2) {
    doThirdThing(result2, function(result3) {
      doFourthThing(result3, function(result4) {
        doFifthThing(result4, function(result5) {
          // 😵 I'm lost!
        });
      });
    });
  });
});
Problem 2: Error Handling Duplication
javascript// Same error handling code repeated EVERYWHERE!
fetchUser(1, (error, user) => {
  if (error) {
    console.error(error); // Repeated
    return;
  }
  
  fetchPosts(user.id, (error, posts) => {
    if (error) {
      console.error(error); // Repeated
      return;
    }
    
    fetchComments(posts[0].id, (error, comments) => {
      if (error) {
        console.error(error); // Repeated
        return;
      }
      
      // ...
    });
  });
});
Problem 3: Difficult to Maintain
javascript// Need to add a step in the middle? 
// Have to refactor the entire pyramid! 💀

// Want to run things in parallel?
// Extremely complex with callbacks!

// Want to retry on failure?
// Nightmare to implement!
Problem 4: No Control Flow
javascript// ❌ Can't easily:
// - Run callbacks in parallel
// - Wait for all to complete
// - Race between callbacks
// - Handle one failure among many

// Example: Need BOTH user AND settings before proceeding
// With callbacks, this gets messy FAST:

let userData;
let settingsData;
let bothCompleted = false;

fetchUser(1, (error, user) => {
  if (error) { /* handle */ }
  userData = user;
  checkIfBothDone();
});

fetchSettings(1, (error, settings) => {
  if (error) { /* handle */ }
  settingsData = settings;
  checkIfBothDone();
});

function checkIfBothDone() {
  if (userData && settingsData && !bothCompleted) {
    bothCompleted = true;
    // Finally proceed...
  }
}
// 😱 This is insane for something so simple!

7. Simulating Async Operations for Practice
javascript// Helper function to simulate API calls
function simulateAsync(data, delay, shouldFail = false) {
  return (callback) => {
    setTimeout(() => {
      if (shouldFail) {
        callback(new Error('Operation failed'), null);
      } else {
        callback(null, data);
      }
    }, delay);
  };
}

// Usage
const getUser = simulateAsync({ id: 1, name: 'Alex' }, 1000);
const getPosts = simulateAsync([{ id: 1, title: 'Post 1' }], 1500);

getUser((error, user) => {
  if (error) {
    console.error(error);
  } else {
    console.log('User:', user);
    
    getPosts((error, posts) => {
      console.log('Posts:', posts);
    });
  }
});

8. Patterns to Make Callbacks Less Painful
Pattern 1: Named Functions (Avoid Nesting)
javascript// ❌ Nested anonymous functions
getUserData(1, (error, user) => {
  if (error) return handleError(error);
  
  getPostsData(user.id, (error, posts) => {
    if (error) return handleError(error);
    
    displayData(user, posts);
  });
});

// ✅ Named functions (less nesting)
function handleUser(error, user) {
  if (error) return handleError(error);
  getPostsData(user.id, handlePosts);
}

function handlePosts(error, posts) {
  if (error) return handleError(error);
  displayData(posts);
}

function handleError(error) {
  console.error('Error:', error);
}

getUserData(1, handleUser);
Pattern 2: Early Returns
javascript// ✅ Exit early on error (reduces nesting)
function processData(callback) {
  fetchUser(1, (error, user) => {
    if (error) {
      return callback(error); // ✅ Exit early!
    }
    
    fetchPosts(user.id, (error, posts) => {
      if (error) {
        return callback(error); // ✅ Exit early!
      }
      
      callback(null, { user, posts });
    });
  });
}
Pattern 3: Modularize
javascript// ✅ Break into separate functions
function fetchUserAndPosts(userId, callback) {
  fetchUser(userId, (error, user) => {
    if (error) return callback(error);
    
    fetchPosts(user.id, (error, posts) => {
      if (error) return callback(error);
      callback(null, { user, posts });
    });
  });
}

function fetchCommentsForPost(postId, callback) {
  // Another separate function
}

// Now use them together (cleaner!)
fetchUserAndPosts(1, (error, data) => {
  if (error) return handleError(error);
  
  fetchCommentsForPost(data.posts[0].id, (error, comments) => {
    if (error) return handleError(error);
    displayEverything(data.user, data.posts, comments);
  });
});

9. Control Flow Libraries (Pre-Promise Era)
Before Promises existed, people used libraries:
javascript// Using 'async' library (Node.js)
const async = require('async');

async.waterfall([
  // Step 1
  (callback) => {
    fetchUser(1, callback);
  },
  // Step 2
  (user, callback) => {
    fetchPosts(user.id, callback);
  },
  // Step 3
  (posts, callback) => {
    fetchComments(posts[0].id, callback);
  }
], (error, comments) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Final result:', comments);
  }
});

// Still better than nested callbacks!
// But Promises are even better! (PC54)

10. Real-World Example — Sequential File Processing
javascript// Scenario: Read file → Process data → Save results

function processFile(filename, callback) {
  // Step 1: Read file
  fs.readFile(filename, 'utf8', (error, data) => {
    if (error) {
      return callback(error);
    }
    
    // Step 2: Parse JSON
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (parseError) {
      return callback(parseError);
    }
    
    // Step 3: Transform data
    const transformed = parsedData.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
    
    // Step 4: Save results
    const output = JSON.stringify(transformed, null, 2);
    fs.writeFile('output.json', output, (error) => {
      if (error) {
        return callback(error);
      }
      
      callback(null, 'Processing complete!');
    });
  });
}

// Usage
processFile('input.json', (error, message) => {
  if (error) {
    console.error('Failed:', error.message);
  } else {
    console.log(message);
  }
});