/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

   Code repository: https://github.com/ivarshavets/a-tiny-JS-world
   Web app: https://ivarshavets.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(species, name, gender, phrase, friends = null, legs = 2){
    this.species = species
    this.name = name
    this.gender = gender
    this.phrase = phrase
    this.friends = friends
    this.legs = legs
  }

  toString() {
    return [this.species, this.name, this.gender, this.phrase, this.friends, this.legs].join("; ")
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, phrase, friends, legs) {
    super(species, name, gender, phrase, friends, 4)
  }
}

class Dog extends Animal {
  constructor(name, gender, friends) {
    super("dog", name, gender, "woof-woof", friends)
  }
}

class Cat extends Animal {
  constructor(name, gender, friends) {
    super("cat", name, gender, "meow", friends)
  }
}

class Human extends Inhabitant {
  constructor(name, gender, phrase, friends) {
    super("human", name, gender, phrase, friends, 2)
    this.hands = 2
  }

  toString() {
    return [super.toString(), this.hands].join("; ")
  }
}

class Catwoman extends Human {
  constructor(name, friends) {
    super("cat-woman", name, "female", friends)
  }
}

const dog = new Dog("Ghost", "male", ["Jon Snow", "Stark"])
const cat = new Cat("Misty", "female")
const woman = new Human("Ygritte", "female", "Hi!", ["Jon Snow"])
const man = new Human("Jon Snow", "male", "Hey yo!", ["Ygritte", "Ghost"])
const catwoman = new Catwoman("Selina", cat.phrase)
const inhabitants = [dog, cat, woman, man, catwoman]

// ======== OUTPUT ========
inhabitants.forEach(inhabitant => print(inhabitant))
