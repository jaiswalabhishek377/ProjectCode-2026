// 1. Get canvas context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 2. Draw rectangles
ctx.fillRect(x, y, width, height);

// 3. Draw circles
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill();

// 4. Draw text
ctx.fillText('Hello', x, y);

// 5. Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw stuff
  requestAnimationFrame(animate);
}
1. Canvas Basics — Setup
HTML Setup
html<canvas id="myCanvas" width="800" height="600"></canvas>
Get Drawing Context
javascriptconst canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Check if canvas is supported
if (!ctx) {
  console.error('Canvas not supported');
}
```

### Canvas Coordinate System
```
(0,0) ────────────────────────► X
  │
  │
  │
  │
  │
  ▼
  Y

Top-left corner is (0, 0)
X increases to the right
Y increases downward

2. Drawing Rectangles
Filled Rectangles
javascript// fillRect(x, y, width, height)
ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 200, 100);

// Multiple rectangles with different colors
ctx.fillStyle = 'blue';
ctx.fillRect(300, 50, 150, 150);

ctx.fillStyle = 'green';
ctx.fillRect(500, 50, 100, 200);
Stroked (Outlined) Rectangles
javascript// strokeRect(x, y, width, height)
ctx.strokeStyle = 'purple';
ctx.lineWidth = 5;
ctx.strokeRect(50, 200, 200, 100);
Clear Rectangles
javascript// clearRect(x, y, width, height)
// Clears the specified rectangle (makes it transparent)
ctx.clearRect(100, 100, 100, 50);
Combined Example
javascript// Draw a window
ctx.fillStyle = '#87CEEB'; // Sky blue
ctx.fillRect(0, 0, 800, 600); // Background

ctx.fillStyle = '#8B4513'; // Brown
ctx.fillRect(300, 200, 200, 300); // Window frame

ctx.clearRect(320, 220, 160, 130); // Top pane (transparent)
ctx.clearRect(320, 370, 160, 110); // Bottom pane

ctx.strokeStyle = '#654321';
ctx.lineWidth = 10;
ctx.strokeRect(300, 200, 200, 300); // Frame border

3. Drawing Circles and Arcs
Basic Circle
javascript// arc(x, y, radius, startAngle, endAngle, counterclockwise)
ctx.beginPath();
ctx.arc(400, 300, 100, 0, Math.PI * 2); // Full circle
ctx.fillStyle = 'orange';
ctx.fill();
ctx.closePath();
Stroked Circle
javascriptctx.beginPath();
ctx.arc(200, 200, 75, 0, Math.PI * 2);
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.stroke();
ctx.closePath();
Partial Arcs (Pac-Man!)
javascript// Pac-Man facing right
ctx.beginPath();
ctx.arc(400, 300, 100, 0.25 * Math.PI, 1.75 * Math.PI);
ctx.lineTo(400, 300); // Line to center
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.closePath();

// Eye
ctx.beginPath();
ctx.arc(400, 250, 10, 0, Math.PI * 2);
ctx.fillStyle = 'black';
ctx.fill();
ctx.closePath();
Angles Explained
javascript// Angles in radians:
// 0 = right (3 o'clock)
// Math.PI / 2 = bottom (6 o'clock)
// Math.PI = left (9 o'clock)
// 1.5 * Math.PI = top (12 o'clock)
// Math.PI * 2 = full circle

// Examples:
ctx.arc(x, y, radius, 0, Math.PI * 2); // Full circle
ctx.arc(x, y, radius, 0, Math.PI);     // Half circle (top)
ctx.arc(x, y, radius, Math.PI, 0);     // Half circle (bottom)

4. Drawing Lines and Paths
Simple Line
javascriptctx.beginPath();
ctx.moveTo(50, 50);    // Starting point
ctx.lineTo(400, 300);  // Ending point
ctx.strokeStyle = 'blue';
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();
Complex Path (Triangle)
javascriptctx.beginPath();
ctx.moveTo(400, 100);  // Top point
ctx.lineTo(300, 300);  // Bottom-left
ctx.lineTo(500, 300);  // Bottom-right
ctx.closePath();       // Connects back to start
ctx.fillStyle = 'green';
ctx.fill();
ctx.strokeStyle = 'darkgreen';
ctx.lineWidth = 3;
ctx.stroke();
Star Shape
javascriptfunction drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  let rotation = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rotation) * outerRadius;
    y = cy + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = cx + Math.cos(rotation) * innerRadius;
    y = cy + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }
  
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = 'gold';
  ctx.fill();
  ctx.strokeStyle = 'orange';
  ctx.lineWidth = 5;
  ctx.stroke();
}

drawStar(400, 300, 5, 100, 50);

5. Drawing Text
Filled Text
javascriptctx.font = '48px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Hello Canvas!', 200, 300);
Stroked Text
javascriptctx.font = 'bold 60px Courier';
ctx.strokeStyle = 'blue';
ctx.lineWidth = 2;
ctx.strokeText('Outlined Text', 150, 200);
Text Alignment
javascriptctx.font = '30px Arial';
ctx.textAlign = 'center';    // left, center, right, start, end
ctx.textBaseline = 'middle'; // top, middle, bottom, alphabetic

