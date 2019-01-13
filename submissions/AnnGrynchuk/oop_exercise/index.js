/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository:https://github.com/AnnaGrynchuk/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
class Inhebitant {
    constructor(species, name, gender, saying, legs) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.legs = legs;
    }

    joinInhebitantsInString(){
         return [this.species,this.name,this.gender,this.saying,this.legs,].join("-");
      }
}
class Human extends Inhebitant {
    constructor(name, gender, saying, hands=2 ) {
        super('human', name, gender, saying, 2);
        this.hands = hands;
    }

    joinInhebitantsInString(){
        return super.joinInhebitantsInString() + "-" + this.hands;
        
      }
}
class Dog extends Inhebitant {
    constructor( name, gender, saying) {
        super('dog', name, gender, saying, 4);
    }
}
class Cat extends Inhebitant {
    constructor(name, gender, saying) {
        super('cat', name, gender, saying, 4);
    }
}

const dog = new Dog('Toby', 'male', 'woof-woof!');
const cat = new Cat('Persik', 'male', 'meawww-meaww!');
const woman = new Human('Poly', 'female', 'I am hungry!');
const man = new Human('Alex', 'male', 'Lets go to bar!');
let inhebitants = [dog,cat,woman,man];

inhebitants.forEach(item =>print(item.joinInhebitantsInString()));