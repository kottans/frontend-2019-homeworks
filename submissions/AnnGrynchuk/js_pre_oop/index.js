/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository:https://github.com/AnnaGrynchuk/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
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
    name: 'Persik',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'meawww-meaww!'
}

const woman = {
    species: 'human',
    name: 'Poly',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'I am hungry!'
}

const man = {
    species: 'human',
    name: 'Alex',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Lets go to bar!'
}

print("In a tiny JS world lives " + dog.species + ". Its name is <strong>" +  dog.name  + "</strong>. Its gender is " + dog.gender + ". It has strong " + 
  dog.legs + " legs and " + dog.hands + " hands. When it wants to play it says " + dog.saying );

print("Wow! We see fluffy " + cat.species + " in our JS world. Its name is <strong>" +  cat.name  + "</strong>. Its gender is " + cat.gender + ". It has long " + 
  cat.legs + " legs and " + cat.hands + " hands. At 4a.m it always says " + cat.saying );

print("Suddenly beautiful " + woman.species + " appears. Her name is <strong>" +   woman.name  + "</strong>. Her gender is " +  woman.gender + ". She has long " + 
woman.legs + " legs and thin " +  woman.hands + " hands. She said to her friend " +  woman.saying );

print("Her friend <strong> " + man.name  + " </strong> wasn't surprised, he knows her well. He has strong  " +  man.hands + " hands and  " +  man.legs + " legs so he easily picked up her and said " +  man.saying );

woman.saying ="I'm hungry too!";
let newMan = Object.assign({},woman);

print(newMan.saying);



