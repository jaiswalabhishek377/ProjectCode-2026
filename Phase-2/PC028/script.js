// Challenge 1
// Print all even numbers from 1 to 20 using a for loop

// Challenge 2
// Loop this array with for...of and print:
// "Alex passed" or "Alex failed" depending on score >= 60
const students = [
  { name: "Alex", score: 72 },
  { name: "Sam", score: 45 },
  { name: "Jordan", score: 88 },
  { name: "Taylor", score: 55 },
];

// Challenge 3
// Use for...in to print every key-value pair of this object
const car = { brand: "Toyota", model: "Supra", year: 2023, hp: 382 };

// Challenge 4 — predict the output
const nums = [1, 2, 3, 4, 5];
for (const num of nums) {
  if (num === 3) continue;
  if (num === 5) break;
  console.log(num);
}

// Challenge 5
// Use a while loop to find the first number > 1 
// that is divisible by both 4 and 6


// ✅ Fix — two valid approaches: challenge1
for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) console.log(i); // filter evens
}

// or cleaner — step by 2
for (let i = 2; i <= 20; i += 2) {
  console.log(i); // 2 4 6 8 ... 20
}


// ✅ Fix: challenge 2
for (const student of students) {
  student.score >= 60
    ? console.log(`${student.name} passed`)
    : console.log(`${student.name} failed`);
}

// challenge 3
for(const key in car){
console.log(key, car[key]);}

// challenge 4
// Output: 1 2 4

//challenge 5
let num = 2; // start from the first number > 1
while (true) {
  if (num % 4 === 0 && num % 6 === 0) {
    console.log(num); // 12
    break; // exit loop once we find the number
  }
    num++; // check next number
}




// PC28 — Loops & Iteration

// 1. for Loop — The Classic
// javascriptfor (let i = 0; i < 5; i++) {
//   console.log(i); // 0 1 2 3 4
// }

// // Three parts: [initializer]; [condition]; [update]
// // Runs as long as condition is true

// // Looping an array by index
// const fruits = ["apple", "banana", "mango"];

// for (let i = 0; i < fruits.length; i++) {
//   console.log(i, fruits[i]); // 0 apple, 1 banana, 2 mango
// }

// // Looping backwards
// for (let i = fruits.length - 1; i >= 0; i--) {
//   console.log(fruits[i]); // mango, banana, apple
// }

// 2. while & do...while
// javascript// while — checks condition BEFORE each run
// let count = 0;
// while (count < 3) {
//   console.log(count); // 0 1 2
//   count++;
// }

// // do...while — runs ONCE first, THEN checks condition
// let num = 10;
// do {
//   console.log(num); // prints 10 even though condition is false
// } while (num < 5);
// When to use while: when you don't know how many iterations you need upfront — e.g. keep asking for input until valid.

// 3. for...of — Best for Arrays
// javascriptconst scores = [85, 92, 78, 95];

// for (const score of scores) {
//   console.log(score); // 85 92 78 95
// }

// // Works on any iterable — strings too!
// for (const char of "hello") {
//   console.log(char); // h e l l o
// }

// // Need the index too? Use entries()
// for (const [index, score] of scores.entries()) {
//   console.log(index, score); // 0 85, 1 92...
// }

// 4. for...in — For Objects
// javascriptconst person = { name: "Alex", age: 25, city: "NYC" };

// for (const key in person) {
//   console.log(key, person[key]);
//   // name Alex
//   // age 25
//   // city NYC
// }
// ⚠️ Don't use for...in on arrays — it iterates keys (as strings), can pick up inherited properties, and order isn't guaranteed. Use for...of for arrays.

// 5. forEach — Array Method Style
// javascriptconst names = ["Sam", "Alex", "Jordan"];

// names.forEach((name, index) => {
//   console.log(index, name); // 0 Sam, 1 Alex, 2 Jordan
// });

// // Cleaner than a for loop when you don't need break/continue
// ⚠️ forEach can't be stopped — no break or continue. If you need to exit early, use a regular for or for...of.

// 6. break & continue
// javascript// break — exits the loop entirely
// for (let i = 0; i < 10; i++) {
//   if (i === 5) break;
//   console.log(i); // 0 1 2 3 4
// }

// // continue — skips current iteration, keeps going
// for (let i = 0; i < 6; i++) {
//   if (i % 2 === 0) continue; // skip even numbers
//   console.log(i); // 1 3 5
// }
// ```

// ---

// ## 7. When to Use What — Quick Guide
// ```
// Counting / index needed    → for
// Unknown iterations         → while
// Must run at least once     → do...while
// Arrays (clean syntax)      → for...of  ← default choice
// Objects                    → for...in
// Simple array side effect   → forEach
