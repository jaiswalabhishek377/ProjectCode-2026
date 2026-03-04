PC46 — Create, Append & Remove Elements Dynamically
This is where you become a DOM wizard! You'll build entire UIs from  arrays, create elements on the fly, and manipulate the page like a pro! 💪

1. The Old Way (Avoid!) — innerHTML
//  BAD — destroys existing elements & event listeners
const list = document.querySelector('#list');
list.innerHTML = '<li>New Item</li>'; // Everything else GONE!
//  BAD — security risk with user input
const userInput = '<img src=x onerror="alert(\'XSS\')">';
list.innerHTML = userInput; // Script executes! 💀
//  BAD — performance issue in loops
for (let i = 0; i < 100; i++) {
  list.innerHTML += `<li>Item ${i}</li>`; // Re-parses entire HTML 100 times!
}

2. The Modern Way — createElement()
// ✅ GOOD — create element in memory
const li = document.createElement('li');
// Set content
li.textContent = 'New Item';
// Set attributes
li.className = 'list-item';
li.id = 'item-1';
li.dataset.id = '123';
// Set styles
li.style.color = 'red';
// Add to DOM (now it becomes visible!)
const list = document.querySelector('#list');
list.appendChild(li);

3. Creating Elements — Step by Step
// Step 1: Create element
const div = document.createElement('div');
// Step 2: Set properties
div.className = 'card';
div.id = 'card-1';
// Step 3: Add content
div.textContent = 'Hello World';
// Step 4: Append to DOM
document.body.appendChild(div);
// Result: <div class="card" id="card-1">Hello World</div>

4. Creating Complex Elements
// Create a card with nested elements
const card = document.createElement('div');
card.className = 'card';
const title = document.createElement('h3');
title.textContent = 'Card Title';
const description = document.createElement('p');
description.textContent = 'This is a description'
const button = document.createElement('button');
button.textContent = 'Click Me';
button.className = 'btn';
// Build structure -<<
card.appendChild(title);
card.appendChild(description);
card.appendChild(button);
// Add to page
document.body.appendChild(card);

// Result:
// <div class="card">
//   <h3>Card Title</h3>
//   <p>This is a description</p>
//   <button class="btn">Click Me</button>
// </div>
5. appendChild() — Add to End
const list = document.querySelector('#list');
const li = document.createElement('li');
li.textContent = 'Item 1';
list.appendChild(li); // Adds to END of list
// <ul id="list">
//   [existing items...]
//   <li>Item 1</li> ← added here
// </ul>

6. prepend() — Add to Beginning
const list = document.querySelector('#list');
const li = document.createElement('li');
li.textContent = 'Item 1';
list.prepend(li); // Adds to BEGINNING of list
// <ul id="list">
//   <li>Item 1</li> ← added here
//   [existing items...]
// </ul>

7. before() & after() — Add Next to Element
const existingItem = document.querySelector('#item-2');
const newItem = document.createElement('li');
newItem.textContent = 'New Item';
// Add BEFORE existing item
existingItem.before(newItem);
// <li>New Item</li>
// <li id="item-2">Existing</li>
// Add AFTER existing item
existingItem.after(newItem);
// <li id="item-2">Existing</li>
// <li>New Item</li>

8. insertAdjacentHTML() — Insert HTML Strings
const list = document.querySelector('#list');

// 4 positions:
list.insertAdjacentHTML('beforebegin', '<p>Before list</p>');
list.insertAdjacentHTML('afterbegin', '<li>First item</li>');
list.insertAdjacentHTML('beforeend', '<li>Last item</li>');
list.insertAdjacentHTML('afterend', '<p>After list</p>');

// Result:
// <p>Before list</p>        ← beforebegin
// <ul id="list">
//   <li>First item</li>     ← afterbegin (prepend)
//   [existing items...]
//   <li>Last item</li>      ← beforeend (append)
// </ul>
// <p>After list</p>         ← afterend
⚠️ Still vulnerable to XSS if inserting user input!

9. insertAdjacentElement() — Insert Elements
const list = document.querySelector('#list');
const li = document.createElement('li');
li.textContent = 'New Item';

// Same 4 positions as insertAdjacentHTML
list.insertAdjacentElement('beforebegin', li);
list.insertAdjacentElement('afterbegin', li);
list.insertAdjacentElement('beforeend', li);
list.insertAdjacentElement('afterend', li);

10. Removing Elements
remove() — Remove Element Itself
const item = document.querySelector('#item-1');
item.remove(); // Gone! 💨

// ⚠️ Old way (still works):
item.parentElement.removeChild(item);

removeChild() — Remove Specific Child
const list = document.querySelector('#list');
const firstItem = list.firstElementChild;

list.removeChild(firstItem); // Remove first child

Clear All Children
const list = document.querySelector('#list');
// Method 1: innerHTML (fast but loses listeners)
list.innerHTML = '';
// Method 2: Loop (slower but proper cleanup)
while (list.firstChild) {
  list.removeChild(list.firstChild);
}
// Method 3: Modern (cleanest)
list.replaceChildren(); // Removes all children

