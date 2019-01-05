/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/nataliereshetnikova/a-tiny-JS-world/edit/gh-pages/index.js
   Web app: https://nataliereshetnikova.github.io/a-tiny-JS-world/
   */
// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
  species: 'human',
  name: 'Andrew',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Hi!'
};
const woman = JSON.parse(JSON.stringify(man));
woman.name = 'Natalie';
woman.gender = 'female';
woman.saying = 'Nice of you!';
const dog = {
  species: 'dog',
  name: 'Milky',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!'
};
const cat = JSON.parse(JSON.stringify(dog));
  cat.species = 'cat';
  cat.name = 'Kitt';
  cat.gender = 'male';
  cat.saying='meow!';
man.friends = [dog.name, woman.name];
woman.friends = [man.name, cat.name];
print(dog.species + ';' + dog.name + ';' + dog.gender + ';' +
  dog.legs + ';' + dog.hands + ';' + dog.saying + ';');
print(cat.species + ';' + cat.name + ';' + cat.gender + ';' +
  cat.legs + ';' + cat.hands + ';' + cat.saying + ';');
print(man.species + ';' + man.name + ';' + man.gender + ';' +
  man.legs + ';' + man.hands + ';' + man.saying + ';' + man.friends);
print(woman.species + ';' + woman.name + ';' + woman.gender + ';' +
  woman.legs + ';' + woman.hands + ';' + woman.saying + ';' + woman.friends);
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