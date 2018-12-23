/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitants {
    constructor(array) {
        this.array = array;
        this.render();
    }

    render() {
        this.array.forEach(person => {
            print([person.species, person.name, person.gender, person.legs, person.hands, person.saying].join(' ; '));
        });
    }
}

const inhabitants = new Inhabitants([
    {
        species: 'dog',
        name: 'Lucky',
        gender: 'male',
        legs: '4',
        hands: '0',
        saying: 'Woof-woof'
    },
    {
        species: 'cat',
        name: 'Tihon',
        gender: 'male',
        legs: '4',
        hands: '0',
        saying: 'Meow'
    },
    {
        species: 'human',
        name: 'Jenny',
        gender: 'female',
        legs: '2',
        hands: '2',
        saying: 'Hi, animals'
    },
    {
        species: 'human',
        name: 'Arnold',
        gender: 'male',
        legs: '2',
        hands: '2',
        saying: 'I\'ll be back'
    },
]);
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


