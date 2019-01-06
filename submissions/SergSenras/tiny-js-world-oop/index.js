/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _put repo URL here_
  Web app: _put project's github pages URL here_
*/

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Dweller {
  constructor (species,name,gender,saying,friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
  }

  getInfo() {
    var str = '';
    for (var key in this) {
      str += key + ': ' + this[key] + '; ';
    }
    return str;
  }
}

class Animal extends Dweller {
  constructor(species,name,gender,legs,saying,friends) {
    super(species,name,gender,saying,friends);
    this.legs = legs;
  }
}

class Human extends Dweller {
  constructor(species,name,gender,legs, hands,saying,friends) {
    super(species,name,gender,saying,friends);
    this.legs = legs;
    this.hands = hands;
  }
}


var man = new Human ('human','John','male',2,2,'Hi',['Toby', 'Selina Kyle']);
var woman = new Human ('human','Mary','female',2,2,'Hello',['Mrs. Whiskerson', 'John']);
var dog = new Animal ('dog','Toby','male',4,'woof-woof!',['John']);
var cat = new Animal ('cat','Mrs. Whiskerson','female',4,'meow',['Mary', 'Selina Kyle']);
var Catwoman = new Human ('Catwoman','Selina Kyle','female',2,2,cat.saying,['John', 'Mrs. Whiskerson']);

var family = [man, woman, dog, cat, Catwoman];
family.forEach(member => {
  print(member.getInfo());
})  

