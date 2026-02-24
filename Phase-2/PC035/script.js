// PC35 — ES6+ Modules & Tooling Intro

// Why Modules Exist — The Problem First
// javascript// Imagine building a big app in ONE file 😱
// // 5000 lines of code
// // variables clashing everywhere
// // no organisation
// // one change breaks everything

// // ❌ The old nightmare — script tags in HTML
// <script src="math.js"></script>    // declares var PI = 3.14
// <script src="utils.js"></script>   // also declares var PI = 99 💥
// <script src="app.js"></script>     // which PI does app.js get? 🤷

// // ✅ Modules fix this — each file has its OWN scope
// // nothing leaks out unless you explicitly EXPORT it

// 1. Named Exports — Export Multiple Things
// javascript// math.js
// export const PI = 3.14159;

// export function add(a, b) {
//   return a + b;
// }

// export function multiply(a, b) {
//   return a * b;
// }

// // Can also export at bottom — cleaner style
// const subtract = (a, b) => a - b;
// const divide   = (a, b) => a / b;

// export { subtract, divide };
// javascript// main.js — import only what you need
// import { add, multiply } from './math.js';

// console.log(add(2, 3));       // 5
// console.log(multiply(2, 3));  // 6

// // Import everything as a namespace object
// import * as Math from './math.js';
// console.log(Math.add(2, 3));  // 5
// console.log(Math.PI);         // 3.14159

// 2. Default Export — One Main Thing Per File
// javascript// user.js — one default export per file
// export default class User {
//   constructor(name, age) {
//     this.name = name;
//     this.age  = age;
//   }
//   greet() { return `Hi I'm ${this.name}`; }
// }

// // OR
// const formatDate = (date) => date.toLocaleDateString();
// export default formatDate;
// javascript// main.js — import default (NO curly braces, ANY name you want)
// import User from './user.js';
// import formatDate from './user.js'; // you pick the name
// import WhateverName from './user.js'; // all three work!

// const abhi = new User("Abhi", 20);
// abhi.greet(); // "Hi I'm Abhi"

// 3. Named + Default Together
// javascript// api.js
// export default function fetchUser(id) {
//   return fetch(`/api/users/${id}`);
// }

// export const BASE_URL = "https://api.example.com";
// export const TIMEOUT  = 5000;
// javascript// main.js
// import fetchUser, { BASE_URL, TIMEOUT } from './api.js';
// //     ↑ default   ↑ named exports

// 4. Re-exporting — Barrel Files
// This is used in EVERY real project:
// javascript// components/Button.js
// export default function Button() {}

// // components/Modal.js  
// export default function Modal() {}

// // components/Input.js
// export default function Input() {}

// // components/index.js — the BARREL file
// export { default as Button } from './Button.js';
// export { default as Modal  } from './Modal.js';
// export { default as Input  } from './Input.js';

// // Now in app.js — one clean import instead of three!
// import { Button, Modal, Input } from './components';
// // ✅ instead of:
// import Button from './components/Button.js';
// import Modal  from './components/Modal.js';
// import Input  from './components/Input.js';

// 5. Dynamic Imports — Load on Demand
// javascript// Static import — always loads at startup
// import HeavyChart from './HeavyChart.js'; // loaded even if never used

// // Dynamic import — loads ONLY when needed
// async function showChart() {
//   const { default: HeavyChart } = await import('./HeavyChart.js');
//   HeavyChart.render();
// }

// // Real world — code splitting in React/Vue
// button.addEventListener('click', async () => {
//   const module = await import('./heavyFeature.js');
//   module.init();
// });

// 6. Module Rules to Know
// javascript// 1. Modules are STRICT MODE by default
// // no undeclared variables, no this in global scope

// // 2. Imports are LIVE BINDINGS — not copies
// // if exported value changes, import reflects it

// // 3. Circular imports work but can cause issues — avoid them

// // 4. Modules run ONCE — subsequent imports get cached version
// import './setup.js'; // runs setup.js
// import './setup.js'; // returns CACHED version, doesn't run again

// // 5. Always use ./ for relative paths
// import { add } from './math.js';   // ✅ relative
// import { add } from 'math.js';     // ❌ looks in node_modules
// import { add } from '/math.js';    // absolute path from root

// 7. npm & package.json — The Basics
// bash# Start a new project
// npm init -y  # creates package.json with defaults

// # Install a package
// npm install lodash        # adds to dependencies
// npm install jest --save-dev  # adds to devDependencies (only for dev)

// # Run scripts
// npm run dev
// npm run build
// npm test
// json// package.json — the heart of every JS project
// {
//   "name": "my-app",
//   "version": "1.0.0",
//   "type": "module",        // ← enables ES modules in Node.js
//   "scripts": {
//     "dev":   "vite",
//     "build": "vite build",
//     "test":  "jest"
//   },
//   "dependencies": {
//     "lodash": "^4.17.21"   // used in production
//   },
//   "devDependencies": {
//     "jest": "^29.0.0",     // only used during development
//     "vite": "^5.0.0"
//   }
// }

// 8. Vite — The Modern Dev Tool
// bash# Create a new Vite project
// npm create vite@latest my-app
// cd my-app
// npm install
// npm run dev    # starts dev server at localhost:5173
// ```
// ```
// my-app/
// ├── index.html        ← entry point
// ├── package.json
// ├── vite.config.js
// └── src/
//     ├── main.js       ← your JS entry
//     ├── math.js       ← your modules
//     └── utils.js
// ```

// **What Vite does for you:**
// ```
// ⚡ Instant dev server (no bundling in dev)
// 🔥 Hot Module Replacement — saves file → browser updates instantly
// 📦 Bundles for production — one optimised file
// 🔀 Code splitting — dynamic imports become separate chunks

// 9. The Import Map — Running Modules in Browser Without Bundler
// html<!-- index.html — for simple projects without Vite -->
// <script type="importmap">
//   {
//     "imports": {
//       "lodash": "https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"
//     }
//   }
// </script>

// <script type="module">
//   import _ from 'lodash';
//   console.log(_.chunk([1,2,3,4], 2)); // [[1,2],[3,4]]
// </script>