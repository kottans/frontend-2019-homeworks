/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/rrrds/a-tiny-JS-world
   Web app: https://rrrds.github.io/a-tiny-JS-world/
   */

function toString(obj) {
    const values = [];

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            values.push(obj[prop]);
        }
    }

    return values.join('; ');
}

// ======== OBJECTS DEFINITIONS ========
const dog = {
    species: 'dog',
    legs: 4,
    hands: 0,
    name: 'Lola',
    gender: 'female',
    say: 'Woof!'
}

const cat = {
    species: 'cat',
    legs: 4,
    hands: 0,
    name: 'Toger',
    gender: 'male',
    say: 'Meow!'
}

const woman = {
    species: 'human',
    legs: 2,
    hands: 2,
    name: 'Ann',
    gender: 'female',
    say: 'Hello! I\'m Ann!'
}

const man = {
    species: 'human',
    legs: 2,
    hands: 2,
    name: 'John',
    gender: 'male',
    say: 'Hello! I\'m John!'
}

const catWoman = Object.assign({}, cat, {species: 'cat woman', legs:2, hands:2, name: 'Selina Kyle', gender: 'female'});


// ======== OUTPUT ========
print(toString(dog));
print(toString(cat));
print(toString(man));
print(toString(woman));
print(toString(catWoman));