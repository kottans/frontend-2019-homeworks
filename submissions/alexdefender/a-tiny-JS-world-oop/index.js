/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========


var Entity = function (species, name, gender, legs, hands, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
}

Entity.prototype.printInfo = function () {
    print([this.species, this.name, this.gender, this.legs, this.hands, this.saying, this.friends].join("; "));
}

const dog = new Entity('dog', 'Tody', 'male', 4, 0, 'woof-woof!', ['Sharik', 'Anfisa']);
const cat = new Entity('cat', 'Kira', 'female', 4, 0, 'meow-meow!', ['Murka', 'Vaska']);
const woman = new Entity('human', 'Elena', 'female', 2, 2, 'I am a woman!', ['Anna', 'Jon']);
const man = new Entity('human', 'Alex', 'male', 2, 2, 'I am a man!', ['Tim', 'Petr']);
const catWoman = new Entity('human', 'Eleonora', 'female', 2, 2, cat.saying, ['Super-man', 'Spider-man']);

var entityes = [dog, cat, woman, man, catWoman];

entityes.forEach(element => {
    element.printInfo();
});
