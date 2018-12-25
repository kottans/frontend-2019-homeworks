/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
    constructor(species, name, gender) {
        this.species = species;
        this.name = name;
        this.gender = gender;
    }
}

class Human extends Inhabitant {
    constructor(species, name, gender) {
        super(species, name, gender);
        this.legs = 2;
        this.hands = 2;
        this.saying = 'Hi, animals';
    }
}

class Dog extends Inhabitant {
    constructor(species, name, gender) {
        super(species, name, gender);
        this.legs = 4;
        this.hands = '0';
        this.saying = 'Woof-woof';
    }
}

class Cat extends Inhabitant {
    constructor(species, name, gender) {
        super(species, name, gender);
        this.legs = 4;
        this.hands = '0' ;
        this.saying = 'Meow';
    }
}

const inhabitants = [
    new Dog('dog', 'Lucky', 'male'),
    new Cat('cat', 'Tihon', 'male'),
    new Human('human', 'Jenny', 'female'),
    new Human('human', 'Arnold', 'male')
];

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
