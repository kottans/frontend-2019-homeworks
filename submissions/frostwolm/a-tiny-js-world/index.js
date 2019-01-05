/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/frostwolm/a-tiny-JS-world
   Web app: https://frostwolm.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species:'dog',
  name: 'Flow',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!',
  friends:[]
};
const cat = {
  species:'cat',
  name: 'Mars',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'meow!',
  friends:[]
};
const man = {
  species:'human',
  name: 'Adrian',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Good Morning, Vietnam!',
  friends:[]
};
const woman = {
  species:'human',
  name: 'Trinh',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Hin chao!',
  friends:[]
};
const catWoman = {
  species:'human',
  name: 'Kate',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends:[]
};

dog.friends.push(cat, man);
cat.friends.push(dog, catWoman);
man.friends.push(dog, woman);
woman.friends.push(man);
catWoman.friends.push(cat);
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
function getStrFromObj(obj) {
  let arr = [];
  Object.values(obj).forEach((item) => {
    if (Array.isArray(item)) {
      let names = [];
      item.forEach((frnd) => {
        names.push(frnd.name);
      });
      arr.push(names.join(', '));
    }else{
      arr.push(item);
    }
  });
  return arr.join('; ');
}

[dog, cat, man, woman, catWoman].forEach((hab) => {
  print(getStrFromObj(hab));
})
