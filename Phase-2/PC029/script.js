// Your Challenge
// javascript Challenge 1
// Rewrite this as: 
// a) a function expression
// b) an arrow function with implicit return
function square(n) {
  return n * n;
}

// a) function expression
const squareExpression = function(n) {
  return n * n;
};

// b) arrow function with implicit return
const squareArrow = (n) => n * n;

// Challenge 2
// What's the output? Why?
console.log(sayHello("Alex"));   // ReferenceError — sayHello is not defined yet

function sayHello(name) {
  return `Hello ${name}`;
}

console.log(sayBye("Alex"));    //reference error — sayBye is not defined yet

const sayBye = (name) => `Bye ${name}`; // function expression and arrow functions are not hoisted, so they can't be called before they're defined in the code. Only function declarations are hoisted, which is why sayHello works but sayBye doesn't.


// Challenge 3
// Write a function makeCounter(start)
// that returns a function which increments and 
// returns the count each time it's called
const counter = makeCounter(10);
console.log(counter()); // 11
console.log(counter()); // 12
console.log(counter()); // 13


function makeCounter(start) {
  let count = start;
    return function() {
    count++;
    return count;
    }
}

// Challenge 4
// Write an IIFE that creates a username 
// by combining a firstName and lastName,
// logs it, and keeps both variables private

(function() {
  const firstName = "Alex";
  const lastName = "Johnson";
  const username = `${firstName}_${lastName}`;
  console.log(username);
})();

// Challenge 5
// Fix the bug
const getFullName = (first, last = first) => {
  return `${first} ${last}`;
}
console.log(getFullName("Alex"));       // should print "Alex Alex"
console.log(getFullName("Alex", ""));   // should print "Alex "
// Currently challenge 5 has a subtle bug — can you spot it?

// no bug int this code.

















// PC29 — Functions: All Forms

// 1. Function Declaration
// javascriptfunction greet(name) {
//   return `Hello, ${name}!`;
// }

// console.log(greet("Alex")); // "Hello, Alex!"
// Key trait — hoisted. You can call it before it's defined in the file:
// javascriptconsole.log(add(2, 3)); // 5 — works fine!

// function add(a, b) {
//   return a + b;
// }

// 2. Function Expression
// javascriptconst greet = function(name) {
//   return `Hello, ${name}!`;
// };

// console.log(greet("Alex")); // "Hello, Alex!"
// Key trait — NOT hoisted. Must define before calling:
// javascriptconsole.log(add(2, 3)); // ❌ ReferenceError — can't access before init

// const add = function(a, b) {
//   return a + b;
// };

// 3. Arrow Functions
// javascript// Full form
// const greet = (name) => {
//   return `Hello, ${name}!`;
// };

// // Implicit return — no curly braces, no return keyword
// const greet = (name) => `Hello, ${name}!`;

// // Single parameter — can drop parentheses
// const double = n => n * 2;

// // No parameters — empty parens required
// const sayHi = () => "Hi!";

// // Returning an object — wrap in parentheses
// const getUser = () => ({ name: "Alex", age: 25 });
// ⚠️ Arrow functions don't have their own this — comes back in PC31. For now just know it's a difference.

// 4. Default Parameters
// javascriptfunction greet(name = "stranger", greeting = "Hello") {
//   return `${greeting}, ${name}!`;
// }

// greet("Alex", "Hey"); // "Hey, Alex!"
// greet("Alex");        // "Hello, Alex!"
// greet();              // "Hello, stranger!"

// // Works with arrow functions too
// const multiply = (a, b = 2) => a * b;
// multiply(5);    // 10
// multiply(5, 3); // 15

// 5. IIFE — Immediately Invoked Function Expression
// javascript// Runs once immediately — no need to call it separately
// (function() {
//   console.log("I run immediately!");
// })();

// // With arrow function
// (() => {
//   console.log("Me too!");
// })();

// // Useful for: creating a private scope, one-time setup code
// (function() {
//   const secret = "nobody can access this from outside";
//   console.log(secret);
// })();

// console.log(secret); // ❌ ReferenceError — truly private

// 6. Functions are First-Class Citizens
// This is what makes JS powerful — functions can be:
// javascript// 1. Stored in a variable (you've seen this)
// const add = (a, b) => a + b;

// // 2. Passed as an argument
// function runTwice(fn) {
//   fn();
//   fn();
// }
// runTwice(() => console.log("hello")); // hello hello

// // 3. Returned from a function
// function multiplier(factor) {
//   return (number) => number * factor; // returns a function!
// }

// const double = multiplier(2);
// const triple = multiplier(3);

// double(5);  // 10
// triple(5);  // 15
// That last pattern — a function returning a function — is called a higher-order function. You'll see this everywhere in real JS.

// 7. Pure vs Impure Functions
// javascript// Pure — same input always gives same output, no side effects
// const add = (a, b) => a + b;

// // Impure — depends on or modifies outside state
// let total = 0;
// const addToTotal = (n) => {
//   total += n; // modifies external variable — side effect!
// };
// Pure functions are easier to test and debug — aim for them by default.

