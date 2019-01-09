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

const subman = {
  species: 'human',
  name: 'Andy',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'CS GO - my favorite game!'
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

const womancat = {
    species: 'human',
    name: 'Busya',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying    
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
print(man.species + '; ' + man.name + '; ' + man.gender + '; ' + man.legs + '; ' + man.hands + '; ' + man.saying);
print(woman.species + '; ' + woman.name + '; ' + woman.gender + '; ' + woman.legs + '; ' + woman.hands + '; ' + woman.saying);
print(womancat.species + '; ' + womancat.name + '; ' + womancat.gender + '; ' + womancat.legs + '; ' + womancat.hands + '; ' + womancat.saying);
print(subman.species + '; ' + subman.name + '; ' + subman.gender + '; ' + subman.legs + '; ' + subman.hands + '; ' + subman.saying);
print(dog.species + '; ' + dog.name + '; ' + dog.gender + '; ' + dog.legs + '; ' + dog.hands + '; ' + dog.saying);
print(cat.species + '; ' + cat.name + '; ' + cat.gender + '; ' + cat.legs + '; ' + cat.hands + '; ' + cat.saying);