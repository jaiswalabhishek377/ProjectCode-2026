// Challenge 1
// Create a user object with: name, age, email
// Using shorthand syntax
// Then log all keys, all values, and all entries
const user={
name:"Abhi",age:20,email:"johnwick@gmail.com"};
console.log(Object.keys(user));    // ["name", "age", "email"]
console.log(Object.values(user));  // ["Abhi", 20, "johnwick@gmail.com"]
console.log(Object.entries(user)); // [["name","Abhi"], ["age",20], ["email","..."]]

// Challenge 2
// Predict the output
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged);  //{a:1,b:3,c:4}

const frozen = Object.freeze({ x: 10 });
frozen.x = 99;
console.log(frozen.x);  //10

// Challenge 3
// Build a Person constructor function with:
// - name and age as own properties
// - greet() on the prototype returning "Hi I'm {name}, {age} years old"
// - isAdult() on the prototype returning true/false (age >= 18)
// Create two instances and test both methods

function Person(name, age) { this.name = name;  this.age = age; }
Person.prototype.greet = function() { return `Hi, I'm ${this.name}, ${this.age} years old`; };
Person.prototype.isAdult = function() { return this.age >= 18; };
const Abhi = new Person("Abhi", 25); 
const John= new Person("John", 17); 
Abhi.greet(); 
John.greet(); 
Abhi.isAdult();
John.isAdult();
// Challenge 4
// Add a capitalize() method to String.prototype
// that capitalizes the first letter of any string
"hello".capitalize()  // "Hello"
"world".capitalize()  // "World"

String.prototype.capitalize = function() {
  // "this" = the string calling the method e.g. "hello"
  // this[0]         → "h"  (first character)
  // this[0].toUpperCase() → "H"
  // this.slice(1)   → "ello" (everything after first char)
  
  return this[0].toUpperCase() + this.slice(1);
};

// Challenge 5
// Predict output and explain the chain
function Vehicle(type) {
  this.type = type;
}
Vehicle.prototype.describe = function() {
  return `I am a ${this.type}`;
};

const car = new Vehicle("car");

console.log(car.describe());    // "I am a car" — found on Vehicle.prototype
console.log(car.hasOwnProperty("type"));    // true — own property
console.log(car.hasOwnProperty("describe"));  // false — inherited from prototype
console.log("describe" in car);  // true — found in prototype chain



//PC32 — Objects & Prototypes

// //1. Object Basics — Creation
// //javascript Object literal — most common way
// const user = {
//   name: "Alex",
//   age: 25,
//   isAdmin: false
// };

// // Accessing properties
// user.name        // "Alex" — dot notation
// user["name"]     // "Alex" — bracket notation

// // When to use bracket notation:
// const key = "name";
// user[key]        // "Alex" — dynamic key ✅
// user.key         // undefined ❌ — looks for property literally named "key"

// // Adding & updating properties
// user.email = "alex@gmail.com"; // add new
// user.age = 26;                 // update existing

// // Deleting properties
// delete user.isAdmin;

// // 2. Modern Object Syntax — ES6+ javascript
// const name = "Alex";
// const age = 25;

// // ❌ Old way — repetitive
// const user = { name: name, age: age };

// // ✅ Property shorthand — variable name = key name
// const user = { name, age };

// // Computed property keys — dynamic key names
// const field = "score";
// const data = {
//   [field]: 100,        // key = "score"
//   [`${field}_max`]: 200 // key = "score_max"
// };

// // Methods shorthand
// const obj = {
//   // ❌ Old
//   greet: function() { return "hello"; },
  
//   // ✅ Modern
//   greet() { return "hello"; }
// };

// 3. Object Utility Methods
// javascriptconst user = { name: "Alex", age: 25, city: "NYC" };

// Object.keys(user)    // ["name", "age", "city"]   — array of keys
// Object.values(user)  // ["Alex", 25, "NYC"]        — array of values
// Object.entries(user) // [["name","Alex"], ["age",25], ["city","NYC"]]

// // Looping with entries — most powerful pattern
// for (const [key, value] of Object.entries(user)) {
//   console.log(`${key}: ${value}`);
//   // name: Alex
//   // age: 25
//   // city: NYC
// }

// // Check if property exists
// "name" in user        // true
// "email" in user       // false

// // Merge objects
// const defaults = { theme: "light", lang: "en" };
// const userPrefs = { theme: "dark" };

