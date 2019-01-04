// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(name, gender, legs, phrase) {
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.phrase = phrase;
  }
  fullInfo() {
      return `name: ${this.name}, gender: ${this.gender}, legs: ${this.legs}, say: ${this.phrase}`;
  }
}

class Dog extends Inhabitant {
  constructor(name, gender) {
    super(name, gender, 4, 'Woof woof');
  }
}

class Cat extends Inhabitant {
  constructor(name, gender) {
    super(name, gender, 4, 'Meow');
  }
}

class Human extends Inhabitant {
  constructor(name, gender, phrase) {
    super(name, gender, 2, phrase);
    this.hands = 2;
  }
  fullInfo() {
    return super.fullInfo() + `, hands: ${this.hands}`;
  }
}

let inhabitants = [
  new Dog('Barsik', 'male'),
  new Cat('Max', 'male'),
  new Human('Alex', 'female', "Hello world")
];

// ======== OUTPUT ========
inhabitants.forEach(inhabitant => {
  print(inhabitant.fullInfo())
});
