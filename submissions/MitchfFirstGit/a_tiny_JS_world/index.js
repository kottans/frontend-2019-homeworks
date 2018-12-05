/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/MitchfFirstGit/a-tiny-JS-world
   Web app: https://mitchffirstgit.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: 'dog',
  name: 'Toby',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof-woof'
};
const cat = {
  species: 'cat',
  name: 'Milka',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow-meow'
};
const woman = {
  species: 'human',
  name: 'Emma',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Hello everyone!'
};
const man = {
  species: 'human',
  name: 'Alex',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Hello everyone!'
};
const catWoman = {
  species: 'catWoman',
  name: 'Mia',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: cat.saying
};
function say(species, name, gender, legs, hands, saying){
   print(`species: ${species}; name: ${name}; gender: ${gender}; legs: ${legs}; hands: ${hands}; saying: ${saying}`, 'div');
}
say(dog.species, dog.name, dog.gender, dog.legs, dog.hands, dog.saying);
say(cat.species, cat.name, cat.gender, cat.legs, cat.hands, cat.saying);
say(woman.species, woman.name, woman.gender, woman.legs, woman.hands, woman.saying);
say(man.species, man.name, man.gender, man.legs, man.hands, man.saying);
say(catWoman.species, catWoman.name, catWoman.gender, catWoman.legs, catWoman.hands, catWoman.saying);
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
