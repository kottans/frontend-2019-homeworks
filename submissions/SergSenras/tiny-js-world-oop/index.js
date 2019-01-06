/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _put repo URL here_
  Web app: _put project's github pages URL here_
*/

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Dweller {
  constructor (species,name,gender,legs,saying,friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = friends;
  }

  getInfo(props) {
    return props
      .map( x => '<b>' + x + '</b>: ' + this[x] )
      .join('; ');
  }
}

class Animal extends Dweller {
  constructor(species,name,gender,legs = 4,saying,friends) {
    super(species,name,gender,legs,saying,friends);
  }
  
  getInfo() {
    return super.getInfo(['species','name','gender','legs','saying','friends']);
  }
}

class Human extends Dweller {
  constructor(name,gender,saying,friends,legs = 2,hands = 2) {
    super('human',name,gender,legs,saying,friends);
    this.hands = hands;
  }

  getInfo() {
    return super.getInfo(['species','name','gender','hands','legs','saying','friends']);
  }
}


var man = new Human ('John','male','Hi',['Toby', 'Selina Kyle']);
var woman = new Human ('Mary','female','Hello',['Mrs. Whiskerson', 'John']);
var dog = new Animal ('dog','Toby','male',4,'woof-woof!',['John']);
var cat = new Animal ('cat','Mrs. Whiskerson','female',4,'meow',['Mary', 'Selina Kyle']);
var Catwoman = new Human ('Catwoman','Selina Kyle','female',cat.saying,['John', 'Mrs. Whiskerson']);

var family = [man, woman, dog, cat, Catwoman];
family.forEach(member => {
  print(member.getInfo());
})  

