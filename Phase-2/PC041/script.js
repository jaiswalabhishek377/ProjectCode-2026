PC41 — JSON: Parse, Stringify & Serialization
JSON (JavaScript Object Notation) is the universal language of web APIs. Master this and you can work with ANY API on the planet! 💪

1. What is JSON?
JSON = JavaScript Object Notation
It's a text format for representing data that looks like JavaScript objects, but it's just a string!
javascript// This is a JavaScript object
const user = { name: "Alex", age: 25 };

// This is JSON (a string that looks like an object)
const userJSON = '{"name":"Alex","age":25}';
Key differences:

JSON uses double quotes for keys (not single quotes, not unquoted)
JSON is always a string (text)
JSON has no functions, undefined, or special values


2. JSON.stringify() — Object → String
javascriptconst user = {
  name: "Alex",
  age: 25,
  active: true,
  hobbies: ["coding", "gaming"]
};

const json = JSON.stringify(user);
console.log(json);
// '{"name":"Alex","age":25,"active":true,"hobbies":["coding","gaming"]}'

console.log(typeof json); // "string" ✅

3. JSON.parse() — String → Object
javascriptconst json = '{"name":"Alex","age":25}';

const user = JSON.parse(json);
console.log(user);        // { name: "Alex", age: 25 }
console.log(user.name);   // "Alex"
console.log(typeof user); // "object" ✅

4. What JSON Can and Cannot Handle
✅ JSON Supports:
javascriptconst data = {
  string: "hello",
  number: 42,
  boolean: true,
  null: null,
  array: [1, 2, 3],
  nested: { key: "value" }
};

JSON.stringify(data); // ✅ Works perfectly
❌ JSON Does NOT Support:
javascriptconst data = {
  fn: function() {},           // Functions → lost
  undef: undefined,            // undefined → lost (key deleted!)
  date: new Date(),            // Date → becomes string
  regex: /test/,               // RegExp → becomes {}
  nan: NaN,                    // NaN → becomes null
  infinity: Infinity,          // Infinity → becomes null
  symbol: Symbol("id")         // Symbol → lost
};

console.log(JSON.stringify(data));
// '{"date":"2024-02-24T14:30:00.000Z","regex":{},"nan":null,"infinity":null}'
Notice:

fn, undef, symbol — completely removed!
date — converted to string (loses Date methods)
regex — becomes empty object {}
nan, infinity — become null


5. Pretty Printing — The space Parameter
javascriptconst user = { name: "Alex", age: 25, city: "NYC" };

// Compact (default)
JSON.stringify(user);
// '{"name":"Alex","age":25,"city":"NYC"}'

// Pretty with 2 spaces
JSON.stringify(user, null, 2);
/*
{
  "name": "Alex",
  "age": 25,
  "city": "NYC"
}
*/

// Pretty with 4 spaces
JSON.stringify(user, null, 4);

// Pretty with tabs
JSON.stringify(user, null, '\t');
Format: JSON.stringify(value, replacer, space)

value — what to stringify
replacer — filter/transform (we'll cover next)
space — indentation (number or string)


6. The Replacer Parameter — Filtering & Transforming
Filter Specific Keys
javascriptconst user = {
  name: "Alex",
  age: 25,
  password: "secret123",
  email: "alex@gmail.com"
};

// Only include specific keys
const json = JSON.stringify(user, ["name", "email"]);
// '{"name":"Alex","email":"alex@gmail.com"}'
// password is excluded! ✅
Transform Values
javascriptconst user = {
  name: "Alex",
  age: 25,
  salary: 50000
};

const json = JSON.stringify(user, (key, value) => {
  // Hide salary
  if (key === "salary") return undefined;
  
  // Uppercase all strings
  if (typeof value === "string") return value.toUpperCase();
  
  return value;
});

// '{"name":"ALEX","age":25}'

7. The Reviver Parameter — Custom Parsing
javascriptconst json = '{"name":"Alex","createdAt":"2024-02-24T14:30:00.000Z"}';

// Without reviver — date is string
const obj1 = JSON.parse(json);
console.log(typeof obj1.createdAt); // "string" ❌

// With reviver — convert strings to Dates
const obj2 = JSON.parse(json, (key, value) => {
  // Convert ISO date strings back to Date objects
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value);
  }
  return value;
});

