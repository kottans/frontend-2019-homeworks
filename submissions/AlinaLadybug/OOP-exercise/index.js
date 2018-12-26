/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const props = [
  'name',
  'gender',
  'legs',
  'hands',
  'name',
  'saying',
  'friends'
];
class Entity {
  constructor(name, gender, saying, species, legs, friends, hands = 0) {
    this.name = name;
    this.gender = gender;
    this.species = species;
    this.saying = saying;
    this.legs = legs;
    this.friends = friends;
    this.hands = hands;
  }
  //spread syntax for further expanding
  setFriends(objects) {
    this.friends = [...objects];
  }
  getMessage() {
    var friends = Array.isArray(this.friends) ? this.friends.map(a => a.name).join(', ') : 'no friends';
    return props.map(prop => {
      if (prop === 'friends') {
        return friends;
      }
      return `${this[prop]}`;
    }).join('; ');
  }
}
class Human extends Entity {
  constructor(name, gender, saying, species = 'human', legs = 2, friends) {
    super(name, gender, saying, species, legs, friends);
    this.hands = 2;
  }
}
class Animal extends Entity {
  constructor(name, gender, saying, species, legs = 4, friends) {
    super(name, gender, saying, species, legs, friends);
  }
}

class Dog extends Animal {
  constructor(name, gender, species = 'dog', saying = 'woof', legs, friends) {
    super(name, gender, saying, species, legs, friends);
  }
}

class Cat extends Animal {
  constructor(name, gender, species = 'cat', saying = 'meow', legs, friends) {
    super(name, gender, saying, species, legs, friends);
  }
}

class Man extends Human {
  constructor(name, gender, saying, species, legs, friends) {
    super(name, gender, saying, species, legs, friends);
  }
}
class Woman extends Human {
  constructor(name, gender, saying, species, legs, friends) {
    super(name, gender, saying, species, legs, friends);
  }
}
class CatWoman extends Woman {
  constructor(name, gender, saying, species = 'cat-woman', legs, friends) {
    super(name, gender, saying, species, legs, friends);
    this.saying = new Cat().saying;
  }
}

var dog = new Dog('Didko', 'male');
var cat = new Cat('John', 'male');
var man = new Woman('Polina', 'female', 'Hi, beauty!');
var woman = new Man('Seba', 'male', 'I am a cool man.');
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
