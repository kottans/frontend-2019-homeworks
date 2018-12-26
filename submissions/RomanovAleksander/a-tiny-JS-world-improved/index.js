/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
    constructor(name, gender, species, legs, hands, saying) {
        this.name = name;
        this.gender = gender;
        this.species = species;
        this.legs = legs;
        this.hands = hands;
        this.saying = saying;
    }

    toString() {
        return [this.species, this.name, this.gender, this.legs, this.hands,  this.saying].join(' ; ')}
}

class Human extends Inhabitant {
    constructor(name, gender, saying, species ='human', legs = 2, hands = 2) {
        super(name, gender, species, legs, hands, saying,);
    }
}

class Dog extends Inhabitant {
    constructor(name, gender, species = 'dog', legs = 4, hands = 0, saying = 'Woof-woof') {
        super(name, gender, species, legs, hands, saying);
    }
}

class Cat extends Inhabitant {
    constructor(name, gender, species = 'cat', legs = 4, hands = 0, saying = 'Meow') {
        super(name, gender, species, legs, hands, saying);
    }
}

const inhabitants = [
    new Dog('Lucky', 'male'),
    new Cat('Tihon', 'male'),
    new Human('Jenny', 'female', 'Hi, animals'),
    new Human('Arnold', 'male', 'I\'ll be back')
];

inhabitants.forEach(person => {
    print(person)
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
