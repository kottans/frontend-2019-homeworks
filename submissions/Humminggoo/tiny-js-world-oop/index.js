/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
function Being(name, gender, species){
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.phrase = this.say();
}
Being.prototype = {
    say: function () {
        return 'Hello!';
    },
    toString: function () {
        return Object.keys(this).map(i => `${i}: ${this[i]}`).join('; ')
    }
};
function Animal(name, gender, species, legs = 4){
    Being.call(this, name, gender, species);
    this.legs = legs;
}
function Human(name, gender, species='human', hands=2, legs=2){
    Being.call(this, name, gender, species);
    this.hands = hands;
    this.legs = legs;
}
function Dog(name, gender, species='dog', legs){
    Animal.call(this, name, gender, species, legs)
}
Dog.prototype = Object.create(Being.prototype);
Dog.prototype.say = function(){
    return 'Woof!';
};

function Cat(name, gender, species='cat', legs){
    Animal.call(this, name, gender, species, legs)
}
Cat.prototype = Object.create(Being.prototype);
Cat.prototype.say = function(){
    return 'Nyah!';
};

function Woman(name, gender, species, hands, legs){
    Human.call(this, name, gender, species, hands, legs)
}
Woman.prototype = Object.create(Being.prototype);
Woman.prototype.say = function(){
    return 'Of justice you will find none...';
};

function Man(name, gender, species, hands, legs){
    Human.call(this, name, gender, species, hands, legs)
}
Man.prototype = Object.create(Being.prototype);
Man.prototype.say = function(){
    return 'If you wish for peace, then prepare for war';
};

function CatWoman(name, gender, species, hands, legs){
    Human.call(this, name, gender, species, hands, legs)
}
CatWoman.prototype = Object.create(Cat.prototype);

const dog = new Dog('Hachiko', 'male');
const cat = new Cat('Akiko', 'female');
const woman = new Woman('Tomoe', 'female');
const man = new Man('Oda', 'male');
const catwoman = new CatWoman('Koneko', 'female');



// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

[dog, cat, woman, man, catwoman].forEach(i => print(i.toString()));
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */


