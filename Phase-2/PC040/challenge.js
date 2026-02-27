// Challenge 1 — Safe Division
function safeDivide(a, b) {
  // Handle these cases:
  // - Division by zero → throw error
  // - Non-number inputs → throw error
  // - Valid inputs → return result
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error("Inputs must be numbers");
  }
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
try {
console.log(safeDivide(10, 2));    // 5
console.log(safeDivide(10, 0));    // throws "Cannot divide by zero"
console.log(safeDivide("10", 2));  // throws "Inputs must be numbers"
} catch (error) {
  console.error(error.message);
}
// Challenge 2 — Safe JSON Parse
function safeJSONParse(jsonString) {
  // Try to parse JSON
  // If it fails, return null instead of throwing
  // If it succeeds, return the parsed object
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

console.log(safeJSONParse('{"name":"Alex"}')); // { name: "Alex" }
console.log(safeJSONParse("invalid json"));    // null

// Challenge 3 — Retry Function
async function retryOperation(fn, maxRetries = 3) {
  // Try to execute fn()
  // If it fails, retry up to maxRetries times
  // If all retries fail, throw the last error
  // Add 1 second delay between retries
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw lastError;
}
// for (let i = 0; i < maxRetries; i++) {
//     try {
//       return await fn();  // ✅ Call the passed function
//     } catch (error) {
//       console.log(`Attempt ${i + 1} failed:`, error.message);
//       if (i === maxRetries - 1) {
//         throw error;  // Re-throw last error
//       }
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }
// }
// Usage example:
let attempts = 0;
const unreliableFunction = () => {
  attempts++;
  if (attempts < 3) throw new Error("Failed");
  return "Success!";
};

// Challenge 4 — Form Validator
class FormValidator {
  constructor() {
    this.errors = [];
  }
  
  required(value, fieldName) {
    // Add error if value is empty/null/undefined
    if (value === null || value === undefined || value === "") {
      this.errors.push(`${fieldName} is required`);
    }
  }
  
  minLength(value, length, fieldName) {
    // Add error if value.length < length
    if (typeof value === 'string' && value.length < length) {
      this.errors.push(`${fieldName} must be at least ${length} characters`);
    }
  }
  
  email(value, fieldName) {
    // Add error if value doesn't contain @
    if (typeof value === 'string' && !value.includes('@')) {
      this.errors.push(`${fieldName} must be a valid email`);
    }
  }
  
  getErrors() {
    // Return all errors as array
    return this.errors;
  }
  
  isValid() {
    // Return true if no errors
    return this.errors.length === 0;
  }
}

// Usage:
const validator = new FormValidator();
validator.required(username, "Username");
validator.minLength(username, 3, "Username");
validator.email(email, "Email");

if (!validator.isValid()) {
  console.log("Errors:", validator.getErrors());
}

// Challenge 5 — Safe Array Access
function safeGet(array, index, defaultValue = null) {
  // Return array[index] if it exists
  // Otherwise return defaultValue
  // Handle non-array inputs gracefully
  if (!Array.isArray(array) || index < 0 || index >= array.length) {
    return defaultValue;
  }
  return array[index];
}

const arr = [10, 20, 30];
console.log(safeGet(arr, 0));       // 10
console.log(safeGet(arr, 5));       // null
console.log(safeGet(arr, 5, "N/A")); // "N/A"
console.log(safeGet(null, 0));      // null

// Challenge 6 — Custom Error
// Create a DatabaseError class that extends Error
// Constructor should accept message and errorCode
// Add a isRetryable() method that returns true if code is 500-599

class DatabaseError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = "DatabaseError";
    this.errorCode = errorCode;
  }
  isRetryable() {
    return this.errorCode >= 500 && this.errorCode < 600;
  }
}
error1 = new DatabaseError("Connection failed", 503);
console.log(error1.message); // "Connection failed"
console.log(error1.errorCode); // 503
error2 = new DatabaseError("Invalid query", 400);
console.log(error2.isRetryable()); // false


// Challenge 7 — Debug This! 🐛
// What's wrong with this code? Fix it!
function processUserData(users) {
  const results = [];
  // Fix 1: i < users.length (not <=)
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    // Fix 2: Optional chaining for safety
    const name = user?.profile?.name;
    const age = user?.age;
    // Fix 3: Skip invalid users
    if (!name || age === undefined) {
      console.warn(`Skipping invalid user at index ${i}`);
      continue;
    }
    results.push({
      name: name.toUpperCase(),
      age: age * 2
    });
  }
  return results;
}

const users = [
  { profile: { name: "Alex" }, age: 25 },
  { profile: null, age: 30 },
  { age: 20 }
];

processUserData(users); // Find and fix ALL bugs!

// When to use try/catch:

// Parsing (JSON, Date, etc.)
// External operations (fetch, file read)
// Code that explicitly throws

// When NOT to use try/catch:

// Validation (check BEFORE operation)
// Accessing array/object properties (use optional chaining)
// Math operations (they return special values, not errors)


// // ❌ These NEVER throw — use if-checks:  infinity, NaN, undefined, null, etc.
// - new Date()           → returns Invalid Date
// - parseInt()           → returns NaN
// - parseFloat()         → returns NaN
// - array[index]         → returns undefined
// - a / b                → returns Infinity or NaN
// - obj.property         → returns undefined
// - Number()             → returns NaN
// - Math.anything()      → returns special values

// // ✅ These CAN throw — use try/catch:
// - JSON.parse()
// - JSON.stringify() (circular refs)
// - fetch()
// - response.json()
// - null.anything        → TypeError
// - undeclaredVariable   → ReferenceError
// - throw new Error()

// function getCity(user) {
//   // This CAN throw if user or address is null/undefined
//   // but if-check is the BETTER approach (defensive programming)
  
//   // ✅ Option 1: if-checks
//   if (!user || !user.address) {
//     return null;
//   }
//   return user.address.city;
  
//   // ✅ Option 2: optional chaining (best!)
//   return user?.address?.city ?? null;
// }