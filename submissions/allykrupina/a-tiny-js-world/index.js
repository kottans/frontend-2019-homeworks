/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/allykrupina/allykrupina.github.io/a-tiny-JS-world
   Web app: https://allykrupina.github.io/a-tiny-js-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const woman ={
    species:'human',
    name:'Nika',
    legs:2,
    hands:2,
    gender: 'female',
    saying:'I love my cat',
};
const man = {
    species: 'human',
    name:'Kurt',
    legs:2,
    hands:2,
    gender:'male',
    saying:'I love my dog',
};
const dog = {
    species: 'dog',
    name: 'Grey',
    legs: 4,
    hands : 0,
    gender:'male',
    saying: 'wooooof',
};
const cat = {
    species: 'cat',
    name: 'Assol',
    legs: 4,
    hands: 0,
    gender: 'female',
    saying: 'murrr',
};

const catwoman ={
    species:'catwoman',
    name:'Catwoman',
    legs:2,
    hands:2,
    gender:'female',
    saying: cat.saying,
}
function convertObject(obj, value){
    return obj[value]
}
function printObject(obj){
    print('<em> ' +
    convertObject(obj, 'species') + '</em> - <strong>' +
    convertObject(obj, 'name') + '</strong>; ' +
    convertObject(obj, 'gender') + '; ' +
    convertObject(obj, 'legs') + '; ' +
    convertObject(obj, 'hands') + '; ' +
    convertObject(obj, 'saying') + '; ');
}
// ======== OUTPUT ========

[dog, cat, woman, man, catwoman].forEach(inhabitant =>
    printObject(inhabitant)
);
