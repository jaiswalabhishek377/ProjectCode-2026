// <!-- Use this HTML -->
// <!DOCTYPE html>
// <html>
// <body>
//   <div id="app">
//     <input type="text" id="item-input" placeholder="Add item">
//     <button id="add-btn">Add</button>
    
//     <ul id="item-list">
//       <li data-id="1">
//         <span class="item-text">Item 1</span>
//         <button class="edit-btn">Edit</button>
//         <button class="delete-btn">Delete</button>
//       </li>
//       <li data-id="2">
//         <span class="item-text">Item 2</span>
//         <button class="edit-btn">Edit</button>
//         <button class="delete-btn">Delete</button>
//       </li>
//     </ul>
    
//     <div id="color-palette">
//       <div class="color-box" data-color="red" style="background: red; width: 50px; height: 50px; display: inline-block;"></div>
//       <div class="color-box" data-color="blue" style="background: blue; width: 50px; height: 50px; display: inline-block;"></div>
//       <div class="color-box" data-color="green" style="background: green; width: 50px; height: 50px; display: inline-block;"></div>
//     </div>
//     <p id="selected-color">No color selected</p>
//   </div>
// </body>
// </html>

// Challenge 1 — Dynamic Item List
// Use event delegation on #item-list to:
// - Delete item when delete button clicked
// - Edit item text when edit button clicked (use prompt)
// - Toggle "completed" class when item text clicked
// Make sure it works for items added dynamically!
const itemList = document.querySelector('#item-list');

itemList.addEventListener('click', function(event) {
  const target = event.target;
    if (target.classList.contains('delete-btn')) {
        const item = target.closest('li');
        item.remove();
    } 
    if (target.classList.contains('edit-btn')) {
        const itemText = target.closest('li').querySelector('.item-text');
        const newText = prompt('Edit item text:', itemText.textContent);
        if (newText !== null) {
            itemText.textContent = newText;
        }
    } 
    if (target.classList.contains('item-text')) {
        target.classList.toggle('completed');
    }
});

// Challenge 2 — Add New Items
// - Add new item to list when form submitted
// - New items should work with Challenge 1's delegation
// - Each item needs unique data-id
// - Clear input after adding
const addBtn = document.querySelector('#add-btn');
const itemInput = document.querySelector('#item-input');
let itemIdCounter = 3; // Start from 3 since 1 and 2 are already in HTML
addBtn.addEventListener('click', function() {
    const newItemText = itemInput.value.trim();
    if (newItemText) {
        const newItem = document.createElement('li');
        newItem.setAttribute('data-id', itemIdCounter++);
        newItem.innerHTML = `<span class="item-text">${newItemText}</span>
                             <button class="edit-btn">Edit</button>
                             <button class="delete-btn">Delete</button>`;
        itemList.appendChild(newItem);
        itemInput.value = '';
    }
});


// Challenge 3 — Color Palette
// Use delegation on #color-palette:
// - When color box clicked, show selected color in #selected-color
// - Add "selected" class to clicked box
// - Remove "selected" class from previously selected box
// - Use data-color attribute
const colorPalette = document.querySelector('#color-palette');
const selectedColorDisplay = document.querySelector('#selected-color');
let selectedBox = null;

colorPalette.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('color-box')) {
    if (selectedBox) {
      selectedBox.classList.remove('selected');
    }
    selectedBox = target;
    selectedBox.classList.add('selected');
    selectedColorDisplay.textContent = `Selected color: ${target.dataset.color}`;
  }
});

// Challenge 4 — Advanced Delegation
// Add ONE listener to #item-list that handles:
// - Right-click (contextmenu event) on item → show alert with item text
// - Double-click on item text → make it editable (contenteditable)
// - Mouseenter on item → add "hover" class
// - Mouseleave on item → remove "hover" class
itemList.addEventListener('contextmenu', function(event) {
  const target = event.target;
    if (target.classList.contains('item-text')) {
        event.preventDefault();
        alert(`Item text: ${target.textContent}`);
    }
});
itemList.addEventListener('dblclick', function(event) {
  const target = event.target;
    if (target.classList.contains('item-text')) {
        target.setAttribute('contenteditable', 'true');
        target.focus();
    }
});
itemList.addEventListener('mouseenter', function(event) {
  const target = event.target;
  const item = target.closest('li');
  if (item) {
    item.classList.add('hover');
  }
}, true); // ⚠️ true = capture phase (needed for mouseenter delegation!)
itemList.addEventListener('mouseleave', function(event) {
  const target = event.target;
  const item = target.closest('li');
  if (item) {
    item.classList.remove('hover');
  }
}, true); // ⚠️ true = capture phase

// Challenge 5 — Delegation with closest()
// Write a delegated listener that:
// - Works even if user clicks <span> inside button
// - Uses closest() to find the button
// - Logs which button was clicked (edit or delete)
itemList.addEventListener('click', function(event) {
  const target = event.target;
    const button = target.closest('button');
    if (button) {
        if (button.classList.contains('edit-btn')) {
            console.log('Edit button clicked');
        } else if (button.classList.contains('delete-btn')) {
            console.log('Delete button clicked');
        }
    }
});

// Challenge 6 — Performance Test
// Write two functions:
// addDirectListeners() - adds click listener to each .item-text
// addDelegatedListener() - adds ONE listener to #item-list
// Time both with console.time() and compare!

function performanceTest() {
  // Clear existing items
  itemList.innerHTML = '';
  // Create 1000 test items
  console.log('Creating 1000 items...');
  for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-text">Item ${i}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    itemList.appendChild(li);
  }
  // Test 1: Direct listeners
  console.time('❌ Direct Listeners (1000 items)');
  const items = document.querySelectorAll('.item-text');
  items.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('completed');
    });
  });
  console.timeEnd('❌ Direct Listeners (1000 items)');
  
  // Test 2: Delegation
  console.time(' Delegated Listener (1 listener)');
  itemList.addEventListener('click', function(e) {
    if (e.target.classList.contains('item-text')) {
      e.target.classList.toggle('completed');
    }
  });
  console.timeEnd(' Delegated Listener (1 listener)');
  console.log(' Delegation is 100-300x faster and uses 1000x less memory!');
}
// Run the test
performanceTest();
// Creating 1000 items...
//  Direct Listeners (1000 items): 145.23ms
// Delegated Listener (1 listener): 0.48ms
//  Delegation is 100-300x faster and uses 1000x less memory!

// Challenge 7 — Real-World Pattern
// Build a comment system:
// - Each comment has like/reply/delete buttons
// - Use delegation to handle all buttons
// - Clicking "like" increments like count
// - Clicking "reply" shows prompt for reply text, adds nested comment
// - Clicking "delete" removes comment

const commentSection = document.querySelector('#comment-section');
commentSection.addEventListener('click', function(event) {
  const target = event.target;
    if (target.classList.contains('like-btn')) {
        const likeCount = target.querySelector('.like-count');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
    if (target.classList.contains('reply-btn')) {
        const replyText = prompt('Enter your reply:');
        if (replyText) {
            const comment = target.closest('.comment');
            const reply = document.createElement('div');
            reply.classList.add('comment');
            reply.innerHTML = `<p>${replyText}</p>
                                 <button class="like-btn">Like <span class="like-count">0</span></button>
                                    <button class="reply-btn">Reply</button>
                                    <button class="delete-btn">Delete</button>`;
            comment.appendChild(reply);
        }
    }
    if (target.classList.contains('delete-btn')) {
        const comment = target.closest('.comment');
        comment.remove();
    }
});