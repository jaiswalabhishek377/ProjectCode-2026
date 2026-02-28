// Challenge 1 — Safe JSON Parse
function safeJSONParse(jsonString, fallback = null) {
  // Try to parse JSON
  // If it fails, return fallback
  // If it succeeds, return parsed object
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return fallback;
  }
}

console.log(safeJSONParse('{"name":"Alex"}'));        // { name: "Alex" }
console.log(safeJSONParse('invalid', { error: true })); // { error: true }

// Challenge 2 — Stringify with Date Handling
function stringifyWithDates(obj) {
  // Stringify object but keep Dates as ISO strings
  // Add a special marker so we can identify them later
  // Example: Date becomes { __type: "Date", value: "2024-02-24..." }
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return {
        __type: "Date",
        value: value.toISOString()
      };
    }
    return value;
  });
}

const data = {
  name: "Alex",
  created: new Date("2024-02-24")
};
const json = stringifyWithDates(data);
// Should include date information that can be restored

// Challenge 3 — Parse with Date Revival
function parseWithDates(jsonString) {
  // Parse JSON and restore Date objects
  // Look for objects with __type: "Date" and convert back
  return JSON.parse(jsonString, (key, value) => {
    if (value && typeof value === "object" && value.__type === "Date") {
      return new Date(value.value);
    }
    return value;
  });
}

// Challenge 4 — Deep Clone (JSON method)
function deepClone(obj) {
  // Use JSON.parse(JSON.stringify()) to deep clone
  // But handle the error if obj has circular references
  // Return null if cloning fails
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return null;
  }
}

const original = { name: "Alex", nested: { value: 42 } };
const clone = deepClone(original);
clone.nested.value = 99;
console.log(original.nested.value); // Should still be 42

// Challenge 5 — localStorage Helper
class Storage {
  // Static method to save object to localStorage
  static save(key, value) {
    // Stringify and save to localStorage
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  // Static method to get object from localStorage
  static get(key, defaultValue = null) {
    // Get from localStorage, parse, return
    // If key doesn't exist or parsing fails, return defaultValue
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(item);
    } catch (e) {
      return defaultValue;
    }
  }
  
  // Static method to remove from localStorage
  static remove(key) {
    // Remove from localStorage
    localStorage.removeItem(key);
  }
}

// Usage:
Storage.save("user", { name: "Alex", score: 95 });
const user = Storage.get("user");
console.log(user.name); // "Alex"

// Challenge 6 — Strip Functions Before Stringify
function stripFunctions(obj) {
  // Remove all functions from object before stringifying
  // Keep everything else
  // Return JSON string
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "function") {
      return undefined;
    }
    return value;
  });
}

const data = {
  name: "Alex",
  greet: function() { return "Hi"; },
  age: 25,
  calculate: () => 42
};

console.log(stripFunctions(data));
// '{"name":"Alex","age":25}'

// Challenge 7 — Pretty Print with Custom Indent
function prettyPrint(obj, indent = 2) {
  // Return pretty-printed JSON string with custom indent
  return JSON.stringify(obj, null, indent);
}

console.log(prettyPrint({ name: "Alex", age: 25 }));
/*
{
  "name": "Alex",
  "age": 25
}
*/