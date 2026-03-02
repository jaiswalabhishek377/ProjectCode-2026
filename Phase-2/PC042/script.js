PC42 — localStorage, sessionStorage & Persistence
You already built a Storage helper in PC41! Now let's level it up with expiration, quotas, namespacing, and cross-tab communication! 💪

1. localStorage vs sessionStorage — The Difference
javascript// localStorage — persists FOREVER (until manually cleared)
localStorage.setItem("token", "abc123");
// Close browser, restart computer → still there! ✅

// sessionStorage — clears when TAB closes
sessionStorage.setItem("tempData", "xyz789");
// Close tab → gone! ❌
// Close browser → gone! ❌
// Refresh page → still there! ✅
When to use each:
Use CaseStorage TypeAuth tokens, user preferenceslocalStorageShopping cartlocalStorageMulti-step form datasessionStorageTemporary filters/sortssessionStorageSingle-session wizardsessionStorage

2. Basic API — Review
javascript// Set (always strings!)
localStorage.setItem("key", "value");
sessionStorage.setItem("key", "value");

// Get (returns null if not found)
const value = localStorage.getItem("key");

// Remove
localStorage.removeItem("key");

// Clear everything
localStorage.clear();

// Get number of items
const count = localStorage.length;

// Get key by index
const key = localStorage.key(0);

// Check if key exists
if (localStorage.getItem("key") !== null) {
  console.log("Key exists!");
}

3. Storage Limits & Quotas
javascript// Typical limits (varies by browser):
// - localStorage: 5-10 MB
// - sessionStorage: 5-10 MB

// Check available space (approximate)
function getStorageSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total; // bytes
}

console.log(`Using ${(getStorageSize() / 1024).toFixed(2)} KB`);

// Test if storage is available
function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false; // QuotaExceededError or disabled
  }
}

// Handle quota exceeded
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded!');
      // Clear old items or notify user
    }
    return false;
  }
}

4. Storage with Expiration
javascriptclass StorageWithExpiry {
  static set(key, value, ttlSeconds = null) {
    const item = {
      value: value,
      expiry: ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  static get(key) {
    const itemStr = localStorage.getItem(key);
    
    if (!itemStr) return null;
    
    try {
      const item = JSON.parse(itemStr);
      
      // Check if expired
      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem(key); // Auto-cleanup
        return null;
      }
      
      return item.value;
    } catch (e) {
      return null;
    }
  }
  
  static remove(key) {
    localStorage.removeItem(key);
  }
}

// Usage:
StorageWithExpiry.set("sessionToken", "abc123", 3600); // 1 hour
StorageWithExpiry.set("username", "Alex"); // No expiry

setTimeout(() => {
  const token = StorageWithExpiry.get("sessionToken");
  // After 1 hour → null ✅
}, 3600000);

5. Namespaced Storage (Avoid Key Collisions)
javascriptclass NamespacedStorage {
  constructor(namespace) {
    this.namespace = namespace;
  }
  
  _makeKey(key) {
    return `${this.namespace}:${key}`;
  }
  
  set(key, value) {
    localStorage.setItem(this._makeKey(key), JSON.stringify(value));
  }
  
  get(key, defaultValue = null) {
    const item = localStorage.getItem(this._makeKey(key));
    if (item === null) return defaultValue;
    try {
      return JSON.parse(item);
    } catch {
      return defaultValue;
    }
  }
  
  remove(key) {
    localStorage.removeItem(this._makeKey(key));
  }
  
  clear() {
    // Clear only this namespace
    const prefix = `${this.namespace}:`;
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}

// Usage:
const appStorage = new NamespacedStorage("myApp");
const userStorage = new NamespacedStorage("user");

appStorage.set("theme", "dark");   // Stored as "myApp:theme"
userStorage.set("theme", "light"); // Stored as "user:theme"

// No collision! ✅

6. Storage Events — Cross-Tab Communication
javascript// Tab 1: Listen for changes
window.addEventListener("storage", (event) => {
  console.log("Storage changed!");
  console.log("Key:", event.key);
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);
  console.log("URL:", event.url);
  console.log("Storage area:", event.storageArea); // localStorage or sessionStorage
});

// Tab 2: Make a change
localStorage.setItem("message", "Hello from Tab 2!");
// Tab 1 receives the storage event! ✅

// Real-world use case: Sync logout across tabs
window.addEventListener("storage", (event) => {
  if (event.key === "authToken" && event.newValue === null) {
    console.log("User logged out in another tab!");
    window.location.href = "/login";
  }
});
⚠️ Important: Storage events only fire in OTHER tabs, not the tab that made the change!

7. Versioned Storage (Handle Schema Changes)
javascriptclass VersionedStorage {
  constructor(version = 1) {
    this.version = version;
    this.checkVersion();
  }
  
  checkVersion() {
    const storedVersion = localStorage.getItem("_version");
    
    if (storedVersion !== String(this.version)) {
      console.log("Storage version changed, migrating...");
      this.migrate(Number(storedVersion) || 0, this.version);
      localStorage.setItem("_version", String(this.version));
    }
  }
  
  migrate(from, to) {
    console.log(`Migrating from v${from} to v${to}`);
    
    // Example migration
    if (from < 2) {
      // v1 → v2: Rename "userName" to "username"
      const oldValue = localStorage.getItem("userName");
      if (oldValue) {
        localStorage.setItem("username", oldValue);
        localStorage.removeItem("userName");
      }
    }
  }
  
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}

// Usage:
const storage = new VersionedStorage(2); // Current version

8. Compression for Large Data
javascript// For really large data, you can compress before storing
// Using LZ-String library (example)

// Compress before storing
function setCompressed(key, data) {
  const json = JSON.stringify(data);
  const compressed = LZString.compress(json);
  localStorage.setItem(key, compressed);
}

// Decompress after retrieving
function getCompressed(key) {
  const compressed = localStorage.getItem(key);
  if (!compressed) return null;
  const json = LZString.decompress(compressed);
  return JSON.parse(json);
}

// Can reduce storage by 50-90% for text-heavy data!

9. Secure Storage Considerations
javascript// ⚠️ localStorage is NOT secure!
// - Readable by any JavaScript on the page
// - Vulnerable to XSS attacks
// - Never store sensitive data unencrypted!

// ❌ DON'T store these in plain localStorage:
localStorage.setItem("password", "myPassword123");      // ❌
localStorage.setItem("creditCard", "4111-1111-1111");   // ❌
localStorage.setItem("ssn", "123-45-6789");             // ❌

// ✅ Encrypt sensitive data (example with Web Crypto API)
async function encryptData(data, password) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    dataBuffer
  );
  
  return { encrypted, iv };
}

// Better: Use httpOnly cookies for auth tokens
// localStorage is best for non-sensitive preferences/settings

10. Debugging & Monitoring
javascript// Log all storage operations (development only)
class DebugStorage {
  static set(key, value) {
    console.log(`[Storage SET] ${key}:`, value);
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  static get(key) {
    const value = localStorage.getItem(key);
    console.log(`[Storage GET] ${key}:`, value);
    return value ? JSON.parse(value) : null;
  }
  
  static remove(key) {
    console.log(`[Storage REMOVE] ${key}`);
    localStorage.removeItem(key);
  }
  
  static dump() {
    console.table(
      Object.keys(localStorage).map(key => ({
        key,
        value: localStorage[key].slice(0, 50), // First 50 chars
        size: `${localStorage[key].length} bytes`
      }))
    );
  }
}

// View all storage in DevTools
DebugStorage.dump();