// Challenge 1 — Predict output and explain each
const obj = {
  name: "JS",
  regular: function() { console.log(this.name); },
  arrow: () => { console.log(this.name); }
};

obj.regular(); // ?  "JS" because this refers to object context
obj.arrow();   // ?   undefined because arrow functions don't have their own this, they inherit from the surrounding scope, which is the global scope where name is not defined

const fn = obj.regular;  // const 
fn();          // ? undefined as it loses object context, this becomes global/window where name is not defined
//rule : When a function is called as a method of an object, this refers to that object.
//  When a function is called standalone, this refers to the global object (or undefined in strict mode). 
// Arrow functions inherit this from their surrounding scope.

// Challenge 2 — Fix the bug using bind
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    setInterval(function() {
      this.seconds++;              // bug — this is wrong here
      console.log(this.seconds);
    }, 1000);
  }
}

const timer = new Timer();
timer.start(); // prints NaN NaN NaN...
// Fix using: a) bind  b) arrow function
// ✅ Fix a) — bind inside start()
class Timer {
  constructor() {
    this.seconds = 0;
  }
start() {
  setInterval(function() {
    this.seconds++;
    console.log(this.seconds);
  }.bind(this), 1000); // bind this (the instance) to the callback
}}
// ✅ Fix b) — arrow function (cleaner!)
// start() {
//   setInterval(() => {
//     this.seconds++;        // arrow inherits this from start()
//     console.log(this.seconds); // this = timer instance ✅
//   }, 1000);
// }
// Challenge 3
// Use call to make this work for both objects
function getInfo(city, country) {
  console.log(`${this.name} lives in ${city}, ${country}`);
}

const p1 = { name: "Alex" };
const p2 = { name: "Sam" };
// Call getInfo for both using .call()
getInfo.call(p1, "New York", "USA"); // "Alex lives in New York, USA"
getInfo.call(p2, "London", "UK");    // "Sam lives in London, UK"
// Challenge 4
// Build a multiply function then use bind to create
// a double() and triple() function from it
function multiply(a, b) {
  return a * b;
}

// const double = //bind here
// const triple = // bind here
const double = multiply.bind(null, 2); // bind first arg to 2
const triple = multiply.bind(null, 3); // bind first arg to 3
console.log(double(5));  // 10
console.log(triple(5));  // 15

// Challenge 5 — Predict ALL outputs
const person = {
  name: "Taylor",
  hobbies: ["coding", "reading", "gaming"],

  printHobbies() {
    this.hobbies.forEach(function(hobby) {
      console.log(`${this.name} likes ${hobby}`);
    });
  },

  printHobbiesFixed() {
    this.hobbies.forEach((hobby) => {
      console.log(`${this.name} likes ${hobby}`);
    });
  }
};

person.printHobbies();  // ? undefined likes coding   undefined likes reading  undefined likes gaming  
//no name is defined inside printHobbies's callback, so this.name is undefined 
person.printHobbiesFixed();
// ? Taylor likes coding  Taylor likes reading  Taylor likes gaming
// printHobbiesFixed works because the arrow function inherits this from printHobbies, where this.name is "Taylor"





// PC31 — this Keyword, call/apply/bind

// 1. What is this?
// this refers to the object that is currently executing the function. The tricky part — its value depends entirely on how the function is called, not where it's written.

// 2. this in Global Scope
// javascriptconsole.log(this); // browser → window object
//                    // Node.js → {} (empty module object)

// function showThis() {
//   console.log(this); // browser → window (non-strict)
//                      // strict mode → undefined
// }
// showThis();

// 3. this in an Object Method
// javascriptconst user = {
//   name: "Alex",
//   greet() {
//     console.log(this.name); // "Alex" — this = user object
//   }
// };

// user.greet(); // "Alex" ✅

// // ⚠️ The trap — losing this context
// const greetFn = user.greet;
// greetFn(); // undefined — this is now window/undefined!
//            // the function lost its object context
// This is the most common this bug in real code.

// 4. this in Arrow Functions
// Arrow functions don't have their own this — they inherit it from their surrounding scope:
// javascriptconst user = {
//   name: "Alex",
  
//   greet() {
//     // Regular function — this = user ✅
//     console.log(this.name); // "Alex"

//     const inner = function() {
//       console.log(this.name); // undefined ❌ — lost context
//     };

//     const innerArrow = () => {
//       console.log(this.name); // "Alex" ✅ — inherits from greet
//     };

//     inner();
//     innerArrow();
//   }
// };

// user.greet();
// Rule: Use arrow functions for callbacks inside methods. Use regular functions for the methods themselves.

// 5. this in Classes
// javascriptclass Car {
//   constructor(brand) {
//     this.brand = brand; // this = the new object being created
//   }

//   drive() {
//     console.log(`${this.brand} is driving`);
//   }
// }

// const car = new Car("Toyota");
// car.drive(); // "Toyota is driving"

// // ⚠️ Same trap applies in classes
// const driveFn = car.drive;
// driveFn(); // TypeError — this.brand is undefined

