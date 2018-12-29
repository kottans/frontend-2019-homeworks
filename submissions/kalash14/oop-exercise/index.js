/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kalash14/oop-exercise/blob/populate-world/index.js
   Web app: https://kalash14.github.io/oop-exercise/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {

    constructor(name, gender, kind, greetingsWords, legs) {
        this.name = name;
        this.gender = gender;
        this.kind = kind;
        this.greetingsWords = greetingsWords;
        this.legs = legs;
    }
}

class Human extends Inhabitant{

    constructor(name, gender, greetingsWords, legs = 2) {
        super(name, gender, 'Human', greetingsWords, legs);
        this.hands = 2;
        this.greetingsWords = `Hi!`
    }

}

class Animal extends Inhabitant{

    constructor(name, gender, kind, greetingsWords, legs = 4) {
        super(name, gender, kind, greetingsWords, legs);
    }

}

class Dog extends Animal {

    constructor(name, gender, greetingsWords, legs = 4) {
        super(name, gender, 'Dog', greetingsWords, legs);
        this.greetingsWords = 'Bow-wow!';
    }

}

class Cat extends Animal {

    constructor(name, gender, greetingsWords, legs = 4) {
        super(name, gender, 'Cat', greetingsWords, legs);
        this.greetingsWords = 'Meow!';
    }

}

const creatures = [

    new Human('Victor', 'male'),
    new Human('Helen', 'female'),
    new Cat('Pushok', 'male'),
    new Dog('Mukhtar', 'male')

];

creatures.forEach(creature => print(creature.kind + "; " + creature.gender + "; " + creature.name + "; " + creature.legs + "; " + (creature.hands ? creature.hands + "; " : "") + creature.greetingsWords));