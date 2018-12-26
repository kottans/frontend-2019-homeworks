/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _put repo URL here_
  Web app: _put project's github pages URL here_
*/

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
    species: 'man',
    name: 'John',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hi'
  };
  const woman = {
    species: 'woman',
    name: 'Mary',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hello'
  };
  const dog = {
    species: 'dog',
    name: 'Toby',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!'
  };
  const cat = {
    species: 'cat',
    name: 'Toby',
    gender: 'female',
    legs: 4,
    hands: 0,
    saying: 'meow'
  };
  const Catwoman = {
    species: 'Catwoman',
    name: 'Selina Kyle',
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
  
  var family = [man, woman, dog, cat, Catwoman];
  family.forEach(function(member){
    var arr = [];
    for(var key in member){
      arr.push(member[key]);
    }
    print(arr);
  })
  
  /* Print examples:
     print('ABC');
     print('<strong>ABC</strong>');
     print('<strong>ABC</strong>', 'div');
  
     print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
     print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
     print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
     */
  
  
  