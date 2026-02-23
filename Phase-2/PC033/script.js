// Challenge 1
// Build a Vehicle class with:
// - constructor: make, model, year
// - method: getAge() → returns how many years old (2024 - year)
// - method: describe() → "2019 Toyota Supra"
// - static method: compare(v1, v2) → returns whichever is newer


// ✅ Correct version:
class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getAge() {
    return `${this.make} is ${2026 - this.year} years old.`;
  }

  describe() {
    return `${this.year} ${this.make} ${this.model}`;
  }

  static compare(v1, v2) {
    return v1.year > v2.year ? v1 : v2; // return newer vehicle
  }
}

const supra = new Vehicle("Toyota", "Supra", 2019);
supra.getAge();    // "Toyota is 7 years old."
supra.describe();  // "2019 Toyota Supra"

const civic = new Vehicle("Honda", "Civic", 2022);
Vehicle.compare(supra, civic); // returns civic — newer ✅

// Challenge 2
// Extend Vehicle with an ElectricVehicle class:
// - constructor: make, model, year, range (km)
// - override describe() → "2022 Tesla Model3 (Electric, 500km range)"
// - method: canReach(distance) → true/false if range >= distance


// ✅ Correct:
class ElectricVehicle extends Vehicle {
  constructor(make, model, year, range) {
    super(make, model, year); // pass ALL three to parent super(make, "BMW") // ❌ model hardcoded, year missing
    this.range = range;
  }

  describe() {
    return `${super.describe()} (Electric, ${this.range}km range)`;
  }

  canReach(distance) {
    return this.range >= distance; // boolean, no template literal!
  }
}

const tesla = new ElectricVehicle("Tesla", "Model3", 2022, 500);
tesla.describe();     // "2022 Tesla Model3 (Electric, 500km range)"
tesla.canReach(300);  // true
tesla.canReach(600);  // false
// Challenge 3
// Predict the output
class Counter {
  #count = 0;  // # fields are truly private accessing from outside = instant crash

  increment() { this.#count++; }
  decrement() { this.#count--; }
  get value()  { return this.#count; }
}

const c = new Counter();
c.increment();
c.increment();
c.increment();
c.decrement();
console.log(c.value);   // 2
//console.log(c.#count);  // SyntaxError: Private field '#count' must be declared in an enclosing class

// Challenge 4
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Cat extends Animal {
  constructor(name, indoor) {
    super(name);
    this.indoor = indoor;
  }
  speak() { return `${super.speak()} — meow!`; }
}

const cat = new Cat("Whiskers", true);
console.log(cat.speak());             // "Whiskers makes a sound — meow!"
console.log(cat instanceof Animal);  // true — Cat extends Animal
console.log(cat instanceof Cat);        // true — cat is an instance of Cat
console.log(cat.constructor.name);   // "Cat" — constructor points to the class that created the instance
cat.name             // "Whiskers" — the property YOU set
cat.constructor.name // "Cat"      — the CLASS name, always a string
// Challenge 5
// Add a static method createPair(name1, name2) to Animal
// that returns an array of two Animal instances
// Animal.createPair("Rex", "Max") → [Animal{name:"Rex"}, Animal{name:"Max"}]


class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }

  static createPair(name1, name2) {
    return [new Animal(name1), new Animal(name2)];
    //      ↑ use "new Animal" inside the static method
    //        "this" inside static = the class itself!
  }
}

Animal.createPair("Rex", "Max");
// [Animal { name: "Rex" }, Animal { name: "Max" }]