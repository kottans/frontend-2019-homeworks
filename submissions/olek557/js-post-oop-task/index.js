// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(name, gender, legs, phrase, species) {
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.phrase = phrase;
    this.species = species;
  }
  toString() {
      return [`species: ${this.species}`, `name: ${this.name}`, `gender: ${this.gender}`, `legs: ${this.legs}`, `say: ${this.phrase}`].join(', ');
  }
}

class Dog extends Inhabitant {
  constructor(name, gender) {
    super(name, gender, 4, 'Woof woof', 'dog');
  }
}

class Cat extends Inhabitant {
  constructor(name, gender) {
    super(name, gender, 4, 'Meow', 'cat');
  }
}

class Human extends Inhabitant {
  constructor(name, gender, phrase) {
    super(name, gender, 2, phrase, 'human');
    this.hands = 2;
  }
  toString() {
    return super.toString() + `, hands: ${this.hands}`;
  }
}

let inhabitants = [
  new Dog('Barsik', 'male'),
  new Cat('Max', 'male'),
  new Human('Alex', 'female', "Hello world")
];

// ======== OUTPUT ========
inhabitants.forEach(inhabitant => {
  print(inhabitant)
});
