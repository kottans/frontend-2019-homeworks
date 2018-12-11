// ======== CLASSES ==========
function Animal(species, name, gender, saying) {
  this.species = species;
  this.name = name;
  this.gender = gender;
  this.saying = saying;
}
Animal.prototype.printInfo = function() {
  print(
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
      this.saying
  );
  if (this.printAdditional) this.printAdditional();
};

function HumanBeing(species, name, gender, saying, legs, hands, friends) {
  Animal.apply(this, arguments);
  this.legs = legs;
  this.hands = hands;
  this.friends = friends;
}
HumanBeing.prototype = Object.create(Animal.prototype);
HumanBeing.prototype.printAdditional = function() {
  print(
    "  Legs: " +
      this.legs +
      "<br>" +
      "  Hands: " +
      this.hands +
      "<br>" +
      "  Friends: " +
      this.friends.join(", ")
  );
};
HumanBeing.prototype.constructor = HumanBeing;

function CatWoman(species, name, gender, saying, legs, hands, friends) {
  HumanBeing.apply(this, arguments);
  this.saying = cat.saying;
}
CatWoman.prototype = Object.create(HumanBeing.prototype);
CatWoman.prototype.constructor = CatWoman;

// ======== OBJECTS CREATION ============
var dog = new Animal("dog", "Toby", "male", "Woff-woff!");
var cat = new Animal("cat", "Tihon", "male", "Meow-ow");
var woman = new HumanBeing("human", "Alya", "female", "Hello, there :)", 2, 2, [
  "Julia",
  "George",
  "Denis",
  "Vlad"
]);
var catWoman = new CatWoman("cat-woman", "Julia", "female", "", 2, 2, [
  "Alya",
  "George",
  "Denis",
  "Vlad"
]);

// ======= OUTPUT =========
dog.printInfo();
cat.printInfo();
woman.printInfo();
catWoman.printInfo();
