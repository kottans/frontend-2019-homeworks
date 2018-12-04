/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

function Inhabited () {
    this.sayAbout = function () {
        return 'My name is ' + this.name + '. And now, as any ' + this.species +  ', I say "' + this.phrase + '!"';
    }
}

function Animal (species, legs) {
    this.species = species;
    this.legs = legs;
}

Animal.prototype = new Inhabited();

function Human (name, gender, phrase, friends) {
    this.name = name;
    this.gender = gender;
    this.phrase = phrase;
    this.friends = friends;
    this.sayAbout = function () {
        return 'My name is ' + this.name + '.' + ' I am a ' + this.gender + ' gender and I have ' + this.friends.length + ' friends.' + ' And now, I say "' + this.phrase + '!"';
    }
}

Human.prototype = new Animal('human', 2);

function Cat(name, gender) {
    this.name = name;
    this.gender = gender;
    this.phrase = 'Meo, meo, meo';
}

Cat.prototype = new Animal('cat', 4);


function Dog(name, gender) {
    this.name = name;
    this.gender = gender;
    this.phrase = 'Rrrrrrrr...';
}

Dog.prototype = new Animal('dog', 4);

var Robot1 = new Human('Robot1', 'male', 'I am a man', ['cat - Star', 'woman']);
var Robot2 = new Human('Robot2', 'female', 'I am a female', ['man', 'dog Bark']);
var Robot3 = new Human('Bot', 'computer', 'Hello from computer', ['assembler']);
var Bark = new Dog('Bark', 'male');
var Star = new Cat('Star', 'female');

var catWoman = new Cat('CatWoman', 'female');
catWoman.friends = ['cats', 'kottans'];
catWoman.legs = 2;


print('<div>' + Robot1.sayAbout() + '</div><hr>');
print('<div>' + Robot2.sayAbout() + '</div><hr>');
print('<div>' + Robot3.sayAbout() + '</div><hr>');
print('<div>' + Bark.sayAbout() + '</div><hr>');
print('<div>' + Star.sayAbout() + '</div><hr>');
print('<div>' + catWoman.sayAbout() + '</div><hr>');

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