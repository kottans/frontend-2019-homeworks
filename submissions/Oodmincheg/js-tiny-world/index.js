class Creature {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.saiyng = "Hello, I'm " + this.name;
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
const cat = new Cat("Felix", "male");
const dog = new Dog("Mr. Pickles", "male");
const man = new Human("Luntik", "male");
const woman = new Human("Eva", "female");

//prettier-ignore
print(cat.spiece + "; " + cat.gender + "; " + cat.name + "; " + cat.legs  + " legs; " + cat.hands + " hands;" + cat.saiyng)

//prettier-ignore
print(dog.spiece + "; " + dog.gender + "; " + dog.name + "; " + dog.legs + " legs; " + dog.hands + " hands;" + dog.saiyng)

//prettier-ignore
print(man.spiece + "; " + man.gender + "; " + man.name + "; " + man.legs + " legs; " + man.hands + " hands;" + man.saiyng)

//prettier-ignore
print(woman.spiece + "; " + woman.gender + "; " + woman.name + "; " + woman.legs + " legs; " + woman.hands + " hands;" + woman.saiyng)
