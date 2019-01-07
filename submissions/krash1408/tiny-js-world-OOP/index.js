/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/krash1408/a-tiny-JS-world.git
   Web app: https://krash1408.github.io/a-tiny-JS-world/
   */
// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Create {
    constructor(name, gender, inhabitant,  age, legs) {
        this.name = name;
        this.gender = gender;
        this.inhabitant = inhabitant;
        this.age = age;
        this.legs = legs;
        this.say = '';
    }
    whatSayAnimal() {
        if(this.hands == undefined) {
            this.say = 'I can\'t! I have paws!';
        }
    }
    whatSayHuman() {
        if (this.inhabitant == 'man') {
            this.say = 'It`s show time!';
        } else if (this.inhabitant == 'woman') {
            this.say = 'Defeat? I do not understand the meaning of this word.';
        }
    }
}
class Animal extends Create {
    constructor (name, gender, inhabitant, age, legs = 4) {
        super (name, gender, inhabitant, age, legs);
    }
}
class Human extends Create {
    constructor(name, gender, inhabitant, age, legs = 2, hands = 2) {
        super (name, gender, inhabitant, age, legs);
        this.hands = hands;
    }
}
let cat = new Animal('Simon', 'male', 'Cat', 3);
cat.whatSayAnimal();
let dog = new Animal('Scooby', 'male', 'Dog', 5);
dog.whatSayAnimal();
let man = new Human('Jim', 'male', 'man', 57);
man.whatSayHuman();
let woman = new Human('Margaret', 'female', 'woman', 94);
woman.whatSayHuman();

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
    [cat, dog].forEach(val => {
        print(`Hi! My name is - ${val.name}. I\'m ${val.age} years old. But I\'m steel young to be a agile ${val.inhabitant}. I have ${val.legs} legs for this. Work? ${val.say}`);
    });
    [man, woman].forEach(val => {
        print(`Hi! My name is - ${val.name}. I\'m ${val.age} years old. I am a real ${val.inhabitant}. I have ${val.legs} legs and ${val.hands} hands. I love to say: ${val.say}`);
    });