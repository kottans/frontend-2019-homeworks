class Inhabitant {
  constructor(name, gender, specie, saying) {
    this.name = name;
    this.gender = gender;
    this.specie = specie;
    this.saying = saying;
  }
  say(){
    print(`specie: ${this.specie}; name: ${this.name}; gender: ${this.gender}; hands: ${this.hands? this.hands: "Oh my God, I don't feel my hands, but wait a minute, I don't have them and it's okey for me hah"}; legs: ${this.legs}; saying: ${this.saying}`, 'div') 
  }
}
class Dog extends Inhabitant {
  constructor(name, gender) {
    super(name, gender, 'Dog');
    this.legs = 4;
    this.saying = 'woof-woof';
  }
}
class Cat extends Inhabitant {
  constructor(name, gender) {
    super(name, gender, 'Cat');
    this.legs = 4;
    this.saying = 'meow-meow';
  }
}
class Man extends Inhabitant {
  constructor(name, gender, saying) {
    super(name, gender, 'Man', saying);
    this.hands = 2;
    this.legs = 2;
  }
}
class Woman extends Inhabitant {
  constructor(name, gender, saying) {
    super(name, gender, 'Woman', saying);
    this.hands = 2;
    this.legs = 2;
  }
}
const inhabitantsArray = [ 
  new Dog('Toby', 'male'),
  new Cat('Milka', 'female'),
  new Man('Alex', 'male', 'Hello there!'),
  new Woman('Emma','female', 'How was your day?')
 ];
inhabitantsArray.forEach( inhabitant => inhabitant.say());
