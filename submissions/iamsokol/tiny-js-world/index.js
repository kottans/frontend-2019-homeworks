/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== objectECTS DEFINITIONS ========
// Define your objectects here
const man = {
    species: 'human',
    name:'Dima',
    legs:2,
    hands:2,
    gender:'male',
    saying:`I live in Kyiv`,
};

const woman ={
    species:'human',
    name:'Viktoria',
    legs:2,
    hands:2,
    gender: 'female',
    saying:'I live in Dnipro',
};

const cat = {
    species: 'cat',
    name: 'Mark',
    legs: 4,
    hands: 0,
    gender: 'male',
    saying: 'may-may',
};

const dog = {
    species: 'dog',
    name: 'Lola',
    legs: 4,
    hands : 0,
    gender:'female',
    saying: 'gav-gav',
};

const catwoman ={
    species:'catwoman',
    name:'Catwoman',
    legs:2,
    hands:2,
    gender:'female',
    saying: cat.saying,
}

function toString(object){
    return [object.species, object.name, object.gender, object.legs, object.hands, object.saying + ';'].join ('; ');
}

[man, woman, cat, dog, catwoman].forEach(inhabitant =>
    print(toString(inhabitant))
);
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
