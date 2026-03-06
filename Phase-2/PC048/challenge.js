// <!-- Use this HTML -->
// <!DOCTYPE html>
// <html>
// <body>
//   <form id="contact-form">
//     <input type="text" id="name" name="name" placeholder="Full Name">
//     <input type="email" id="email" name="email" placeholder="Email">
//     <input type="tel" id="phone" name="phone" placeholder="Phone (10 digits)">
//     <textarea id="message" name="message" placeholder="Message (max 200 chars)"></textarea>
//     <span id="char-count">0/200</span>
//     <select id="subject" name="subject">
//       <option value="">Select subject</option>
//       <option value="general">General Inquiry</option>
//       <option value="support">Support</option>
//       <option value="feedback">Feedback</option>
//     </select>
//     <input type="checkbox" id="subscribe" name="subscribe">
//     <label for="subscribe">Subscribe to newsletter</label>
//     <button type="submit">Send Message</button>
//   </form>
// </body>
// </html>

// Challenge 1 — Basic Validation
// On form submit:
// - Prevent default submission
// - Validate name is required and at least 3 characters
// - Validate email is required and valid format
// - Validate phone is exactly 10 digits
// - Validate message is required
// - Validate subject is selected
// - Show error messages for invalid fields
// - If all valid, log form data and show success message

// Challenge 2 — Real-Time Character Counter
// Update #char-count as user types in textarea
// Show character count in format "X/200"
// If over 200, make counter red
// Prevent submission if over 200 characters

// Challenge 3 — Phone Number Formatting
// As user types in phone field:
// - Only allow numbers
// - Format as: XXX-XXX-XXXX
// - Example: typing "1234567890" shows "123-456-7890"

// Challenge 4 — Email Domain Validation
// After user enters email:
// - Show warning if domain is not common (.com, .org, .net)
// - Example: "user@rare.xyz" → "Are you sure about this domain?"
// - Don't block submission, just show warning

// Challenge 5 — Password Strength Indicator
// Add password field with real-time strength meter
// Show: Weak / Medium / Strong based on:
// - Length (8+ = good, 12+ = better)
// - Has uppercase and lowercase
// - Has numbers
// - Has special characters
// Display strength with color bar

// Challenge 6 — Disable Submit Until Valid
// Disable submit button by default
// Enable only when ALL fields are valid
// Re-check on every input change

// Challenge 7 — Complete Form Handler
// Build a complete validation system:
// - showError(input, message)
// - clearError(input)
// - validateField(input, rules)
// - validateForm()
// Make it reusable for any form!