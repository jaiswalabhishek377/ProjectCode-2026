PC40 — Error Handling & Debugging
Writing code that doesn't crash when things go wrong is what separates demos from production apps. Let's learn how to handle errors gracefully and debug like a pro! 💪

1. The Problem — Uncaught Errors Crash Everything
javascript// ❌ This crashes the entire app
function divide(a, b) {
  return a / b;
}

divide(10, 0);  // Infinity (not an error in JS!)
divide(10, "hello"); // NaN

const user = null;
console.log(user.name); // 💥 TypeError: Cannot read property 'name' of null
// Everything after this line never runs!

2. try/catch — Catch Errors Gracefully
javascript// ✅ Catch the error, app keeps running
try {
  const user = null;
  console.log(user.name); // throws error
} catch (error) {
  console.log("Something went wrong:", error.message);
  // "Something went wrong: Cannot read property 'name' of null"
}

console.log("App still running!"); // ✅ This still executes!
Structure:
javascripttry {
  // Code that might throw an error
} catch (error) {
  // Handle the error
}

3. Error Object Properties
javascripttry {
  const data = JSON.parse("{ invalid json }");
} catch (error) {
  console.log(error.name);    // "SyntaxError"
  console.log(error.message); // "Unexpected token i in JSON..."
  console.log(error.stack);   // Full stack trace (where error occurred)
}
Common Error Types:
javascript// ReferenceError — variable doesn't exist
console.log(nonExistentVar); // ReferenceError

// TypeError — wrong type operation
null.toString(); // TypeError

// SyntaxError — invalid syntax (caught at parse time)
eval("{ bad syntax }"); // SyntaxError

// RangeError — number out of range
new Array(-1); // RangeError

// URIError — invalid URI encoding
decodeURIComponent("%"); // URIError

4. finally — Always Runs
javascriptfunction fetchData() {
  const loadingSpinner = document.getElementById("spinner");
  
  try {
    loadingSpinner.style.display = "block"; // Show spinner
    const data = riskyOperation();
    return data;
  } catch (error) {
    console.error("Failed:", error.message);
    return null;
  } finally {
    loadingSpinner.style.display = "none"; // ✅ ALWAYS hides spinner
    // Runs whether try succeeds, fails, or even if there's a return!
  }
}
finally guarantees:

Runs even if try/catch has return
Runs even if error is thrown
Perfect for cleanup (close files, hide loaders, release resources)


5. throw — Create Your Own Errors
javascriptfunction withdraw(amount) {
  const balance = 100;
  
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }
  
  if (amount > balance) {
    throw new Error("Insufficient funds");
  }
  
  return balance - amount;
}

try {
  withdraw(-50); // throws error
} catch (error) {
  console.log(error.message); // "Amount must be positive"
}

try {
  withdraw(200); // throws error
} catch (error) {
  console.log(error.message); // "Insufficient funds"
}

6. Custom Error Classes
javascriptclass ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format");
  }
}

try {
  validateEmail("notanemail");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  } else if (error instanceof NetworkError) {
    console.log("Network issue:", error.message);
  } else {
    console.log("Unknown error:", error);
  }
}

7. Real-World Error Handling Patterns
Pattern 1: API Calls with Error States
javascriptasync function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    console.error("Fetch failed:", error);
    return { success: false, error: error.message };
  }
}

// Usage
const result = await fetchUser(123);
if (result.success) {
  console.log("User:", result.data);
} else {
  console.log("Error:", result.error);
}
Pattern 2: Form Validation
javascriptfunction validateForm(formData) {
  const errors = [];
  
  if (!formData.username || formData.username.length < 3) {
    errors.push("Username must be at least 3 characters");
  }
  
  if (!formData.email.includes("@")) {
    errors.push("Invalid email format");
  }
  
  if (formData.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  
  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }
  
  return true;
}

try {
  validateForm({ username: "ab", email: "bad", password: "short" });
} catch (error) {
  if (error instanceof ValidationError) {
    alert("Please fix these errors:\n" + error.message);
  }
}
Pattern 3: Retry Logic
javascriptasync function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error.message);
      
      if (i === maxRetries - 1) {
        throw new Error(`Failed after ${maxRetries} attempts`);
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

8. Console Methods for Debugging
javascript// Standard logging
console.log("Regular message");
console.info("Info message");
console.warn("Warning message"); // ⚠️ Yellow in DevTools
console.error("Error message");  // ❌ Red in DevTools

// Grouped logging
console.group("User Details");
console.log("Name: Alex");
console.log("Age: 25");
console.groupEnd();

// Table view (amazing for arrays/objects!)
const users = [
  { name: "Alex", age: 25, city: "NYC" },
  { name: "Sam", age: 30, city: "LA" }
];
console.table(users);

// Timing
console.time("Loop");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("Loop"); // "Loop: 2.34ms"

// Assert (only logs if condition is false)
console.assert(5 > 10, "5 is not greater than 10");

// Count
for (let i = 0; i < 5; i++) {
  console.count("Loop iteration");
}
// Loop iteration: 1
// Loop iteration: 2
// ...

// Trace (shows call stack)
function a() { b(); }
function b() { c(); }
function c() { console.trace("How did we get here?"); }
a();

9. DevTools Debugging (Chrome/Edge/Firefox)
Breakpoints
javascriptfunction calculateTotal(items) {
  debugger; // ⏸️ Pauses execution here when DevTools is open
  
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}
Or use DevTools UI:

Open DevTools (F12)
Go to Sources tab
Click line number to set breakpoint
Refresh page or trigger function
Execution pauses, inspect variables!

Reading Stack Traces
javascriptfunction level1() {
  level2();
}

function level2() {
  level3();
}

function level3() {
  throw new Error("Something broke!");
}

try {
  level1();
} catch (error) {
  console.log(error.stack);
}

// Output:
// Error: Something broke!
//   at level3 (file.js:10)  ← Error thrown here
//   at level2 (file.js:6)   ← Called by level2
//   at level1 (file.js:2)   ← Called by level1
//   at <anonymous>          ← Original call
Read from TOP to BOTTOM — top is where error occurred!

10. Defensive Programming
javascript// ❌ Assumes everything is perfect
function getUsername(user) {
  return user.profile.name; // 💥 if user is null/undefined
}

// ✅ Defensive — handles edge cases
function getUsername(user) {
  if (!user) return "Guest";
  if (!user.profile) return "Guest";
  return user.profile.name || "Guest";
}

// ✅ Even better — optional chaining
function getUsername(user) {
  return user?.profile?.name ?? "Guest";
}

// ❌ Assumes array exists
function getFirstItem(array) {
  return array[0];
}

// ✅ Defensive
function getFirstItem(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }
  return array[0];
}

11. Common Pitfalls
Silent Failures
javascript// ❌ Swallows error — hard to debug!
try {
  riskyOperation();
} catch (error) {
  // Nothing — error disappears!
}

// ✅ Always log or handle
try {
  riskyOperation();
} catch (error) {
  console.error("Operation failed:", error);
  // And/or show user message, retry, etc.
}
Catching Everything
javascript// ❌ Too broad
try {
  const data = JSON.parse(input);
  processData(data);
  saveToDatabase(data);
} catch (error) {
  console.log("Something failed"); // Which step?
}

// ✅ Specific handling
try {
  const data = JSON.parse(input);
  try {
    processData(data);
    saveToDatabase(data);
  } catch (error) {
    console.error("Processing/saving failed:", error);
  }
} catch (error) {
  console.error("Invalid JSON:", error);
}