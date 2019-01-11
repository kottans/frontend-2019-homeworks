/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository:https://github.com/AnnaGrynchuk/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
class Inhebitant {
    constructor(species, name, gender, legs, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.saying = saying;
    }

    joinInhebitantsInString(){
         return  `${this.species}-${this.name}-${this.gender}-${this.legs}-${this.saying}`;
      }
}
class Human extends Inhebitant {
    constructor(species, name, gender, legs, hands, saying) {
        super(species, name, gender, legs, saying);
        this.hands = hands;
    }

    joinInhebitantsInString(){
        return  `${this.species}-${this.name}-${this.gender}-${this.legs}-${this.hands}-${this.saying}`;
      }
}

let inhebitants = [];
const dog = new Inhebitant('dog', 'Toby', 'male', 4, 'woof-woof!');
const cat = new Inhebitant('cat', 'Persik', 'male', 4, 'meawww-meaww!');
const woman = new Human('human', 'Poly', 'female', 2, 2, 'I am hungry!');
const man = new Human('human', 'Alex', 'male', 2, 2, 'Lets go to bar!');

inhebitants.push(dog,cat,woman,man);

inhebitants.forEach(item =>print(item.joinInhebitantsInString()));
 