PC43 — DOM Selection & Manipulation
This is where JavaScript comes alive! Everything you've learned so far was preparation for THIS — making web pages interactive! 💪

1. What is the DOM?
DOM = Document Object Model
It's a tree structure representing your HTML:
html<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <div id="app">
      <h1 class="title">Hello</h1>
      <p>Welcome!</p>
    </div>
  </body>
</html>
```

**DOM Tree:**
```
document
  └─ html
      ├─ head
      │   └─ title
      │       └─ "My Page" (text node)
      └─ body
          └─ div#app
              ├─ h1.title
              │   └─ "Hello" (text node)
              └─ p
                  └─ "Welcome!" (text node)
Every HTML element is a node in the tree. JavaScript can access and modify them!

2. Selecting Elements — The 5 Main Methods
getElementById() — One Element by ID
javascript// HTML: <div id="app">Content</div>

const app = document.getElementById("app");
console.log(app); // <div id="app">Content</div>

// Returns null if not found
const missing = document.getElementById("nothere");
console.log(missing); // null
Best for: Unique elements (headers, containers)

getElementsByClassName() — Multiple Elements by Class
javascript// HTML: <p class="text">One</p>
//       <p class="text">Two</p>

const texts = document.getElementsByClassName("text");
console.log(texts); // HTMLCollection [p.text, p.text]
console.log(texts.length); // 2
console.log(texts[0]); // <p class="text">One</p>

// HTMLCollection is LIVE — updates automatically!
⚠️ Returns HTMLCollection, NOT an array!
javascript// ❌ Can't use array methods directly
texts.map(el => el.textContent); // TypeError

// ✅ Convert to array first
Array.from(texts).map(el => el.textContent); // ["One", "Two"]
// or
[...texts].map(el => el.textContent); // ["One", "Two"]

getElementsByTagName() — Multiple Elements by Tag
javascript// HTML: <p>One</p> <p>Two</p> <p>Three</p>

const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // 3

// Get all images
const images = document.getElementsByTagName("img");

// Get all div elements
const divs = document.getElementsByTagName("div");

querySelector() — FIRST Match (CSS Selector)
javascript// HTML: <div class="container">
//         <p class="text">First</p>
//         <p class="text">Second</p>
//       </div>

// Select by class
const first = document.querySelector(".text");
console.log(first); // <p class="text">First</p> ← FIRST match only

// Select by ID
const app = document.querySelector("#app");

// Select by tag
const paragraph = document.querySelector("p");

// Complex selectors
const link = document.querySelector("nav a.active");
const input = document.querySelector("input[type='email']");
const lastChild = document.querySelector("ul li:last-child");
Best for: Complex selectors, single elements

querySelectorAll() — ALL Matches (CSS Selector)
javascript// HTML: <p class="text">One</p>
//       <p class="text">Two</p>
//       <p class="text">Three</p>

const allTexts = document.querySelectorAll(".text");
console.log(allTexts); // NodeList [p.text, p.text, p.text]
console.log(allTexts.length); // 3

// NodeList has forEach!
allTexts.forEach(el => {
  console.log(el.textContent);
});

// Convert to array for full array methods
const array = [...allTexts];
⚠️ Returns NodeList (static snapshot, not live)

3. Selection Comparison Chart
MethodReturnsLive?SpeedUse CasegetElementById()Element or null-⚡ FastestSingle unique elementgetElementsByClassName()HTMLCollection✅ LiveFastMultiple by classgetElementsByTagName()HTMLCollection✅ LiveFastAll of one tag typequerySelector()Element or null-SlowerComplex selector, first matchquerySelectorAll()NodeList❌ StaticSlowerComplex selector, all matches
Modern best practice: Use querySelector() and querySelectorAll() for everything — they're flexible and readable!

4. Reading & Changing Text Content
textContent — Plain Text (Best)
javascript// HTML: <p id="demo">Hello <strong>World</strong></p>

const p = document.querySelector("#demo");

console.log(p.textContent); // "Hello World" (no HTML tags)

p.textContent = "New text";
// Result: <p id="demo">New text</p>
// (strong tag removed!)
Use for: Plain text display/updates

innerHTML — HTML String (Use Carefully!)
javascript// HTML: <div id="content"></div>

const div = document.querySelector("#content");

div.innerHTML = "<p>Hello <strong>World</strong></p>";
// Result: <div id="content">
//           <p>Hello <strong>World</strong></p>
//         </div>

console.log(div.innerHTML); // "<p>Hello <strong>World</strong></p>"
⚠️ Security Risk — Never insert user input directly!
javascript// ❌ DANGEROUS — XSS vulnerability!
const userInput = '<img src=x onerror="alert(\'hacked\')">';
div.innerHTML = userInput; // Script executes! 💀

// ✅ SAFE — sanitize first or use textContent
div.textContent = userInput; // Shows as literal text

