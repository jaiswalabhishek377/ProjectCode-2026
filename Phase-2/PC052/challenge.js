// <!DOCTYPE html>
// <html>
// <body>
//   <h1>Event Loop Challenges</h1>
  
//   <div id="output"></div>
  
//   <button id="start-clock">Start Clock</button>
//   <button id="stop-clock">Stop Clock</button>
//   <div id="clock">00:00:00</div>
  
//   <button id="start-countdown">Start Countdown (10s)</button>
//   <div id="countdown">10</div>
  
//   <input type="text" id="search" placeholder="Search...">
//   <div id="search-results"></div>
  
//   <script src="event-loop.js"></script>
// </body>
// </html>

// Challenge 1 — Predict the Output
// What order will these log? Write your prediction first!
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve().then(() => {
  console.log('C');
});

setTimeout(() => {
  console.log('D');
}, 10);

console.log('E');

// Your prediction: A, E, C, B, D because A and E are synchronous, C is a microtask that runs after the current stack, and B and D are macrotasks that run after the microtasks. B runs before D because it has a shorter timeout.
// there is a callstack a microtask queue and a macrotask queue. The callstack runs first, then the microtask queue, then the macrotask queue. So A and E run first, then C, then B and D.
//A E RUNS IN CALLSTACK, THEN C RUNS IN MICROTASK QUEUE, THEN B AND D RUN IN MACROTASK QUEUE. B RUNS BEFORE D BECAUSE IT HAS A SHORTER TIMEOUT.

// Challenge 2 — Digital Clock
// Create a working digital clock:
// - Format: HH:MM:SS
// - Updates every second
// - Start/stop buttons work
// - Use setInterval and clearInterval

let clockInterval;

function startClock() {
  // Your code here
  clockInterval = setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

function stopClock() {
  // Your code here
  clearInterval(clockInterval);
}

document.getElementById('start-clock').addEventListener('click', startClock);
document.getElementById('stop-clock').addEventListener('click', stopClock);


// Challenge 3 — Countdown Timer
// Create a countdown from 10 to 0:
// - Updates every second
// - Shows "Time's up!" when done
// - Stops automatically at 0
// - Button restarts from 10

let countdownInterval;
let timeRemaining = 10;

function startCountdown() {
  // Your code here
  timeRemaining = 10;
  document.getElementById('countdown').textContent = timeRemaining;

  countdownInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById('countdown').textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdown').textContent = "Time's up!";
    }
  }, 1000);
}

document.getElementById('start-countdown').addEventListener('click', startCountdown);


// Challenge 4 — Debounced Search
// Implement search that:
// - Waits 500ms after user stops typing
// - Only then shows "Searching for: [query]"
// - Cancels previous timeout if user keeps typing

let searchTimeout;

document.getElementById('search').addEventListener('input', (e) => {
  // Your code here
});


// Challenge 5 — Fix the Loop
// Fix this code so it logs 0, 1, 2, 3, 4 (not 5, 5, 5, 5, 5)

for (var i = 0; i < 5; i++) {  
  setTimeout(() => {   // execute hoga hi hoga but jab execute hoga tab i ki value 5 hogi kyunki loop complete ho chuka hoga aur i 5 tak increment ho chuka hoga
    console.log(i);
  }, i * 1000); // This will log 5, 5, 5, 5, 5 because the loop finishes before the timeouts execute, and 'i' is a var which is function-scoped. By the time the timeouts run, 'i' has been incremented to 5.
  // but how setTimeout works when i becomes 5 the loop should break and the timeouts should not execute, but they do because setTimeout is asynchronous and the loop continues to run until it finishes. The timeouts are scheduled to run after the loop finishes, so they all see the final value of 'i' which is 5.
}
// Fix it THREE different ways!
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000); // Using 'let' instead of 'var' creates a new block scope for each iteration, so each timeout captures the correct value of 'i'.
}
for (var i = 0; i < 5; i++) {
  ((j) => {
    setTimeout(() => {
      console.log(j);
    }, j * 1000);
  })(i); // Using an IIFE (Immediately Invoked Function Expression) to create a new scope for each iteration, passing 'i' as an argument to capture its value.
}
for (var i = 0; i < 5; i++) {
  setTimeout(((j) => {
    return () => {
      console.log(j);
    };
  })(i), i * 1000); // Similar to the previous solution, but using a higher-order function to create the closure that captures 'i'.
}

// Challenge 6 — Delayed Messages
// Print messages with increasing delays:
// "Message 1" after 1 second
// "Message 2" after 2 seconds  
// "Message 3" after 3 seconds
// ...
// "Message 5" after 5 seconds

// Your code here
for(let i=1;i<6;i++){
  setTimeout(() => {
    console.log(`Message ${i} after ${i} second${i > 1 ? 's' : ''}`);
  },i*1000);
}
// output will be:
// Message 1 after 1 second
// Message 2 after 2 seconds
// Message 3 after 3 seconds
// Message 4 after 4 seconds
// Message 5 after 5 seconds

// Challenge 7 — Rate Limiter
// Create a function that only runs once per second:
// - If called multiple times, only first call runs
// - Wait 1 second before allowing next call

let canRun = true;

function rateLimitedFunction() {
  if (canRun) {
    console.log('Function executed!');
    canRun = false;
    // Your code here: Re-enable after 1 second
    setTimeout(() => {
      canRun = true;
    }, 1000);
  } else {
    console.log('Too fast! Wait 1 second.');
  }
}

// Test it:
// rateLimitedFunction(); // "Function executed!"
// rateLimitedFunction(); // "Too fast!"
// [wait 1 second]
// rateLimitedFunction(); // "Function executed!"


// Challenge 8 — Stopwatch
// Create a stopwatch:
// - Shows elapsed time in seconds.milliseconds
// - Start, stop, reset buttons
// - Uses setInterval (every 10ms for precision)

let stopwatchInterval;
let startTime;
let elapsedTime = 0;

function startStopwatch() {
  // Your code here
  if (!stopwatchInterval) {
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      const seconds = Math.floor(elapsedTime / 1000);
      const milliseconds = Math.floor((elapsedTime % 1000) / 10);
      document.getElementById('stopwatch').textContent = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
    }, 10);
  }
}

function stopStopwatch() {
  // Your code here
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
}

function resetStopwatch() {
  // Your code here
  stopStopwatch();
  elapsedTime = 0;
  document.getElementById('stopwatch').textContent = '0.00';
}

startStopwatch();
setTimeout(stopStopwatch, 5000);
resetStopwatch();