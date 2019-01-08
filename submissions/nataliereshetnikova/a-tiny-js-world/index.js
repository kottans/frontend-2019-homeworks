/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/nataliereshetnikova/a-tiny-JS-world/edit/gh-pages/index.js
   Web app: https://nataliereshetnikova.github.io/a-tiny-JS-world/
   */
// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Being {
  constructor(name,gender,saying,friends) {
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
  }
}

class Animal extends Being {
  constructor(name, gender,saying) {
    super(name,gender,saying);
    this.hands = 0;
    this.legs = 4;
  }
}

class Human extends Being {
  constructor(name,gender, saying,friends) {
    super(name,gender, saying,friends);
    this.spiece = "Human";
    this.hands = 2;
    this.legs = 2;
  }
}

class Dog extends Animal {
  constructor(name, gender,saying) {
    super(name, gender,saying);
    this.spiece = "Dog";
  }
}

class Cat extends Animal {
  constructor(name, gender,saying) {
    super(name, gender,saying);
    this.spiece = "Cat";
  }
}
const dog = new Dog('Milky','female','woof-woof!');
const cat = new Cat('Kitt','male','meow');
const man = new Human('Andrew','male','Hi!',[dog]);
const woman = new Human('Natalie','female','Nice of you!',[man, cat]);

function getStrFromObj(obj) {
  let arr = [];
  Object.values(obj).forEach((item) => {
    if (Array.isArray(item)) {
      let names = [];
      item.forEach((frnd) => {
        names.push('friend '+frnd.name);
      });
      arr.push(names.join('; '));
    }else{
      arr.push(item);
    }
  });
  return arr.join('; ');
}

[dog, cat, man, woman].forEach((being) => {
  print(getStrFromObj(being));
})

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
