/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/rrrds/a-tiny-JS-world
   Web app: https://rrrds.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
function Creature(props) {
  this.species = props.species;
  this.legs = props.legs;
  this.hands = props.hands;
  this.name = props.name;
  this.gender = props.gender;
  this.say = props.say;
}
Creature.prototype.toString = function() {
  const values = [];

  for (const prop in this) {
    if (this.hasOwnProperty(prop)) {
      values.push(this[prop]);
    }
  }

  return values.join('; ');
};

function Animal(props) {
  props = Object.assign({ legs: 4, hands: 0 }, props);
  Creature.call(this, props);
}
Animal.prototype = Object.create(Creature.prototype);
Animal.prototype.constructor = Animal;

function Human(props) {
  props = Object.assign({ species: 'human', legs: 2, hands: 2 }, props);
  Animal.call(this, props);
}
Human.prototype = Object.create(Animal.prototype);
Human.prototype.constructor = Human;

const dog = new Animal({ species: 'dog', name: 'Lola', gender: 'female', say: 'Woof!' });
const cat = new Animal({ species: 'cat', name: 'Toger', gender: 'male', say: 'Meow!' });
const woman = new Human({ name: 'Ann', gender: 'female', say: "Hello! I'm Ann!" });
const man = new Human({ name: 'John', gender: 'male', say: "Hello! I'm John!" });
const catWoman = new Human({
  species: 'catWoman',
  name: 'Selina Kyle',
  gender: 'female',
  say: cat.say || 'Hello Kitty!'
});

// ======== OUTPUT ========
print(dog);
print(cat);
print(man);
print(woman);
print(catWoman);
