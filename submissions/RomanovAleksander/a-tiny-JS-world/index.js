/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
    constructor(species, name, gender, legs, hands, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.saying = saying;
    }
}

const dog = new Inhabitant('dog','Lucky', 'male', '4', '0', 'Woof-woof');
const cat = new Inhabitant('cat','Tihon', 'male', '4', '0', 'Meow');
const woman = new Inhabitant('human','Jenny', 'female', '2', '2', 'Hi, animals');
const man = new Inhabitant('human','Arnold', 'male', '2', '2', 'I\'ll be back');

let inhabitants = [dog, cat, woman, man];

inhabitants.forEach(person => {
    print([person.species, person.name, person.gender, person.legs, person.hands, person.saying].join(' ; '));
});

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
