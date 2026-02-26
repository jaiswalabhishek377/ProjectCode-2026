// PC38 — Template Literals, String Methods & Regex
// This is one of the most useful PCs — you'll use these techniques in literally every project. String manipulation is everywhere: forms, APIs, user input, validation, formatting. Let's master it! 💪

// 1. Template Literals — The Modern Way
// javascript// ❌ Old string concatenation (painful!)
// const name = "Alex";
// const age = 25;
// const message = "Hi, I'm " + name + " and I'm " + age + " years old.";

// // ✅ Template literals (clean!)
// const message = `Hi, I'm ${name} and I'm ${age} years old.`;
// Three superpowers:
// 1.1 String Interpolation
// javascriptconst user = { name: "Alex", score: 95 };

// const result = `${user.name} scored ${user.score}/100`;
// // "Alex scored 95/100"

// // Expressions work too
// const status = `You ${user.score >= 90 ? "passed" : "failed"}!`;
// // "You passed!"

// // Function calls
// const greeting = `Hello ${user.name.toUpperCase()}!`;
// // "Hello ALEX!"
// 1.2 Multi-line Strings
// javascript// ❌ Old way
// const html = "<div>\n" +
//              "  <h1>Title</h1>\n" +
//              "  <p>Content</p>\n" +
//              "</div>";

// // ✅ Template literal
// const html = `
//   <div>
//     <h1>Title</h1>
//     <p>Content</p>
//   </div>
// `;
// 1.3 Tagged Templates (Advanced)
// javascript// Custom processing of template literals
// function currency(strings, ...values) {
//   return strings.reduce((result, str, i) => {
//     const value = values[i] !== undefined ? `$${values[i].toFixed(2)}` : '';
//     return result + str + value;
//   }, '');
// }

// const price = 29.5;
// const tax = 5.3;
// const total = currency`Total: ${price} + tax ${tax} = ${price + tax}`;
// // "Total: $29.50 + tax $5.30 = $34.80"

// 2. Essential String Methods
// 2.1 Trimming & Case
// javascriptconst input = "  Hello World  ";

// input.trim();        // "Hello World" — removes leading/trailing spaces
// input.trimStart();   // "Hello World  " — removes leading only
// input.trimEnd();     // "  Hello World" — removes trailing only

// input.toLowerCase(); // "  hello world  "
// input.toUpperCase(); // "  HELLO WORLD  "

// // Common pattern — clean user input
// const username = userInput.trim().toLowerCase();
// 2.2 Searching
// javascriptconst text = "JavaScript is awesome";

// // includes — does it contain substring?
// text.includes("Java");     // true
// text.includes("Python");   // false
// text.includes("script");   // true (case-sensitive!)

// // startsWith / endsWith
// text.startsWith("Java");   // true
// text.startsWith("Script"); // false
// text.endsWith("awesome");  // true
// text.endsWith("cool");     // false

// // indexOf — find position (returns -1 if not found)
// text.indexOf("is");        // 11
// text.indexOf("Python");    // -1

// // lastIndexOf — find from end
// "banana".indexOf("a");     // 1 (first 'a')
// "banana".lastIndexOf("a"); // 5 (last 'a')
// 2.3 Splitting & Joining
// javascriptconst sentence = "Learn JavaScript today";

// // split — string to array
// sentence.split(" ");  // ["Learn", "JavaScript", "today"]
// sentence.split("");   // ["L","e","a","r","n"," ","J",...] — every char

// const csv = "Alex,25,NYC";
// csv.split(",");      // ["Alex", "25", "NYC"]

// // join — array to string (opposite of split)
// const words = ["Learn", "JavaScript", "today"];
// words.join(" ");     // "Learn JavaScript today"
// words.join("-");     // "Learn-JavaScript-today"
// words.join("");      // "LearnJavaScripttoday"
// 2.4 Replacing
// javascriptconst text = "I love cats. Cats are great!";

// // replace — replaces FIRST match only
// text.replace("cats", "dogs");
// // "I love dogs. Cats are great!"

// // replaceAll — replaces ALL matches
// text.replaceAll("cats", "dogs");
// text.replaceAll("Cats", "Dogs");
// // "I love dogs. Dogs are great!"

// // Case-insensitive replace with regex (coming soon!)
// text.replace(/cats/gi, "dogs");
// // "I love dogs. dogs are great!"
// 2.5 Extracting Substrings
// javascriptconst text = "JavaScript";

// // slice(start, end) — most common
// text.slice(0, 4);    // "Java"
// text.slice(4);       // "Script" — from 4 to end
// text.slice(-6);      // "Script" — last 6 chars
// text.slice(0, -6);   // "Java" — everything except last 6

// // substring(start, end) — similar but handles negatives differently
// text.substring(0, 4); // "Java"

// // substr(start, length) — deprecated, don't use ❌
// 2.6 Padding
// javascriptconst num = "5";

// num.padStart(3, "0");  // "005" — pad to length 3 with "0"
// num.padEnd(3, "0");    // "500"

// // Real world — format credit card
// const last4 = "1234";
// const masked = last4.padStart(16, "*");
// // "************1234"
// 2.7 Repeating
// javascript"ha".repeat(3);      // "hahaha"
// "=".repeat(20);      // "===================="

