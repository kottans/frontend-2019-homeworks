/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
    constructor(name, age, species, gender, legs, hands, paws, tail, greeting) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.paws = paws;
        this.tail = tail;
        this.greeting = greeting;
    }
}

const dog = new Inhabitant('Richard', 5, 'animal', 'male', 0, 0, 4, 1, 'wow!');
const cat = new Inhabitant('Rocky', 4, 'animal', 'female', 0, 0, 4, 1, 'meow!');
const woman = new Inhabitant('Helga', 25, 'human', 'female', 2, 2, 0, 0, 'Hello!');
const man = new Inhabitant('Rob', 28, 'human', 'male', 2, 2, 0, 0, 'Hi!' ); 
 
// ======== OUTPUT ========

const getStringFromObj = (obj) => {
    return [`<strong>${obj.name}</strong>`, `age: ${obj.age}`, `species: ${obj.species}`, `gender: ${obj.gender}`, `legs: ${obj.legs}`, `hands: ${obj.hands}`, `paws: ${obj.paws}`, `tail: ${obj.tail}`, `greeting: ${obj.greeting}`].join('; ');
}

[dog, cat, woman, man].forEach(obj => print(getStringFromObj(obj)));

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


