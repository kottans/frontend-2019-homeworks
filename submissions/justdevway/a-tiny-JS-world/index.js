/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

function Inhabited (species, sayAbout) {
    this.species = species;
    this.sayAbout = function () {
        return 'My name is ' + this.name + '. And now, as any ' + this.species + ' and subspecies - ' + this.subspecies +  ', I say "' + this.phrase + '!"';
    }
}

function Human (name, gender, phrase, friends) {
    this.subspecies = 'human';
    this.name = name;
    this.gender = gender;
    this.phrase = phrase;
    this.friends = friends;
    this.legs = 2;
    this.hands = 2;
    this.sayAbout = function () {
        return 'My name is ' + this.name + '.' + ' I am a ' + this.gender + ' gender and I have ' + this.friends.length + ' friends.' + ' And now, I say "' + this.phrase + '!"';
    }
}

Human.prototype = new Inhabited('human');

function Animal (subspecies, name, gender, phrase) {
    this.subspecies = subspecies;
    this.name = name;
    this.legs = 4;
    this.phrase = phrase;
}

Animal.prototype = new Inhabited('animal');

var man = new Human('Man', 'male', 'I am a man', ['cat - Star', 'woman']);
var woman = new Human('Woman', 'female', 'I am a female', ['man', 'dog Bark']);
var Test = new Human('Bot', 'computer', 'Hello from computer', ['assembler']);
var dog = new Animal('dog', 'Bark', 'male', 'Rrrrrr..');
var cat = new Animal('cat', 'Cat', 'female', 'Meo, meo, meo...');

var catWoman = {
    subspecies: 'human',
    name: 'catWoman',
    gender: 'female',
    friends: ['cats', 'kottans'],
    legs: 2,
    hands: 2,
    sayAbout: function () {
        return 'My name is ' + this.name + '.' + ' I am a ' + this.gender + ' gender and I have ' + this.friends.length + ' friends.' + ' And now, I say "' + this.phrase + '!"';
    },
    get phrase() {
        return cat.phrase;
    }
}

print('<div>' + man.sayAbout() + '</div><hr>');
print('<div>' + woman.sayAbout() + '</div><hr>');
print('<div>' + Test.sayAbout() + '</div><hr>');
print('<div>' + dog.sayAbout() + '</div><hr>');
print('<div>' + cat.sayAbout() + '</div><hr>');
print('<div>' + man.sayAbout() + '</div><hr>');
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