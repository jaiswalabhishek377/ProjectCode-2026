//   PC37 — Deep Cloning, Immutability & Reference Bugs
//   This is the PC that separates juniors from mid-level devs. Reference bugs are silent killers — no error message, no crash, just wrong data everywhere. Let's fix that forever! 💪

//   1. The Problem — Reference Types Bite Back
//   Remember from PC26 — objects and arrays are reference types:
//   javascript//  Primitives — copy the VALUE
//   let a = 5;
//   let b = a;  //    b gets its own copy
//   b = 10;
//   console.log(a); //    5 ✅ — a is unchanged

//   //    Objects — copy the REFERENCE (pointer)
//   let obj1 = { score: 5 };
//   let obj2 = obj1;  //  obj2 points to SAME object in memory
//   obj2.score = 99;
//   console.log(obj1.score); //   99 😱 — obj1 changed too!
//   This is the most common bug in all of JS.

//   2. Shallow Copy — Spread & Object.assign
//   javascriptconst original = { name: "Alex", age: 25 };

//   //    Shallow copy with spread
//   const copy1 = { ...original };
//   copy1.age = 30;
//   console.log(original.age); //     25 ✅ — shallow copy works for flat objects

//   //    Shallow copy with Object.assign
//   const copy2 = Object.assign({}, original);
//   But watch what happens with nested objects:
//   javascriptconst user = {
//     name: "Alex",
//     address: {
//       city: "NYC",
//       zip: "10001"
//     }
//   };

//   const clone = { ...user };
//   clone.address.city = "LA";

//   console.log(user.address.city); //    "LA" 😱 — original changed!
//   //    Why? Spread only copied the TOP level
//   //    address is still a REFERENCE to the same object
//   ```

//   **Visual:**
//   ```
//   user → { name: "Alex", address: → { city: "NYC" } }
//                                       ↑
//   clone → { name: "Alex", address: ──┘  (same reference!)

//   3. Deep Copy — Three Methods
//   Method 1: JSON.parse(JSON.stringify()) — Quick & Dirty
//   javascriptconst original = {
//     name: "Alex",
//     address: { city: "NYC", zip: "10001" },
//     scores: [85, 92, 78]
//   };

//   const deepClone = JSON.parse(JSON.stringify(original));
//   deepClone.address.city = "LA";
//   deepClone.scores.push(95);

//   console.log(original.address.city); //    "NYC" ✅
//   console.log(original.scores);       //    [85, 92, 78] ✅
//   ❌ BUT it has limitations:
//   javascriptconst data = {
//     date: new Date(),
//     regex: /test/,
//     fn: function() {},
//     undef: undefined,
//     nan: NaN,
//     inf: Infinity
//   };

//   const clone = JSON.parse(JSON.stringify(data));

//   console.log(clone.date);  //  "2024-02-24T..." — STRING not Date! ❌
//   console.log(clone.regex); //  {} — becomes empty object ❌
//   console.log(clone.fn);    //  undefined — functions lost ❌
//   console.log(clone.undef); //  undefined — key deleted entirely ❌
//   console.log(clone.nan);   //  null — NaN becomes null ❌
//   console.log(clone.inf);   //  null — Infinity becomes null ❌
//   Use JSON method ONLY for plain data objects (no dates, functions, special values).

//   Method 2: structuredClone() — The Modern Way
//   javascriptconst original = {
//     name: "Alex",
//     date: new Date(),
//     nested: { deeply: { nested: { value: 42 } } }
//   };

//   const clone = structuredClone(original);
//   clone.date.setFullYear(2025);
//   clone.nested.deeply.nested.value = 99;

//   console.log(original.date.getFullYear()); //  2024 ✅
//   console.log(original.nested.deeply.nested.value); //  42 ✅
//   ✅ Handles:

//   Dates ✅
//   RegExp ✅
//   Maps/Sets ✅
//   Typed Arrays ✅
//   Deep nesting ✅

//   ❌ Still can't clone:

//   Functions ❌
//   DOM nodes ❌
//   Symbols (as property keys) ❌

//   This is the default choice for deep cloning in modern JS.

//   Method 3: Manual Recursive Clone (for complete control)
//   javascriptfunction deepClone(obj) {
//     //  Handle primitives and null
//     if (obj === null || typeof obj !== "object") return obj;
  
//     //  Handle Date
//     if (obj instanceof Date) return new Date(obj);
  
//     //  Handle Array
//     if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  
//     //  Handle Object
//     const cloned = {};
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         cloned[key] = deepClone(obj[key]);
//       }
//     }
//     return cloned;
//   }

//   const original = {
//     name: "Alex",
//     date: new Date(),
//     nested: { array: [1, 2, { deep: 3 }] }
//   };

//   const clone = deepClone(original);
//   clone.nested.array[2].deep = 99;
//   console.log(original.nested.array[2].deep); //    3 ✅

//   4. Array Reference Traps
//   javascriptconst original = [1, 2, 3, [4, 5]];

//   //    Shallow copy
//   const copy1 = [...original];
//   const copy2 = original.slice();

//   copy1[3][0] = 99;
//   console.log(original[3][0]); //   99 😱 — nested array still shared!

//   //    Deep copy
//   const deepCopy = structuredClone(original);
//   deepCopy[3][0] = 100;
//   console.log(original[3][0]); //   99 ✅ — original unchanged

//   5. Why Immutability Matters — React Example
//   javascript//  ❌ Mutating state directly
//   const [user, setUser] = useState({ name: "Alex", age: 25 });

//   const updateAge = () => {
//     user.age = 26;        //    mutates original!
//     setUser(user);        //    React sees SAME reference → no re-render 💀
//   };

//   //    ✅ Create new object
//   const updateAge = () => {
//     setUser({ ...user, age: 26 }); //   NEW object → React re-renders ✅
//   };
//   Immutability rule: never modify, always create new.

//   6. Common Immutable Update Patterns
//   javascriptconst user = { name: "Alex", age: 25, city: "NYC" };

//   //    Update property immutably
//   const updated = { ...user, age: 26 };

//   //    Add property immutably  
//   const withEmail = { ...user, email: "alex@gmail.com" };

//   //    Remove property immutably
//   const { city, ...withoutCity } = user;

//   //    Update nested property immutably
//   const data = { user: { profile: { name: "Alex" } } };
//   const updated = {
//     ...data,
//     user: {
//       ...data.user,
//       profile: {
//         ...data.user.profile,
//         name: "Sam"
//       }
//     }
//   };

//   7. Array Immutable Operations
//   javascriptconst nums = [1, 2, 3, 4, 5];

//   //    ❌ Mutating methods
//   nums.push(6);      //     mutates
//   nums.pop();        //     mutates
//   nums.splice(1, 2); //     mutates
//   nums.sort();       //     mutates
//   nums.reverse();    //     mutates

//   //    ✅ Immutable alternatives
//   [...nums, 6]              //  add to end
//   nums.slice(0, -1)         //  remove last
//   [...nums.slice(0, 1), ...nums.slice(3)]  //   remove middle
//   [...nums].sort()          //  sort copy
//   [...nums].reverse()       // reverse copy