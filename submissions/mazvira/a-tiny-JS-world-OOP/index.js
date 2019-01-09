/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
var Inhabitant = function (species, name, gender, legs, hands, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
}

Inhabitant.prototype.printInhabitants =  function() {
    return [this.species, this.name, this.gender, this.legs, this.hands, this.saying, this.friends].join(" - ");
}

var Human = function(name, gender, saying, friends){
    var inhabitant = new Inhabitant('human', name, gender, 2, 2, saying, friends);
    return inhabitant;
}

var Dog = function(name, gender, saying, friends){
    var inhabitant = new Inhabitant('dog', name, gender, 4, 0, saying, friends);
    return inhabitant;
}

var Cat = function(name, gender, saying, friends){
    var inhabitant = new Inhabitant('cat', name, gender, 4, 0, saying, friends);
    return inhabitant;
}

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