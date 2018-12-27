/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/rrrds/a-tiny-JS-world
   Web app: https://rrrds.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
function Creature(props) {
  this.props = props;
}
Creature.prototype.toString = function() {
  return Object.values(this.props).join('; ');
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
  say: cat.props.say || 'Hello Kitty!'
});

// ======== OUTPUT ========
print(dog);
print(cat);
print(man);
print(woman);
print(catWoman);
