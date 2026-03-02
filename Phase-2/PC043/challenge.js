// <!-- Use this HTML for all challenges -->
// <!DOCTYPE html>
// <html>
// <body>
//   <div id="app">
//     <h1 class="title">Todo List</h1>
//     <ul id="todo-list">
//       <li class="todo-item" data-id="1">
//         <span class="text">Buy groceries</span>
//         <button class="delete-btn">Delete</button>
//       </li>
//       <li class="todo-item completed" data-id="2">
//         <span class="text">Learn JavaScript</span>
//         <button class="delete-btn">Delete</button>
//       </li>
//       <li class="todo-item" data-id="3">
//         <span class="text">Build project</span>
//         <button class="delete-btn">Delete</button>
//       </li>
//     </ul>
//     <input type="text" id="new-todo" placeholder="Add new todo">
//     <button id="add-btn">Add</button>
//   </div>
// </body>
// </html>

// Challenge 1 — Select Elements
// a) Get the h1 title element
const h1title= document.querySelector("h1"); //correct
document.querySelector(".title"); //correct
// const h1title= document.getElementsByClassName("title");  wrong it returns an HTMLCollection, not a single element
// b) Get ALL todo items (li elements)
const todos=document.getElementsByTagName("li");
// c) Get the first todo item
const firsttodo=document.querySelector(".todo-item");
// d) Get the input field
const inputf=document.querySelector("input");
// e) Get all delete buttons
const deletebtn=document.getElementsByClassName("delete-btn");

// Challenge 2 — Read Content
// a) Log the text of the h1
console.log(h1title.textContent);
// b) Log the text of each todo item (just the task text, not the button)
const todo= document.getElementsByClassName("todo-item");  // returns an HTMLCollection, we can iterate over it using a for loop or convert it to an array
for(let i=0;i<todo.length;i++){
  const text=todo[i].querySelector(".text").textContent;
  console.log(text);
}
//or
const todoItems=document.querySelectorAll(".todo-item .text");
todoItems.forEach(item => { // without array conversion, we can directly use forEach on NodeList returned by querySelectorAll
  console.log(item.textContent);
});
//or
Array.from(todo).forEach(item => { // convert HTMLCollection to array to use forEach
  const text=item.querySelector(".text").textContent;
  console.log(text);
});
// c) Log the data-id of the second todo item
console.log(todo[1].getAttribute("data-id"));
// or console.log(todo[1].dataset.id);

// Challenge 3 — Change Content
// a) Change the h1 text to "My Tasks"
h1title.textContent="My Tasks";
// b) Change the first todo text to "Buy milk"
const firsttodo=document.querySelector(".todo-item");
firsttodo.querySelector(".text").textContent="Buy milk";
// c) Change the input placeholder to "What needs to be done?"
const inputf=document.querySelector("input");
inputf.setAttribute("placeholder","What need to be done?");
//or inputf.placeholder="What need to be done?";

// Challenge 4 — Work with Classes
// a) Add class "highlight" to the first todo
const firsttodo=document.querySelector(".todo-item");
firsttodo.classList.add("highlight");
// b) Remove class "completed" from the second todo
const todo=document.querySelectorAll(".todo-item");
const secondtodo=todo[1];
secondtodo.classList.remove("completed");
// c) Toggle class "done" on all todo items
todo.forEach(element => {
  element.classList.toggle("done");
});
// d) Check if first todo has class "completed" — log true/false
if(firsttodo.classList.contains("completed")){
  console.log("true");
}
else{  console.log("false");
}

// Challenge 5 — Work with Attributes & Data
// a) Get the data-id of the third todo
const todo=document.querySelectorAll(".todo-item");
const thirdtodo=todo[2];
console.log(thirdtodo.getAttribute("data-id"));
// b) Set data-priority="high" on the first todo
const firsttodo=document.querySelector(".todo-item");
firsttodo.setAttribute("data-priority","high");
// c) Disable the Add button
const addbtn=document.querySelector("#add-btn");
addbtn.setAttribute("disabled","true");
// d) Change input type to "search"
const inputf=document.querySelector("input");
inputf.setAttribute("type","search");

// Challenge 6 — Style Manipulation
// a) Change h1 color to blue using inline style
h1title.style.color="blue";
// b) Change first todo background to yellow using inline style
firsttodo.style.backgroundColor="yellow";
// c) Hide the second todo using style.display
const secondtodo=todo[1];
secondtodo.style.display="none";
// d) Get the computed font-size of the h1
const fontSize = window.getComputedStyle(h1title).fontSize;
console.log(fontSize); 

// Challenge 7 — Build a Feature
// Write a function that:
// - Finds all completed todos (.completed class)
// - Changes their text color to green
// - Adds a checkmark "✓ " before their text
// - Counts and logs how many are completed

function styleCompletedTodos() {
  // Find all completed todos
  const completedTodos = document.querySelectorAll(".todo-item.completed");
  let count = 0;

  // Iterate over each completed todo
  completedTodos.forEach(todo => {
    // Change text color to green
    todo.style.color = "green";             // const textSpan = todo.querySelector('.text');
    // Add checkmark before the text           // textSpan.textContent = "✓ " + textSpan.textContent;
    todo.innerHTML = "✓ " + todo.innerHTML;
    count++;
  });

  // Log the number of completed todos
  console.log(`Number of completed todos: ${count}`);
}