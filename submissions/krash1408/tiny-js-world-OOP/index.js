/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/krash1408/a-tiny-JS-world.git
   Web app: https://krash1408.github.io/a-tiny-JS-world/
   */
// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Create {
    constructor(gender, name, age, say, species, legs, hands) {
        this.gender = gender;
        this.name = name;
        this.say = say;
        this.species = species;
        this.age = age;
        this.legs = legs;
        this.hands = hands;
    }
    whatReturn() {
        return print(`Gender: ${this.gender}, name: ${this.name}, say: ${this.say}, species: ${this.species}, age: ${this.age}, legs ${this.legs}, hands: ${this.hands}`);
    }
}

class Human extends Create {
    constructor ( gender, name, age, say, species = 'Human', legs = '2', hands = '2') {
        super (gender, name, age, say, species, legs, hands);
    }
}
class Dog extends Create {
    constructor (gender, name, age, say = 'Woof!', species = 'Dog', legs = '4', hands = '0') {
        super (gender, name, age, say, species, legs, hands);
    }
}
class Cat extends Create {
    constructor (gender, name, age, say = 'Meow!', species = 'Cat', legs = '4', hands = '0') {
        super (gender, name, age, say, species, legs, hands);
    }
}

let woman = new Human('male', 'Jane', 57, 'Holla!');
let man = new Human('male' , 'John', 57, 'I love development.');
let cat = new Cat('male', 'Simon', 3);
let dog = new Dog('male', 'Scooby', 7);

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
[woman, man, cat, dog].forEach(value => {
    value.whatReturn();
})