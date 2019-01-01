class Entity {
  constructor(species, name, gender, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = ` My name is ${this.name}`;
  }
  toString() {
    return [this.species, this.name, this.gender, this.legs, this.saying].join(
      ";"
    );
  }
}

class Human extends Entity {
  constructor(name, gender,saying) {
    super("human", name, gender, 2  );
    this.hands = 2;
    this.saying = saying;
    
  }
  toString() {
    return super.toString() + ` I say ${this.saying} I have ${this.hands} hands `;
  }
}

class Animal extends Entity {
  constructor(species, name, gender) {
    super(species, name, gender, 4);
  }
  toString() {
    return super.toString() + ` I have ${this.legs} legs`;
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
  constructor(name, gender,saying) {
    super(name, gender,saying);
    this.species = "cat-women";
  }
  toString() {
    return super.toString() + ` I am ${this.species} `;
  }
}

const objects = [
  new Human("George", "male",'hello'),
  new Human("Alisa", "female",'I love Kottans'),
  new Cat("Velik", "male"),
  new Dog("Hugo", "male"),
  new CatWoman("Hinata", "female","learn me ow")
];

objects.forEach(obj => print(obj));

