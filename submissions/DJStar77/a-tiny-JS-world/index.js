/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
  species: 'human',
  name: '<strong>Nick</strong>',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: '<strong>Glory Ukraine!</strong>'
};

const woman = {
  species: 'human',
  name: '<strong>Alyona</strong>',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: '<strong>Where is money, Nick?!</strong>'
};

const dog = {
  species: 'dog',
  name: '<strong>Torry</strong>',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: '<strong>rrr-gaf-gaf!!</strong>'
};

const cat = {
  species: 'cat',
  name: '<strong>Mouse</strong>',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: '<strong>mrrr... iu-iu!</strong>'
};

const womanCat = {
    species: 'womanCat',
    name: '<strong>Busya</strong>',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying    
};
const inhabitans = [man, woman, dog, cat, womanCat];
const properties = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];
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

function getStringFromObject(object) {  
  let formattedString = properties.map(function(item){
      for (let key in object) {      
          if (item == key) return object[item];
          }
  }).join('; '); 
    return formattedString;
};

inhabitans.forEach(function(item) {
    print(getStringFromObject(item));
});
