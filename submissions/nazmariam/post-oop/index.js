/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/nazmariam/nazmariam.github.io/tree/master/a-tiny-js-world
   Web app: https://nazmariam.github.io/a-tiny-js-world/
*/
// ======== OBJECTS DEFINITIONS ========
class Citizen {
    constructor(species, name, gender, say, legs, hands){
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.say = say;
        this.legs = legs;
        this.hands = hands;
    }
}
class Animal extends Citizen{
    constructor(species, name, gender, say){
        super(species, name, gender, say, 4, 0)
    }
}
class Human extends Citizen{
    constructor(name, gender, say){
        super('human',name,gender,say,2,2)
    }
}
class Dog extends Animal{
    constructor(name, gender){
        super('dog',name,gender,'bark-bark')
    }
}
class Cat extends Animal{
    constructor(name, gender){
        super('cat',name,gender,'meow')
    }
}
const citizens = [
    new Dog('Doggo','male'),
    new Cat('Kitty','female'),
    new Human('Meg White','female','I\'m gonna fight them off'),
    new Human('Jack White','male','A seven nation army couldn\'t hold me back')
];
// ======== OUTPUT ========
citizens.forEach(el => {
    print(`<div>
        Hi! I'm a ${el.species}. My name is ${el.name}. My gender is: ${el.gender}
        I have: ${el.legs} legs and ${el.hands} hands.
        I speak like this: ${el.say}
        </div>`);
});


