/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

   Code repository: https://github.com/ivarshavets/a-tiny-JS-world
   Web app: https://ivarshavets.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(name, gender, speak, friends = null){
    this.name = name
    this.gender = gender
    this.speak = speak
    this.friends = friends
  }

  toString() {
    let info = [this.name, this.gender, this.speak].join("; ")
    if ( this.friends ) {
      info += `; ${this.friends.join(", ")}`
    }
    return info
  }
  print () {
    print( this.toString() )
  }
}

class Animal extends Inhabitant {
  constructor(name, gender, speak, friends, species) {
    super(name, gender, speak, friends)
    this.species = species
    this.legs = 4
  }

  toString() {
    return `${this.species}; ${this.legs} legs; ${super.toString()}`
  }
}

class Dog extends Animal {
  constructor(name, gender, friends) {
    super(name, gender, "woof-woof", friends)
    this.species = "dog"
  }
}

class Cat extends Animal {
  constructor(name, gender, friends) {
    super(name, gender, "meow", friends)
    this.species = "cat"
  }
}

class Human extends Inhabitant {
  constructor(name, gender, speak, friends) {
    super(name, gender, speak, friends)
    this.species = "human"
    this.legs = 2
    this.hands = 2
  }

  toString() {
    return `${this.species}; ${this.legs} legs; ${this.hands} hands; ${super.toString()}`
  }
}

class Catwoman extends Human {
  constructor(name, friends) {
    super(name, "female", friends)
    this.species = "cat-woman"
    this.speak = new Cat().speak
  }
}

const inhabitants = [
  new Dog("Ghost", "male", ["Jon Snow", "Stark"]),
  new Cat("Misty", "female"),
  new Human("Ygritte", "female", "Hi!", ["Jon Snow"]),
  new Human("Jon Snow", "male", "Hey yo!", ["Ygritte", "Ghost"]),
  new Catwoman("Selina")
]

// ======== OUTPUT ========
inhabitants.forEach(inhabitant => {
  inhabitant.print()
})
