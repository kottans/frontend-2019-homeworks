/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository:https://github.com/AnnaGrynchuk/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

const inhebitant = function(species, name, gender, legs, hands, saying){
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
};

inhebitant.prototype.joinInhebitantsInString = function(){
    
     return [this.species,this.name,this.gender,this.legs,this.hands, this.saying].join("-");
};

let inhebitants = [];
const dog = new inhebitant('dog', 'Toby', 'male', 4, 0, 'woof-woof!');
const cat = new inhebitant('cat', 'Persik', 'male', 4, 0, 'meawww-meaww!');
const woman = new inhebitant('human', 'Poly', 'female', 2, 2, 'I am hungry!');
const man = new inhebitant('human', 'Alex', 'male', 2, 2, 'Lets go to bar!');

inhebitants.push(dog,cat,woman,man);

inhebitants.forEach(item =>print(item.joinInhebitantsInString()));
 