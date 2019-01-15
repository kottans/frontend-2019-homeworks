class Inhabitant {
    constructor(species, name, gender, legs, hands, ...friends) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.friends = friends;
    }
    get textToPrint() {
        return [
            `Species => ${this.species}`,
            `Name => ${this.name}`,
            `Gender => ${this.gender}`,
            `Legs => ${this.legs}`,
            `Hands => ${this.hands}`,
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
    constructor(species, name, gender, legs, hands, saying, ...friends) {
        super(species, name, gender, legs, hands, ...friends)
        this.saying = saying;
    }
    get textToPrint() {
        return [
            super.textToPrint,
            `Saying => ${this.saying}`
        ].join("; ")
    }
}

class Dog extends Inhabitant {
    constructor(species, name, gender, legs, hands, saying, ...friends) {
        super(species, name, gender, legs, hands, ...friends)
        this.saying = saying;
    }
    get textToPrint() {
        return [
            super.textToPrint,
            `Saying => ${this.saying}`
        ].join("; ")
    }
}

class Cat extends Inhabitant {
    constructor(species, name, gender, legs, hands, saying, ...friends) {
        super(species, name, gender, legs, hands, ...friends)
        this.saying = saying;
    }
    get textToPrint() {
        return [
            super.textToPrint,
            `Saying => ${typeof(this.saying) === "object" ? this.saying.saying : this.saying}`
        ].join("; ")
    }
}

const dog = new Dog("dog", "Buddy", "male", 4, 0, "woof-woof!");
print(dog.textToPrint);
const cat = new Cat("cat", "Garfield", "male", 4, 0, "meu", dog);
print(cat.textToPrint);
const man = new Human("human", "Jonathan", "male", 2, 2, "Hello!", dog, cat);
print(man.textToPrint);
const woman = new Human("human", "Megan", "female", 2, 2, "Hi!");
print(woman.textToPrint);
const catWomen = new Cat("cat", "Jane", "female", 4, 0, cat);
print(catWomen.textToPrint);