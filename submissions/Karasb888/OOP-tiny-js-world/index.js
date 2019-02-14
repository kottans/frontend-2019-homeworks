/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Karasb888/a-tiny-JS-world
   Web app: https://karasb888.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

var Inhabit = function(species, livingArea, aggressiveTo, peacefulTo, neutralTo, legs, saying) {
  this.livingArea = livingArea;
  this.aggressiveTo = aggressiveTo;
  this.peacefulTo = peacefulTo;
  this.neutralTo = neutralTo;
  this.legs = legs;
  this.species = species;
  if (this.saying !== null) {
    this.saying = saying;
  }
};

Inhabit.prototype.output = function() {
  let message = '';
  let self = this;
  let keysSorted = Object.keys(self).sort(function(a, b) {
    return self[a] - self[b]
  })
  keysSorted.forEach(function(item) {
    return message += `<b>${item}</b> : ${self[item]} <br />`;
  });
  return message;
};

var InhabitWithHands = function(hands) {
  this.hands = hands;
};


var Human = function(name, age, saying, hands) {
  Inhabit.call(this, 'human', 'earth', 'humans, mutans, cyborgs', 'cats and dogs', 'robots', 2);
  InhabitWithHands.call(this, 2);
  this.name = name;
  this.age = age;
  this.saying = saying;
}
Human.prototype = Object.create(Inhabit.prototype);

var Cat = function(name, age) {
  Inhabit.call(this, 'cat', 'earth', 'dogs, mutans, robots', 'cats', 'humans', 0, 4, 'meow-meow');
  this.name = name;
  this.age = age;
}
Cat.prototype = Object.create(Inhabit.prototype);

var Dog = function(name, age) {
  Inhabit.call(this, 'dog', 'earth', 'mutans, cats', 'humans, robots', 'dogs', 4, 'uf-uf');
  this.name = name;
  this.age = age;
}
Dog.prototype = Object.create(Inhabit.prototype);

var Robot = function(name, age) {
  Inhabit.call(this, 'robot', 'Earth and space', 'none', 'none', 'all', 2, 'pew-pew-pew');
  InhabitWithHands.call(this, 2);
  this.name = name;
  this.age = age;
}
Robot.prototype = Object.create(Inhabit.prototype);

var Mutant = function(firstInhabit, secondInhabit) {
  Inhabit.call(this, 'mutant', 'earth and water', 'all', 'none', 'mutants');
  let hands = firstInhabit.hands || 0 + secondInhabit || 0;
  InhabitWithHands.call(this, hands);
  this.name = firstInhabit.age + secondInhabit.age;
  this.age = Math.max(firstInhabit.age, secondInhabit.age);
  this.legs = firstInhabit.legs + secondInhabit.legs;
  this.saying = `${firstInhabit.saying}  ${secondInhabit.saying} 'I am ALIVE!'`;
}
Mutant.prototype = Object.create(Inhabit.prototype);

var human = new Human('Ivan', 22, 'Hello world');
var dog = new Dog('Joe', 6);
var cat = new Cat('Kitty', 5);
var robot = new Robot('Io-22', 150);
var mutant = new Mutant(human, dog);

[human, dog, robot, cat, mutant].forEach(function(item) {
  print(item.output(), 'div');
});
