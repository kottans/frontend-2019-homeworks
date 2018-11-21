class Inhabitant{
    constructor(species, name, gender, legs, speak, friends){
        this.species = species
        this.name = name
        this.gender = gender
        this.legs = legs || 0
        this.speak = speak
        this.friends = friends
    }
    getInfo(){
        return Object.values(this).join("; ")
    }
}

class Human extends Inhabitant{
    constructor(name, gender, legs, hands, speak, friends){
        super("human", name, gender, legs, speak, friends)
        this.hands = hands || 0
    }
    getInfo(){
        return Object.values(this).join("; ")
    }
}
const dog = new Inhabitant("dog", "Good Boy", "male", 4, "woof-woof!", ["Jim", "Tim", "Bob"])
const woman = new Human("Helga", "female", 2, 2, "Hello!", ["Kittie"])
const man = new Human("Jack", "male", 1, 2, "AAAAaaaargh!!!", ["Good Boy", "Helga"])
const cat = new Inhabitant("cat", "Fluffie", "female", 4, "meeeoooOOOoooow!!!")
const catWoman = new Human("Kittie", "female", 2, 2, cat.speak)

print(dog.getInfo())
print(woman.getInfo())
print(man.getInfo())
print(cat.getInfo())
print(catWoman.getInfo())
