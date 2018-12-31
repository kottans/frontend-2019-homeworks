/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
    constructor( name, gender, species, say, legs=4 ) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.say = say;
        this.friends = [];
    }
    addFriends(...args){
        this.friends = [...args];
    }
    toString() {
        return [ 'name', 'gender', 'species', 'say', 'legs' ]
            .map(key => `${key}: <strong>${this[key]}</strong>`)
            .concat(this.friends.map(friend => `<strong>${friend['name']}</strong>`))
            .join('; ');
    }
}

class HumanBeing extends Creature {
    constructor(name, gender, say, legs = 2, hands = 2) {
        super(name, gender, 'Human', say, legs);
        this.hands = hands;
    }
    toString() {
        return super.toString()+' '
            +['hands']
            .map(key => `${key}: <strong>${this[key]}</strong>`)
            .join('; ');
    }
}

class Dog extends Creature {
    constructor(name, gender, say = 'Woof-woof!', legs ) {
        super(name, gender, 'Dog', say, legs);
    }
}

class Cat extends Creature {
    constructor(name, gender, say = 'Meow.', legs) {
        super(name, gender, 'Cat', say, legs);
    }
}

class Man extends HumanBeing {
    constructor(name, say = 'Boys will be boys.', legs, hands) {
        super(name, 'male', say, legs, hands);
    }
}

class Woman extends HumanBeing {
    constructor(name, say = 'Love saves the world.', legs, hands) {
        super(name, 'female', say, legs, hands);
    }
}
class CatWoman extends Woman {
    constructor(name, say) {
        super(name, say);
        this.say = new Cat().say;
    }
}
const woman    = new Woman('Sarah');
const man      = new Man('John');
const cat      = new Cat('Maya', 'female');
const dog      = new Dog('Toby', 'male');
const catWoman = new CatWoman('Sophie');

woman.addFriends(man, cat);
man.addFriends(woman, dog);
dog.addFriends(woman, man);

[woman, man, cat, dog, catWoman]
    .forEach((item) => print(item));

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


