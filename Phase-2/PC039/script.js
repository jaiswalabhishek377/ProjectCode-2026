PC39 — Date Object & Math Object
Every app needs dates (timestamps, formatting, countdowns) and random values (games, IDs, OTPs). Let's master both! 💪

1. Date Object — Creating Dates
javascript// Current date and time
const now = new Date();
console.log(now); // Fri Feb 24 2024 14:30:45 GMT+0530

// Specific date
const birthday = new Date(2000, 0, 15); // Jan 15, 2000
// ⚠️ Months are 0-indexed! 0=Jan, 11=Dec

const newYear = new Date(2024, 0, 1);   // Jan 1, 2024
const christmas = new Date(2024, 11, 25); // Dec 25, 2024

// From string
const date1 = new Date("2024-02-24");
const date2 = new Date("Feb 24, 2024");
const date3 = new Date("2024-02-24T14:30:00");

// From timestamp (milliseconds since Jan 1, 1970)
const date4 = new Date(1708771800000);

2. Getting Date Components
javascriptconst date = new Date(2024, 1, 24, 14, 30, 45); // Feb 24, 2024, 2:30:45 PM

// Date parts
date.getFullYear();  // 2024
date.getMonth();     // 1 (Feb — remember 0-indexed!)
date.getDate();      // 24 (day of month)
date.getDay();       // 6 (Saturday — 0=Sun, 6=Sat)

// Time parts
date.getHours();     // 14 (24-hour format)
date.getMinutes();   // 30
date.getSeconds();   // 45
date.getMilliseconds(); // 0

// Timestamp
date.getTime();      // 1708771245000 (ms since 1970)

// Quick way to get current timestamp
Date.now();          // 1708771245000

3. Setting Date Components
javascriptconst date = new Date();

date.setFullYear(2025);
date.setMonth(11);      // December
date.setDate(25);       // 25th
date.setHours(18);
date.setMinutes(30);

console.log(date); // Dec 25, 2025, 6:30 PM

4. Formatting Dates
javascriptconst date = new Date();

// Built-in formatting
date.toDateString();      // "Fri Feb 24 2024"
date.toTimeString();      // "14:30:45 GMT+0530"
date.toLocaleDateString(); // "2/24/2024" (US format)
date.toLocaleTimeString(); // "2:30:45 PM"
date.toISOString();       // "2024-02-24T09:00:45.000Z"

// Localized formatting
date.toLocaleDateString("en-IN"); // "24/2/2024" (India)
date.toLocaleDateString("en-US"); // "2/24/2024" (US)
date.toLocaleDateString("en-GB"); // "24/02/2024" (UK)

// With options
date.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});
// "Friday, February 24, 2024"

5. Custom Date Formatting
javascriptfunction formatDate(date, format = "DD/MM/YYYY") {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  
  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year);
}

const date = new Date(2024, 1, 5); // Feb 5, 2024

formatDate(date, "DD/MM/YYYY"); // "05/02/2024"
formatDate(date, "MM/DD/YYYY"); // "02/05/2024"
formatDate(date, "YYYY-MM-DD"); // "2024-02-05"

6. Date Calculations
javascript// Add days
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const today = new Date();
const nextWeek = addDays(today, 7);
const lastWeek = addDays(today, -7);

// Difference between dates
const date1 = new Date(2024, 0, 1);  // Jan 1, 2024
const date2 = new Date(2024, 11, 31); // Dec 31, 2024

const diffMs = date2 - date1;
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
// 365 days

// Age calculation
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

const birthday = new Date(2000, 0, 15); // Jan 15, 2000
calculateAge(birthday); // 24 (in 2024)

7. Time Until / Time Ago
javascriptfunction timeUntil(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${days}d ${hours}h ${minutes}m`;
}

const deadline = new Date(2024, 2, 1); // Mar 1, 2024
timeUntil(deadline); // "5d 14h 30m"

function timeAgo(pastDate) {
  const now = new Date();
  const diff = now - pastDate;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}

const posted = new Date(Date.now() - 1000 * 60 * 45); // 45 min ago
timeAgo(posted); // "45 minutes ago"

8. Math Object — Random Numbers
javascript// Math.random() returns 0 (inclusive) to 1 (exclusive)
Math.random(); // 0.7382947362...

// Random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomInt(1, 6);    // Dice roll: 1-6
randomInt(1, 100);  // Random percentage
randomInt(0, 255);  // RGB color value

// Random array element
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const colors = ["red", "blue", "green", "yellow"];
randomElement(colors); // "blue"

// Shuffle array (Fisher-Yates)
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4]

9. Math Object — Rounding & Operations
javascript// Rounding
Math.floor(4.9);  // 4 — always rounds DOWN
Math.ceil(4.1);   // 5 — always rounds UP
Math.round(4.5);  // 5 — rounds to nearest (0.5 goes up)
Math.round(4.4);  // 4

Math.trunc(4.9);  // 4 — removes decimal (like floor for positive)
Math.trunc(-4.9); // -4 (floor would give -5)

// Min & Max
Math.min(5, 2, 9, 1);     // 1
Math.max(5, 2, 9, 1);     // 9

const nums = [5, 2, 9, 1];
Math.min(...nums);        // 1 (spread array)
Math.max(...nums);        // 9

// Power & Roots
Math.pow(2, 3);   // 8 (2³)
2 ** 3;           // 8 (cleaner syntax)

Math.sqrt(16);    // 4
Math.cbrt(27);    // 3 (cube root)

// Absolute value
Math.abs(-5);     // 5
Math.abs(5);      // 5

// Sign
Math.sign(-5);    // -1
Math.sign(0);     // 0
Math.sign(5);     // 1

10. Math Constants
javascriptMath.PI;          // 3.141592653589793
Math.E;           // 2.718281828459045 (Euler's number)

// Calculate circle area
function circleArea(radius) {
  return Math.PI * radius ** 2;
}

circleArea(5); // 78.53981633974483