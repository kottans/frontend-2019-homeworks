/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
        this.friends = [];
    }
    addFriends(...args){
        this.friends = [...args];
    }
    printCreature() {
        return ['name', 'gender']
            .map(key => `${key}: <strong>${this[key]}</strong>`)
            .join('; ');
    }
}

class Animal extends Creature {
    constructor(name, gender, species, say) {
        super(name, gender);
        this.species = species;
        this.legs = 4;
        this.say = say;
    }
    printCreature() {
        return super.printCreature() +' '+ ['species', 'legs', 'say']
            .map(key => `${key}: <em>${this[key]}</em>`)
            .concat(this.friends.map(friend => `<strong>${friend['name']}</strong>`))
            .join('; ');
    }
}
class HumanBeing extends Creature {
    constructor(name, gender, say) {
        super(name, gender);
        this.species = 'Human';
        this.legs = 2;
        this.hands = 2;
        this.say = say;
    }
    printCreature() {
        return super.printCreature() +' '+ ['species', 'legs', 'hands', 'say']
            .map(key => `${key}: <em>${this[key]}</em>`)
            .concat(this.friends.map(friend => `<strong>${friend['name']}</strong>`))
            .join('; ');
    }
}

class Dog extends Animal {
    constructor(name, gender, species = 'dog', say = 'Woof-woof!') {
        super(name, gender, species, say);
    }
}

class Cat extends Animal {
    constructor(name, gender, species = 'cat', say = 'Meow.') {
        super(name, gender, species, say);
    }
}

class Man extends HumanBeing {
    constructor(name, gender='male', say = 'Boys will be boys.') {
        super(name, gender, say);
    }
}

class Woman extends HumanBeing {
    constructor(name, gender='female', say = 'Love saves the world.') {
        super(name, gender, say);
    }
}
class CatWoman extends Woman {
    constructor(name, gender='female', say = 'Love saves the world.') {
        super(name, gender, say);
    }
}
const woman    = new Woman('Sarah');
const man      = new Man('John');
const cat      = new Cat('Maya', 'female');
const dog      = new Dog('Toby', 'male');
const catWoman = new CatWoman('Sophie', undefined, cat.say);

woman.addFriends(man, cat);
man.addFriends(woman, dog);
dog.addFriends(woman, man);

[woman, man, cat, dog, catWoman]
    .forEach((item) => print(item.printCreature()));

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


