const products = [
  { id: 1, name: "Laptop",  price: 999,  category: "Electronics", inStock: true  },
  { id: 2, name: "T-Shirt", price: 29,   category: "Clothing",    inStock: true  },
  { id: 3, name: "Phone",   price: 699,  category: "Electronics", inStock: false },
  { id: 4, name: "Jeans",   price: 59,   category: "Clothing",    inStock: true  },
  { id: 5, name: "Tablet",  price: 449,  category: "Electronics", inStock: true  },
  { id: 6, name: "Jacket",  price: 199,  category: "Clothing",    inStock: false }
];

// Challenge 1
// Get all Electronics that are in stock

const electronicprod = products.filter(p=> p.category==="Electronics" && p.inStock).map(p=>p.name);
// Challenge 2
// Get names of all products under price 500, sorted by price ascending

const namesUnder500 = products
  .filter(p => p.price < 500)
  .sort((a, b) => a.price - b.price)
  .map(p => p.name);
// Challenge 3
// Calculate total value of all inStock products

const totalValue = products
  .filter(p => p.inStock)
  .reduce((acc, p) => acc + p.price, 0);

// Challenge 4
// Check if ANY product is out of stock
const anyOutOfStock = products.some(p => !p.inStock);
// Check if ALL electronics are in stock
const allElectronicsInStock = products
  .filter(p => p.category === "Electronics")
  .every(p => p.inStock);

// Challenge 5
// Transform products into this format using map:
// { id: 1, label: "Laptop — $999", available: true }

const transformedProducts = products.map(p => ({
  id: p.id,
  label: `${p.name} — $${p.price}`,
  available: p.inStock
}));

// Challenge 6 — BOSS LEVEL 🔥
// Get total revenue possible from Electronics that are in stock
// Then check if that total is over 1000
// Chain it all in one expression

const result = products
  .filter(p => p.category === "Electronics" && p.inStock)
  .reduce((acc, p) => acc + p.price, 0) > 1000;

// Challenge 7 — Predict output
const nums = [1, [2, 3], [4, [5, [6]]]];
console.log(nums.flat());  // [1, 2, 3, 4, [5, [6]]]
console.log(nums.flat(2));  // [1, 2, 3, 4, 5, [6]]
console.log(nums.flat(Infinity));  // [1, 2, 3, 4, 5, 6]