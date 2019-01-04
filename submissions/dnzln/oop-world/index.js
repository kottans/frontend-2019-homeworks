/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/dnzln/oop-world/blob/master/index.js
   Web app: https://dnzln.github.io/oop-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Mammal {
    constructor(species, name, gender, say, legs) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.say = say;
        this.legs = legs;
    }

    formString() {
        return [
            '<strong>Species: </strong>',
            this.species + '\t\t',
            '<strong>Name: </strong>',
            this.name + '\t\t',
            '<strong>Gender: </strong>',
            this.gender + '\t\t',
            '<strong>Say: </strong>',
            this.say + '\t\t',
            '<strong>Legs: </strong>',
            this.legs + '\t\t'
        ].join('');
    }
}

class Animal extends Mammal {
    constructor(species, name, gender, say, legs) {
        super(species, name, gender, say, legs);
        this.tails = 1;
    }

    formString() {
        return super.formString() + [
            '<strong>Tails: </strong>',
            this.tails + '\t\t',
        ].join('');
    }
}

class Human extends Mammal {
    constructor(species, name, gender, say, legs) {
        super(species, name, gender, say, legs);
        this.hands = 2;
    }

    formString() {
        return super.formString() + [
            '<strong>Hands: </strong>',
            this.hands + '\t\t',
        ].join('');
    }
}

var man = new Human('human', 'Adam', 'male', 'What\'s up?', 2);
var woman = new Human('human', 'Eve', 'female', 'Thug life!', 2);
var dog = new Animal('dog', 'Snoop', 'male', 'Woof!', 4);
var cat = new Animal('cat', 'Smelly', 'female', 'Moor!', 4);

var population = [man, woman, dog, cat];

population.forEach(
    function(elem) {
        print(elem.formString());
    }
);

