/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
    species: 'dog',
    legs: 4,
    hands: 0,
    name: 'Woof',
    gender: 'male',
    phrase: 'Poof'
}
const cat = {
    species: 'cat',
    legs: 4,
    hands: 0,
    name: 'Cat',
    gender: 'male',
    phrase: 'Meow'
}

const woman = {
    species: 'human',
    legs: 2,
    hands: 2,
    name: 'Jenny',
    gender: 'male',
    phrase: 'Jack'
}

const man = {
    species: 'human',
    legs: 2,
    hands: 2,
    name: 'Jack',
    gender: 'female',
    phrase: 'Jenny'
}

function stringify (obj) {
    return [obj.species, obj.legs, obj.hands, obj.name, obj.gender, obj.phrase].join(';');
}

let beings = [dog,cat,woman,man];

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


beings.forEach(item => print(stringify(item)));

