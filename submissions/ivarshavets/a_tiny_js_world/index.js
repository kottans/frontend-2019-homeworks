/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

   Code repository: https://github.com/ivarshavets/a-tiny-JS-world
   Web app: https://ivarshavets.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(species, name, gender, legs = 0, hands = 0, speak, friends=null){
    this.species = species
    this.name = name
    this.gender = gender
    this.legs = legs
    this.hands = hands
    this.speak = speak
    this.friends = friends
  }

  getInfo(){
    return Object.values(this).join("; ")
  }
}

const dog = new Inhabitant("dog", "Ghost", "male", 4, 0, "woof", ["Jon Snow", "Stark"])
const cat = new Inhabitant("cat", "Misty", "female", 4, 0, "meow")
const woman = new Inhabitant("human", "Ygritte", "female", 2, 2, "Hi!", ["Jon Snow"])
const man = new Inhabitant("human", "Jon Snow", "male", 2, 2, "Hey yo!", ["Ygritte", "Ghost"])
const catWoman = new Inhabitant("cat-woman", "Selina", "female", 2, 2, cat.speak)

// ======== OUTPUT ========
print(dog.getInfo())
print(cat.getInfo())
print(woman.getInfo())
print(man.getInfo())
print(catWoman.getInfo())
