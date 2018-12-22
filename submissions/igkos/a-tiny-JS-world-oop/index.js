/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/igkostyuk/a-tiny-JS-world/blob/master/index.js
   Web app: https://igkostyuk.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor(name, saying, friends, species, legs, hands, gender) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
  }
  toString() {
    return `${this.species}; ${this.name}; ${this.gender}; ${this.legs}; ${
        this.hands
        }; ${this.saying}; ${this.friends}`;
  }
}

class Human extends Inhabitant {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.species = "human";
    this.legs = 2;
    this.hands = 2;
  }
}
class Female extends Human {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.gender = "female";
  }
}
class Male extends Human {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.gender = "male";
  }
}

class Animal extends Inhabitant {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.legs = 4;
    this.hands = 0;
  }
}

class Dog extends Animal {
  constructor(name, gender, friends, species, legs, hands, saying) {
    super(name, saying, friends, species, legs, hands, gender);
    this.species = "Dog";
    this.saying = "woof-woof!";
  }
}
class Cat extends Animal {
  constructor(name, gender, friends, species, legs, hands, saying) {
    super(name, saying, friends, species, legs, hands, gender);
    this.species = "cat";
    this.saying = "meow-meow!";
  }
}

[
  new Female("Jane", "Hey! I am a STRONG WOMAN", ["Artur", "Tomy"]),
  new Male("Artur", "All right everyone, listen up.", ["Jane", "Toby"]),
  new Cat("Tomy", "female", ["Jane"]),
  new Dog("Toby", "male", ["Artur"])
].forEach(inhabitant => print(inhabitant.toString()));

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
