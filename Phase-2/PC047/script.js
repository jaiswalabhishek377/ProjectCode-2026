PC47 — DOM Traversal & Class Manipulation
This is where you become a DOM navigator! Moving through the DOM tree like a pro and controlling classes for beautiful UI state changes! 💪

1. The DOM Tree Structure
html<div id="container">           ← parent
  <h1>Title</h1>               ← first child
  <p class="text">Para 1</p>  ← sibling to h1
  <p class="text">Para 2</p>  ← sibling to first p
  <button>Click</button>       ← last child
</div>
Relationships:
h1 and p are siblings
div is the parent of all
h1 is the first child of div
button is the last child of div

2. Parent Traversal
parentElement — Direct Parent
const paragraph = document.querySelector('p');

console.log(paragraph.parentElement);
// <div id="container">

console.log(paragraph.parentElement.parentElement);
// <body>

// ⚠️ Returns null if no parent
console.log(document.documentElement.parentElement);
// null (html is the top)

closest() — Find Parent Match (Most Useful!)
// HTML:
// <div class="card">
//   <div class="card-body">
//     <button class="delete">Delete</button>
//   </div>
// </div>

const button = document.querySelector('.delete');
// Walk UP the tree until match found
button.closest('.card');        // <div class="card">
button.closest('.card-body');   // <div class="card-body">
button.closest('div');          // <div class="card-body"> (first div)
button.closest('body');         // <body>

// Returns null if not found
button.closest('.not-here');    // null
Real-world use:
// Delete the entire card from any button inside it
document.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.delete-btn');
  if (deleteBtn) {
    const card = deleteBtn.closest('.card');
    card.remove();
  }
});

3. Child Traversal
children — Direct Children Only (HTMLCollection)
// HTML:
// <ul id="list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

const list = document.querySelector('#list');

console.log(list.children);
// HTMLCollection [li, li, li]

console.log(list.children.length); // 3
console.log(list.children[0]);     // <li>Item 1</li>

// ⚠️ HTMLCollection is LIVE (updates automatically)
const li = document.createElement('li');
list.appendChild(li);
console.log(list.children.length); // 4 (updated!)

firstElementChild & lastElementChild
const list = document.querySelector('#list');

console.log(list.firstElementChild);
// <li>Item 1</li>

console.log(list.lastElementChild);
// <li>Item 3</li>

// Useful for styling
list.firstElementChild.style.color = 'red';
list.lastElementChild.style.color = 'blue';

childNodes — All Nodes (Includes Text Nodes!)
// HTML:
// <div id="box">
//   <p>Text</p>
// </div>

const box = document.querySelector('#box');

console.log(box.childNodes);
// NodeList [text, p, text]
//           ↑     ↑  ↑
//      whitespace  element  whitespace

// ⚠️ Usually DON'T want this - use children instead!
console.log(box.children);
// HTMLCollection [p] ✅

4. Sibling Traversal
nextElementSibling & previousElementSibling
// HTML:
// <div>
//   <p id="first">First</p>
//   <p id="middle">Middle</p>
//   <p id="last">Last</p>
// </div>
const middle = document.querySelector('#middle');

console.log(middle.previousElementSibling);
// <p id="first">First</p>

console.log(middle.nextElementSibling);
// <p id="last">Last</p>

// Chain them
console.log(middle.nextElementSibling.nextElementSibling);
// null (no more siblings)
Real-world use — Tab Navigation:
// Highlight next tab
const activeTab = document.querySelector('.tab.active');
const nextTab = activeTab.nextElementSibling;

if (nextTab) {
  activeTab.classList.remove('active');
  nextTab.classList.add('active');
}

5. Querying Within Elements
// HTML:
// <div id="card">
//   <h2 class="title">Card Title</h2>
//   <p class="text">Card text</p>
//   <button>Click</button>
// </div>

const card = document.querySelector('#card');

// Search INSIDE card only
const title = card.querySelector('.title');
const button = card.querySelector('button');
const allPs = card.querySelectorAll('p');

// vs searching entire document
const title2 = document.querySelector('.title'); // Same result
Use case — Multiple similar components:
// HTML:
// <div class="card">
//   <h2>Card 1</h2>
//   <button class="edit">Edit</button>
// </div>
// <div class="card">
//   <h2>Card 2</h2>
//   <button class="edit">Edit</button>
// </div>

// Get button from SPECIFIC card
const cards = document.querySelectorAll('.card');
const firstCardButton = cards[0].querySelector('.edit');
const secondCardButton = cards[1].querySelector('.edit');

6. classList API — The Modern Way
add() — Add Class
const button = document.querySelector('button');
button.classList.add('active');
// <button class="active">
// Add multiple
button.classList.add('btn', 'btn-primary', 'large');
// <button class="active btn btn-primary large">
remove() — Remove Class
button.classList.remove('active');
// <button class="btn btn-primary large">
// Remove multiple
button.classList.remove('btn', 'large');
// <button class="btn-primary">

toggle() — Add if Missing, Remove if Present
const modal = document.querySelector('.modal');

// Click to toggle visibility
button.addEventListener('click', () => {
  modal.classList.toggle('hidden');
});

// Force add or remove (optional 2nd parameter)
modal.classList.toggle('hidden', true);  // Force ADD
modal.classList.toggle('hidden', false); // Force REMOVE

// Real-world: Toggle menu
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

contains() — Check if Has Class
if (button.classList.contains('active')) {
  console.log('Button is active');
}

// Use in conditions
const isHidden = element.classList.contains('hidden');
const isDisabled = button.classList.contains('disabled');
if (!isDisabled) {
  // Do something
}
replace() — Replace One Class with Another
// <div class="status pending">
const statusDiv = document.querySelector('.status');
statusDiv.classList.replace('pending', 'completed');
// <div class="status completed">
statusDiv.classList.replace('completed', 'failed');
// <div class="status failed">

7. Old Way (Avoid) — className
const div = document.createElement('div');
// ❌ className overwrites ALL classes
div.className = 'card';
div.className = 'active'; // "card" is GONE!
// ❌ Adding classes is awkward
div.className += ' featured'; // Space is critical!

// ✅ Use classList instead
div.classList.add('card');
div.classList.add('active');
div.classList.add('featured');
// <div class="card active featured">

8. Real-World Patterns
Accordion Menu
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  
  header.addEventListener('click', () => {
    // Close all others
    accordionItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('open');
      }
    });
    
    // Toggle this one
    item.classList.toggle('open');
  });
});

Tab System
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove active from all
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    
    // Add active to clicked
    tab.classList.add('active');
    panels[index].classList.add('active');
  });
});

Highlight Active Link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Remove active from all
    navLinks.forEach(l => l.classList.remove('active'));
    
    // Add to clicked
    e.target.classList.add('active');
  });
});

Toast Notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  toast.textContent = message;
  document.body.appendChild(toast);
  // Show with animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300); // Wait for animation
  }, 3000);
}
showToast('Success!', 'success');
showToast('Error!', 'error');
css.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.3s;
}
.toast.show {
  opacity: 1;
  transform: translateY(0);
}
.toast-success { background: #28a745; color: white; }
.toast-error { background: #dc3545; color: white; }
.toast-info { background: #17a2b8; color: white; }
Carousel Navigation
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}
document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});
document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

9. Combining Traversal with Classes
// Find parent card and highlight it
button.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  card.classList.add('selected');
});

// Toggle siblings
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active from siblings
    const parent = item.parentElement;
    parent.querySelectorAll('.item').forEach(i => {
      i.classList.remove('active');
    });
    // Add to this one
    item.classList.add('active');
  });
});