// 6. call() — Borrow a Method, Pass Args One by One
// javascriptfunction introduce(greeting, punctuation) {
//   console.log(`${greeting}, I'm ${this.name}${punctuation}`);
// }

// const person1 = { name: "Alex" };
// const person2 = { name: "Sam" };

// introduce.call(person1, "Hello", "!");  // "Hello, I'm Alex!"
// introduce.call(person2, "Hey", ".");    // "Hey, I'm Sam."
// //            ↑ this    ↑ args spread out

// 7. apply() — Same as call, But Args as Array
// javascriptintroduce.apply(person1, ["Hello", "!"]);  // "Hello, I'm Alex!"
// introduce.apply(person2, ["Hey", "."]);    // "Hey, I'm Sam."
// //             ↑ this    ↑ args as array

// // Real use case — spread array into Math.max
// const nums = [3, 1, 8, 2, 5];
// Math.max.apply(null, nums); // 8
// // (though modern JS just uses Math.max(...nums))
// Memory trick:

// call → Comma separated args
// apply → Array of args


// 8. bind() — Returns a New Function with this Locked In
// javascriptfunction greet(greeting) {
//   console.log(`${greeting}, ${this.name}!`);
// }

// const user = { name: "Alex" };

// const greetAlex = greet.bind(user); // returns NEW function
// greetAlex("Hello");  // "Hello, Alex!"
// greetAlex("Hey");    // "Hey, Alex!" — this is permanently bound

// // Real world — fixing the lost context problem
// const car = {
//   brand: "Toyota",
//   drive() {
//     console.log(`${this.brand} is driving`);
//   }
// };

// const driveFn = car.drive.bind(car); // lock this to car
// driveFn(); // "Toyota is driving" ✅

// 9. call vs apply vs bind — Summary
// javascript// call  → calls immediately, args one by one
// fn.call(thisArg, arg1, arg2);

// // apply → calls immediately, args as array
// fn.apply(thisArg, [arg1, arg2]);

// // bind  → returns NEW function, call it later
// const boundFn = fn.bind(thisArg);
// boundFn(arg1, arg2);



//MISTAKES: ==============================================================================================
// Mistake 1 — You Had regular and arrow Flipped
// You said:

// "regular won't access this, arrow will log JS"

// That's completely backwards. Here's why:
// javascriptconst obj = {
//   name: "JS",
//   regular: function() { console.log(this.name); },
//   arrow: () => { console.log(this.name); }
// };
// Regular function — ask "who calls it?"
// javascriptobj.regular();
// // Who calls it? → obj
// // So this = obj
// // obj.name = "JS"
// // Prints: "JS" ✅
// Arrow function — ask "where was it written?"
// javascriptobj.arrow();
// // Where was it written? → outside any function, directly in global scope
// // this in global scope = window (browser) or {} (Node)
// // window.name = undefined
// // Prints: undefined ❌
// The trap people fall into:
// They see the arrow function sitting INSIDE the object and think "it's inside obj so this = obj." That's wrong. Objects {} do NOT create a new this scope. Only functions create a new this scope.
// javascript// Think of it this way:
// // When JS wrote the arrow function, it looked around and asked
// // "what is this RIGHT NOW in this spot?"

// const obj = {       // ← objects don't create a this scope
//   arrow: () => {    // ← written here, in global scope
//     this            // ← global this. Period.
//   }
// }

// // vs

// const obj = {
//   regular() {       // ← regular function creates its OWN this
//     const arrow = () => {  // ← written INSIDE regular function
//       this          // ← inherits from regular() = obj ✅
//     }
//   }
// }
// ```

// **The rule to never forget:**
// ```
// Arrow inside an OBJECT LITERAL → this = global ❌
// Arrow inside a METHOD (regular function) → this = object ✅

// Mistake 2 — Binding the Class Instead of the Instance
// You wrote:
// javascriptconst timerFn = Timer.start.bind(Timer);
// There are two separate errors here. Let's fix both:
// Error 1 — Timer is the CLASS blueprint, not the object
// javascriptclass Timer {
//   constructor() {
//     this.seconds = 0;
//   }
//   start() { ... }
// }

// // Timer      → the BLUEPRINT (class itself)
// // new Timer()→ the ACTUAL OBJECT (instance)

// const timer = new Timer(); // this is the real object
//                            // timer.seconds = 0 exists here
//                            // Timer.seconds  = doesn't exist!
// ```

// Think of it like this:
// ```
// Timer       = the cookie cutter 🍪
// new Timer() = the actual cookie
// this.seconds lives on the COOKIE, not the cutter
// Error 2 — the bug is INSIDE the callback, not outside
// javascriptclass Timer {
//   constructor() { this.seconds = 0; }

//   start() {
//     // "this" here = timer instance ✅ (called as timer.start())
    
