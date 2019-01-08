/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/krash1408/a-tiny-JS-world.git
   Web app: https://krash1408.github.io/a-tiny-JS-world/
   */
// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Create {
    constructor(name, gender, inhabitant,  age) {
        this.name = name;
        this.gender = gender;
        this.inhabitant = inhabitant;
        this.age = age;
    }
    whatReturn() {
        return print(`<div>Hi! My name is - <strong>${this.name}</strong>. I\'m <strong>${this.age}</strong> years old. I am a <strong>${this.inhabitant}</strong>. I have <strong>${this.legs}</strong> legs and <strong>${this.hands}</strong> hands. I love to say: <strong>${this.say}</strong></div>`);
    }
}
class Animal extends Create {
    constructor (name, gender, inhabitant, age, say) {
        super (name, gender, inhabitant, age);
        this.legs = 4;
        this.hands = 0;
        this.say = say;
    }
}
class Human extends Create {
    constructor(name, gender, inhabitant, age, say) {
        super (name, gender, inhabitant, age);
        this.legs = 2;
        this.hands = 2;
        this.say = say;
    }
}
let cat = new Animal('Simon', 'male', 'Cat', 3, 'Purrrrr...');
let dog = new Animal('Scooby', 'male', 'Dog', 5, 'ScoobyDoobyDoo!');
let man = new Human('Jim', 'male', 'man', 57, 'It\'s show time!');
let woman = new Human('Margaret', 'female', 'woman', 94, 'Defeat? I do not understand the meaning of this word.');

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
[cat, dog, man, woman].forEach(value => {
    value.whatReturn();
})
