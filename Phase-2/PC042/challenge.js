// Challenge 1 — Storage with TTL (Time To Live)
class TTLStorage {
  // set(key, value, ttlSeconds)
  // - Store value with expiration time
  // - If ttlSeconds is null, no expiration
  set(key, value, ttlSeconds = null) {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    const item = { value, expiresAt };
    localStorage.setItem(key, JSON.stringify(item));
  }
  // get(key)
  // - Return value if not expired
  // - Return null if expired or doesn't exist
  // - Auto-delete expired items
  get(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    if (item.expiresAt && item.expiresAt < Date.now()) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
  // cleanup()
  // - Remove ALL expired items from storage
  cleanup() {
    const now = Date.now();
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      const itemStr = localStorage.getItem(key);
      if (itemStr) {
        const item = JSON.parse(itemStr);
        if (item.expiresAt && item.expiresAt < now) {
          localStorage.removeItem(key);
        }
      }
    }
  }

}

// Usage:
const storage = new TTLStorage();
storage.set("token", "abc123", 60); // 60 seconds
storage.set("username", "Alex");    // No expiration

setTimeout(() => {
  console.log(storage.get("token"));    // null (expired)
  console.log(storage.get("username")); // "Alex" (still valid)
}, 61000);

// Challenge 2 — Cross-Tab Sync
// Create a system where when user logs out in one tab,
// all other tabs redirect to login page automatically
// Hint: Use storage events
function setupLogoutSync() {
  window.addEventListener("storage", (event) => {
    if (event.key === "logout" && event.newValue === "true") {
      // Redirect to login page
      window.location.href = "/login.html";
    }
  });
}
// Challenge 3 — Storage Manager
class StorageManager {
  // getSize() - return total bytes used
  // getAvailableSpace() - estimate remaining space (try writing test data)
  // cleanup(olderThanDays) - remove items older than X days
  // export() - return all storage as JSON object
  // import(data) - restore storage from JSON object
  getSize() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      total += key.length + value.length;
    }
    return total;
  }
  getAvailableSpace() {
    const testKey = "__storage_test__";
    try {
      localStorage.setItem(testKey, "x".repeat(1024 * 1024)); // Try 1MB
      localStorage.removeItem(testKey);
      return "At least 1MB available";
    } catch (e) {
      return "Less than 1MB available";
    }
  }
  cleanup(olderThanDays) {
    const cutoff = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      const itemStr = localStorage.getItem(key);
      if (itemStr) {
        const item = JSON.parse(itemStr);
        if (item.timestamp && item.timestamp < cutoff) {
          localStorage.removeItem(key);
        } else if (item.expiresAt && item.expiresAt < Date.now()) {
          localStorage.removeItem(key);
        }
      }
    }
  }
  export() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    return JSON.stringify(data);
  }
  import(data) {
    const parsed = JSON.parse(data);
    for (const key in parsed) {
      localStorage.setItem(key, parsed[key]);
    }
  }
}

// Challenge 4 — Recent Searches
class RecentSearches {
  constructor(maxItems = 5) {
    this.maxItems = maxItems;
  }
  
  // add(searchTerm)
  // - Add to front of list
  // - Remove duplicates
  // - Keep only last maxItems
  // - Persist to localStorage
  add(searchTerm) {
    let searches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    searches = searches.filter(term => term !== searchTerm);
    searches.unshift(searchTerm);
    if (searches.length > this.maxItems) {
      searches.pop();
    }
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  } 
  // get()
  // - Return array of recent searches (newest first)
  get() {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  }
  // clear()
  // - Clear all searches
  clear() {
    localStorage.removeItem("recentSearches");
  }
}

// Usage:
const searches = new RecentSearches(5);
searches.add("JavaScript");
searches.add("React");
searches.add("JavaScript"); // Duplicate - should move to front
console.log(searches.get()); // ["JavaScript", "React"]

// Challenge 5 — Dark Mode Toggle with Persistence
// Create functions:
// - setTheme(theme) - Save "light" or "dark" to localStorage
// - getTheme() - Get saved theme or default to "light"
// - toggleTheme() - Switch between light/dark
// - applyTheme() - Add class to document.body
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  applyTheme();
}
function getTheme() {
  return localStorage.getItem("theme") || "light";
}
function toggleTheme() {
  const current = getTheme();
  const newTheme = current === "light" ? "dark" : "light";
  setTheme(newTheme);
}
function applyTheme() {
  const theme = getTheme();
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
}
// Bonus: Listen for system preference changes
// window.matchMedia('(prefers-color-scheme: dark)')
//   .addEventListener('change', (e) => {
//     if (!localStorage.getItem("theme")) { // Only change if user hasn't set a preference
//       applyTheme();
//     }
//   });
// Challenge 6 — Shopping Cart Storage
class CartStorage {
  // addItem(item) - item has { id, name, price, quantity }
  // removeItem(id)
  // updateQuantity(id, quantity)
  // getCart() - return array of items
  // getTotal() - return total price
  // clear()
  addItem(item) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  updateQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  getTotal() {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  clear() {
    localStorage.removeItem("cart");
  }
}

// Usage:
const cart = new CartStorage();
cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 });
cart.addItem({ id: 2, name: "Mouse", price: 29, quantity: 2 });
cart.updateQuantity(2, 3);
console.log(cart.getTotal()); // 999 + (29 * 3) = 1086

// Challenge 7 — Auto-save Form
// Create a function that auto-saves form inputs to localStorage
// as user types, and restores them on page load

function autoSaveForm(formId) {
  // - Save all input/textarea/select values to localStorage on input
  // - Restore values on page load
  // - Clear saved data on form submit
  // - Use namespace: `form:${formId}:${inputName}`
  const form = document.getElementById(formId);
  if (!form) return;
  // Restore on load
  Array.from(form.elements).forEach(el => {
    if (el.name) {
      const savedValue = localStorage.getItem(`form:${formId}:${el.name}`);
      if (savedValue !== null) {
        el.value = savedValue;
      }
    }
  });

  // Save on input
  form.addEventListener("input", (e) => {
    if (e.target.name) {
      localStorage.setItem(`form:${formId}:${e.target.name}`, e.target.value);
    }
  });

  // Clear on submit
  form.addEventListener("submit", () => {
    Array.from(form.elements).forEach(el => {
      if (el.name) {
        localStorage.removeItem(`form:${formId}:${el.name}`);
      }
    });
  });
}

// Usage:
autoSaveForm("contactForm");
// User types in form, closes tab, comes back → data restored! ✅