class Creature {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.saiyng = `Hello, I'm ${this.name}`;
  }
}

class Animal extends Creature {
  constructor(name, gender) {
    super(name, gender);
    this.hands = 0;
    this.legs = 4;
  }
}

class Human extends Creature {
  constructor(name, gender) {
    super(name, gender);
    this.spiece = "Human";
    this.hands = 2;
    this.legs = 2;
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super(name, gender);
    this.spiece = "Dog";
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super(name, gender);
    this.spiece = "Cat";
  }
}

const introduce = creature => {
  //prettier-ignore
  print(`${creature.spiece}; ${creature.gender}; ${creature.name}; ${creature.legs} legs; ${creature.hands ? creature.hands : "no"} hands; ${creature.saiyng}`)
};

const creaturesArray = [
  new Cat("Felix", "male"),
  new Dog("Mr. Pickles", "male"),
  new Human("Luntik", "male"),
  new Human("Eva", "female")
];

creaturesArray.forEach(creature => {
  introduce(creature);
});
