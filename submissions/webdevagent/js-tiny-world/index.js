/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here


  const Dog={
    species: 'dog',
    name:'Princess',
    gender:'female',
    paws:4,
    voice:'woof',
    friends:'Garry, Patrick, Wendy'

  };
  const Cat={
    species: 'cat',
    name:'Garry',
    gender:'male',
    paws:4,
    voice:'meow',
    friends:'Princess, Patrick, Wendy, Kitty'
  };
  const Man={
    species: 'human',
    name:'Patrick',
    gender:'male',
    legs:2,
    hands:2,
    voice:'How do you do?',
    friends:'Garry, Princess, Wendy, Kitty'
  };
  const Woman={
    species: 'human',
    name:'Wendy',
    gender:'female',
    legs:2,
    hands:2,
    voice:'Hello my friends',
    friends:'Garry, Patrick, Princess'
  };
  const catWoman={
    species: 'human',
    name:'Kitty',
    gender:'female',
    paws:2,
    hands:2,
    voice:'meow',
    friends:'Garry, Patrick'
  };
const residents=[Dog,Cat,Man,Woman];

const showResidentInfo=()=>{
  residents.forEach(num=>{
    let residentData=Object.values(num);
    print(residentData.join('; '));
  });
}
showResidentInfo();


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
