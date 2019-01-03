/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
    constructor(name, age, species, gender, greeting) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.gender = gender;
        this.greeting = greeting;
    }

    getStringFromObj () {
        return [
            `name: <strong>${this.name}</strong>`,
            `age: ${this.age}`, 
            `species: ${this.species}`, 
            `gender: ${this.gender}`, 
            `greeting: ${this.greeting}`,
            ``
        ].join('; ');
    }
}

class Human extends Inhabitant {
    constructor(name, age, species, gender, greeting, legs = 2, hands = 2) {
        super(name, age, species, gender, greeting);
        this.legs = legs;
        this.hands = hands;
    }

    getStringFromObj () {
        return super.getStringFromObj() + `hands: ${this.hands}; legs: ${this.legs}; `;
    }
}

class Animal extends Inhabitant {
    constructor(name, age, species, gender, greeting, paws = 4, tail = 1) {
        super(name, age, species, gender, greeting);
        this.paws = paws;
        this.tail = tail;
    }

    getStringFromObj () {
        return super.getStringFromObj() + `paws: ${this.paws}; tail: ${this.tail}; `;
    }
}

const dog = new Animal('Richard', 5, 'animal', 'male', 'wow!', 4, 1);
const cat = new Animal('Rocky', 4, 'animal', 'female', 'meow!');
const woman = new Human('Helga', 25, 'human', 'female', 'Hello!', 2, 2);
const man = new Human('Rob', 28, 'human', 'male', 'Hi!'); 
 
// ======== OUTPUT ========

[dog, cat, woman, man].forEach(obj => print(obj.getStringFromObj()));

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


