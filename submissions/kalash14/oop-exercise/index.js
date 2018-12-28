/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kalash14/oop-exercise/blob/populate-world/index.js
   Web app: https://kalash14.github.io/oop-exercise/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {

    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
}

class Human extends Inhabitant{

    constructor(name, gender) {
        super(name, gender);
        this.legs = 2;
        this.hands = 2;
        this.kind = 'Human';
        this.greetingsWords = `Hi!`
    }

}

class Animal extends Inhabitant{

    constructor(name, gender) {
        super(name, gender);
        this.legs = 4;
    }

}

class Dog extends Animal {

    constructor(name, gender) {
        super(name, gender);
        this.kind = 'Dog';
        this.greetingsWords = 'Bow-wow!';
    }

}

class Cat extends Animal {

    constructor(name, gender) {
        super(name, gender);
        this.kind = 'Cat';
        this.greetingsWords = 'Meow!';
    }

}


const creatures = [

    new Human('Victor', 'male'),
    new Human('Helen', 'female'),
    new Cat('Pushok', 'male'),
    new Dog('Mukhtar', 'male')

];

creatures.forEach(creature => print(`${creature.greetingsWords} I'm ${creature.name} and also I'm a ${creature.kind}. Also I have ${creature.legs} legs ${(creature.hands ? `and ${creature.hands} hands` : '')}`));