class Inhabitant {
  constructor(name, saying, friends, species, legs, hands, gender) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
  }
  setFriends(friends){
    this.friends = [...friends];
  }
  toString() {
    return Object.values(this).join("; ");
  }
}

class Human extends Inhabitant {
  constructor(name, saying, friends, gender) {
    super(name, saying, friends, "human", 2, 2, gender);
  }
}
class Female extends Human {
  constructor(name, saying, friends) {
    super(name, saying, friends, "female");
  }
}
class Male extends Human {
  constructor(name, saying, friends) {
    super(name, saying, friends, "male");
  }
}

class Animal extends Inhabitant {
  constructor(name, saying, friends, species, gender) {
    super(name, saying, friends, species, 4, 0, gender);
  }
}

class Dog extends Animal {
  constructor(name, gender, friends) {
    super(name, "woof-woof!", friends, "Dog", gender);
  }
}
class Cat extends Animal {
  constructor(name, gender, friends ) {
    super(name, "meow-meow!", friends, "cat", gender);
  }
}

const Inhabitants = [
  new Female("Jane", "Hey! I am a STRONG WOMAN"),
  new Male("Artur", "All right everyone, listen up."),
  new Cat("Tomy", "female"),
  new Dog("Toby", "male")
]

Inhabitants.forEach(Inhabitant => {
  Inhabitant.setFriends(Inhabitants.filter(currentName => currentName.name !== Inhabitant.name).map(friend => friend.name));
  print(Inhabitant);
});

