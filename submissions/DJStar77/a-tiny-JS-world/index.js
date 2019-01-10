/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
  species: 'human',
  name: 'Nick',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Glory Ukraine!'
};

const woman = {
  species: 'human',
  name: 'Alyona',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Where is money, Nick?!'
};

const dog = {
  species: 'dog',
  name: 'Torry',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'rrr-gaf-gaf!!'
};

const cat = {
  species: 'cat',
  name: 'Mouse',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'mrrr... iu-iu!'
};

const womanCat = {
    species: 'womanCat',
    name: 'Busya',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying    
};
const inhabitans = [man, woman, dog, cat, womanCat];
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

inhabitans.forEach(function(item, i, arr) {  
    print(`Species: ${item.species}; Name: <strong>${item.name}</strong>; Gender: ${item.gender}; Have ${item.legs} legs and ${item.hands} hands. If not sleeping, says: <em>${item.saying}</em>`);
});
