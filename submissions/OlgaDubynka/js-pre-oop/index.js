/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const inhabitants = [
    {
        name: 'Richard',
        age: 5,
        species: 'dog',
        gender: 'male',
        legs: 0,
        hands: 0,
        paws: 4,
        tail: 1,
        greeting: 'wow!'
    },
    {
        name: 'Rocky',
        age: 4,
        species: 'cat',
        gender: 'female',
        legs: 0,
        hands: 0,
        paws: 4,
        tail: 1,
        greeting: 'meow!'
    },
    {
        name: 'Helga',
        age: 25,
        species: 'human',
        gender: 'female',
        legs: 2,
        hands: 2,
        paws: 0,
        tail: 0,
        greeting: 'Hello!'
    },
    {
        name: 'Rob',
        age: 28,
        species: 'human',
        gender: 'male',
        legs: 2,
        hands: 2,
        paws: 0,
        tail: 0,
        greeting: 'Hi!'
    }
];

// ======== OUTPUT ========

const getInhabitants = (inhabitants) => {
    return inhabitants.forEach(el => {
        print(`<table>
                    <tr>
                        <td style="width: 100px;">${el.name}</td>
                        <td style="width: 100px;">${el.age}</td>
                        <td style="width: 100px;">${el.species}</td>
                        <td style="width: 100px;">${el.gender}</td>
                        <td style="width: 100px;">${el.legs}</td>
                        <td style="width: 100px;">${el.hands}</td>
                        <td style="width: 100px;">${el.paws}</td>
                        <td style="width: 100px;">${el.tail}</td>
                        <td style="width: 100px;">${el.greeting}</td>
                    </tr>    
                </table>`);
    });
}

getInhabitants(inhabitants);

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