// // Real world — text divider
// console.log("=".repeat(50));
// console.log("Section Title");
// console.log("=".repeat(50));

// 3. Regex — Pattern Matching Basics
// Regex = Regular Expressions = pattern matching for strings
// 3.1 Creating Regex
// javascript// Literal syntax
// const pattern1 = /hello/;

// // Constructor (when pattern is dynamic)
// const pattern2 = new RegExp("hello");
// 3.2 Test & Match
// javascriptconst text = "My email is alex@gmail.com";

// // test() — returns true/false
// const hasEmail = /\w+@\w+\.\w+/.test(text);  // true

// // match() — returns matched strings
// text.match(/alex/);     // ["alex"]
// text.match(/\w+@\w+\.\w+/); // ["alex@gmail.com"]

// // matchAll() — get all matches with details
// const emails = "Contact: alex@gmail.com or sam@yahoo.com";
// const matches = [...emails.matchAll(/\w+@\w+\.\w+/g)];
// // [["alex@gmail.com"], ["sam@yahoo.com"]]
// 3.3 Common Patterns
// javascript// \d — any digit (0-9)
// /\d/.test("abc123");     // true
// "Room 42".match(/\d+/);  // ["42"] — one or more digits

// // \w — word character (letter, digit, underscore)
// /\w+/.test("hello_123"); // true

// // \s — whitespace (space, tab, newline)
// "hello world".match(/\s/); // [" "]

// // ^ — start of string
// /^Hello/.test("Hello world"); // true
// /^Hello/.test("Say Hello");   // false

// // $ — end of string
// /world$/.test("Hello world"); // true
// /world$/.test("world is big"); // false

// // . — any character (except newline)
// /h.t/.test("hat"); // true
// /h.t/.test("hot"); // true
// /h.t/.test("ht");  // false

// // + — one or more
// // * — zero or more
// // ? — zero or one
// /\d+/.test("123");   // true — one or more digits
// /\d*/.test("");      // true — zero or more digits
// /colou?r/.test("color");  // true
// /colou?r/.test("colour"); // true
// 3.4 Flags
// javascript// i — case insensitive
// /hello/i.test("HELLO");  // true

// // g — global (find all matches)
// "aaa".match(/a/);   // ["a"] — first only
// "aaa".match(/a/g);  // ["a", "a", "a"] — all

// // m — multiline
// const text = "Line 1\nLine 2";
// /^Line/.test(text);  // true — matches "Line 1"
// /^Line/m.test(text); // true — can match start of ANY line
// 3.5 Practical Validation Patterns
// javascript// Email (basic)
// function isValidEmail(email) {
//   const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return pattern.test(email);
// }

// isValidEmail("alex@gmail.com");    // true
// isValidEmail("invalid.email");     // false
// isValidEmail("@gmail.com");        // false

// // Phone (US format)
// function isValidPhone(phone) {
//   const pattern = /^\d{3}-\d{3}-\d{4}$/;
//   return pattern.test(phone);
// }

// isValidPhone("123-456-7890"); // true
// isValidPhone("1234567890");   // false

// // Username (alphanumeric + underscore, 3-16 chars)
// function isValidUsername(username) {
//   const pattern = /^[a-zA-Z0-9_]{3,16}$/;
//   return pattern.test(username);
// }

// isValidUsername("alex_123");  // true
// isValidUsername("al");        // false (too short)
// isValidUsername("alex@123");  // false (@ not allowed)

// // Password strength (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
// function isStrongPassword(password) {
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasLowercase = /[a-z]/.test(password);
//   const hasNumber = /\d/.test(password);
//   const isLongEnough = password.length >= 8;
  
//   return hasUppercase && hasLowercase && hasNumber && isLongEnough;
// }

// isStrongPassword("Pass1234"); // true
// isStrongPassword("password"); // false (no uppercase, no number)

// 4. Real-World String Utilities
// javascript// Capitalize first letter
// function capitalize(str) {
//   return str[0].toUpperCase() + str.slice(1);
// }
// capitalize("hello"); // "Hello"

// // Title case
// function titleCase(str) {
//   return str.split(" ")
//     .map(word => capitalize(word.toLowerCase()))
//     .join(" ");
// }
// titleCase("hello WORLD today"); // "Hello World Today"

// // Truncate with ellipsis
// function truncate(str, maxLength) {
//   return str.length > maxLength 
//     ? str.slice(0, maxLength) + "..."
//     : str;
// }
// truncate("This is a long sentence", 10); // "This is a..."

// // Slugify (for URLs)
// function slugify(str) {
//   return str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")  // remove special chars
//     .replace(/\s+/g, "-")       // spaces to hyphens
//     .replace(/-+/g, "-");       // collapse multiple hyphens
// }
// slugify("Hello World! 123"); // "hello-world-123"

// // Extract hashtags
// function extractHashtags(text) {
//   return text.match(/#\w+/g) || [];
// }
// extractHashtags("Learning #JavaScript and #WebDev today!");
// // ["#JavaScript", "#WebDev"]