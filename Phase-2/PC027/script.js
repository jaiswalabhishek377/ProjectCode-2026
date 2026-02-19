// Challenge 1
console.log(0 || "fallback");
console.log(0 ?? "fallback");
console.log("" || "fallback");
console.log("" ?? "fallback");

// Challenge 2
const user = null;
console.log(user?.profile?.name ?? "Anonymous");

// Challenge 3
const temp = 22;
const weather = temp > 30 ? "Hot" : temp > 20 ? "Warm" : "Cold";
console.log(weather);

// Challenge 4 — what's the bug here?
const age = 0;
const userAge = age || "Age not provided";
console.log(userAge);
// How would you fix it?

// Challenge 5
let count = 5;
console.log(count++);  // what prints?
console.log(count);    // and now?



// fallback 0 fallback ""  
// Anonymous
// warm
// const userAge = age ?? "Age not provided";
// 5 6




// PC27 — Operators, Conditionals & Expressions

// 1. Arithmetic Operators
// javascriptlet a = 10, b = 3;

// a + b   // 13
// a - b   // 7
// a * b   // 30
// a / b   // 3.3333...
// a % b   // 1  ← modulo (remainder) — very useful!
// a ** b  // 1000 ← exponentiation (10 to the power of 3)

// // Increment / Decrement
// let x = 5;
// x++  // returns 5 THEN increments → x is now 6
// ++x  // increments FIRST → x is now 7
// x--  // same idea, opposite direction
// The one you'll use constantly: % (modulo). Checking if a number is even? n % 2 === 0. Cycling through an array? index % array.length.

// 2. Comparison Operators
// javascript5 > 3      // true
// 5 < 3      // false
// 5 >= 5     // true
// 5 <= 4     // false
// 5 === "5"  // false  (strict — use this always)
// 5 !== "5"  // true

// 3. Logical Operators — The Interesting Ones
// These don't just return true/false — they return actual values. This is key.
// javascript// AND (&&) — returns first falsy value, or the last value
// "hello" && 42          // 42      (both truthy, returns last)
// null && "hello"        // null    (first falsy, short-circuits)
// 0 && "hello"           // 0

// // OR (||) — returns first truthy value, or the last value
// null || "default"      // "default"  (classic default value pattern)
// "Alex" || "default"    // "Alex"
// 0 || 42                // 42

// // NOT (!)
// !true    // false
// !0       // true
// !!"hello" // true  ← double NOT converts to actual boolean
// Real world usage:
// javascript// || for default values (old way)
// const username = userInput || "Guest";

// // && for conditional execution
// isLoggedIn && showDashboard();

// 4. Nullish Coalescing ?? — The Modern Default
// javascript// || problem — it catches ALL falsy values
// const score = 0 || 100;    // 100 — wrong! 0 is a valid score

// // ?? fix — only catches null and undefined
// const score = 0 ?? 100;    // 0    — correct!
// const score = null ?? 100; // 100  ← only triggers for null/undefined
// Use ?? instead of || whenever 0 or "" are valid values.

// 5. Optional Chaining ?. — The Crash Preventer
// javascriptconst user = { profile: { name: "Alex" } };

// // Without optional chaining — crashes if profile is missing
// user.address.city        // TypeError: Cannot read properties of undefined

// // With optional chaining — returns undefined safely
// user?.address?.city      // undefined (no crash)
// user?.profile?.name      // "Alex"

// // Works on methods and arrays too
// user?.getAge?.()         // undefined if getAge doesn't exist
// arr?.[0]                 // undefined if arr is null/undefined

// 6. Conditionals
// if / else if / else:
// javascriptconst score = 72;

// if (score >= 90) {
//   console.log("A");
// } else if (score >= 80) {
//   console.log("B");
// } else if (score >= 70) {
//   console.log("C");
// } else {
//   console.log("F");
// }
// Ternary — one-liner for simple if/else:
// javascript// condition ? valueIfTrue : valueIfFalse
// const age = 20;
// const access = age >= 18 ? "Allowed" : "Denied";
// console.log(access); // "Allowed"

// // Nested ternary (use sparingly — gets unreadable fast)
// const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
// Switch — best for many exact value matches:
// javascriptconst day = "Monday";

// switch(day) {
//   case "Monday":
//   case "Tuesday":
//     console.log("Early week");
//     break;           // ← never forget break!
//   case "Friday":
//     console.log("Almost weekend");
//     break;
//   default:
//     console.log("Midweek");
// }

// 7. Short-Circuit Tricks in Real Code
// javascript// Guard clause — exit early instead of deep nesting
// function greet(name) {
//   if (!name) return "Name required";
//   return `Hello, ${name}!`;
// }

// // One-liner conditional render (used constantly in React later)
// const isAdmin = true;
// const panel = isAdmin && "Show Admin Panel";