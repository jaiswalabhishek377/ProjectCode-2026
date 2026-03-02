PC44 — Event Listeners & Bubbling
This is where your pages become interactive! Every click, hover, keypress, form submission — all handled through events! 💪

1. What Are Events?
Events = Actions that happen in the browser
javascript// User clicks → "click" event fires
// User types → "input" event fires
// Page loads → "load" event fires
// User scrolls → "scroll" event fires
JavaScript can listen for these events and respond to them!

2. addEventListener() — The Modern Way
javascriptconst button = document.querySelector("#myButton");

button.addEventListener("click", function() {
  console.log("Button clicked!");
});

// Or with arrow function
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
Format: element.addEventListener(eventType, callback)

3. Common Event Types
Mouse Events
javascriptconst box = document.querySelector("#box");

box.addEventListener("click", () => {
  console.log("Clicked!");
});

box.addEventListener("dblclick", () => {
  console.log("Double clicked!");
});

box.addEventListener("mouseenter", () => {
  console.log("Mouse entered!");
});

box.addEventListener("mouseleave", () => {
  console.log("Mouse left!");
});

box.addEventListener("mousemove", (e) => {
  console.log(`Mouse at ${e.clientX}, ${e.clientY}`);
});

box.addEventListener("mousedown", () => {
  console.log("Mouse button pressed!");
});

box.addEventListener("mouseup", () => {
  console.log("Mouse button released!");
});

Keyboard Events
javascriptconst input = document.querySelector("#search");

input.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
});

input.addEventListener("keyup", (e) => {
  console.log("Key released:", e.key);
});

input.addEventListener("keypress", (e) => {
  console.log("Character entered:", e.key);
  // ⚠️ Deprecated — use keydown instead
});

// Detect specific keys
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Enter pressed!");
  }
  if (e.key === "Escape") {
    console.log("Escape pressed!");
  }
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault(); // Prevent browser save
    console.log("Ctrl+S pressed!");
  }
});

Form Events
javascriptconst form = document.querySelector("#myForm");
const input = document.querySelector("#email");

// Input event — fires on every change
input.addEventListener("input", (e) => {
  console.log("Current value:", e.target.value);
});

// Change event — fires when focus leaves (if value changed)
input.addEventListener("change", (e) => {
  console.log("Final value:", e.target.value);
});

// Focus events
input.addEventListener("focus", () => {
  console.log("Input focused");
});

input.addEventListener("blur", () => {
  console.log("Input lost focus");
});

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // ⚠️ Prevent page reload!
  console.log("Form submitted!");
  
  const formData = new FormData(form);
  console.log(formData.get("email"));
});

Other Important Events
javascript// Page load
window.addEventListener("load", () => {
  console.log("Page fully loaded!");
});

// DOM ready (better than load)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready!");
  // Start your app here
});

// Scroll
window.addEventListener("scroll", () => {
  console.log("Scrolled to:", window.scrollY);
});

// Resize
window.addEventListener("resize", () => {
  console.log("Window size:", window.innerWidth, window.innerHeight);
});

// Before page unload
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = ""; // Shows "Leave site?" dialog
});

4. The Event Object
Every event listener receives an event object:
javascriptbutton.addEventListener("click", (event) => {
  console.log(event); // Full event object
  
  // Common properties
  console.log(event.type);        // "click"
  console.log(event.target);      // Element that triggered event
  console.log(event.currentTarget); // Element listener is attached to
  console.log(event.timeStamp);   // When it happened
  
  // Mouse events
  console.log(event.clientX);     // X coordinate
  console.log(event.clientY);     // Y coordinate
  console.log(event.button);      // Which mouse button (0=left, 1=middle, 2=right)
  
  // Keyboard events
  console.log(event.key);         // "a", "Enter", "Escape"
  console.log(event.code);        // "KeyA", "Enter", "Escape"
  console.log(event.ctrlKey);     // true if Ctrl pressed
  console.log(event.shiftKey);    // true if Shift pressed
  console.log(event.altKey);      // true if Alt pressed
  
  // Methods
  event.preventDefault();         // Prevent default behavior
  event.stopPropagation();        // Stop event bubbling
});

5. preventDefault() — Stop Default Behavior
javascript// Prevent link navigation
const link = document.querySelector("a");
link.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Link clicked but not followed!");
});

// Prevent form submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submit prevented!");
  // Handle with JavaScript instead
});

// Prevent right-click menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  console.log("Right-click disabled!");
});

