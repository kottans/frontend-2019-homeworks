class Inhabitant{
    constructor(species, name, gender, speak, friends = [], legs = 2){
        this.species = species
        this.name = name
        this.gender = gender
        this.legs = legs
        this.speak = speak
        this.friends = friends
    }
    getInfo(){
        return Object.values(this).join("; ")
    }
}

class Human extends Inhabitant{
    constructor(name, gender, speak, friends, legs,  hands = 2){
        super("human", name, gender, speak, friends, legs)
        this.hands = hands
    }
}
const dog = new Inhabitant("dog", "Good Boy", "male", "woof-woof!", ["Jim", "Tim", "Bob"],  4)
const woman = new Human("Helga", "female", "Hello!", ["Kittie"], 2, 2)
const man = new Human("Jack", "male", "AAAAaaaargh!!!", ["Good Boy", "Helga"],  1, 2)
const cat = new Inhabitant("cat", "Fluffie", "female", "meeeoooOOOoooow!!!", 4)
const catWoman = new Human("Kittie", "female", cat.speak, null , 2, 2)

print(dog.getInfo())
print(woman.getInfo())
print(man.getInfo())
print(cat.getInfo())
print(catWoman.getInfo())
