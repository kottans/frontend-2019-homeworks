/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/dnzln/a-tiny-JS-world/tree/gh-pages
   Web app: https://dnzln.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

var catsTalks = 'Mur-myau';

const man = {
    species: 'human',
    legs: '2',
    hands: '2',
    name: 'Adam',
    gender: 'male',
    says: 'This apple wasn\'t even tasty!'
}

const woman = {
    species: 'human',
    legs: '2',
    hands: '2',
    name: 'Eve',
    gender: 'female',
    says: 'Where is your brother?'
}

const dog = {
    species: 'dog',
    legs: '4',
    hands: '0',
    name: 'Snoop',
    gender: 'male',
    says: 'Woof-woouu'
}

const cat = {
    species: 'cat',
    legs: '4',
    hands: '0',
    name: 'Smelly',
    gender: 'male',
    says: catsTalks
}

const catWoman = {
    species: 'wonderWoman',
    legs: '2',
    hands: '2',
    name: 'Alishia',
    gender: 'female',
    says: catsTalks
}

// ======== OUTPUT ========
print(man.species + ';' + man.legs + ';' + man.hands + ';' + man.name + ';' + man.gender + ';' + man.says);
print(woman.species + ';' + woman.legs + ';' + woman.hands + ';' + woman.name + ';' + woman.gender + ';' + woman.says);
print(dog.species + ';' + dog.legs + ';' + dog.hands + ';' + dog.name + ';' + dog.gender + ';' + dog.says);
print(cat.species + ';' + cat.legs + ';' + cat.hands + ';' + cat.name + ';' + cat.gender + ';' + cat.says);
print(catWoman.species + ';' + catWoman.legs + ';' + catWoman.hands + ';' + catWoman.name + ';' + catWoman.gender + ';' + catWoman.says);