ctx.fillText('Centered Text', 400, 300);
Measure Text Width
javascriptconst text = 'Measure me!';
ctx.font = '20px Arial';
const metrics = ctx.measureText(text);
console.log('Width:', metrics.width); // Width in pixels

// Use it to draw a background box
const textWidth = metrics.width;
const textHeight = 20;
const x = 100;
const y = 100;

ctx.fillStyle = 'yellow';
ctx.fillRect(x - 5, y - textHeight, textWidth + 10, textHeight + 10);

ctx.fillStyle = 'black';
ctx.fillText(text, x, y);

6. Working with Images
Load and Draw Image
javascriptconst img = new Image();
img.src = 'path/to/image.jpg';

img.addEventListener('load', () => {
  // drawImage(image, x, y)
  ctx.drawImage(img, 100, 100);
  
  // drawImage(image, x, y, width, height) - scales image
  ctx.drawImage(img, 300, 100, 200, 150);
  
  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // Crop and draw
  ctx.drawImage(img, 
    50, 50, 100, 100,    // Source crop (from image)
    500, 100, 150, 150   // Destination (on canvas)
  );
});
Pattern Fill with Image
javascriptimg.addEventListener('load', () => {
  const pattern = ctx.createPattern(img, 'repeat');
  // 'repeat', 'repeat-x', 'repeat-y', 'no-repeat'
  
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 800, 600);
});

7. Gradients
Linear Gradient
javascript// createLinearGradient(x0, y0, x1, y1)
const gradient = ctx.createLinearGradient(0, 0, 800, 0); // Left to right

gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'yellow');
gradient.addColorStop(1, 'green');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 800, 600);
Radial Gradient
javascript// createRadialGradient(x0, y0, r0, x1, y1, r1)
const radialGradient = ctx.createRadialGradient(400, 300, 50, 400, 300, 200);

radialGradient.addColorStop(0, 'white');
radialGradient.addColorStop(0.5, 'yellow');
radialGradient.addColorStop(1, 'orange');

ctx.fillStyle = radialGradient;
ctx.fillRect(0, 0, 800, 600);

8. Transformations
Translate (Move Origin)
javascriptctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100); // At (0, 0)

ctx.translate(200, 200); // Move origin to (200, 200)

ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 100, 100); // Now drawn at (200, 200)
Rotate
javascriptctx.save(); // Save current state

ctx.translate(400, 300); // Move to center
ctx.rotate(Math.PI / 4); // Rotate 45 degrees

ctx.fillStyle = 'green';
ctx.fillRect(-50, -50, 100, 100); // Draw centered at rotation point

ctx.restore(); // Restore original state
Scale
javascriptctx.save();

ctx.scale(2, 2); // Double size

ctx.fillStyle = 'purple';
ctx.fillRect(50, 50, 100, 100); // Drawn at (100, 100) with size 200x200

ctx.restore();

9. Animation with requestAnimationFrame
Basic Animation Loop
javascriptlet x = 0;

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update position
  x += 2;
  if (x > canvas.width) x = 0;
  
  // Draw
  ctx.fillStyle = 'red';
  ctx.fillRect(x, 250, 50, 50);
  
  // Request next frame
  requestAnimationFrame(animate);
}

animate(); // Start the loop
Bouncing Ball
javascriptlet ballX = 400;
let ballY = 300;
let ballVelocityX = 5;
let ballVelocityY = 3;
const ballRadius = 30;

function animateBall() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update position
  ballX += ballVelocityX;
  ballY += ballVelocityY;
  
  // Bounce off walls
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballVelocityX *= -1;
  }
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballVelocityY *= -1;
  }
  
  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
  
  requestAnimationFrame(animateBall);
}

animateBall();
Rotating Square
javascriptlet angle = 0;

function rotateSquare() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.save();
  ctx.translate(400, 300);  // Move to center
  ctx.rotate(angle);        // Rotate
  
  ctx.fillStyle = 'purple';
  ctx.fillRect(-50, -50, 100, 100); // Draw centered
  
  ctx.restore();
  
  angle += 0.02; // Increase rotation
  
  requestAnimationFrame(rotateSquare);
}

rotateSquare();

10. Particle System
javascriptclass Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.radius = Math.random() * 3 + 2;
    this.life = 1.0;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.01;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 100, 50, ${this.life})`;
    ctx.fill();
    ctx.closePath();
  }
  
  isDead() {
    return this.life <= 0;
  }
}

let particles = [];

function animateParticles() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fade effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add new particles
  if (Math.random() < 0.3) {
    particles.push(new Particle(400, 300));
  }
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
  
  requestAnimationFrame(animateParticles);
}

animateParticles();

11. Mouse Interaction
Draw on Mouse Move
javascriptlet isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.closePath();
  
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});