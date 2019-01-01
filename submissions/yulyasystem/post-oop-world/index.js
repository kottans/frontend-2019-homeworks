class Entity {
  constructor(species, name, gender, legs, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying || `My name is ${this.name}`;
  }
  toString() {
    return [this.species, this.name, this.gender, this.legs, this.saying].join(
      ";"
    );
  }
}

class Human extends Entity {
  constructor(name, gender, saying) {
    super("human", name, gender, 2, saying);
    this.hands = 2;
  }
  toString() {
    return super.toString() + ` I have ${this.hands} hands `;
  }
}

class Animal extends Entity {
  constructor(species, name, gender, saying) {
    super(species, name, gender, 4, saying);
  }
  toString() {
    return super.toString();
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super("cat", name, gender, "meow");
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super("dog", name, gender, "woof");
  }
}

class CatWoman extends Human {
  constructor(name, gender, saying) {
    super(name, gender, saying);
    this.species = "cat-women";
  }
}

const objects = [
  new Human("George", "male", "hello"),
  new Human("Alisa", "female", "I love Kottans"),
  new Cat("Velik", "male"),
  new Dog("Hugo", "male"),
  new CatWoman("Hinata", "female", "hi")
];

objects.forEach(obj => print(obj));

