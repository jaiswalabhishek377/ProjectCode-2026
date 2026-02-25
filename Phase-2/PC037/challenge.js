// Rule 1: Primitives = always safe with shallow copy
// const user = { name: "Alex", age: 25 };
// const copy = { ...user };
// copy.name = "Sam";  // ✅ safe — primitives copied by value

//  Rule 2: Nested objects/arrays = NOT safe with shallow copy
// const user = { address: { city: "NYC" } };
// const copy = { ...user };
// copy.address.city = "LA";  // ❌ unsafe — reference copied

//  Rule 3: To safely copy nested, spread EACH level
// const user = { address: { city: "NYC" } };
// const copy = {
//   ...user,
//   address: { ...user.address }  // spread nested object too!
// };
// copy.address.city = "LA";  // ✅ safe now — new object created
// ```

// Challenge 1 — Predict the output
const person = { name: "Alex", pets: ["Dog", "Cat"] };
const clone = { ...person }; // Shallow clone using spread operator
clone.pets.push("Bird");     
console.log(person.pets); // ["Dog", "Cat", "Bird"] 
// because pets is a nested array, the spread operator only creates a shallow copy. Both person and clone reference the same pets array in memory, so modifying it through clone also modifies it for person.


// Challenge 2 — Fix this bug (user expects original unchanged)
function addScore(student, newScore) {
  student.scores.push(newScore);
  return student; // This mutates the original student object, which is a bug. We need to return a new object with the updated scores instead.
  // output: { name: "Alex", scores: [85, 90, 95] } and original student object is also changed to have scores [85, 90, 95]
 // Thefix:
    // return { ...student, scores: [...student.scores, newScore] };
    //  creates a new student object with the same name and a new scores array that includes all the original scores plus the new score. 
    // This way, the original student object remains unchanged.
}
const original = { name: "Alex", scores: [85, 90] };    
const updated = addScore(original, 95);
console.log(original.scores); // should still be [85, 90] achieved by returning a new object with the updated scores
//  instead of mutating the original student object.preserving immutability is crucial in many programming paradigms, especially in functional programming and when working with state management in frameworks like React. By returning a new object instead of mutating the original, we can avoid unintended side effects and make our code more predictable and easier to debug.

// Challenge 3 — Deep clone this properly (handle Date)
const data = {
  user: "Alex",
  created: new Date(),
  nested: { deeply: { value: 42 } }
};
// Clone it so changing clone.created doesn't affect original

const clone = JSON.parse(JSON.stringify(data));
clone.created.setFullYear(2000);
console.log(data.created.getFullYear()); // 2024, not 2000
// The JSON method doesn't handle Date objects correctly. It converts them to strings, so when we parse it back, we get a string instead of a Date object. To fix this, we can use a custom cloning function that checks for Date objects and clones them properly:

// Challenge 4 — Immutable array operations
const tasks = [
  { id: 1, text: "Learn JS", done: false },
  { id: 2, text: "Build project", done: false },
  { id: 3, text: "Deploy", done: false }
];

// Without mutating tasks array: 
// a) Mark task with id=2 as done: true
// b) Remove task with id=3
// c) Add new task { id: 4, text: "Test", done: false }

const updatedTasks = tasks.map(task => {
  if (task.id === 2) {
    return { ...task, done: true };
  }
  return task;
}); 

const filteredTasks = updatedTasks.filter(task => task.id !== 3);

const newTask = { id: 4, text: "Test", done: false };
const finalTasks = [...filteredTasks, newTask];
console.log(finalTasks);
// This code creates a new array of tasks without mutating the original. The original tasks array remains unchanged throughout this process.

// Challenge 5 — Spot all the bugs
const state = { user: { profile: { name: "Alex" } } };

function updateName(newName) {
  state.user.profile.name = newName;  // bug 1? This directly mutates the original state object, which is a bug if we want to keep state immutable. We should return a new state object instead of modifying the existing one.
  return state;                        // bug 2? This returns the original state object, which has been mutated. We should return a new object that reflects the updated name without changing the original state.
}

const newState = updateName("Sam");
// Fix it so original state is never touched
// Thefix:
return {
    ...state,
    user: {
      ...state.user,
      profile: {
        ...state.user.profile,
        name: newName
      }
    }
  };
// This creates a new state object with the "updated name" while keeping the original state unchanged. Each level of nesting is also cloned to ensure immutability.