/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Creature {
    constructor (name, gender, species, legs, hands) {
        this.name = name;
        this.gender = gender;
        this.species = species;
        this.legs = legs;
        this.hands = hands;
        this.saying = null;
    }

    say(text) {
        this.saying = text;
    }

    toString() {
        return [
            `Species: ${this.species}`,
            `name: ${this.name}`,
            `gender: ${this.gender}`,
            `legs: ${this.legs}`,
            `hands: ${this.hands}`,
            `saying: ${this.saying}`,
        ].join('; ');
    }
}

class Cat extends Creature {
    constructor (name, gender, species = "Cat", legs = 4, hands = 0) {
        super (name, gender, species, legs, hands);
    }
}

class Human extends Creature {
    constructor (name, gender, species = "Human", legs = 2, hands = 2) {
        super (name, gender, species, legs, hands);
    }
}

const cat = new Cat('Mark', 'male');

const cat1 = new Cat('Molly', 'female');
cat1.say('Meow');

const human = new Human('Vlad', 'male');
human.say('Hi!');

const human1 = new Human('Olya', 'female');
human1.say('Hello!');

[cat, cat1, human, human1].forEach((obj) => {
    print(obj.toString());
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


