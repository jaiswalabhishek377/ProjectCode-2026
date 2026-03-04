// <!-- Use this HTML -->
// <!DOCTYPE html>
// <html>
// <head>
//   <style>
//     .hidden { display: none; }
//     .active { background: yellow; }
//     .completed { text-decoration: line-through; opacity: 0.6; }
//     .highlight { border: 2px solid blue; }
//   </style>
// </head>
// <body>
//   <div id="app">
//     <ul id="list">
//       <li class="item">Item 1</li>
//       <li class="item active">Item 2</li>
//       <li class="item">Item 3</li>
//       <li class="item">Item 4</li>
//       <li class="item">Item 5</li>
//     </ul>
    
//     <div id="accordion">
//       <div class="accordion-item">
//         <div class="accordion-header">Section 1</div>
//         <div class="accordion-body hidden">Content 1</div>
//       </div>
//       <div class="accordion-item">
//         <div class="accordion-header">Section 2</div>
//         <div class="accordion-body hidden">Content 2</div>
//       </div>
//       <div class="accordion-item">
//         <div class="accordion-header">Section 3</div>
//         <div class="accordion-body hidden">Content 3</div>
//       </div>
//     </div>
    
//     <div id="tabs">
//       <button class="tab active">Tab 1</button>
//       <button class="tab">Tab 2</button>
//       <button class="tab">Tab 3</button>
//     </div>
//     <div id="panels">
//       <div class="panel active">Panel 1 content</div>
//       <div class="panel hidden">Panel 2 content</div>
//       <div class="panel hidden">Panel 3 content</div>
//     </div>
//   </div>
// </body>
// </html>


// Challenge 1 — List Navigation
// When clicking an item:
// - Remove "active" class from all items
// - Add "active" class to clicked item
const list = document.querySelector('#list');
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    const items = list.querySelectorAll('.item');
    items.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active'); // only add to clicked item
    }
});

// Challenge 2 — Next/Previous Navigation
// Add two buttons: "Next" and "Previous"
// - Next button: move active to next sibling (or loop to first)
// - Previous button: move active to previous sibling (or loop to last)
const nextBtn = document.createElement('button');
nextBtn.textContent = 'Next';
const prevBtn = document.createElement('button');
prevBtn.textContent = 'Previous';
list.parentElement.insertBefore(prevBtn, list);
list.parentElement.insertBefore(nextBtn, list.nextSibling);
// list.insertAdjacentElement('beforebegin', prevBtn);
// list.insertAdjacentElement('afterend', nextBtn);

// Challenge 3 — Accordion Implementation
// When clicking accordion header:
// - Toggle "hidden" class on its body
// - Close all OTHER accordion bodies
// - Only one section open at a time
const accordion = document.querySelector('#accordion');
accordion.addEventListener('click', (e) => {
  if (e.target.classList.contains('accordion-header')) {
    const item = e.target.parentElement; // .accordion-item
    const body = item.querySelector('.accordion-body'); // corresponding body
     // Check if current is open
    const isOpen = !body.classList.contains('hidden');
    // Close all other accordion bodies
    const allBodies = document.querySelectorAll('.accordion-body');
    allBodies.forEach(b => b.classList.add('hidden'));
    // Toggle current body
    if (!isOpen) {
      body.classList.remove('hidden');
    }
  }
});

// Challenge 4 — Tab System
// When clicking a tab button:
// - Remove "active" from all tabs
// - Add "active" to clicked tab
// - Show corresponding panel, hide others
// - Tab 1 → Panel 1, Tab 2 → Panel 2, etc.
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs and panels
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    // Add active to clicked tab and corresponding panel
    tab.classList.add('active');
    panels[index].classList.add('active');
  });
});

// Challenge 5 — Parent Highlighting
// When clicking any item in the list:
// - Find the parent <ul>
// - Add "highlight" class to it for 2 seconds
// - Then remove the class
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    const parentUl = e.target.parentElement; // <ul id="list">
    parentUl.classList.add('highlight');
    setTimeout(() => {
      parentUl.classList.remove('highlight');
    }, 2000);
  }
});

// Challenge 6 — Sibling Counter
// When clicking an item:
// - Count how many siblings it has
// - Log: "This item has X siblings"
// - Use traversal methods, not querySelectorAll
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    let count = 0;
    let sibling = e.target.previousSibling;
    while (sibling) {  // basically while there are siblings to the left we keep counting and moving left until we hit null
      if (sibling.classList && sibling.classList.contains('item')) {
        count++;
      }
      sibling = sibling.previousSibling;
    }
    sibling = e.target.nextSibling;
    while (sibling) {  // basically while there are siblings to the right we keep counting and moving right until we hit null
      if (sibling.classList && sibling.classList.contains('item')) { 
        count++;
      }
      sibling = sibling.nextSibling;
    }
    console.log(`This item has ${count} siblings`);
  }
});
// using querySelectorAll
// list.addEventListener('click', (e) => {
//   if (e.target.classList.contains('item')) {
//     const siblings = list.querySelectorAll('.item');
//     console.log(`This item has ${siblings.length - 1} siblings`); // subtract 1 to exclude the clicked item
//   }
// });

// Challenge 7 — Traverse & Transform
// Create a function findAndToggle(element, className):
// - Finds closest parent with class "accordion-item"
// - Finds child with class "accordion-body"
// - Toggles "hidden" class on that body
// Use only traversal methods (closest, querySelector)

function findAndToggle(element, className) {
  const parentItem = element.closest('.accordion-item');
  if (parentItem) {
    const body = parentItem.querySelector('.accordion-body');
    if (body) {
      body.classList.toggle(className);
    }
  }
}