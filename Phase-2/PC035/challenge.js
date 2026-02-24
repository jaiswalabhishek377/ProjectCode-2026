// Challenge 1
// Create two files mentally (describe what's in each):
// 
// utils.js — export:
//   - default function formatCurrency(amount, currency="INR")
//     returns "INR 1,000.00"
//   - named export: TAX_RATE = 0.18
//   - named export: calculateTax(amount) returns amount * TAX_RATE
//
// main.js — import and use all three

// utils.js
export default function formatCurrency(amount, currency = "INR") {
  return `${currency} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}
export const TAX_RATE = 0.18;
export function calculateTax(amount) {
  return amount * TAX_RATE;
}

// main.js
import formatCurrency, { TAX_RATE, calculateTax } from './utils.js'; // default without braces, named exports with braces
const price = 1000;
console.log(formatCurrency(price)); // "INR 1,000.00"
console.log(TAX_RATE); // 0.18
console.log(calculateTax(price)); // 180

// Challenge 2
// Predict — what's wrong with each import?

// utils.js has: export default function greet() {}
//               export const VERSION = "1.0";

import greet, VERSION from './utils.js';        // bug? VERSION is a named export, so it should be in curly braces
import { greet } from './utils.js';             // bug? greet is a default export, so it should not be in curly braces
import greet, { VERSION } from './utils.js';    // bug? correct way to import both default and named exports together
import * as utils from './utils.js';            // bug? correct way to import everything as a namespace object, then you can access utils.greet and utils.VERSION

// Challenge 3
// CommonJS (old Node.js) — COPIES the value
const { count } = require('./counter'); // count is a copy → stays 0
// ES6 Modules — LIVE BINDING to the original
import { count } from './counter.js';  // count is a live view → updates!
// What does this print and why?
// counter.js
export let count = 0;
export function increment() { count++; }
// main.js
import { count, increment } from './counter.js';
console.log(count); // 0 — initial value
increment(); 
increment();
console.log(count); // 2 — live binding ES6 reflects the updated value of count after increments
// another file could also import count and see the updated value, while CommonJS would have given them a stale copy of count = 0. This is a key difference between CommonJS and ES6 modules regarding how they handle exports and imports.
//commonjs would have given them a stale copy of count = 0, while ES6 modules provide a live binding that reflects the current value of count across all imports.

// commonjs example: destructing no effect on og count always 0.
// counter.js
// let count = 0;
// function increment() { count++; }
// module.exports = { count, increment };
// main.js
// const { count, increment } = require('./counter');
// console.log(count); 0 — initial value
// increment();
// increment();
// console.log(count); 0 — still 0 because it's a copy, not a live binding

// Challenge 4
// Fix this package.json
{
  "name": my-app,  // should be a string "my-app"
  "scripts": {
    "start" = "node index.js", // should use colon : instead of equals = and index.js should be in quotes "index.js"
    // like this: "start": "node index.js"
    "test": "jest" // missing comma after "jest" and should be in quotes "jest"
  }
  "dependencies": {
    "express": "^4.18.0" // missing comma after express and should be in quotes "express"
  }
}

// Challenge 5
// When would you use dynamic import instead of static? 
// Write a real example — a button that loads a heavy chart library only when clicked

//static imports are used when you want to load modules at the beginning of your application, and they are always needed for the app to function. Dynamic imports are used when you want to load modules on demand, such as when a user interacts with a specific feature that requires that module, or when you want to optimize performance by only loading code when it's actually needed. For example, you might use dynamic import to load a heavy charting library only when the user clicks a button to view a chart, rather than loading it upfront with static imports.
//dynamic import is useful when you want to load a module on demand, rather than at the initial load time of the application. This can improve performance by reducing the amount of code that needs to be loaded upfront, especially for large libraries or modules that are not always needed. 
// In a web application, you might have a dashboard with a button to load a heavy chart library like Chart.js. Instead of loading the library on page load,
//  you can use dynamic import to load it only when the user clicks the button, improving initial load time.
// HTML
<button id="loadChart">Load Chart</button>
<div id="chartContainer"></div>
// JavaScript
document.getElementById('loadChart').addEventListener('click', async () => {
  const { default: Chart } = await import('chart.js'); // dynamically import the Chart.js library when the button is clicked
  const ctx = document.getElementById('chartContainer').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
});
