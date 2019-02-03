/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
    species: 'dog',
    name: 'Hugo',
    gender:'male',
    legs: 4,
    hands : 0,
    saying: 'woof-woof',
    friend : ['Velik','Timur']
};
const cat = {
    species: 'cat',
    name: 'Velik',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'mrr',
    friend: ['Hugo','Lera']
};
const woman ={
    species:'human',
    name:'Lera',
    gender: 'female',
    legs:2,
    hands:2,
    saying:'I love cats',
    friend : ['Velik']
};
const man = {
    species: 'human',
    name:'Timur',
    gender:'male',
    legs:2,
    hands:2,
    saying:'I love my mom',
    friend:['Velik','Lera','Hugo']
};
const catwoman ={
    species:'cat-woman',
    name:'Meow',
    gender:'female',
    legs:2,
    hands:2,
    saying: cat.saying,
    friend:['Lera']
}
function printObject(obj){
    print(obj.species + ';' + obj.name + ';' + obj.gender + ';' + 
    obj.legs + ';' + obj.hands + ';' + obj.saying + ';' + obj.friend);
}
// ======== OUTPUT ========
printObject(dog);
printObject(cat);
printObject(woman);
printObject(man);
printObject(catwoman);
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


