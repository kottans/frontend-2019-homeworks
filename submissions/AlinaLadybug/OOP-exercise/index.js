/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Entity {
  constructor(props) {
    this.name = props.name;
    this.gender = props.gender;
    this.species = props.species;
    this.saying = props.saying;
  }
  //spread syntax for further expanding
  setFriends(objects) {
    this.friends = [...objects];
  }
  getMessage() {
    return  `${this.name}; ${this.gender}; ${this.species}; ${this.legs} legs; ${this.hands} hands; ${Array.isArray(this.friends)? this.friends.map(a => a.name):"no friends"}`;
  }
}
class Human extends Entity {
  constructor(props) {
    super(props);
    this.legs = 2;
    this.hands = 2;
    this.species = 'human';
  }
}
class Animal extends Entity {
  constructor(props) {
    super(props);
    this.legs = 4;
    this.hands = 0;
  }
}

class Dog extends Animal {
  constructor(props) {
    super(props);
    this.species = 'dog';
    this.saying = 'woof';
  }
}

class Cat extends Animal {
  constructor(props) {
    super(props);
    this.species = 'cat';
    this.saying = 'meow';
  }
}

class Man extends Human {
  constructor(props) {
    super(props);
    this.saying = 'I am a cool man.';
  }
}
class Woman extends Human {
  constructor(props) {
    super(props);
    this.saying = 'Hi, beauty!';
  }
}
class CatWoman extends Woman {
  constructor(props) {
    super(props);
    this.species = "cat-woman"
    this.saying = new Cat(props).saying;
  }
}

var dog = new Dog({name:'Didko',gender: 'male'});
var cat = new Cat({name:'John',gender: 'male'});
var man = new Woman({name:'Polina',gender: 'female'});
var woman = new Man({name:'Seba',gender: 'male'});
var catWoman = new CatWoman({name:'Murmuletka',gender: 'female'});
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
