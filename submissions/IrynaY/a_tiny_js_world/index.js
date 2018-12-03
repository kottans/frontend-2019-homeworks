class Inhabitant{
    constructor(name, gender, hands = 0, lags = 0, friends = []){
        this.name = name,
        this.gender = gender,
        this.hands = hands,
        this.lags = lags,
        this.friends = friends
    }
    getInfo(){
        return Object.values(this).join("; ")
    }
}

class Human extends Inhabitant{
    constructor(name, gender, hands = 2, lags = 2, speak, friends){
        super(name, gender, hands, lags, friends)
        this.species = "human"
        this.speak = speak
    }
}

class Dog extends Inhabitant{
    constructor(name, gender, hands, lags = 4, friends){
        super(name, gender, hands , lags, friends)
        this.species = "dog"
        this.speak = "Woof-woof!"
    }
}

class Cat extends Inhabitant{
    constructor(name, gender, lags = 4, friends, hands){
        super(name, gender, hands, lags, friends)
        this.species = "cat"
        this.speak = "Meeeeooow!"
    }
}

class CatWoman extends Cat{
    constructor(name, gender, hands = 2, lags = 2, friends){
        super(name, gender, hands, lags, friends)
        this.species = "Cat-woman"
    }
}

const man = new Human("Jack", "male", 2, 2,  "AAAAaaaargh!!!", ["Tom", "Bob"])
const woman = new Human("Lucy", "female", 2, 2,  "Holla!", ["Kittie", "Bob"])
const cat = new Cat("Fluffie", "female", 4, ["Lucy"])
const dog = new Dog("Tim", "male", 0, 4, ["Jack"])
const cat_woman = new CatWoman("Kittie", "female", 2, 2, ["Kittie", "Fluffie"])

print(man.getInfo())
print(woman.getInfo())
print(dog.getInfo())
print(cat.getInfo())
print(cat_woman.getInfo())
