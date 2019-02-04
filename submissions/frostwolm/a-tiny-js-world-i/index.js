class Inhabitant {
  constructor(species, name, gender, saying, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.legs = legs;
    this.friends = [];
  }
  addFriend(friend){
    this.friends.push(friend);
    friend.friends.push(this);
    return this;
  }
  toString(){
    return [this.species, this.name, this.gender, this.saying, this.friends.map(friend => friend.name).join(', '), this.legs].join ('; ') + '; ';
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying, legs = 2, hands = 2) {
    super('human', name, gender, saying, legs);
    this.hands = hands;
  }
  toString(){
    return super.toString() + this.hands + '; ';
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, saying, legs = 4) {
    super(species, name, gender, saying, legs);
  }
}

class Man extends Human {
  constructor(name, saying) {
      super(name, 'male', saying);
  }
}

class Woman extends Human {
  constructor(name, saying) {
      super(name, 'female', saying);
  }
}

class Cat extends Animal {
  constructor(name, gender, saying) {
      super('cat', name, gender, saying);
  }
}

class Dog extends Animal {
  constructor(name, gender, saying) {
      super('dog', name, gender, saying);
  }
}

class CatWoman extends Human {
  constructor(name, saying) {
      super(name, 'female', saying);
  }
}

class World {
  constructor(...habs) {
    this.habbitants = habs;
  }
  addHabbitant(hab){
    this.habbitants.push(hab);
    return this;
  }
  toString(){
    return this.habbitants.join('\n');
  }
}

const dog = new Dog('Flow', 'female', 'woof-woof!');
const cat = new Cat('Mars', 'male', 'meow!');
const man = new Man('Adrian', 'Good Morning, Vietnam!');
const woman = new Woman('Trish', 'Hin chao!');

const world = new World(dog, cat, man, woman);

dog.addFriend(cat).addFriend(man);
man.addFriend(woman);

const catWoman = new CatWoman('Kate', cat.saying);
catWoman.addFriend(cat);

world.addHabbitant(catWoman);

print(world);
