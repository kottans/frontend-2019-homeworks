class Inhabitant {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.saying = `Hi, my name is ${this.name}. What about you?`;
  }
}
class Dog extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Dog"; 
    this.legs = 4;
  }
}
class Cat extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Cat";
    this.legs = 4;
  }
}
class Man extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Man";
    this.hands = 2;
    this.legs = 2;
  }
}
class Woman extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Woman";
    this.hands = 2;
    this.legs = 2;
  }
}
const inhabitantsArray = [ 
  new Dog('Toby', 'male'),
  new Cat('Milka', 'female'),
  new Man('Alex', 'male'),
  new Woman('Emma','female')
 ];
inhabitantsArray.forEach( inhabitant => print(`specie: ${inhabitant.specie}; name: ${inhabitant.name}; gender: ${inhabitant.gender}; hands: ${inhabitant.hands? inhabitant.hands: "Oh my God, I don't feel my hands, but wait a minute, I don't have them and it's okey for me hah"}; legs: ${inhabitant.legs}; saying: ${inhabitant.saying}`, 'div') );
