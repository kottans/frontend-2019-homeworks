/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/dnzln/oop-world/blob/master/index.js
   Web app: https://dnzln.github.io/oop-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Mammal {
    constructor(name, gender, say, species) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.say = say;
        this.legs = 2;
    }   
}

class Human extends Mammal {
    constructor(name, gender, say) {
        super(name, gender, say);
        this.hands = 2;
        this.species = 'human';
    }
}

class Animal extends Mammal {
    constructor(species, name, gender, say) {
        super(name, gender, say, species);
        this.legs += 2;
    }
}

var man = new Human('Adam', 'male', 'What\'s up?');
var woman = new Human('Eve', 'female', 'Thug life!');
var dog = new Animal('dog', 'Snoop', 'male', 'Woof!');
var cat = new Animal('cat', 'Smelly', 'female', 'Moor!');

var population = [man, woman, dog, cat];

population.forEach(
    function(elem) {
        let arrStr = [];
        for (var key in elem) {
            arrStr.push('<strong>'+key+'</strong>'+ ': ');
            arrStr.push(elem[key] + '\t\t');
        }
        print(arrStr.join(''));
    }
);