console.log(obj2.createdAt instanceof Date); // true ✅
console.log(obj2.createdAt.getFullYear());   // 2024 ✅

8. Handling Circular References
javascriptconst user = { name: "Alex" };
user.self = user;  // Circular reference!

try {
  JSON.stringify(user);
} catch (error) {
  console.log(error.message);
  // "Converting circular structure to JSON"
}

// Solution: Remove circular refs before stringify
const safeUser = { ...user };
delete safeUser.self;
JSON.stringify(safeUser); // ✅ Works

9. Deep Clone with JSON (The Quick & Dirty Way)
javascriptconst original = {
  name: "Alex",
  address: { city: "NYC", zip: "10001" },
  scores: [85, 92, 78]
};

// Deep clone (but with limitations!)
const clone = JSON.parse(JSON.stringify(original));

clone.address.city = "LA";
clone.scores.push(95);

console.log(original.address.city); // "NYC" ✅
console.log(original.scores);       // [85, 92, 78] ✅
⚠️ Limitations:

Loses functions
Loses undefined values
Converts Dates to strings
Loses Symbols
Fails on circular references

Better alternative: structuredClone() (from PC37)

10. localStorage & sessionStorage — JSON in Action
javascript// Save object to localStorage
const user = { name: "Alex", score: 95 };
localStorage.setItem("user", JSON.stringify(user)); // ✅ Must stringify!

// Retrieve and parse
const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name); // "Alex"

// Common pattern: Safe retrieval with fallback
function getStoredUser() {
  try {
    const json = localStorage.getItem("user");
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Invalid JSON in storage:", error);
    return null;
  }
}

11. API Communication — JSON Everywhere
javascript// Sending data to API
async function createUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  // Tell server we're sending JSON
    },
    body: JSON.stringify(userData)  // ✅ Convert object to JSON string
  });
  
  const result = await response.json();  // ✅ Parse JSON response
  return result;
}

// Usage
const newUser = { name: "Alex", email: "alex@gmail.com" };
const created = await createUser(newUser);

12. Common JSON Gotchas
Gotcha 1: Trailing Commas
javascript// ❌ Invalid JSON (trailing comma)
const json = '{"name":"Alex","age":25,}';
JSON.parse(json); // SyntaxError

// ✅ Valid JSON (no trailing comma)
const json = '{"name":"Alex","age":25}';
Gotcha 2: Single Quotes
javascript// ❌ Invalid JSON (single quotes)
const json = "{'name':'Alex'}";
JSON.parse(json); // SyntaxError

// ✅ Valid JSON (double quotes)
const json = '{"name":"Alex"}';
Gotcha 3: Unquoted Keys
javascript// ❌ Invalid JSON (unquoted keys)
const json = '{name:"Alex"}';
JSON.parse(json); // SyntaxError

// ✅ Valid JSON (quoted keys)
const json = '{"name":"Alex"}';
Gotcha 4: Comments
javascript// ❌ Invalid JSON (comments not allowed!)
const json = `{
  // This is a comment
  "name": "Alex"
}`;
JSON.parse(json); // SyntaxError

13. Validating JSON
javascriptfunction isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

console.log(isValidJSON('{"name":"Alex"}')); // true
console.log(isValidJSON('{name:"Alex"}'));   // false
console.log(isValidJSON('invalid'));         // false

//14. Working with Large JSON
javascript// Streaming large JSON (Node.js example)
const fs = require('fs');

// Bad: Loads entire file into memory
const data = JSON.parse(fs.readFileSync('huge.json'));

// Better: Stream and process in chunks
const stream = require('stream');
const JSONStream = require('JSONStream'); // npm package

fs.createReadStream('huge.json')
  .pipe(JSONStream.parse('*'))
  .on('data', (item) => {
    // Process each item individually
    console.log(item);
  });