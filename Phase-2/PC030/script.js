// Challenge 1 — Predict output and explain WHY
function outer() {
  let x = 10;
  
  function inner() {
    let y = 20;
    console.log(x + y);   // 30 — inner can access x from outer scope
  }
  
  inner();
  console.log(typeof y);  // "undefined" — y is not defined in this scope, but typeof doesn't throw an error
}
outer();

// Challenge 2 — Predict output
console.log(a);  // undefined — var is hoisted but not initialized
var a = 5;
console.log(a); //5

console.log(b);  // ReferenceError — let is hoisted but in Temporal Dead Zone, can't access before declaration
let b = 5;

// Challenge 3
// Build a createWallet(initialAmount) function that returns
// an object with three methods:
// - add(amount)      → adds to balance, returns new balance
// - spend(amount)    → deducts if sufficient, else "Not enough funds"
// - balance()        → returns current balance
// balance variable must be PRIVATE (not directly accessible)

const wallet = createWallet(50);
console.log(wallet.add(30));     // 80
console.log(wallet.spend(200));  // "Not enough funds"
console.log(wallet.spend(40));   // 40
console.log(wallet.balance());   // 40
console.log(wallet.balance);     // undefined — private!

function createWallet(initialAmount) {
  let balance = initialAmount; 

  return {
    add(amount) {
      balance += amount;
      return balance; 
    },
    spend(amount) {
      if (amount > balance) return "Not enough funds";
      balance -= amount;
      return balance;
    },
    balance() {       
      return balance; 
    }
  };
} 

// Challenge 4 — The loop closure classic
// Fix this so it prints 0, 1, 2 with a 1 second delay
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Challenge 5 — Build a makePower(exponent) function factory
// that returns a function which raises a number to that exponent

function makePower(exponent) {
  return n => Math.pow(n, exponent); // Math.pow
}
const square = makePower(2);
const cube   = makePower(3);

console.log(square(4)); // 16
console.log(cube(3));   // 27


// PC30 — Scope, Hoisting & Closures

// 1. Scope — Where Variables Live
// javascript// Global scope — accessible everywhere
// const globalVar = "I'm everywhere";

// function myFunc() {
//   // Function scope — only inside this function
//   const funcVar = "I'm only inside myFunc";
//   console.log(globalVar); // ✅ can access global
//   console.log(funcVar);   // ✅ can access own scope
// }

// console.log(globalVar); // ✅
// console.log(funcVar);   // ❌ ReferenceError — doesn't exist out here
// Block scope — let & const are trapped inside {}:
// javascriptif (true) {
//   let blockLet = "block scoped";
//   var blockVar = "function scoped";
//   const blockConst = "also block scoped";
// }

// console.log(blockVar);   // ✅ var leaks out of blocks!
// console.log(blockLet);   // ❌ ReferenceError
// console.log(blockConst); // ❌ ReferenceError
// This is the core reason we avoid var — it leaks out of blocks unpredictably.

// 2. Scope Chain — How JS Looks Up Variables
// javascriptconst name = "Global";

// function outer() {
//   const name = "Outer";
  
//   function inner() {
//     const name = "Inner";
//     console.log(name); // "Inner" — finds it immediately
//   }

//   function inner2() {
//     // no name here — looks up the chain
//     console.log(name); // "Outer" — found in parent scope
//   }

//   inner();  // "Inner"
//   inner2(); // "Outer"
// }

// outer();
// console.log(name); // "Global"
// JS always looks inward → outward up the chain. Never downward into children.

// 3. Hoisting
// Function declarations — fully hoisted:
// javascriptconsole.log(add(2, 3)); // ✅ 5 — works before definition

// function add(a, b) {
//   return a + b;
// }
// var — hoisted but undefined:
// javascriptconsole.log(myVar); // undefined — hoisted but no value yet
// var myVar = "hello";
// console.log(myVar); // "hello"

// // JS internally treats it as:
// var myVar;           // declaration hoisted to top
// console.log(myVar);  // undefined
// myVar = "hello";     // assignment stays here
// let & const — hoisted but in Temporal Dead Zone:
// javascriptconsole.log(myLet); // ❌ ReferenceError — Temporal Dead Zone
// let myLet = "hello";
// They exist but are completely inaccessible until the line they're declared. This is why let/const are safer than var.

// 4. Closures — The Big One
// A closure is when an inner function remembers variables from its outer function's scope even after the outer function has finished running.
// javascriptfunction makeCounter(start) {
//   let count = start; // this variable gets "closed over"

//   return function() {
//     count++;
//     return count;
//   };
// }

// const counter = makeCounter(10);
// // makeCounter has finished running — but count is NOT gone!

// console.log(counter()); // 11
// console.log(counter()); // 12
// console.log(counter()); // 13

// // Each counter has its OWN private count
// const counterA = makeCounter(0);
// const counterB = makeCounter(100);

// counterA(); // 1
// counterA(); // 2
// counterB(); // 101  — completely separate from counterA
// The inner function carries a backpack of the variables it needs from its birth environment. That backpack is the closure.

// 5. Practical Closure Patterns
// Private variables — data hiding:
// javascriptfunction createBankAccount(initialBalance) {
//   let balance = initialBalance; // private — nobody outside can touch this

//   return {
//     deposit(amount) {
//       balance += amount;
//       return `Deposited ${amount}. Balance: ${balance}`;
//     },
//     withdraw(amount) {
//       if (amount > balance) return "Insufficient funds";
//       balance -= amount;
//       return `Withdrew ${amount}. Balance: ${balance}`;
//     },
//     getBalance() {
//       return balance;
//     }
//   };
// }

// const account = createBankAccount(100);
// console.log(account.deposit(50));    // "Deposited 50. Balance: 150"
// console.log(account.withdraw(200));  // "Insufficient funds"
// console.log(account.getBalance());   // 150
// console.log(account.balance);        // undefined — truly private!
// Function factory — from PC29:
// javascriptfunction multiplier(factor) {
//   return n => n * factor; // factor is closed over
// }

// const double = multiplier(2);
// const triple = multiplier(3);

// double(5); // 10
// triple(5); // 15

// 6. Classic Closure Trap — The var Loop Bug
// javascript// ❌ Famous bug with var
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
// // Prints: 3 3 3 — all share the SAME i (var leaks out)

// // ✅ Fix with let — each iteration gets its own i
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
// // Prints: 0 1 2 — each closure captures its own i