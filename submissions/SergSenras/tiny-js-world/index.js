/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _put repo URL here_
  Web app: _put project's github pages URL here_
*/

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
    species: 'human',
    name: 'John',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hi',
    friends: ['Toby', 'Selina Kyle']
  };
  const woman = {
    species: 'human',
    name: 'Mary',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hello',
    friends: ['Mrs. Whiskerson', 'John']
  };
  const dog = {
    species: 'dog',
    name: 'Toby',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!',
    friends: ['John']
  };
  const cat = {
    species: 'cat',
    name: 'Mrs. Whiskerson',
    gender: 'female',
    legs: 4,
    hands: 0,
    saying: 'meow',
    friends: ['Mary', 'Selina Kyle']
  };
  const Catwoman = {
    species: 'Catwoman',
    name: 'Selina Kyle',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: ['John', 'Mrs. Whiskerson']
  };
  
  // ======== OUTPUT ========
  /* Use print(message) for output.
    Default tag for message is <pre>. Use print(message,'div') to change containing element tag.
  
    Message can contain HTML markup. You may also tweak index.html and/or styles.css.
    However, please, REFRAIN from improving visuals at least until your code is reviewed
    so code reviewers might focus on a single file that is index.js.
  */
  
  var family = [man, woman, dog, cat, Catwoman];
  var props = ['species','name','gender','legs','hands','saying','friends'];
  
  family.forEach(member => {
    const data = props.map(prop => {
      return (prop + ': ' + member[prop]);
    })
    print(data.join('; '));
  })

  
  /* Print examples:
     print('ABC');
     print('<strong>ABC</strong>');
     print('<strong>ABC</strong>', 'div');
  
     print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
     print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
     print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
     */
  
  
  