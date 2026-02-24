// Challenge 1
// Destructure this object to get:
// - name and email directly
// - country with default "India"
// - city from nested address
// - log all three
const profile = {
  name: "Abhi",
  email: "abhi@gmail.com",
  address: { city: "Bangalore", zip: "560001" }
};

const { name, email, address: { city }, country = "India" } = profile;
console.log(name);    // "Abhi"
console.log(email);   // "abhi@gmail.com"
console.log(country); // "India"
console.log(city);    // "Bangalore"
// Challenge 2
// Predict the output
const [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a);      // 10
console.log(b);     // 20
console.log(rest);  // [30, 40, 50]

const { x, y, ...others } = { x: 1, y: 2, z: 3, w: 4 };
console.log(x);    // 1
console.log(others);  // { z: 3, w: 4 } — x and y are extracted, rest goes into others

// Challenge 3
// Write a function getFullName({ firstName, lastName, title = "Mr" })
// that returns "Mr. Alex Johnson"
// Test it with and without title

function getFullName({ firstName, lastName, title = "Mr" }) {
  return `${title}. ${firstName} ${lastName}`;
}

console.log(getFullName({ firstName: "Alex", lastName: "Johnson" })); // Mr is by default
// "Mr. Alex Johnson"

// Challenge 4
// Merge these without mutation and override price with 29.99
const product = { name: "Laptop", price: 999, brand: "Dell" };
const updates = { price: 29.99, stock: 50 };
// result should be: { name:"Laptop", price:29.99, brand:"Dell", stock:50 }

const mergedProduct = { ...product, ...updates };  // spread product first, then updates to override price and add stock
console.log(mergedProduct); // { name: "Laptop", price: 29.99, brand: "Dell", stock: 50 }

// Challenge 5
// Write a function that takes any number of scores
// and returns: { total, average, highest, lowest }
function getStats(...scores) {
  const total = scores.reduce((acc, score) => acc + score, 0);  // what is reudce? it takes a function and an initial value, and applies the function cumulatively to the array elements, resulting in a single output. Here we use it to sum up all scores starting from 0.
  const average = total / scores.length;
  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);
  return { total, average, highest, lowest };
}
getStats(80, 92, 75, 88, 95);
// { total: 430, average: 86, highest: 95, lowest: 75 }


// PC34 — Destructuring, Spread & Rest

// 1. Object Destructuring
// javascriptconst user = { name: "Alex", age: 25, city: "NYC", role: "admin" };

// // ❌ Old way — repetitive
// const name = user.name;
// const age  = user.age;

// // ✅ Destructuring — extract in one line
// const { name, age } = user;
// console.log(name); // "Alex"
// console.log(age);  // 25

// // Rename while destructuring
// const { name: userName, age: userAge } = user;
// console.log(userName); // "Alex"
// console.log(userAge);  // 25

// // Default values — if property doesn't exist
// const { name, country = "USA" } = user;
// console.log(country); // "USA" — user has no country property

// // Skip properties you don't need
// const { name, role } = user; // ignore age and city

// 2. Nested Object Destructuring
// javascriptconst person = {
//   name: "Alex",
//   address: {
//     city: "NYC",
//     zip: "10001"
//   },
//   scores: {
//     math: 95,
//     english: 88
//   }
// };

// // ❌ Without destructuring
// const city = person.address.city;
// const math = person.scores.math;

// // ✅ Nested destructuring
// const { address: { city, zip }, scores: { math } } = person;
// console.log(city); // "NYC"
// console.log(math); // 95
// console.log(address); // ❌ ReferenceError — address itself not extracted!

// 3. Array Destructuring
// javascriptconst colors = ["red", "green", "blue", "yellow"];

// // Extract by position
// const [first, second] = colors;
// console.log(first);  // "red"
// console.log(second); // "green"

// // Skip elements with commas
// const [,, third] = colors;
// console.log(third); // "blue"

// // Default values
// const [a, b, c, d, e = "purple"] = colors;
// console.log(e); // "purple" — index 4 doesn't exist

// // Swap variables — classic trick
// let x = 1, y = 2;
// [x, y] = [y, x];
// console.log(x); // 2
// console.log(y); // 1

// 4. Destructuring in Function Parameters
// javascript// ❌ Old way
// function greet(user) {
//   console.log(`Hi ${user.name}, you are ${user.age}`);
// }

// // ✅ Destructure directly in params
// function greet({ name, age }) {
//   console.log(`Hi ${name}, you are ${age}`);
// }

// greet({ name: "Alex", age: 25 }); // "Hi Alex, you are 25"

// // With defaults
// function createUser({ name = "Guest", role = "user", age = 0 } = {}) {
//   return { name, role, age };
// }

// createUser({ name: "Alex" });  // { name: "Alex", role: "user", age: 0 }
// createUser();                  // { name: "Guest", role: "user", age: 0 }
// // the = {} at end means function works even with no args

// 5. Spread Operator ...
// javascript// Spread ARRAYS — expand elements
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// const merged = [...arr1, ...arr2];      // [1,2,3,4,5,6]
// const copy   = [...arr1];              // [1,2,3] — shallow copy
// const added  = [...arr1, 10, 11];      // [1,2,3,10,11]

// // Spread OBJECTS — expand properties
// const defaults = { theme: "light", lang: "en", fontSize: 14 };
// const custom   = { theme: "dark", fontSize: 18 };

// const settings = { ...defaults, ...custom };
// // { theme: "dark", lang: "en", fontSize: 18 }
// // right side wins on conflicts ✅

// // Spread into function arguments
// const nums = [3, 1, 8, 2, 5];
// Math.max(...nums);  // 8 — same as Math.max(3,1,8,2,5)
// Math.min(...nums);  // 1

// 6. Rest Parameters ...
// Rest collects remaining elements into an array:
// javascript// Rest in functions — must be LAST parameter
// function sum(...numbers) {
//   return numbers.reduce((acc, n) => acc + n, 0);
// }

// sum(1, 2, 3);       // 6
// sum(1, 2, 3, 4, 5); // 15

// // Mix with regular params
// function logInfo(first, second, ...rest) {
//   console.log(first);  // first arg
//   console.log(second); // second arg
//   console.log(rest);   // everything else as array
// }

// logInfo("a", "b", "c", "d", "e");
// // "a"
// // "b"
// // ["c", "d", "e"]

// 7. Rest in Destructuring
// javascript// Object rest — grab some, collect the rest
// const { name, age, ...remaining } = { 
//   name: "Alex", age: 25, city: "NYC", role: "admin" 
// };

// console.log(name);      // "Alex"
// console.log(age);       // 25
// console.log(remaining); // { city: "NYC", role: "admin" }

// // Array rest
// const [first, second, ...others] = [1, 2, 3, 4, 5];
// console.log(first);  // 1
// console.log(second); // 2
// console.log(others); // [3, 4, 5]

// 8. Spread vs Rest — The Distinction
// javascript// SPREAD — one → many (unpacks)
// const arr = [1, 2, 3];
// Math.max(...arr); // spreads array INTO individual args

// // REST — many → one (packs)
// function sum(...nums) { } // packs individual args INTO array

// // Memory trick:
// // SPREAD = unpacking a suitcase 🧳 → clothes everywhere
// // REST   = packing a suitcase 🧳 ← collecting clothes