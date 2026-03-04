PC45 — Event Delegation Pattern
This is one of the most important patterns in JavaScript! It solves performance issues, handles dynamic elements, and makes your code cleaner. Let's master it! 💪

1. The Problem — Inefficient Event Handling
html<ul id="todo-list">
  <li>Task 1 <button class="delete">Delete</button></li>
  <li>Task 2 <button class="delete">Delete</button></li>
  <li>Task 3 <button class="delete">Delete</button></li>
  <!-- 100 more items... -->
</ul>
❌ Bad Approach — Listener on Every Button
javascriptconst deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.remove();
  });
});
Problems:

Performance — 100 items = 100 event listeners in memory! 
Dynamic elements — New items added later have NO listener!
Memory leaks — Listeners not cleaned up when elements removed

javascript// Add new item dynamically
const li = document.createElement("li");
li.innerHTML = 'New Task <button class="delete">Delete</button>';
todoList.appendChild(li);

// ❌ The new delete button does NOTHING! No listener attached!

2. The Solution — Event Delegation
Put ONE listener on the parent, use event bubbling!
javascriptconst todoList = document.querySelector("#todo-list");

// ✅ ONE listener on the parent!
todoList.addEventListener("click", (e) => {
  // Check if clicked element is a delete button
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});
Benefits:

ONE listener instead of 100! ✅
Works for dynamic elements — new items automatically work! ✅
Better performance — less memory, faster page load ✅
Auto cleanup — no orphaned listeners ✅


3. How It Works — Event Bubbling Recap
html<ul id="todo-list">           ← Listener here!
  <li>                        ← Event bubbles through here
    Task 1 
    <button class="delete">   ← Click starts here
      Delete
    </button>
  </li>
</ul>
Flow:

User clicks <button>
Click event fires on button
Event bubbles up to <li>
Event bubbles up to <ul> ← Listener catches it here!
We check e.target to see what was actually clicked


4. The Pattern — Step by Step
javascript// Step 1: Add listener to PARENT
parentElement.addEventListener("eventType", (e) => {
  
  // Step 2: Check if target matches what we want
  if (e.target.matches(".selector")) {
    // Step 3: Handle the event
    console.log("Target element clicked!");
  }
});
Example:
javascriptdocument.querySelector("#todo-list").addEventListener("click", (e) => {
  // Delete button clicked?
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
  }
  
  // Todo text clicked?
  if (e.target.classList.contains("todo-text")) {
    e.target.classList.toggle("completed");
  }
  
  // Edit button clicked?
  if (e.target.classList.contains("edit")) {
    const li = e.target.closest("li");
    const text = li.querySelector(".todo-text");
    const newText = prompt("Edit task:", text.textContent);
    if (newText) text.textContent = newText;
  }
});

5. Checking the Target — 4 Methods
Method 1: classList.contains()
javascriptul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    console.log("Delete button clicked!");
  }
});

Method 2: matches() — CSS Selectors
javascriptul.addEventListener("click", (e) => {
  // Match any CSS selector
  if (e.target.matches("button.delete")) {
    console.log("Delete button clicked!");
  }
  
  if (e.target.matches("li > button")) {
    console.log("Button inside li clicked!");
  }
});

Method 3: tagName
javascriptul.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Any button clicked!");
  }
  
  // ⚠️ tagName is always UPPERCASE
  if (e.target.tagName === "button") { //  Won't match!
    console.log("Never runs!");
  }
});

Method 4: closest() — Find Parent Match
javascript// Problem: Clicking text inside button doesn't match button itself
// <button class="delete">
//   <span>Delete</span>  ← Clicking here, e.target = span!
// </button>

ul.addEventListener("click", (e) => {
  // ❌ Doesn't work if clicked span
  if (e.target.classList.contains("delete")) {
    // Only fires if button clicked directly
  }
  
  // ✅ Works even if clicked child element!
  const deleteBtn = e.target.closest(".delete");
  if (deleteBtn) {
    deleteBtn.parentElement.remove();
  }
});
closest() is the most robust method! 

