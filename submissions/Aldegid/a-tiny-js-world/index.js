/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
function makeCreatureMessage(obj) {
  return  `Hello i am a <strong>${obj.species}</strong>. My name is <strong>${obj.name}</strong> and i am a ${obj.gender}. I have <strong>${obj.legs}</strong> legs and <strong>${obj.hands}</strong> hands and i saying: <em>${obj.saying}</em><hr>`;
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

  print(makeCreatureMessage(dog));
  print(makeCreatureMessage(cat));
  print(makeCreatureMessage(man));
  print(makeCreatureMessage(woman));
  print(makeCreatureMessage(catWoman));
