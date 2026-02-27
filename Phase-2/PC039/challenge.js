// Challenge 1 — Format date as "DD MMM YYYY" 
// Example: Feb 24, 2024 → "24 Feb 2024"
function formatDateCustom(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Complete this function
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Challenge 2 — Days until your next birthday
function daysUntilBirthday(birthMonth, birthDay) {
  // birthMonth: 0-11 (0=Jan)
  // birthDay: 1-31
  // Return number of days until next birthday from today
    function daysUntilBirthday(birthMonth, birthDay) {
  const today = new Date();
  const currentYear = today.getFullYear();
  // Birthday this year
  let nextBirthday = new Date(currentYear, birthMonth, birthDay);
  // If birthday already passed, use next year
  if (nextBirthday < today) {
    nextBirthday = new Date(currentYear + 1, birthMonth, birthDay);
  }
  // Calculate difference in days
  const diffMs = nextBirthday - today;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
daysUntilBirthday(0, 15);  // Days until Jan 15
daysUntilBirthday(11, 25); // Days until Dec 25
}

// Challenge 3 — Check if date is weekend
function isWeekend(date) {
  // Return true if Saturday or Sunday
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
}

// Challenge 4 — Random hex color
function randomHexColor() {
  // Return format: "#A3F2B9"
  // Hint: Random number 0-255 for R, G, B, convert to hex
  const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');  // math.random() gives 0-0.999..., *256 gives 0-255.999..., floor gives 0-255, toString(16) converts to hex, padStart ensures 2 digits
  const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

// Challenge 5 — Roll multiple dice
function rollDice(numDice, numSides) {
  // Roll numDice dice, each with numSides sides
  // Return array of results
  // Example: rollDice(3, 6) → [4, 2, 6]
  const results = [];
  for (let i = 0; i < numDice; i++) {
    results.push(Math.floor(Math.random() * numSides) + 1);
  }
  return results;
}

// Challenge 6 — Round to decimal places
function roundToDecimals(num, decimals) {
  // roundToDecimals(3.14159, 2) → 3.14
  // roundToDecimals(3.14159, 3) → 3.142
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals); // 314159 * 100 = 314.159, round = 314, /100 = 3.14
}

// Challenge 7 — BONUS: Generate OTP 🔥
function generateOTP(length = 6) {
  // Generate random numeric OTP
  // Example: generateOTP(6) → "482719"
  // Example: generateOTP(4) → "7203"
  // Requirements:
  // - Must be EXACTLY length digits
  // - Each digit 0-9
  // - Return as STRING (leading zeros matter!)
  // - Use crypto-secure if possible for real apps
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

console.log(generateOTP(6));  // "482719"
console.log(generateOTP(4));  // "0394" (note leading zero!)
console.log(generateOTP(8));  // "73829405"

// Functional style
function generateOTP(length = 6) {
  return Array.from({length}, () => Math.floor(Math.random() * 10)).join('');
}

// One-liner
const generateOTP = (length = 6) => 
  Array.from({length}, () => Math.floor(Math.random() * 10)).join('');

// Using String.padStart (if you want to ensure length)
function generateOTP(length = 6) {
  return String(Math.floor(Math.random() * 10 ** length)).padStart(length, '0');
}
//crypto-secure version (for real applications)
function generateSecureOTP(length = 6) {
  const digits = new Uint8Array(length);
  crypto.getRandomValues(digits);
  return Array.from(digits, d => d % 10).join('');
}