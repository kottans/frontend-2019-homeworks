/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

const dog = {
    species: 'dog',
    name: 'Tody',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!',
    friends: ['Sharik', 'Anfisa']
};

const cat = {
    species: 'cat',
    name: 'Kira',
    gender: 'female',
    legs: 4,
    hands: 0,
    saying: 'meow-meow!',
    friends: ['Murka', 'Vaska']
};

const woman = {
    species: 'human',
    name: 'Elena',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'I am a woman!',
    friends: ['Anna', 'Jon']
};

const man = {
    species: 'human',
    name: 'Alex',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'I am a man!',
    friends: ['Tim', 'Petr']
};

const catWoman = {
    species: 'human',
    name: 'Eleonora',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: ['Super-man', 'Spider-man']
};

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

function printInfo(obj) {
    print('--- Object ---');
    for (let index in obj) {
        print(index + ': ' + obj[index]);
    }
}

printInfo(dog);
printInfo(cat);
printInfo(man);
printInfo(woman);
printInfo(catWoman);