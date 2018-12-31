class Entity {
  constructor(species, name, gender, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = `My name is ${this.name}`;
  }
  toString() {
    return `${this.saying}`;
  }
}

class Human extends Entity {
  constructor(name, gender) {
    super("human", name, gender, 2);
    this.hands = 2;
  }
  toString() {
    return (
      super.toString() + ` I am ${this.species} I have ${this.hands} hands`
    );
  }
}

class Animal extends Entity {
  constructor(species, name, gender) {
    super(species, name, gender, 4);
  }
  toString() {
    return `I am ${this.species} I have ${this.legs} legs`;
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super("cat", name, gender);
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super("dog", name, gender);
  }
}

class CatWoman extends Human {
  constructor(name, gender) {
    super(name, gender);
    this.species = "cat-women";
  }
}

const objects = [
  new Human("George", "male"),
  new Human("Alisa", "female"),
  new Cat("Velik", "male"),
  new Dog("Hugo", "male"),
  new CatWoman("Hinata", "female")
];

objects.forEach(obj => print(obj));
