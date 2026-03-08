Let's MASTER PC52 — Event Loop, setTimeout & setInterval! 🔥🔥
This is THE MOST IMPORTANT concept in JavaScript! Understanding the event loop is what separates junior developers from senior developers. Let's unlock it! 💪

1. The JavaScript Engine — Single-Threaded
Critical Fact: JavaScript can only do ONE thing at a time!
javascriptconsole.log('First');
console.log('Second');
console.log('Third');

// Output (in order):
// "First"
// "Second"
// "Third"
Each line waits for the previous one to finish. This is synchronous execution.

2. The Problem — Blocking Code
javascriptconsole.log('Start');

// ❌ This blocks everything for 3 seconds!
for (let i = 0; i < 3000000000; i++) {
  // Heavy computation
}

console.log('End');

// Browser is FROZEN for 3 seconds!
// User can't click, scroll, or do ANYTHING 💀
In the real world:

API calls take time (100ms - 2000ms)
File uploads take time
Database queries take time
Animations need smooth updates

We can't block the entire browser waiting for these!

3. The Solution — Asynchronous JavaScript
javascriptconsole.log('Start');

// ⏰ setTimeout schedules code to run LATER
setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);

console.log('End');

// Output (immediately):
// "Start"
// "End"
// [waits 2 seconds]
// "This runs after 2 seconds"
```

**Key insight:** `console.log('End')` runs **before** the setTimeout callback, even though setTimeout comes first in the code!

---

## 4. The Event Loop — How It Works

### The Three Key Components
```
┌─────────────────────────────────────────┐
│         1. CALL STACK                   │
│  (Where JavaScript runs code)           │
│  - Executes one function at a time      │
│  - LIFO (Last In, First Out)            │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         2. WEB APIs                     │
│  (Browser handles these)                │
│  - setTimeout                           │
│  - DOM events                           │
│  - Fetch requests                       │
│  - setInterval                          │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         3. CALLBACK QUEUE               │
│  (Waiting to run)                       │
│  - Callbacks from Web APIs              │
│  - Waits for Call Stack to be empty    │
└─────────────────────────────────────────┘
The Event Loop Rule
The Event Loop checks:

Is the Call Stack empty?
If yes, take first callback from Queue
Push it to Call Stack
Repeat forever!


5. Visualizing the Event Loop
Example 1: Basic setTimeout
javascriptconsole.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

console.log('C');

// Output:
// "A"
// "C"
// "B"  ← Even with 0ms delay!
```

**Step-by-step:**
```
1. console.log('A') → Call Stack → Execute → "A" printed
2. setTimeout → Sent to Web API (starts timer)
3. console.log('C') → Call Stack → Execute → "C" printed
4. Call Stack is EMPTY now
5. Timer finishes → Callback goes to Queue
6. Event Loop moves callback to Call Stack
7. console.log('B') → Execute → "B" printed
Example 2: Multiple Timeouts
javascriptconsole.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 1000);

setTimeout(() => {
  console.log('Timeout 2');
}, 500);

setTimeout(() => {
  console.log('Timeout 3');
}, 0);

console.log('End');

// Output:
// "Start"
// "End"
// "Timeout 3"  ← 0ms (but still async!)
// "Timeout 2"  ← 500ms
// "Timeout 1"  ← 1000ms

6. setTimeout — One-Time Delay
Basic Syntax
javascript// setTimeout(callback, delay, arg1, arg2, ...)
setTimeout(() => {
  console.log('Hello after 2 seconds');
}, 2000);
With Arguments
javascriptfunction greet(name, age) {
  console.log(`Hello ${name}, you are ${age} years old`);
}

setTimeout(greet, 2000, 'Alex', 25);
// After 2 seconds: "Hello Alex, you are 25 years old"
Canceling setTimeout
javascriptconst timerId = setTimeout(() => {
  console.log('This will never run');
}, 5000);

