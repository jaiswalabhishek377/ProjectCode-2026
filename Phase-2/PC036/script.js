// PC36 — Arrays & Higher Order Functions
// This is the most used set of methods in all of modern JS. Master these and 90% of data transformation in real projects becomes trivial. Let's go!

//1. map() — Transform Every Element
javascript// Returns a NEW array — never mutates original
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const squared = numbers.map(n => n ** 2);
// [1, 4, 9, 16, 25]

// Real world — transform array of objects
const users = [
  { name: "Alex", age: 25 },
  { name: "Sam",  age: 17 },
  { name: "Abhi", age: 20 }
];

const names = users.map(user => user.name);
// ["Alex", "Sam", "Abhi"]

const greetings = users.map(u => `Hi ${u.name}!`);
// ["Hi Alex!", "Hi Sam!", "Hi Abhi!"]

//2. filter() — Keep What Passes the Test
javascript// Returns NEW array with elements where callback returns true
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8]

const odds = numbers.filter(n => n % 2 !== 0);
// [1, 3, 5, 7]

// Real world
const users = [
  { name: "Alex", age: 25, active: true  },
  { name: "Sam",  age: 17, active: false },
  { name: "Abhi", age: 20, active: true  },
  { name: "John", age: 15, active: true  }
];

const adults      = users.filter(u => u.age >= 18);
const activeUsers = users.filter(u => u.active);
const activeAdults = users.filter(u => u.active && u.age >= 18);

//3. reduce() — Boil Down to One Value javascript/
// Most powerful, most misunderstood
// accumulator = running result
// current     = current element

const numbers = [1, 2, 3, 4, 5];

// Sum
const total = numbers.reduce((acc, curr) => acc + curr, 0);
// 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15
// 15

// Product
const product = numbers.reduce((acc, curr) => acc * curr, 1);
// 120

// Max value without Math.max
const max = numbers.reduce((acc, curr) => curr > acc ? curr : acc, -Infinity);
// 5

// Real world — total cart price
const cart = [
  { item: "Laptop", price: 999, qty: 1 },
  { item: "Mouse",  price: 29,  qty: 2 },
  { item: "Pad",    price: 15,  qty: 3 }
];

const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
// 999 + 58 + 45 = 1102

//4. find() & findIndex()javascript 
const users = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Sam"  },
  { id: 3, name: "Abhi" }
];

// find — returns FIRST matching element (or undefined)
const user = users.find(u => u.id === 2);
// { id: 2, name: "Sam" }

const missing = users.find(u => u.id === 99);
// undefined

// findIndex — returns INDEX of first match (or -1)
const idx = users.findIndex(u => u.id === 2);
// 1

const notFound = users.findIndex(u => u.id === 99);
// -1

// Common pattern — check before using
const found = users.find(u => u.id === 2);
if (found) {
  console.log(found.name); // safe ✅
}

//5. some() & every()
javascriptconst numbers = [2, 4, 6, 7, 8];

// some — is AT LEAST ONE true? (like OR)
numbers.some(n => n % 2 !== 0);  // true — 7 is odd
numbers.some(n => n > 100);      // false — none over 100

// every — are ALL true? (like AND)
numbers.every(n => n > 0);       // true — all positive
numbers.every(n => n % 2 === 0); // false — 7 is odd

// Real world
const users = [
  { name: "Alex", verified: true  },
  { name: "Sam",  verified: false },
  { name: "Abhi", verified: true  }
];

const anyUnverified  = users.some(u => !u.verified);   // true
const allVerified    = users.every(u => u.verified);   // false

//6. flat() & flatMap()
javascript// flat — flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];

nested.flat();    // [1, 2, 3, 4, [5, 6]] — one level
nested.flat(2);   // [1, 2, 3, 4, 5, 6]  — two levels
nested.flat(Infinity); // flatten no matter how deep

// flatMap — map then flatten one level (very efficient)
const sentences = ["Hello World", "I love JS"];

sentences.flatMap(s => s.split(" "));
// ["Hello", "World", "I", "love", "JS"]
// same as sentences.map(...).flat() but faster

//7. Chaining — The Real Power javascript
const students = [
  { name: "Alex",  score: 85, grade: "A" },
  { name: "Sam",   score: 45, grade: "F" },
  { name: "Abhi",  score: 92, grade: "A" },
  { name: "John",  score: 67, grade: "B" },
  { name: "Taylor",score: 38, grade: "F" }
];

// Get names of A-grade students, sorted alphabetically
const topStudents = students
  .filter(s => s.grade === "A")        // keep A students
  .map(s => s.name)                    // extract names
  .sort();                             // sort alphabetically

// ["Abhi", "Alex"]

// Total score of passing students (score >= 50)
const passingTotal = students
  .filter(s => s.score >= 50)
  .reduce((acc, s) => acc + s.score, 0);
// 85 + 92 + 67 = 244

//8. sort() — The Tricky One
javascript// ⚠️ Default sort converts to STRINGS — breaks numbers!
[10, 2, 30, 4].sort(); // [10, 2, 30, 4] ← wrong! sorted as strings

// ✅ Always pass a compare function for numbers
[10, 2, 30, 4].sort((a, b) => a - b); // [2, 4, 10, 30] ascending
[10, 2, 30, 4].sort((a, b) => b - a); // [30, 10, 4, 2] descending

// Sort objects by property
const users = [
  { name: "Sam",  age: 17 },
  { name: "Alex", age: 25 },
  { name: "Abhi", age: 20 }
];

users.sort((a, b) => a.age - b.age);
// Sam(17), Abhi(20), Alex(25) — youngest first

users.sort((a, b) => a.name.localeCompare(b.name));
// Alex, Abhi, Sam — alphabetical