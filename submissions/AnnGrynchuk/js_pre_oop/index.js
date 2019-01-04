/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository:https://github.com/AnnaGrynchuk/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const inhebitants = [ 
    {species: 'dog',
    name: 'Toby',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!'},

   {species: 'cat',
    name: 'Persik',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'meawww-meaww!'},

   {species: 'human',
    name: 'Poly',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'I am hungry!'},

   {species: 'human',
    name: 'Alex',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Lets go to bar!'}
];

inhebitants.forEach(item => print(item.species + " " + item.name + "; " + item.gender + "; legs:" + item.legs + "; hands:" + item.hands + "; favourite phrase:" + item.saying ));

inhebitants[2].saying ="I'm hungry too!";
const newMan = Object.assign({},inhebitants[2]);
print(newMan.saying);



