/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
    species: 'dog',
    name: 'Toby',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!',
    friends : ["Tom", "Olena", "Sergejs"]
};

const cat = {
    species: 'cat',
    name: 'Tom',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'meow!',
    friends : ["Toby", "Olena", "Sergejs"],
};

const woman = {
    species: 'human',
    name: 'Olena',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hello world!',
    friends : ["Toby", "Tom", "Sergejs"]
};

const man = {
    species: 'human',
    name: 'Sergejs',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hello world!',
    friends : ["Toby", "Tom", "Olena"]
};

function printInhabitants(obj){
    return [obj.species, obj.name, obj.gender, obj.legs, obj.hands, obj.saying, obj.friends].join(" - ");
   // return Object.values(obj).join(" - ");
}

// ======== OUTPUT ========
var inhabitants = [dog, cat, woman, man];
inhabitants.forEach(item =>(print(printInhabitants(item))));



