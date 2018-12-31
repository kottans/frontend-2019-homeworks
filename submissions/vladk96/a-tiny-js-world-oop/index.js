/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

function Creature (name, gender) {
    this.name = name;
    this.gender = gender;
    this.saying = null;
}

Creature.prototype.say = function (text) {
    this.saying = text;
}
Creature.prototype.getElement = function (propertyName) {
    return this[propertyName];
}

function Cat () {
    Creature.apply(this, arguments);
}

Cat.prototype = Object.create(Creature.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.species = "Cat";
Cat.prototype.legs = 4;
Cat.prototype.hands = 0;

function Human () {
    Creature.apply(this, arguments);
}

Human.prototype = Object.create(Creature.prototype);
Human.prototype.constructor = Human;
Human.prototype.species = "Human";
Human.prototype.legs = 2;
Human.prototype.hands = 2;

const toPrettyString = (obj) => {
    return [
        `Species: ${obj.getElement('species')}`,
        `name: ${obj.getElement('name')}`,
        `gender: ${obj.getElement('gender')}`,
        `legs: ${obj.getElement('legs')}`,
        `hands: ${obj.getElement('hands')}`,
        `saying: ${obj.getElement('saying')}`,
    ].join('; ');
}

const cat = new Cat('Mark', 'male');

const cat1 = new Cat('Molly', 'female');
cat1.say('Meow');

const human = new Human('Vlad', 'male');
human.say('Hi!');

const human1 = new Human('Olya', 'female');
human1.say('Hello!');

[cat, cat1, human, human1].forEach((element) => {
    print(toPrettyString(element));
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


