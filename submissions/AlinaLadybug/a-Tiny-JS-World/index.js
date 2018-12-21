/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: "dog",
  name: "Didko",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "\"woof\"",
  friends: ["John", "Seba"]
};
const cat = {
  species: "cat",
  name: "John",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "\"meow\"",
  friends: ["Didko"]
};
const woman = {
  species: "human",
  name: "Polina",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "\"Hi, beauty!\"",
  friends: ["Murmuletka", "Seba"]
};
const man = {
  species: "human",
  name: "Seba",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "\"What's up, man?\"",
  friends: ["Polina", "Didko"]
};
const catWoman = {
  species: "cat-woman",
  name: "Murmuletka",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends: ["Polina"]
};

// ======== OUTPUT ========
function output(obj) {
  var message = '';
  Object.keys(obj).forEach((key, idx) => {
    message += obj[key];
    if (idx !== Object.keys(obj).length - 1)
    {
      message += '; ';
    }
  });
  var defaultTag = 'div';
  print(message, defaultTag);
}

output(dog);
output(cat);
output(woman);
output(man);
output(catWoman);
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


