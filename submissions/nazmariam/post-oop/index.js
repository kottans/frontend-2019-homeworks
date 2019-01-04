/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/nazmariam/nazmariam.github.io/tree/master/a-tiny-js-world
   Web app: https://nazmariam.github.io/a-tiny-js-world/
*/
// ======== OBJECTS DEFINITIONS ========
class Citizen {
    constructor(species, name, gender, say, legs){
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.say = say;
        this.legs = legs;
    }
    sayAbout() {
        let str = 'My name is ' + this.name + '. I am a ' + this.species + '. I speak like this: "' + this.say + '". I have '+this.legs+' legs.';
        return str;
    }
}
class Animal extends Citizen{
    constructor(species, name, gender, say){
        super(species, name, gender, say, 4)
    }
}
class Human extends Citizen{
    constructor(name, gender, say, legs, hands){
        super('human',name,gender,say,2);
        this.hands=2;
    }
    sayAbout() {
        let str = ` Also I have ${this.hands} hands. `;

        return super.sayAbout() + str;
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
    print(`<div> ${el.sayAbout()} </div>`)
});


