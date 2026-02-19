// Challenge 1
console.log(1 + "2" + 3);
console.log(1 + 2 + "3");

// Challenge 2
let x = null;
let y = undefined;
console.log(x == y);
console.log(x === y);

// Challenge 3 — reference trap
const person = { name: "Sam", age: 25 };
const clone = person;
clone.age = 99;
console.log(person.age);  // what prints?

// Challenge 4
console.log(Boolean([]));   // true or false?
console.log(Boolean({}));   // true or false?
console.log(Boolean("0"));  // true or false?



// output for challanges :
// 1.1) "123"
// 1.2) "33"

// 2.1)true  
// 2.2)false null and undefined diff datatype

// 3.1) it prints 99 i think by  due to reference i think for const in array we can change value not keys  im not sure?

// 4.1)true
// 4.2)true
// 4.3)true
// JS only cares if the string is literally "" (empty). The value 0 is falsy, but the string "0" is truthy.


// Notes:
// 1. Variables — Three Ways to Declare
// javascriptvar oldWay = "avoid this";     // function-scoped, hoisted, legacy
// let name = "Alex";             // block-scoped, can be reassigned
// const PI = 3.14;               // block-scoped, cannot be reassigned
// Rule of thumb: Always use const. Use let only when you know the value will change. Never use var.

// 2. Primitive Data Types (7 total)
// javascriptlet str    = "hello";          // String
// let num    = 42;               // Number (integers AND decimals — one type)
// let bool   = true;             // Boolean
// let empty  = null;             // Null (intentional absence of value)
// let undef  = undefined;        // Undefined (declared but no value assigned)
// let big    = 9007199254740991n // BigInt (huge integers)
// let sym    = Symbol("id");     // Symbol (unique identifier)
// vs Reference Types:
// javascriptlet arr = [1, 2, 3];          // Array
// let obj = { name: "Alex" };   // Object
// let fn  = function() {};      // Function
// The key difference: primitives are copied by value, reference types are copied by reference.
// javascript// Value copy
// let a = 5;
// let b = a;
// b = 10;
// console.log(a); // still 5 ✅

// // Reference copy — THIS TRIPS EVERYONE UP
// let obj1 = { score: 5 };
// let obj2 = obj1;          // same reference in memory!
// obj2.score = 99;
// console.log(obj1.score);  // 99 😱 — obj1 also changed

// 3. typeof
// javascripttypeof "hello"      // "string"
// typeof 42           // "number"
// typeof true         // "boolean"
// typeof undefined    // "undefined"
// typeof null         // "object"  ← famous JS bug, null is NOT an object
// typeof {}           // "object"
// typeof []           // "object"  ← arrays are objects too
// typeof function(){} // "function"

// 4. Type Coercion — Where JS Gets Weird
// Implicit coercion (JS converts automatically):
// javascript"5" + 3         // "53"  — number becomes string (+ prefers strings)
// "5" - 3         // 2     — string becomes number (- forces math)
// true + 1        // 2     — true is 1
// false + 1       // 1     — false is 0
// null + 1        // 1     — null is 0
// undefined + 1   // NaN   — undefined can't convert
// "5" * "3"       // 15    — both convert to numbers
// == vs === (loose vs strict equality):
// javascript5 == "5"        // true  ← coerces types before comparing (AVOID)
// 5 === "5"       // false ← checks value AND type (USE THIS)
// null == undefined  // true  (special case)
// null === undefined // false
// Explicit coercion (you convert on purpose):
// javascriptNumber("42")    // 42
// Number("abc")   // NaN
// Number(true)    // 1
// String(42)      // "42"
// Boolean(0)      // false
// Boolean("")     // false
// Boolean(null)   // false
// Boolean("hi")   // true
// Boolean(1)      // true
// Falsy values (only 6 in all of JS):
// javascriptfalse, 0, "", null, undefined, NaN
// // Everything else is truthy — including "0", [], {}