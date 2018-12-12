// ======== CLASSES ==========
function Creature(name, gender, saying, legs) {
  this.name = name ? name : "Creature";
  this.gender = gender ? gender : "No gender";
  this.saying = saying ? saying : "Que-qa";
  this.legs = legs ? legs : 4;
}
Creature.prototype.formPrintString = function() {
  this.printStr =
    '<span style="font-weight: bold; font-size: 23px">' +
    this.name +
    "</span>" +
    '<span style="color: gray"> ' +
    this.species +
    "</span><br>" +
    "  Gender: " +
    this.gender +
    "<br>" +
    "  Says: " +
    this.saying +
    "<br>" +
    "  Legs: " +
    this.legs;
};
Creature.prototype.printInfo = function() {
  this.formPrintString();
  print(this.printStr);
};

//-----------------------------------------------------------------------------------
function Cat(name, gender, saying, legs) {
  Creature.apply(this, arguments);
  this.species = "cat";
}
Cat.prototype = Object.create(Creature.prototype);
Cat.prototype.constructor = Cat;

//-----------------------------------------------------------------------------------
function Dog(name, gender, saying, legs) {
  Creature.apply(this, arguments);
  this.species = "dog";
}
Dog.prototype = Object.create(Creature.prototype);
Dog.prototype.constructor = Dog;

//------------------------------------------------------------------------------------
function Human(name, gender, saying, legs, hands, friends) {
  Creature.apply(this, arguments);
  this.species = "human";
  this.hands = hands ? hands : 2;
  this.friends = friends ? friends : [];
}
Human.prototype = Object.create(Creature.prototype);
Human.prototype.constructor = Human;
Human.prototype.printInfo = function() {
  Creature.prototype.formPrintString.apply(this);
  this.printStr +=
    "<br>" +
    "  Hands: " +
    this.hands +
    "<br>" +
    "  Friends: " +
    this.friends
      .map(function(element) {
        return element.name;
      })
      .join(", ");
  print(this.printStr);
};
//-------------------------------------------------------------------------------------
function CatWoman(name, gender, saying, legs, hands, friends) {
  Human.apply(this, arguments);
  this.species = "cat-woman";
  this.saying = cat.saying;
}
CatWoman.prototype = Object.create(Human.prototype);
CatWoman.prototype.constructor = CatWoman;

// ======== OBJECTS CREATION ============
let dog = new Dog("Toby", "male", "Woff-woff!", 4);
let cat = new Cat("Tihon", "male", "Meow-ow", 4);
let woman = new Human("Alya", "female", "Hello, there :)", 2, 2, [dog, cat]);
let man = new Human("George", "male", "Hey-ho!", 2, 2, [woman, dog, cat]);
let catWoman = new CatWoman("Julia", "female", "", 2, 2, [woman, man, dog]);

let allInhabitants = [];
allInhabitants.push(dog, cat, woman, man, catWoman);
// ======= OUTPUT =========
dog.printInfo();
cat.printInfo();
woman.printInfo();
man.printInfo();
catWoman.printInfo();
