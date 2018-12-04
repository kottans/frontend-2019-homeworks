class Inhabitant{
    constructor(species, name, gender, hands = 0, lags = 0, speak, friends = []){
        this.species = species,
        this.name = name,
        this.gender = gender,
        this.hands = hands,
        this.lags = lags,
        this.speak = speak,
        this.friends = friends
    }
    getInfo(){
        return Object.values(this).join("; ")
    }
}

class Human extends Inhabitant{
    constructor(name, gender, speak, friends, hands = 2, lags = 2){
        super("human", name, gender, hands, lags, speak, friends)
    }
}

class Dog extends Inhabitant{
    constructor(name, gender, friends, hands, lags = 4){
        super("dog", name, gender, hands , lags, "Woof-woof!", friends)
    }
}

class Cat extends Inhabitant{
    constructor(name, gender, friends, hands, lags = 4){
        super("cat", name, gender, hands, lags, "Meeeeooow!", friends)
    }
}

class CatWoman extends Cat{
    constructor(name, gender, friends, hands = 2, lags = 2){
        super(name, gender, friends, hands, lags)
        this.species = "Cat-woman"
    }
}

const inhabitant_1 = new Human("Jack", "male", "AAAAaaaargh!!!")
const inhabitant_2 = new Human("Lucy", "female", "Holla!")
const inhabitant_3 = new Cat("Fluffie", "female")
const inhabitant_4 = new Dog("Tim", "male")
const inhabitant_5 = new CatWoman("Kittie", "female")

inhabitant_1.friends = [inhabitant_2.name]
inhabitant_2.friends = [inhabitant_3.name, inhabitant_5.name]
inhabitant_3.friends = [inhabitant_2.name, inhabitant_5.name]
inhabitant_4.friends = [inhabitant_1.name, inhabitant_2.name, inhabitant_3.name, inhabitant_5.name]
inhabitant_5.friends = [inhabitant_2.name, inhabitant_3.name]

print(inhabitant_1.getInfo())
print(inhabitant_2.getInfo())
print(inhabitant_3.getInfo())
print(inhabitant_4.getInfo())
print(inhabitant_5.getInfo())
