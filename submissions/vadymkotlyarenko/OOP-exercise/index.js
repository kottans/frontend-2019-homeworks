class Inhabitant {
    constructor(species, name, gender, legs, saying, ...friends) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.friends = friends;        
        this.saying = saying;
    }
    toString() {
        return [
            `Species => ${this.species}`,
            `Name => ${this.name}`,
            `Gender => ${this.gender}`,
            `Legs => ${this.legs}`,
            `Friends => ${this.friends.length > 0 ? this.getFriendsName(this.friends) : "No one"}`,
        ].join("; ")
    }
    getFriendsName(friends) {
        let names = "";
        friends.forEach(friend => {
            names += friend.name + ", ";
        });
        return names;
    }
};

class Human extends Inhabitant {
    constructor(name, gender, legs, hands, saying, ...friends) {
        super("human", name, gender, legs, hands, saying, ...friends)
        this.hands = hands;
    }
    toString() {
        return [
            super.toString(),
            `Saying => ${this.saying}`
        ].join("; ")
    }
}

class Dog extends Inhabitant {
    constructor(name, gender, legs, saying, ...friends) {
        super("dog", name, gender, legs, saying, ...friends)
    }
    toString() {
        return [
            super.toString(),
            `Saying => ${this.saying}`
        ].join("; ")
    }
}

class Cat extends Inhabitant {
    constructor(name, gender, legs, saying, ...friends) {
        super("cat", name, gender, legs, saying, ...friends)
    }
    toString() {
        return [
            super.toString(),
            `Saying => ${typeof(this.saying) === "object" ? this.saying.saying : this.saying}`
        ].join("; ")
    }
}

const dog = new Dog("Buddy", "male", 4, "woof-woof!");
const cat = new Cat("cat", "Garfield", "male", 4, "meu", dog);
const man = new Human("Jonathan", "male", 2, 2, "Hello!", dog, cat);
const woman = new Human("Megan", "female", 2, 2, "Hi!");
const catWomen = new Cat("Jane", "female", 4, cat);
[dog, cat, man, woman, catWomen].forEach(item => 
    print(item.toString())
);
