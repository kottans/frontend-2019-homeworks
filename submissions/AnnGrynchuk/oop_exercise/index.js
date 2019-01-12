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
class Person extends Inhebitant {
    constructor(species, name, gender, saying, legs=2, hands=2 ) {
        super(species, name, gender, saying, legs, hands);
        this.hands = hands;
    }

    joinInhebitantsInString(){
        return super.joinInhebitantsInString() + "-" + this.hands;
        
      }
}

class Dog extends Inhebitant {
    constructor(species, name, gender, saying, legs=4) {
        super(species, name, gender, saying, legs);
    }

}

class Cat extends Inhebitant {
    constructor(species, name, gender, saying, legs=4) {
        super(species, name, gender, saying, legs);
    }

}

const dog = new Dog('dog', 'Toby', 'male', 'woof-woof!');
const cat = new Cat('cat', 'Persik', 'male', 'meawww-meaww!');
const woman = new Person('woman', 'Poly', 'female', 'I am hungry!');
const man = new Person('man', 'Alex', 'male', 'Lets go to bar!');
let inhebitants = [dog,cat,woman,man];

inhebitants.forEach(item =>print(item.joinInhebitantsInString()));