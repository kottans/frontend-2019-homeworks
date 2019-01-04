/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/dnzln/oop-world/blob/master/index.js
   Web app: https://dnzln.github.io/oop-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Mammal {
    constructor(species, name, gender, say) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.say = say;
    }

    setProperties() {
        return [
            '<strong>Species: </strong>',
            this.species + '\t\t',
            '<strong>Name: </strong>',
            this.name + '\t\t',
            '<strong>Gender: </strong>',
            this.gender + '\t\t',
            '<strong>Say: </strong>',
            this.say + '\t\t'
        ];
    }
}

class Animal extends Mammal {
    constructor(species, name, gender, say) {
        super(species, name, gender, say);
        this.legs = 4;
    }

    printOut() {
        let properties = super.setProperties();
        properties.push(
            '<strong>Legs: </strong>',
            this.legs + '\t\t',
        );
        print(properties.join(''));
    }
}

class Human extends Mammal {
    constructor(species, name, gender, say) {
        super(species, name, gender, say);
        this.legs = 2;
        this.hands = 2;
    }

    printOut() {
        let properties = super.setProperties();
        properties.push(
            '<strong>Legs: </strong>',
            this.legs + '\t\t',
            '<strong>Hands: </strong>',
            this.hands + '\t\t'
        );
        print(properties.join(''));
    }
}

var man = new Human('human', 'Adam', 'male', 'What\'s up?').printOut();
var woman = new Human('human', 'Eve', 'female', 'Thug life!').printOut();
var dog = new Animal('dog', 'Snoop', 'male', 'Woof!').printOut();
var cat = new Animal('cat', 'Smelly', 'female', 'Moor!').printOut();

