/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Entity {
  constructor(name, gender, species, saying, legs, hands, friends) {
    this.name = name;
    this.gender = gender;
    this.species = species;
    this.saying = saying;
    this.legs = legs;
    this.hands = hands;
    this.friends = friends;
  }
  //spread syntax for further expanding
  setFriends(objects) {
    this.friends = [...objects];
  }
  getMessage() {
    var friends = Array.isArray(this.friends)? this.friends.map(a => a.name):"no friends";
    var props = [this.name, this.gender, this.species, this.legs, this.hands,this.saying, friends];
    return props.join('; ');
  }
}
class Human extends Entity {
  constructor(name,gender) {
    super(name,gender);
    this.legs = 2;
    this.hands = 2;
    this.species = 'human';
  }
}
class Animal extends Entity {
  constructor(name,gender) {
    super(name,gender);
    this.legs = 4;
    this.hands = 0;
  }
}

class Dog extends Animal {
  constructor(name,gender) {
    super(name,gender);
    this.species = 'dog';
    this.saying = 'woof';
  }
}

class Cat extends Animal {
  constructor(name,gender) {
    super(name,gender);
    this.species = 'cat';
    this.saying = 'meow';
  }
}

class Man extends Human {
  constructor(name,gender) {
    super(name,gender);
    this.saying = 'I am a cool man.';
  }
}
class Woman extends Human {
  constructor(name,gender) {
    super(name,gender);
    this.saying = 'Hi, beauty!';
  }
}
class CatWoman extends Woman {
  constructor(name,gender) {
    super(name,gender);
    this.species = "cat-woman"
    this.saying = new Cat().saying;
  }
}

var dog = new Dog('Didko','male');
var cat = new Cat('John','male');
var man = new Woman('Polina', 'female');
var woman = new Man('Seba','male');
var catWoman = new CatWoman('Murmuletka', 'female');
dog.setFriends([cat, man]);
man.setFriends([woman, dog]);
cat.setFriends([dog]);

var characters = [
  dog,
  cat,
  man,
  woman,
  catWoman
]

// ======== OUTPUT ========
characters.forEach(obj => {
  print(obj.getMessage());
})
