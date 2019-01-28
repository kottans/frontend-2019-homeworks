class Inhabitant{
    constructor(species, name, gender, speak, friends = [], lags = 0, hands = 0){
        this.species = species,
        this.name = name,
        this.gender = gender,
        this.hands = hands,
        this.lags = lags,
        this.speak = speak,
        this.friends = friends
    }
    getInfo(){
        return `${this.species}; ${this.name}; ${this.gender}; ${this.speak}; ${this.hands}; ${this.lags}; ${this.friends.map(friend => friend.name).join(", ")};`
    }
}

class Human extends Inhabitant{
    constructor(name, gender, speak, friends, lags = 2, hands = 2){
        super("human", name, gender, speak, friends, lags, hands)
    }
}

class Dog extends Inhabitant{
    constructor(name, gender, friends, lags = 4){
        super("dog", name, gender, "Woof-woof!", friends, lags)
    }
}

class Cat extends Inhabitant{
    constructor(name, gender, friends, lags = 4){
        super("cat", name, gender, "Meeeeooow!", friends, lags)
    }
}

class CatWoman extends Cat{
    constructor(name, gender, friends, lags = 2, hands = 2){
        super(name, gender, friends, lags, hands)
        this.species = "cat-woman"
        this.hands = hands
    }
}

const inhabitants = [
    new Human("Jack", "male", "AAAAaaaargh!!!"),
    new Human("Lucy", "female", "Holla!"),
    new Cat("Fluffie", "female"),
    new Dog("Tim", "male"),
    new CatWoman("Kittie", "female")
];

inhabitants[0].friends = [inhabitants[1]]
inhabitants[1].friends = [inhabitants[0], inhabitants[2]]
inhabitants[2].friends = [inhabitants[1], inhabitants[4]]
inhabitants[3].friends = [inhabitants[4]]
inhabitants[4].friends = [inhabitants[3]]

inhabitants.forEach(inhabitant => print(inhabitant.getInfo()))
