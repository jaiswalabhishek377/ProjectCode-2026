// Challenge 1 — Create User Card
// Write a function createUserCard(user) that creates:
// <div class="user-card" data-user-id="123">
//   <img src="avatar.jpg" alt="Name">
//   <h3>Name</h3>
//   <p>Email</p>
//   <button class="follow-btn">Follow</button>
// </div>

const user = {
  id: 1,
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://i.pravatar.cc/150?img=1'
};

function createUserCard(user) {
  // Your code here
  const card = document.createElement('div');
  card.className = 'user-card';
  card.dataset.userId = user.id;
  const img = document.createElement('img');
  img.src = user.avatar;
  img.alt = user.name;
  const name = document.createElement('h3');
  name.textContent = user.name;
  const email = document.createElement('p');
  email.textContent = user.email;
  const button = document.createElement('button');
  button.className = 'follow-btn';
  button.textContent = 'Follow';
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(email);
  card.appendChild(button);
  return card;
}

// Test it
document.body.appendChild(createUserCard(user));

// Challenge 2 — Build List from Array
// Given this array, create a <ul> with all items
const todos = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Learn JavaScript', completed: true },
  { id: 3, text: 'Build project', completed: false }
];

// Each <li> should have:
// - class "todo-item"
// - class "completed" if todo.completed is true
// - data-id attribute
// - checkbox (checked if completed)
// - text content
// - delete button

function renderTodoList(todos) {
  const ul = document.querySelector('#todo-list');
  ul.innerHTML = ''; // Clear existing items
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) {
      li.classList.add('completed');
    }
    li.dataset.id = todo.id;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    const text = document.createElement('span');
    text.textContent = todo.text;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
}
const ul = document.createElement('ul');
ul.id = 'todo-list';
document.body.appendChild(ul);
renderTodoList(todos);

// Challenge 3 — Optimized Render with Fragment
// Render 1000 items using DocumentFragment
function renderManyItems(count) {
  // Create 1000 <div> elements with text "Item N"
  // Use fragment for performance
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
  }
  // Append all at once
  document.body.appendChild(fragment);
}

console.time('Render 1000 items');
renderManyItems(1000);
console.timeEnd('Render 1000 items');

// Challenge 4 — Clone Template
// Use this template to create multiple cards
const template = `
<template id="product-template">
  <div class="product-card">
    <img class="product-image" src="" alt="">
    <h3 class="product-name"></h3>
    <p class="product-price"></p>
    <button class="add-to-cart">Add to Cart</button>
  </div>
</template>
`;

const products = [
  { id: 1, name: 'Laptop', price: 999, image: 'laptop.jpg' },
  { id: 2, name: 'Mouse', price: 29, image: 'mouse.jpg' },
  { id: 3, name: 'Keyboard', price: 79, image: 'keyboard.jpg' }
];

function createProductCard(product) {
  // Clone template, fill in data, return element
  const templateEl = document.querySelector('#product-template');
  const clone = templateEl.content.cloneNode(true);
  clone.querySelector('.product-image').src = product.image;
  clone.querySelector('.product-image').alt = product.name;
  clone.querySelector('.product-name').textContent = product.name;
  clone.querySelector('.product-price').textContent = `$${product.price}`;
  return clone;
}
products.forEach(product => {
  document.body.appendChild(createProductCard(product));
});

// Challenge 5 — Table Builder
// Create a table from this data
const employees = [
  { id: 1, name: 'Alex', department: 'Engineering', salary: 95000 },
  { id: 2, name: 'Sam', department: 'Marketing', salary: 75000 },
  { id: 3, name: 'Jordan', department: 'Sales', salary: 85000 }
];

function createEmployeeTable(employees) {
  // Create <table> with <thead> and <tbody>
  // Headers: Name, Department, Salary, Actions
  // Each row has Edit and Delete buttons
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  ['Name', 'Department', 'Salary', 'Actions'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  employees.forEach(emp => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = emp.name;
    row.appendChild(nameCell);
    const deptCell = document.createElement('td');
    deptCell.textContent = emp.department;
    row.appendChild(deptCell);
    const salaryCell = document.createElement('td');
    salaryCell.textContent = `$${emp.salary}`;
    row.appendChild(salaryCell);
    const actionsCell = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);
    row.appendChild(actionsCell);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  return table;
}

// Challenge 6 — Dynamic Form Builder
// Build a form from this config
const formConfig = [
  { type: 'text', name: 'username', label: 'Username', required: true },
  { type: 'email', name: 'email', label: 'Email', required: true },
  { type: 'password', name: 'password', label: 'Password', required: true },
  { type: 'select', name: 'country', label: 'Country', options: ['USA', 'UK', 'Canada'] }
];

function createForm(config) {
  // Create form with all fields
  // Each field should have label, input, and wrapper div
  // Select should have options
  const form = document.createElement('form');
  config.forEach(field => {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = field.label;
    label.htmlFor = field.name;
    wrapper.appendChild(label);
    let input;
    if (field.type === 'select') {
      input = document.createElement('select');
      input.name = field.name;
      field.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        input.appendChild(option);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type;
      input.name = field.name;
    }
    if (field.required) {
      input.required = true;
    }
    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  form.appendChild(submitBtn);
  return form;
}

// Challenge 7 — Clear & Re-render Pattern
// Create functions to clear and re-render a list
let items = ['Item 1', 'Item 2', 'Item 3'];

function renderItems() {
  // Clear list and re-render all items
  const list = document.getElementById('item-list');
  list.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeItem(index);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function addItem(text) {
  items.push(text);
  renderItems();
}

function removeItem(index) {
  items.splice(index, 1);
  renderItems();
}

// Use with:
addItem('Item 4');
removeItem(0);