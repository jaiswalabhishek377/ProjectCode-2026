// Challenge 1 — String manipulation
const userInput = "  ALEX.JOHNSON@GMAIL.COM  ";
// Clean this: trim, lowercase, extract username (part before @)
// Expected: "alex.johnson"

const cleaned = userInput.trim().toLowerCase();
const username = cleaned.split('@')[0];
console.log(username);

// Challenge 2 — Build a function
function maskEmail(email) {
  // "alex@gmail.com" → "a***@gmail.com"
  // Show first char, mask until @, keep domain
    const [local, domain] = email.split('@');
    const maskedLocal = local[0] + '***';
    return maskedLocal + '@' + domain;
}
console.log(maskEmail("alex@gmail.com")); // "a***@gmail.com"
console.log(maskEmail("samantha@yahoo.com")); // "s*******@yahoo.com"

    
// Challenge 3 — Validation with regex
function validatePassword(password) {
  // Requirements:
  // - At least 8 characters
  // - At least one uppercase letter
  // - At least one lowercase letter  
  // - At least one number
  // - At least one special character (!@#$%^&*)
  // Return true/false
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUppercase && hasLowercase && hasNumber && hasSpecial && isLongEnough;
}

// Challenge 4 — Extract data
const text = "Contact us at support@company.com or sales@company.com";
// Extract ALL email addresses from this text as an array
const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
const emails = text.match(emailPattern);
console.log(emails); // ["support@company.com", "sales@company.com"]

// Challenge 5 — Format phone number
function formatPhone(phone) {
  // Input: "1234567890" (string of 10 digits)
  // Output: "(123) 456-7890"
  // Hint: use slice or regex groups
  return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`;
}


// Challenge 6 — Practical: Generate initials
function getInitials(fullName) {
  // "Alex Benjamin Johnson" → "ABJ"
  // "john doe" → "JD"
  // Handle any number of names, uppercase the initials
  const names = fullName.trim().split(/\s+/);
  return names.map(name => name[0].toUpperCase()).join('');
}

// Challenge 7 — Count words
function countWords(text) {
  // Count words in a sentence
  // "Hello world" → 2
  // "JavaScript   is    awesome" → 3 (handle multiple spaces)
  const words = text.trim().split(/\s+/);
  return words.length;
}
// Challenge 8 — Validate username
function validateUsername(username) {
    // Requirements:
    // - 3 to 16 characters
    // - Only letters, numbers, underscores
    // - Must start with a letter
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return pattern.test(username);
}