// Cancel it before it runs
clearTimeout(timerId);
Real-World: Debounced Search
javascriptlet searchTimeout;

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value;
  
  // Clear previous timeout
  clearTimeout(searchTimeout);
  
  // Set new timeout
  searchTimeout = setTimeout(() => {
    console.log('Searching for:', query);
    // Make API call here
  }, 500); // Wait 500ms after user stops typing
});

7. setInterval — Repeated Execution
Basic Syntax
javascript// setInterval(callback, delay)
setInterval(() => {
  console.log('This runs every 2 seconds');
}, 2000);
Canceling setInterval
javascriptconst intervalId = setInterval(() => {
  console.log('Tick');
}, 1000);

// Stop after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log('Interval stopped');
}, 5000);
Real-World: Digital Clock
javascriptfunction updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById('clock').textContent = timeString;
}

// Update immediately
updateClock();

// Then update every second
setInterval(updateClock, 1000);
Real-World: Countdown Timer
javascriptlet timeLeft = 60; // 60 seconds

const countdown = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  document.getElementById('timer').textContent = 
    `${minutes}:${String(seconds).padStart(2, '0')}`;
  
  timeLeft--;
  
  if (timeLeft < 0) {
    clearInterval(countdown);
    document.getElementById('timer').textContent = 'Time\'s up!';
  }
}, 1000);

8. setInterval vs Recursive setTimeout
setInterval (Fixed Interval)
javascript// ⚠️ Interval doesn't wait for function to finish!
setInterval(() => {
  console.log('Start');
  // If this takes 3 seconds, next call might overlap!
  heavyOperation();
  console.log('End');
}, 2000);
Recursive setTimeout (Safer)
javascript// ✅ Next call waits for previous to finish
function repeatingTask() {
  console.log('Start');
  heavyOperation();
  console.log('End');
  
  // Schedule next call AFTER this one finishes
  setTimeout(repeatingTask, 2000);
}

repeatingTask();
When to use each:

setInterval: Simple timers, clocks, animations
Recursive setTimeout: API polling, tasks that might take variable time


9. Common Event Loop Gotchas
Gotcha 1: setTimeout(0) is NOT Instant
javascriptconsole.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

console.log('C');

// Output: A, C, B
// Even 0ms goes through the event loop!
Gotcha 2: All Synchronous Code Runs First
javascriptsetTimeout(() => console.log('1'), 0);
setTimeout(() => console.log('2'), 0);
setTimeout(() => console.log('3'), 0);

console.log('4');
console.log('5');

// Output: 4, 5, 1, 2, 3
// ALL sync code finishes before ANY async code runs
Gotcha 3: Infinite Loop Blocks Forever
javascript// ❌ This freezes the browser FOREVER
while (true) {
  // Event loop can NEVER run!
}

// None of these will EVER execute:
setTimeout(() => console.log('Never runs'), 1000);
document.getElementById('btn').addEventListener('click', () => {
  console.log('Button never clickable');
});
Gotcha 4: Closure in Loops
javascript// ❌ WRONG: All print 3!
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3 (i is 3 when callbacks run!)
  }, 1000);
}

// ✅ FIX 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2
  }, 1000);
}

// ✅ FIX 2: Use IIFE
for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i); // 0, 1, 2
    }, 1000);
  })(i);
}

// ✅ FIX 3: Pass as argument
for (var i = 0; i < 3; i++) {
  setTimeout((i) => {
    console.log(i); // 0, 1, 2
  }, 1000, i);
}

10. Microtasks vs Macrotasks (Advanced)
Two Types of Queues
javascriptconsole.log('Start');

// MACROTASK (setTimeout, setInterval, setImmediate)
setTimeout(() => {
  console.log('Macrotask');
}, 0);

// MICROTASK (Promises, queueMicrotask)
Promise.resolve().then(() => {
  console.log('Microtask');
});

console.log('End');

// Output:
// "Start"
// "End"
// "Microtask"  ← Runs BEFORE macrotasks!
// "Macrotask"
Priority:

Synchronous code (Call Stack)
Microtasks (Promises)
Macrotasks (setTimeout, setInterval)