6. Real-World Examples
Dynamic Todo List
javascriptconst todoList = document.querySelector("#todo-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

// Add new todos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  
  if (text) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="todo-text">${text}</span>
      <button class="complete-btn">✓</button>
      <button class="delete-btn">×</button>
    `;
    todoList.appendChild(li);
    todoInput.value = "";
  }
});

// ✅ ONE listener handles ALL todos (even future ones!)
todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return; // Clicked outside li
  
  // Complete button
  if (e.target.matches(".complete-btn")) {
    li.classList.toggle("completed");
  }
  
  // Delete button
  if (e.target.matches(".delete-btn")) {
    li.remove();
  }
  
  // Click on text to edit
  if (e.target.matches(".todo-text")) {
    const newText = prompt("Edit:", e.target.textContent);
    if (newText) e.target.textContent = newText;
  }
});

Table with Action Buttons
javascriptconst table = document.querySelector("#user-table");

table.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;
  
  const userId = row.dataset.userId;
  
  // Edit button
  if (e.target.matches(".edit-btn")) {
    console.log(`Edit user ${userId}`);
    // Open edit modal...
  }
  
  // Delete button
  if (e.target.matches(".delete-btn")) {
    if (confirm("Delete this user?")) {
      row.remove();
      console.log(`Deleted user ${userId}`);
    }
  }
  
  // View button
  if (e.target.matches(".view-btn")) {
    console.log(`View user ${userId}`);
    // Navigate to user profile...
  }
});

Infinite Scroll / Dynamic Content  
javascriptconst feed = document.querySelector("#feed");
// Load more items dynamically
function loadMoreItems() {
  for (let i = 0; i < 10; i++) {
    const article = document.createElement("article");
    article.innerHTML = `
      <h3>Article ${i}</h3>
      <button class="like-btn">Like</button>
      <button class="share-btn">Share</button>
    `;
    feed.appendChild(article);
  }
}
loadMoreItems(); // Initial load
// ✅ Works for all current AND future articles!
feed.addEventListener("click", (e) => {
  const article = e.target.closest("article");
  if (e.target.matches(".like-btn")) {
    e.target.textContent = "Liked!";
    e.target.disabled = true;
  }
  if (e.target.matches(".share-btn")) {
    alert(`Sharing: ${article.querySelector("h3").textContent}`);
  }
});
// Load more on scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadMoreItems(); // Buttons work automatically! ✅
  }
});

7. Delegation with Multiple Event Types
javascriptconst list = document.querySelector("#list");

// Click events
list.addEventListener("click", (e) => {
  if (e.target.matches(".item")) {
    console.log("Item clicked");
  }
});

// Hover events
list.addEventListener("mouseenter", (e) => {
  if (e.target.matches(".item")) {
    e.target.classList.add("hover");
  }
}, true); // Use capture phase for mouseenter

list.addEventListener("mouseleave", (e) => {
  if (e.target.matches(".item")) {
    e.target.classList.remove("hover");
  }
}, true);

8. When NOT to Use Delegation
javascript// ❌ Don't delegate if only ONE element
const singleButton = document.querySelector("#single-btn");
singleButton.addEventListener("click", () => {
  console.log("Just add listener directly!");
});

// ❌ Don't delegate high-frequency events (scroll, mousemove)
// These fire too often — delegation overhead adds up
window.addEventListener("scroll", handleScroll); // Direct listener better

// ❌ Don't delegate if parent is too high up
// Bad: listener on document catches EVERYTHING
document.addEventListener("click", (e) => {
  if (e.target.matches(".rare-element")) {
    // Checks EVERY click on page! Wasteful!
  }
});

// ✅ Good: listener on nearest common parent
const container = document.querySelector("#specific-container");
container.addEventListener("click", (e) => {
  if (e.target.matches(".rare-element")) {
    // Only checks clicks inside container
  }
});

9. Advanced Pattern — Data Attributes
javascript// HTML with data attributes
// <button data-action="delete" data-id="123">Delete</button>
// <button data-action="edit" data-id="123">Edit</button>

list.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  
  if (!action) return; // Not an action button
  
  switch (action) {
    case "delete":
      console.log(`Delete item ${id}`);
      break;
    case "edit":
      console.log(`Edit item ${id}`);
      break;
    case "view":
      console.log(`View item ${id}`);
      break;
  }
});

10. Delegation Performance Comparison
javascript// ❌ 1000 individual listeners
const items = document.querySelectorAll(".item"); // 1000 items
items.forEach(item => {
  item.addEventListener("click", handleClick); // 1000 listeners!
});
// Memory: ~50KB
// Event registration: ~100ms

// ✅ ONE delegated listener
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches(".item")) {
    handleClick(e);
  }
});
// Memory: ~0.05KB
// Event registration: ~1ms
// 1000x more efficient! 🚀