// Prevent specific keys
document.addEventListener("keydown", (e) => {
  if (e.key === "F12") {
    e.preventDefault(); // Prevent DevTools (not recommended!)
  }
});

6. Event Bubbling — The Tricky Part!
Events "bubble up" from child to parent to grandparent!
html<div id="outer" style="padding: 50px; background: lightblue;">
  Outer
  <div id="middle" style="padding: 50px; background: lightgreen;">
    Middle
    <div id="inner" style="padding: 50px; background: lightcoral;">
      Inner
    </div>
  </div>
</div>
javascriptconst outer = document.querySelector("#outer");
const middle = document.querySelector("#middle");
const inner = document.querySelector("#inner");

outer.addEventListener("click", () => {
  console.log("Outer clicked!");
});

middle.addEventListener("click", () => {
  console.log("Middle clicked!");
});

inner.addEventListener("click", () => {
  console.log("Inner clicked!");
});

// Click on Inner:
// "Inner clicked!"
// "Middle clicked!" ← bubbles up!
// "Outer clicked!"  ← bubbles up!
```

**Flow:**
```
Click Inner → Inner handler runs → bubbles to Middle → Middle handler runs → bubbles to Outer → Outer handler runs

7. stopPropagation() — Stop Bubbling
javascriptinner.addEventListener("click", (e) => {
  console.log("Inner clicked!");
  e.stopPropagation(); // Stop here!
});

middle.addEventListener("click", () => {
  console.log("Middle clicked!"); // Won't fire if clicked Inner
});

outer.addEventListener("click", () => {
  console.log("Outer clicked!"); // Won't fire if clicked Inner
});

// Click on Inner:
// "Inner clicked!" ← Only this runs now!

8. event.target vs event.currentTarget
javascriptouter.addEventListener("click", (e) => {
  console.log("target:", e.target);         // Element you actually clicked
  console.log("currentTarget:", e.currentTarget); // Element listener is on
});

// Click on Inner:
// target: <div id="inner">        ← what you clicked
// currentTarget: <div id="outer">  ← where listener is attached
Use case:
javascript// Detect which child was clicked
document.querySelector("#parent").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    console.log("Delete button clicked!");
    e.target.closest("li").remove();
  }
});

9. Event Capturing (Rare) — Opposite of Bubbling
javascript// Third parameter: true = capturing phase
outer.addEventListener("click", () => {
  console.log("Outer (capturing)");
}, true);

middle.addEventListener("click", () => {
  console.log("Middle (capturing)");
}, true);

inner.addEventListener("click", () => {
  console.log("Inner (capturing)");
}, true);

// Click on Inner:
// "Outer (capturing)"  ← starts from top!
// "Middle (capturing)"
// "Inner (capturing)"
Almost never used — bubbling is the default and what you want 99% of the time!

10. Removing Event Listeners
javascriptfunction handleClick() {
  console.log("Clicked!");
}

button.addEventListener("click", handleClick);

// Remove it later
button.removeEventListener("click", handleClick);

// ⚠️ Must be the SAME function reference!
// This won't work:
button.addEventListener("click", () => console.log("Hi"));
button.removeEventListener("click", () => console.log("Hi")); // Different function!
Use case:
javascript// One-time event
function runOnce() {
  console.log("Runs once!");
  button.removeEventListener("click", runOnce);
}

button.addEventListener("click", runOnce);

// Or use { once: true }
button.addEventListener("click", () => {
  console.log("Runs once!");
}, { once: true });

11. Event Listener Options
javascriptelement.addEventListener("click", handler, {
  once: true,        // Remove after first trigger
  passive: true,     // Won't call preventDefault (better performance for scroll)
  capture: true      // Use capturing phase instead of bubbling
});

// Example: Better scroll performance
window.addEventListener("scroll", handleScroll, { passive: true });

12. Real-World Patterns
Toggle Menu
javascriptconst menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove("open");
  }
});

Live Search
javascriptconst searchInput = document.querySelector("#search");
const results = document.querySelector("#results");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  
  // Filter results
  const items = document.querySelectorAll(".item");
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

Form Validation
javascriptconst form = document.querySelector("#signup");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let valid = true;
  
  if (!email.value.includes("@")) {
    showError(email, "Invalid email");
    valid = false;
  }
  
  if (password.value.length < 8) {
    showError(password, "Password must be 8+ characters");
    valid = false;
  }
  
  if (valid) {
    console.log("Form is valid! Submit to server.");
  }
});

function showError(input, message) {
  const error = document.createElement("span");
  error.className = "error";
  error.textContent = message;
  input.parentElement.appendChild(error);
}