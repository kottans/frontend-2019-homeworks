const defaultCatSaying = "Meow-ow";

// ======== CLASSES ==========
function Creature(
  species = "creature",
  name = "Creature",
  gender = "No gender",
  saying = "Que-qa",
  legs = 4
) {
  this.species = species ? species : "creature";
  this.name = name ? name : "Creature";
  this.gender = gender ? gender : "No gender";
  this.saying = saying ? saying : "Que-qa";
  this.legs = legs ? legs : 4;
}
Creature.prototype.formPrintString = function() {
  return (
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
    this.legs
  );
};

//-----------------------------------------------------------------------------------
function Cat(name, gender, saying, legs) {
  Creature.apply(this, ["cat", ...arguments]);
}
Cat.prototype = Object.create(Creature.prototype);
Cat.prototype.constructor = Cat;

//-----------------------------------------------------------------------------------
function Dog(name, gender, saying, legs) {
  Creature.apply(this, ["dog", ...arguments]);
}
Dog.prototype = Object.create(Creature.prototype);
Dog.prototype.constructor = Dog;

//------------------------------------------------------------------------------------
function Human(name, gender, saying, legs, hands = 2, friends = []) {
  Creature.apply(this, ["human", ...arguments]);
  this.hands = hands ? hands : 2;
  this.friends = friends ? friends : [];
}
Human.prototype = Object.create(Creature.prototype);
Human.prototype.constructor = Human;
Human.prototype.formPrintString = function() {
  return (
    Creature.prototype.formPrintString.apply(this) +
    "<br>" +
    "  Hands: " +
    this.hands +
    "<br>" +
    "  Friends: " +
    this.friends
      .map(function(element) {
        return element.name;
      })
      .join(", ")
  );
};
//-------------------------------------------------------------------------------------
function CatWoman(name, gender, saying, legs, hands, friends) {
  Human.apply(this, arguments);
  this.species = "cat-woman";
  this.saying = defaultCatSaying;
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
allInhabitants.forEach(function(el) {
  print(el.formPrintString());
});
