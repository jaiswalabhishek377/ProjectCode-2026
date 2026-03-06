// <!DOCTYPE html>
// <html>
// <head>
//   <style>
//     body {
//       margin: 0;
//       padding: 20px;
//       font-family: Arial, sans-serif;
//     }
//     canvas {
//       border: 2px solid #333;
//       display: block;
//       margin: 20px auto;
//     }
//     .controls {
//       text-align: center;
//       margin: 20px;
//     }
//     button {
//       padding: 10px 20px;
//       margin: 5px;
//       cursor: pointer;
//     }
//   </style>
// </head>
// <body>
//   <h1 style="text-align: center;">Canvas Challenges</h1>
//   <canvas id="myCanvas" width="800" height="600"></canvas>
  
//   <div class="controls">
//     <button id="clear-btn">Clear Canvas</button>
//     <button id="challenge1-btn">Challenge 1: Shapes</button>
//     <button id="challenge2-btn">Challenge 2: Clock</button>
//     <button id="challenge3-btn">Challenge 3: Bouncing Balls</button>
//     <button id="challenge4-btn">Challenge 4: Drawing App</button>
//   </div>
  
//   <script src="canvas.js"></script>
// </body>
// </html>

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Challenge 1 — Draw a House
// Draw a house using basic shapes:
// - Rectangle for the main structure
// - Triangle for the roof
// - Rectangle for the door
// - Two circles or rectangles for windows
// - Add colors!

function challenge1() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Your code here
}

// Challenge 2 — Analog Clock
// Draw a working analog clock:
// - Circle for the clock face
// - Numbers 1-12 around the edge
// - Three hands: hour, minute, second
// - Use Date object to get current time
// - Animate it (update every second)

function challenge2() {
  // Your code here
}

// Challenge 3 — Bouncing Balls
// Create 5-10 balls that:
// - Start at random positions
// - Have random velocities
// - Bounce off all four walls
// - Have different colors
// - Animate smoothly with requestAnimationFrame

function challenge3() {
  // Your code here
}

// Challenge 4 — Simple Drawing App
// Create a drawing application:
// - Draw with mouse
// - Add color picker (3-5 color buttons)
// - Add brush size control
// - Add eraser mode
// - Add clear button

function challenge4() {
  // Your code here
}

// Challenge 5 — Gradient Background
// Draw a canvas-wide gradient:
// - Top: dark blue (#001f3f)
// - Bottom: light blue (#87CEEB)
// - Add white circles as "stars" (random positions)

function challenge5() {
  // Your code here
}

// Challenge 6 — Moving Text
// Create animated text:
// - Text moves from left to right
// - When it reaches the edge, restart from left
// - Change color every time it loops
// - Make it bounce vertically as it moves

function challenge6() {
  // Your code here
}

// Challenge 7 — Particle Trail
// When mouse moves:
// - Create particles at mouse position
// - Particles slowly fade out
// - Particles drift in random directions
// - Remove particles when fully faded

function challenge7() {
  // Your code here
}

// Event listeners
document.getElementById('clear-btn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('challenge1-btn').addEventListener('click', challenge1);
document.getElementById('challenge2-btn').addEventListener('click', challenge2);
document.getElementById('challenge3-btn').addEventListener('click', challenge3);
document.getElementById('challenge4-btn').addEventListener('click', challenge4);