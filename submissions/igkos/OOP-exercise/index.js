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
  toString() {
    return `${this.species}; ${this.name}; ${this.gender}; ${this.legs}; ${
      this.hands
    }; ${this.saying}; ${this.friends}`;
  }
}

class Human extends Inhabitant {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.species = "human";
    this.legs = 2;
    this.hands = 2;
  }
}
class Female extends Human {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.gender = "female";
  }
}
class Male extends Human {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.gender = "male";
  }
}

class Animal extends Inhabitant {
  constructor(name, saying, friends, species, legs, hands, gender) {
    super(name, saying, friends, species, legs, hands, gender);
    this.legs = 4;
    this.hands = 0;
  }
}

class Dog extends Animal {
  constructor(name, gender, friends, species, legs, hands, saying) {
    super(name, saying, friends, species, legs, hands, gender);
    this.species = "Dog";
    this.saying = "woof-woof!";
  }
}
class Cat extends Animal {
  constructor(name, gender, friends, species, legs, hands, saying) {
    super(name, saying, friends, species, legs, hands, gender);
    this.species = "cat";
    this.saying = "meow-meow!";
  }
}

[
  new Female("Jane", "Hey! I am a STRONG WOMAN", ["Artur", "Tomy"]),
  new Male("Artur", "All right everyone, listen up.", ["Jane", "Toby"]),
  new Cat("Tomy", "female", ["Jane"]),
  new Dog("Toby", "male", ["Artur"])
].forEach(inhabitant => print(inhabitant.toString()));
