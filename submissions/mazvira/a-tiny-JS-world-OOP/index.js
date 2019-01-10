/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
var Inhabitant = function (species, name, gender, legs, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = friends;
}

Inhabitant.prototype.printInhabitants =  function() {
    return [this.species, this.name, this.gender, this.legs, this.saying, this.friends].join(" - ");
}

var Human = function(name, gender, saying, friends){
    Inhabitant.apply(this, arguments);
    this.species = 'human';
    this.legs = 2;
    this.hands = 2;
}

Human.prototype = Object.create(Inhabitant.prototype);
Human.prototype.constructor = Human;
Human.prototype.printInhabitants = function () {
    return Inhabitant.prototype.printInhabitants.apply(this) + this.hands;
}

var FourLeggedAnimal = function(species, name, gender, saying, friends){
    Inhabitant.apply(this, arguments);
    this.legs = 4;
}

FourLeggedAnimal.prototype = Object.create(Inhabitant.prototype);
FourLeggedAnimal.prototype.constructor = FourLeggedAnimal;

var Dog = function(name, gender, saying, friends){
    FourLeggedAnimal.apply(this, arguments);
    this.species = 'dog';
}

Dog.prototype = Object.create(FourLeggedAnimal.prototype);
Dog.prototype.constructor = Dog;

var Cat = function(name, gender, saying, friends){
    FourLeggedAnimal.apply(this, arguments);
    this.species = 'cat';
}

Cat.prototype = Object.create(FourLeggedAnimal.prototype);
Cat.prototype.constructor = Cat;

var name = 'Toby';
var gender = 'male';
var saying = 'woof-woof!';
var friends = ["Tom", "Olena", "Sergejs"];

var dog = new Dog(name, gender, saying, friends);

name = 'Tom';
gender = 'male';
saying = 'meow!';
friends = ["Toby", "Olena", "Sergejs"];

var cat = new Cat(name, gender, saying, friends);

name = 'Olena';
gender = 'female';
saying = 'Hello world!';
friends = ["Toby", "Tom", "Sergejs"];

var woman = new Human(name, gender, saying, friends);

name = 'Sergejs';
gender = 'male';
saying = 'Hello world!';
friends = ["Toby", "Tom", "Olena"];

var man = new Human(name, gender, saying, friends);

// ======== OUTPUT ========

var inhabitants = [dog, cat, woman, man];
inhabitants.forEach(item =>(print(item.printInhabitants())));
