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
    Inhabitant.apply(this,['human', name, gender, 2, saying, friends]);
    this.hands = 2;
}

Human.prototype = Object.create(Inhabitant.prototype);
Human.prototype.constructor = Human;
Human.prototype.printInhabitants = function () {
    return [Inhabitant.prototype.printInhabitants.apply(this), this.hands].join(' - ');
}

var FourLeggedAnimal = function(species, name, gender, saying, friends){
    Inhabitant.apply(this, [species, name, gender, 4, saying, friends]);
}

FourLeggedAnimal.prototype = Object.create(Inhabitant.prototype);
FourLeggedAnimal.prototype.constructor = FourLeggedAnimal;

var Dog = function(name, gender, saying, friends){
    FourLeggedAnimal.apply(this, ['dog', name, gender, saying, friends]);
}

Dog.prototype = Object.create(FourLeggedAnimal.prototype);
Dog.prototype.constructor = Dog;

var Cat = function(name, gender, saying, friends){
    FourLeggedAnimal.apply(this, ['cat', name, gender, saying, friends]);
}

Cat.prototype = Object.create(FourLeggedAnimal.prototype);
Cat.prototype.constructor = Cat;

var dog = new Dog('Toby', 'male', 'woof-woof!', ['Tom', 'Olena', 'Sergejs']);

var cat = new Cat('Tom', 'male', 'meow!', ['Toby', 'Olena', 'Sergejs']);

var woman = new Human('Olena', 'female', 'Hello world!', ['Toby', 'Tom', 'Sergejs']);

var man = new Human('Sergejs', 'male', 'Hello world!', ['Toby', 'Tom', 'Olena']);

// ======== OUTPUT ========

var inhabitants = [dog, cat, woman, man];
inhabitants.forEach(item =>(print(item.printInhabitants())));
