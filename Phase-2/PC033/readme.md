PC33 — Classes & Inheritance

1. Class Basics
Classes are syntactic sugar over the prototype system you just learned — cleaner syntax, same engine underneath.
javascriptclass Person {
  constructor(name, age) {
    // runs automatically when "new Person()" is called
    this.name = name;
    this.age = age;
  }

  // Method — lives on prototype automatically
  greet() {
    return `Hi, I'm ${this.name}`;
  }

  isAdult() {
    return this.age >= 18;
  }
}

const alex = new Person("Alex", 25);
const sam  = new Person("Sam", 16);

alex.greet();    // "Hi, I'm Alex"
sam.isAdult();   // false
Class vs Constructor Function — same result, cleaner syntax:
javascript// These are identical under the hood:

// Old way (PC32)
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return `Hi ${this.name}`; };

// New way (PC33)
class Person {
  constructor(name) { this.name = name; }
  greet() { return `Hi ${this.name}`; }
}

2. Static Methods
Static methods belong to the class itself, not instances:
javascriptclass MathHelper {
  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
  
  // useful for factory methods
  static createAdmin(name) {
    return new User(name, "admin");
  }
}

// Call on the CLASS — not on an instance
MathHelper.add(2, 3);      // 5 ✅
MathHelper.multiply(2, 3); // 6 ✅

const helper = new MathHelper();
helper.add(2, 3); // ❌ TypeError — not available on instances
Real world use — factory methods:
javascriptclass User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  static createAdmin(name) {
    return new User(name, "admin"); // factory
  }

  static createGuest() {
    return new User("Guest", "guest");
  }
}

const admin = User.createAdmin("Alex");
const guest = User.createGuest();

3. Getters & Setters
javascriptclass Circle {
  constructor(radius) {
    this.radius = radius;
  }

  // getter — access like a property, not a method
  get area() {
    return Math.PI * this.radius ** 2;
  }

  get diameter() {
    return this.radius * 2;
  }

  // setter — validate before setting
  set radius(value) {
    if (value < 0) throw new Error("Radius cannot be negative");
    this._radius = value; // convention: _ prefix for internal value
  }

  get radius() {
    return this._radius;
  }
}

const c = new Circle(5);
c.area;       // 78.539... — no () needed, works like property
c.diameter;   // 10
c.radius = -1; // ❌ throws Error

4. Private Fields — # Syntax
javascriptclass BankAccount {
  #balance; // truly private — only accessible inside the class

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount > this.#balance) return "Insufficient funds";
    this.#balance -= amount;
    return this.#balance;
  }

  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);     // 150
account.#balance;        // ❌ SyntaxError — truly private!
account.balance;         // 150 ✅ — via getter
This is cleaner than the closure approach from PC30 — # is the modern way to make class properties private.

5. Inheritance — extends & super
javascriptclass Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} says ${this.sound}`;
  }

  toString() {
    return `Animal: ${this.name}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "woof"); // MUST call super() first — sets up Animal
    this.breed = breed;  // then add own properties
  }

  // Override parent method
  speak() {
    return `${super.speak()} loudly!`; // super.method() calls parent version
  }

  fetch() {
    return `${this.name} fetches the ball!`;
  }
}

const rex = new Dog("Rex", "Labrador");
rex.speak();  // "Rex says woof loudly!"
rex.fetch();  // "Rex fetches the ball!"
rex.toString(); // "Animal: Rex" — inherited from Animal

6. super — Two Uses
javascriptclass Child extends Parent {
  constructor() {
    super();           // 1. Call parent constructor — ALWAYS first line
  }

  someMethod() {
    super.someMethod(); // 2. Call parent version of a method
  }
}
Why must super() come first?
javascriptclass Dog extends Animal {
  constructor(name) {
    this.breed = "Lab"; // ❌ ReferenceError — can't use this before super()
    super(name);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);        // ✅ sets up "this" first
    this.breed = "Lab"; // then safe to use this
  }
}

7. instanceof & Inheritance Checking
javascriptclass Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

const rex = new Dog();

rex instanceof Dog;    // true  — direct class
rex instanceof Animal; // true  — parent class
rex instanceof Cat;    // false — different branch

// Check class name
rex.constructor.name;  // "Dog"

8. Full Real World Example
javascriptclass Shape {
  constructor(color) {
    this.color = color;
  }

  getInfo() {
    return `A ${this.color} shape with area ${this.area.toFixed(2)}`;
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }
}

const rect   = new Rectangle("blue", 4, 5);
const circle = new Circle("red", 3);

rect.getInfo();   // "A blue shape with area 20.00"
circle.getInfo(); // "A red shape with area 28.27"
Notice getInfo() is defined ONCE in Shape but works perfectly for both children — that's the power of inheritance.