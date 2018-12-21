/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
function creature(obj) {
  var msg = [];
  for (let key of Object.keys(obj)) {
    msg.push(obj[key]);
  }  
  return  `Hello i am a <strong>${msg[0]}</strong>. My name is <strong>${msg[1]}</strong> and i am a ${msg[2]}. I have <strong>${msg[3]}</strong> legs and <strong>${msg[4]}</strong> hands and i saying: <em>${msg[5]}</em><hr>`;  
}

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
  name: 'Murka',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow-meow!'
};

const man = {
  species: 'human',
  name: 'Vasiliy',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'I am hungry!'
};

const woman = {
  species: 'human',
  name: 'Marusiya',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'listen to me!'
};

const catWoman = {
  species: cat.species + "-" + woman.species,
  name: "Selina Kyle",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: woman.saying + " and sometimes " + cat.saying 
};
// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
  print(creature(dog));
  print(creature(cat));
  print(creature(man));
  print(creature(woman));
  print(creature(catWoman));