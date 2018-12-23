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
  constructor(name, saying, friends, species = "human", legs = 2, hands = 2, gender) {
    super(name, saying, friends, species, legs, hands, gender);
  }
}
class Female extends Human {
  constructor(name, saying, friends , species, legs, hands, gender = "female") {
    super(name, saying, friends, species, legs, hands, gender);
  }
}
class Male extends Human {
  constructor(name, saying, friends, species, legs, hands, gender = "male") {
    super(name, saying, friends, species, legs, hands, gender);
  }
}

class Animal extends Inhabitant {
  constructor(name, saying, friends, species, legs  = 4, hands = 0, gender) {
    super(name, saying, friends, species, legs, hands, gender);
  }
}

class Dog extends Animal {
  constructor(name, gender, friends, species = "Dog", legs, hands, saying = "woof-woof!") {
    super(name, saying, friends, species, legs, hands, gender);
  }
}
class Cat extends Animal {
  constructor(name, gender, friends, species  = "cat", legs, hands, saying = "meow-meow!") {
    super(name, saying, friends, species, legs, hands, gender);
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