11. Replacing Elements
const oldItem = document.querySelector('#old');
const newItem = document.createElement('li');
newItem.textContent = 'New Item';

// Replace old with new
oldItem.replaceWith(newItem);
// ⚠️ Old way:
oldItem.parentElement.replaceChild(newItem, oldItem);

12. Cloning Elements
const original = document.querySelector('#template');
// Shallow clone (no children)
const clone1 = original.cloneNode();
// Deep clone (includes all children)
const clone2 = original.cloneNode(true);
// Modify clone
clone2.id = 'clone-1';
clone2.textContent = 'Cloned Item';

// Add to DOM
document.body.appendChild(clone2);
Use case: Templates
html<template id="card-template">
  <div class="card">
    <h3 class="title"></h3>
    <p class="description"></p>
    <button class="btn">Click</button>
  </div>
</template>
const template = document.querySelector('#card-template');

function createCard(title, description) {
  // Clone template content
  const clone = template.content.cloneNode(true);
  // Fill in data
  clone.querySelector('.title').textContent = title;
  clone.querySelector('.description').textContent = description;
  
  return clone;
}

// Use it
document.body.appendChild(createCard('Card 1', 'Description 1'));
document.body.appendChild(createCard('Card 2', 'Description 2'));

13. Building UI from Data Arrays
const users = [
  { id: 1, name: 'Alex', email: 'alex@example.com', active: true },
  { id: 2, name: 'Sam', email: 'sam@example.com', active: false },
  { id: 3, name: 'Jordan', email: 'jordan@example.com', active: true }
];

const userList = document.querySelector('#user-list');
users.forEach(user => {
  const li = document.createElement('li');
  li.className = 'user-item';
  li.dataset.userId = user.id;

  const name = document.createElement('span');
  name.className = 'name';
  name.textContent = user.name;
  
  const email = document.createElement('span');
  email.className = 'email';
  email.textContent = user.email;
  
  const status = document.createElement('span');
  status.className = user.active ? 'status active' : 'status inactive';
  status.textContent = user.active ? 'Active' : 'Inactive';
  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(status);
  userList.appendChild(li);
});

14. DocumentFragment — Performance Optimization
// ❌ BAD — triggers reflow 1000 times
const list = document.querySelector('#list');
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li); // Reflow on EVERY append! 💀
}
// ✅ GOOD — triggers reflow ONCE
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li); // Append to fragment (not in DOM yet)
}
list.appendChild(fragment); // ONE reflow! 🚀
DocumentFragment benefits:

Not in the DOM tree (no reflow until appended)
Lightweight container
Automatically disappears after appending (children move to parent)


15. Real-World Patterns
Dynamic Table from Data
const data = [
  { id: 1, name: 'Alex', score: 95 },
  { id: 2, name: 'Sam', score: 87 },
  { id: 3, name: 'Jordan', score: 92 }
];

const table = document.querySelector('#table');

data.forEach(row => {
  const tr = document.createElement('tr');
  tr.dataset.id = row.id;
  
  const tdName = document.createElement('td');
  tdName.textContent = row.name;
  
  const tdScore = document.createElement('td');
  tdScore.textContent = row.score;
  
  const tdActions = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  tdActions.appendChild(deleteBtn);
  
  tr.appendChild(tdName);
  tr.appendChild(tdScore);
  tr.appendChild(tdActions);
  
  table.appendChild(tr);
});

Shopping Cart
const cart = [
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29, quantity: 2 }
];

const cartList = document.querySelector('#cart');

function renderCart() {
  // Clear existing items
  cartList.innerHTML = '';
  
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.dataset.itemId = item.id;
    
    const name = document.createElement('span');
    name.textContent = item.name;
    
    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.value = item.quantity;
    quantity.min = 1;
    quantity.className = 'quantity-input';
    
    const price = document.createElement('span');
    price.textContent = `$${item.price * item.quantity}`;
    price.className = 'price';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    
    div.appendChild(name);
    div.appendChild(quantity);
    div.appendChild(price);
    div.appendChild(removeBtn);
    
    cartList.appendChild(div);
  });
}

renderCart();

Infinite Scroll
let page = 1;
const itemsPerPage = 20;

function loadItems() {
  const container = document.querySelector('#feed');
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < itemsPerPage; i++) {
    const article = document.createElement('article');
    article.className = 'post';
    
    const title = document.createElement('h2');
    title.textContent = `Post ${(page - 1) * itemsPerPage + i + 1}`;
    
    const content = document.createElement('p');
    content.textContent = 'Lorem ipsum dolor sit amet...';
    
    article.appendChild(title);
    article.appendChild(content);
    fragment.appendChild(article);
  }
  
  container.appendChild(fragment);
  page++;
}

// Initial load
loadItems();

// Load more on scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadItems();
  }
});