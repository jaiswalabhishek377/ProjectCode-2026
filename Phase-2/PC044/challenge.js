// <!-- Use this HTML -->
// <!DOCTYPE html>
// <html>
// <body>
//   <div id="container">
//     <button id="counter-btn">Clicks: 0</button>
//     <button id="reset-btn">Reset</button>
//   </div>
  
//   <input type="text" id="name-input" placeholder="Enter name">
//   <p id="greeting"></p>
  
//   <form id="todo-form">
//     <input type="text" id="todo-input" placeholder="New todo">
//     <button type="submit">Add</button>
//   </form>
//   <ul id="todo-list"></ul>
  
//   <div id="box" style="width: 200px; height: 200px; background: lightblue;"></div>
//   <p id="mouse-pos">Move mouse over box</p>
// </body>
// </html>

// Challenge 1 — Click Counter
// - Count button clicks and update button text
const counterBtn = document.getElementById('counter-btn');
let clickCount = 0;
counterBtn.addEventListener('click', () => {
  clickCount++;
  counterBtn.textContent = `Clicks: ${clickCount}`;
});
// - Reset counter when Reset button clicked
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
  clickCount = 0;
  counterBtn.textContent = 'Clicks: 0';
});

// Challenge 2 — Live Greeting
// - As user types in name input, show "Hello, [name]!" in greeting paragraph
// - If input is empty, clear greeting
const nameInput = document.getElementById('name-input');
const greeting = document.getElementById('greeting');
nameInput.addEventListener('input', () => {
  const name = nameInput.value.trim();
    if (name) {
    greeting.textContent = `Hello, ${name}!`;
  } else {
    greeting.textContent = '';
  }
});
// Challenge 3 — Todo List
// - Prevent form submission (no page reload)
// - Add new todo to list when form submitted
// - Clear input after adding
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText) {
    const li = document.createElement('li');
    li.textContent = todoText;
    todoList.appendChild(li);
    todoInput.value = '';
  }
});

// Challenge 4 — Mouse Tracker
// - Show mouse X and Y coordinates when mouse moves over box
// - Display in #mouse-pos paragraph
const box = document.getElementById('box');
const mousePos = document.getElementById('mouse-pos');
box.addEventListener('mousemove', (e) => {
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  mousePos.textContent = `Mouse Position: X=${x}, Y=${y}`;
});

// Challenge 5 — Keyboard Shortcut
// - Listen for Ctrl+K (or Cmd+K on Mac)
// - When pressed, focus the name input
// - Prevent default browser behavior
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    nameInput.focus();
  }
});

// Challenge 6 — Event Bubbling
// - Add click listener to #container
// - Log which button was clicked (counter-btn or reset-btn)
// - Use event.target to determine which button

const container = document.getElementById('container');
container.addEventListener('click', (e) => {
  if (e.target.id === 'counter-btn') {
    console.log('Counter button clicked');
  } else if (e.target.id === 'reset-btn') {
    console.log('Reset button clicked');
  }
});

// Challenge 7 — Remove Listener
// - Add a "One-time alert" button
// - Show alert on first click
// - Remove listener after first click (no more alerts)

const oneTimeBtn = document.createElement('button');
oneTimeBtn.textContent = 'One-time alert';
container.appendChild(oneTimeBtn);

function showAlert() {
  alert('This is a one-time alert!');
  oneTimeBtn.removeEventListener('click', showAlert);
}
oneTimeBtn.addEventListener('click', showAlert);