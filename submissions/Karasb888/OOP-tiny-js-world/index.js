/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Karasb888/a-tiny-JS-world
   Web app: https://karasb888.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

var Inhabit = function(livingArea, aggressiveTo, peacefulTo, neutralTo, hands, legs, saying ) {
  this.livingArea = livingArea;
  this.aggressiveTo = aggressiveTo;
  this.peacefulTo = peacefulTo;
  this.neutralTo = neutralTo;
  this.hands = hands;
  this.legs = legs;
  if(this.saying !== null){
    this.saying = saying;
  }
};

Inhabit.prototype.output = function() {
  let message = '';
  for(key in this){
    if(key !== 'output'){
      message += `<b>${key}</b> : <i>${this[key]}</i> `;
    }
  }
  return message;
};

var Human = function(name, age, saying){
  Inhabit.call(this, 'earth', 'humans, mutans, cyborgs', 'cats and dogs', 'robots', 2, 2);
  this.name = name;
  this.age = age;
  this.saying = saying;
}
Human.prototype = Object.create(Inhabit.prototype);

var Cat = function(name, age){
  Inhabit.call(this, 'earth', 'dogs, mutans, robots', 'cats', 'humans', 0, 4, 'meow-meow');
  this.name = name;
  this.age = age;
}
Cat.prototype = Object.create(Inhabit.prototype);

var Dog = function(name, age){
  Inhabit.call(this, 'earth', 'mutans, cats', 'humans, robots', 'dogs', 0, 4, 'uf-uf');
  this.name = name;
  this.age = age;
}
Dog.prototype = Object.create(Inhabit.prototype);

var Robot = function(name, age){
  Inhabit.call(this, 'Earth and space', 'none', 'none', 'all', 2, 2, 'pew-pew-pew');
  this.name = name;
  this.age = age;
}
Robot.prototype = Object.create(Inhabit.prototype);

var Mutant = function(firstInhabit, secondInhabit){
  Inhabit.call(this, 'earth and water', 'all', 'none', 'mutants');
  this.name = firstInhabit.age + secondInhabit.age;
  this.age = Math.max(firstInhabit.age,secondInhabit.age);
  this.hands = firstInhabit.hands + secondInhabit.hands;
  this.legs = firstInhabit.legs + secondInhabit.legs;
  this.saying = `${firstInhabit.saying}  ${secondInhabit.saying} 'I am ALIVE!'`;
}
Mutant.prototype = Object.create(Inhabit.prototype);

var human = new Human('Ivan', 22, 'Hello world');
var dog = new Dog('Joe', 6);
var cat = new Cat('Kitty', 5);
var robot = new Robot('Io-22', 150);
var mutant = new Mutant(human, dog);

print(human.output(), 'div');
print(dog.output(), 'div');
print(robot.output(), 'div');
print(cat.output(), 'div');
print(mutant.output(), 'div');