innerText — Rendered Text (Avoid)
javascript// HTML: <p id="demo">Hello <span style="display:none">Hidden</span> World</p>

const p = document.querySelector("#demo");

console.log(p.textContent); // "Hello Hidden World"
console.log(p.innerText);   // "Hello World" (ignores hidden elements)
Avoid innerText:

Slower (calculates CSS rendering)
Inconsistent across browsers
Use textContent instead!


5. Working with Attributes
getAttribute() & setAttribute()
javascript// HTML: <a id="link" href="https://google.com" target="_blank">Google</a>

const link = document.querySelector("#link");

// Get attribute
console.log(link.getAttribute("href")); // "https://google.com"
console.log(link.getAttribute("target")); // "_blank"

// Set attribute
link.setAttribute("href", "https://github.com");
link.setAttribute("rel", "noopener");

// Remove attribute
link.removeAttribute("target");

// Check if attribute exists
if (link.hasAttribute("href")) {
  console.log("Link has href");
}

Direct Property Access (Preferred)
javascript// HTML: <input id="email" type="email" value="test@example.com">

const input = document.querySelector("#email");

// ✅ Property access (cleaner)
console.log(input.type);  // "email"
console.log(input.value); // "test@example.com"

input.value = "new@example.com";
input.disabled = true;

// ✅ Works for most common attributes
console.log(link.href);   // "https://google.com"
link.href = "https://github.com";

Data Attributes — Custom Data
javascript// HTML: <button id="btn" data-user-id="123" data-action="delete">Delete</button>

const btn = document.querySelector("#btn");

// Access via dataset
console.log(btn.dataset.userId);  // "123" (camelCase!)
console.log(btn.dataset.action);  // "delete"

// Set data attributes
btn.dataset.userId = "456";
btn.dataset.status = "active";

// Result: <button data-user-id="456" data-action="delete" data-status="active">
Use for: Storing metadata on elements (IDs, settings, state)

6. Manipulating Inline Styles
javascript// HTML: <div id="box">Box</div>

const box = document.querySelector("#box");

// Set individual styles
box.style.color = "red";
box.style.backgroundColor = "blue"; // camelCase for hyphenated properties!
box.style.fontSize = "20px";
box.style.border = "2px solid black";

// Read computed style (includes CSS from stylesheets)
const computedStyle = window.getComputedStyle(box);
console.log(computedStyle.color); // "rgb(255, 0, 0)"
console.log(computedStyle.width); // "100px"

// Set multiple styles
box.style.cssText = "color: green; background: yellow; padding: 10px;";

// Remove style
box.style.color = "";
⚠️ Inline styles override CSS classes!
css/* CSS file */
.box { color: blue; }
javascriptbox.classList.add("box"); // color is blue
box.style.color = "red";  // NOW color is red (inline wins!)
Best practice: Use classes for styling, not inline styles!

7. Classes > Inline Styles (Modern Approach)
classList API
javascript// HTML: <div id="card" class="active">Card</div>

const card = document.querySelector("#card");

// Add class
card.classList.add("highlight");
// Result: <div class="active highlight">

// Add multiple
card.classList.add("large", "featured");

// Remove class
card.classList.remove("active");

// Toggle class (add if missing, remove if present)
card.classList.toggle("hidden");

// Check if has class
if (card.classList.contains("active")) {
  console.log("Card is active");
}

// Replace class
card.classList.replace("large", "small");

Why Classes Are Better
javascript// ❌ BAD — inline styles (hard to maintain)
button.style.backgroundColor = "blue";
button.style.color = "white";
button.style.padding = "10px 20px";
button.style.border = "none";
button.style.borderRadius = "5px";

// ✅ GOOD — use classes (defined in CSS)
button.classList.add("btn-primary");
css/* CSS file — single source of truth */
.btn-primary {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: darkblue;
}
Benefits:

CSS handles styling (separation of concerns)
Easy to update all buttons at once
Can use pseudo-classes (:hover, :active)
Enables CSS transitions/animations
Better performance


8. Real-World Patterns
Toggle Dark Mode
javascriptconst toggleBtn = document.querySelector("#theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
cssbody.dark-mode {
  background: #1a1a1a;
  color: #ffffff;
}

Show/Hide Elements
javascriptconst modal = document.querySelector("#modal");
const openBtn = document.querySelector("#open-modal");
const closeBtn = document.querySelector("#close-modal");

openBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
css#modal {
  display: none;
}

#modal.active {
  display: block;
}

Dynamic List from Data
javascriptconst users = [
  { id: 1, name: "Alex", active: true },
  { id: 2, name: "Sam", active: false },
  { id: 3, name: "Jordan", active: true }
];

const list = document.querySelector("#user-list");

users.forEach(user => {
  const li = document.createElement("li");
  li.textContent = user.name;
  li.dataset.userId = user.id;
  
  if (user.active) {
    li.classList.add("active");
  }
  
  list.appendChild(li);
});