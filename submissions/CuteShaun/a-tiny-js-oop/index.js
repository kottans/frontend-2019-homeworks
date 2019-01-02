/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class MainForm {
  constructor(gender, name, saying, friendList) {
    this.friendList = friendList;
    this.gender = gender;
    this.name = name;
    this.saying = saying;
  }

  toString() {
    var props = Object.keys(this).reverse();
    return props
      .map(item => {
        return Array.isArray(this[item])
          ? `<strong>${item}:</strong> ${this[item].join(", ")}`
          : `<strong>${item}:</strong> ${this[item]}`;
      })
      .join("; ");
  }

  showSaying() {
    return this.saying;
  }

  showFriendsList() {
    return `<em>${this.friendList}</em>`;
  }
}

class Human extends MainForm {
  constructor(gender, name, saying, friendList) {
    super(gender, name, saying, friendList);
    this.type = "human";
    this.legs = 2;
    this.hands = 2;
  }
}

class Dog extends MainForm {
  constructor(gender, name, saying, friendList) {
    super(gender, name, saying, friendList);
    this.type = "dog";
    this.legs = 2;
    this.saying = "bark";
  }
}

class Cat extends MainForm {
  constructor(gender, name, friendList, saying) {
    super(gender, name, saying, friendList);
    this.type = "cat";
    this.legs = 2;
    this.saying = "meow";
  }
}

class CatMetamorphose extends Cat {
  constructor(gender, name, friendList, humanInterface, saying) {
    super(gender, name, friendList);
    this.hands = humanInterface.hands;
  }
}

const man = new Human("male", "Andrew", "Hello, Eva!", ["Eva", "Masya"]);
const woman = new Human("female", "Eva", "Hello, Andrew!", ["Andrew", "Barkl"]);
const dog = new Dog("male", "Barkl", ["Eva", "Andrew"]);

const cat = new Cat("female", "Masya", ["Andrew"]);
const catWoman = new CatMetamorphose(
  "female",
  "Eva",
  ["Andrew", "Barkl"],
  new Human()
);
const allInhabitans = [man, woman, dog, cat, catWoman];

allInhabitans.forEach(item => print(item));
// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