// const settings = { ...defaults, ...userPrefs };
// // { theme: "dark", lang: "en" }
// // later keys override earlier ones

// 4. Object.freeze & Object.assign
// javascript// Object.freeze — makes object truly immutable
// const config = Object.freeze({ apiUrl: "https://api.example.com" });
// config.apiUrl = "hacked"; // silently fails (or throws in strict mode)
// console.log(config.apiUrl); // "https://api.example.com" — unchanged ✅

// // Object.assign — merge into target object
// const target = { a: 1 };
// const source = { b: 2, c: 3 };
// Object.assign(target, source);
// console.log(target); // { a: 1, b: 2, c: 3 }

// // Common use — shallow clone
// const original = { name: "Alex", age: 25 };
// const clone = Object.assign({}, original);
// // or modern way:
// const clone2 = { ...original };

// 5. Prototypes — The Core Concept
// Every object in JS has a hidden link to another object called its prototype. When you access a property that doesn't exist on the object, JS walks up the prototype chain to find it.
// javascriptconst user = { name: "Alex" };

// // user doesn't have a .toString() method
// // but user.__proto__ = Object.prototype
// // Object.prototype HAS toString()
// // so JS finds it there

// user.toString(); // "[object Object]" — found up the chain!
// ```

// **Visualizing the chain:**
// ```
// user object
//   → __proto__ → Object.prototype
//                   → __proto__ → null (end of chain)

// 6. Prototype with Constructor Functions
// Before classes existed, this was how OOP was done in JS:
// javascript// Constructor function — capital letter by convention
// function Person(name, age) {
//   this.name = name; // own properties
//   this.age = age;
// }

// // Add methods to prototype — shared by ALL instances
// // Much more efficient than adding to each object
// Person.prototype.greet = function() {
//   return `Hi, I'm ${this.name}`;
// };

// Person.prototype.isAdult = function() {
//   return this.age >= 18;
// };

// const alex = new Person("Alex", 25);
// const sam  = new Person("Sam", 17);

// alex.greet();    // "Hi, I'm Alex"
// sam.greet();     // "Hi, I'm Sam"
// sam.isAdult();   // false

// // Both share the SAME greet function via prototype
// // not two separate copies — memory efficient ✅
// What new does behind the scenes:
// javascript// When you write: const alex = new Person("Alex", 25)
// // JS does this automatically:

// // 1. Creates empty object {}
// // 2. Sets its __proto__ to Person.prototype
// // 3. Runs Person() with this = that new object
// // 4. Returns the object

// 7. Prototype Chain in Action
// javascriptfunction Animal(name) {
//   this.name = name;
// }
// Animal.prototype.speak = function() {
//   return `${this.name} makes a sound`;
// };

// function Dog(name, breed) {
//   Animal.call(this, name); // borrow Animal's constructor
//   this.breed = breed;
// }

// // Link Dog's prototype to Animal's prototype
// Dog.prototype = Object.create(Animal.prototype);
// Dog.prototype.constructor = Dog;

// Dog.prototype.bark = function() {
//   return `${this.name} barks!`;
// };

// const rex = new Dog("Rex", "Labrador");
// rex.bark();   // "Rex barks!"   — found on Dog.prototype
// rex.speak();  // "Rex makes a sound" — found on Animal.prototype
// ```

// **The chain:**
// ```
// rex → Dog.prototype → Animal.prototype → Object.prototype → null

// 8. hasOwnProperty — Own vs Inherited
// javascriptconst person = { name: "Alex" };

// person.hasOwnProperty("name");      // true  — own property
// person.hasOwnProperty("toString");  // false — inherited from prototype

// // This is important when looping with for...in
// // for...in also loops inherited properties!
// for (const key in person) {
//   if (person.hasOwnProperty(key)) { // guard against inherited props
//     console.log(key); // only "name"
//   }
// }

// 9. Adding to Built-in Prototypes
// javascript// You can extend any built-in type
// // (use sparingly — can cause conflicts in large apps)

// String.prototype.reverse = function() {
//   return this.split("").reverse().join("");
// };

// "hello".reverse(); // "olleh" ✅

// Array.prototype.sum = function() {
//   return this.reduce((acc, n) => acc + n, 0);
// };

// [1, 2, 3, 4].sum(); // 10 ✅

// Number.prototype.isEven = function() {
//   return this % 2 === 0;
// };

// (4).isEven(); // true ✅