//     setInterval(function() {
//       // "this" here = ??? — who calls THIS function?
//       // setInterval calls it → window/global calls it
//       // window.seconds = undefined
//       this.seconds++; // undefined++ = NaN 💥
//     }, 1000);
//   }
// }
// The bug is the function() inside setInterval losing context. The fix must happen RIGHT THERE:
// javascript// ✅ Fix A — Arrow function (BEST, use this always)
// start() {
//   setInterval(() => {
//     // Arrow asks: "where was I written?" → inside start()
//     // this in start() = timer instance ✅
//     this.seconds++;
//     console.log(this.seconds); // 1, 2, 3...
//   }, 1000);
// }

// // ✅ Fix B — bind(this) at the callback level
// start() {
//   setInterval(function() {
//     this.seconds++;
//     console.log(this.seconds);
//   }.bind(this), 1000);  // .bind(this) here — this is still the instance
// }                        // because we're still inside start() when bind runs
// ```

// **The golden rule for callbacks:**
// ```
// Any time you write a regular function() inside a method
// → it WILL lose this
// → just use an arrow function instead
// → 99% of real-world cases use the arrow fix

// Mistake 3 — Challenge 4: null vs undefined thisArg
// You wrote:
// javascriptconst double = multiply.bind(args1, 2); // args1 doesn't exist!
// First, understand what bind's first argument actually is:
// javascriptfn.bind(thisArg, arg1, arg2...);
// //      ↑
// //      This becomes "this" inside fn when it runs
// Now look at multiply:
// javascriptfunction multiply(a, b) {
//   return a * b; // no "this" used anywhere inside!
// }
// Since multiply never uses this, you don't care what this is. Pass null as a placeholder — it's the standard convention:
// javascriptconst double = multiply.bind(null, 2);
// // null → "I don't care about this"
// // 2    → pre-fill first argument (a = 2)

// double(5); // multiply(2, 5) → 10 ✅
// double(9); // multiply(2, 9) → 18 ✅

// const triple = multiply.bind(null, 3);
// triple(5); // multiply(3, 5) → 15 ✅
// This pattern has a name — Partial Application. You're pre-loading some arguments and creating a specialized function. Super useful in real code:
// javascript// Real world example
// function fetchFromAPI(baseURL, endpoint) {
//   return fetch(baseURL + endpoint);
// }

// const fetchFromGithub = fetchFromAPI.bind(null, "https://api.github.com");
// fetchFromGithub("/users");   // https://api.github.com/users
// fetchFromGithub("/repos");   // https://api.github.com/repos

// Mistake 4 — Challenge 5: The forEach this Trap
// You said both methods print the same thing. They don't:
// javascriptconst person = {
//   name: "Taylor",
//   hobbies: ["coding", "reading", "gaming"],

//   printHobbies() {
//     this.hobbies.forEach(function(hobby) {
//       console.log(`${this.name} likes ${hobby}`);
//     });
//   },

//   printHobbiesFixed() {
//     this.hobbies.forEach((hobby) => {
//       console.log(`${this.name} likes ${hobby}`);
//     });
//   }
// };
// printHobbies() — regular function callback:
// javascriptperson.printHobbies();

// // Step 1: printHobbies() is called on person → this = person ✅
// // Step 2: forEach runs the callback function() for each hobby
// // Step 3: Who calls that callback? → forEach (internally, JS engine)
// // Step 4: this inside callback = window/undefined
// // Step 5: this.name = undefined

// // Prints:
// // "undefined likes coding"
// // "undefined likes reading"
// // "undefined likes gaming"
// printHobbiesFixed() — arrow function callback:
// javascriptperson.printHobbiesFixed();

// // Step 1: printHobbiesFixed() called on person → this = person ✅
// // Step 2: forEach runs the arrow (hobby) => {...}
// // Step 3: Arrow asks "where was I written?" → inside printHobbiesFixed()
// // Step 4: this in printHobbiesFixed() = person ✅
// // Step 5: this.name = "Taylor"

// // Prints:
// // "Taylor likes coding"
// // "Taylor likes reading"
// // "Taylor likes gaming"
// ```

// **This is the most common real-world `this` bug.** You'll hit it constantly in React class components, event handlers, and any method with callbacks. The fix is always the same — use an arrow function for the callback.

// ---

// ## The Complete PC31 Cheat Sheet 🗺️
// ```
// SITUATION                          │ this VALUE
// ───────────────────────────────────┼─────────────────────────
// Regular function, called on object │ that object
//   obj.method()                     │ obj

// Regular function, called alone     │ window / undefined
//   fn()                             │ 

// Arrow function, anywhere           │ this from surrounding scope
//   () => {}                         │ (wherever it was written)

// Arrow inside object literal        │ global / window ❌
// Arrow inside a method              │ same as that method ✅

// class constructor                  │ new instance being created
// class method, called on instance   │ that instance
// class method, detached             │ undefined ❌

// setTimeout/setInterval callback    │ window (regular fn) ❌
// setTimeout/setInterval arrow       │ inherited from method ✅

// forEach/map/filter callback        │ window (regular fn) ❌
// forEach/map/filter arrow           │ inherited from method ✅

// .call(obj, args)                   │ obj (forced)
// .apply(obj, [args])                │ obj (forced)
// .bind(obj)                         │ obj (permanently locked)