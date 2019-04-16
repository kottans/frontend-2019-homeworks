function Inhabitant(species, name, gender, legs, hands, saying, ...friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
};

Inhabitant.prototype.getTextForPrint = function() {
    return [
        `Species => ${this.species}`,
        `Name => ${this.name}`,
        `Gender => ${this.gender}`,
        `Legs => ${this.legs}`,
        `Hands => ${this.hands}`,
        `Saying => ${typeof(this.saying) === "object" ? this.saying.saying : this.saying}`,
        `Friends => ${this.friends.length > 0 ? this.getFriendsName() : "No one"}`
    ].join("; ")
};
Inhabitant.prototype.getFriendsName = function() {
    let names = "";
    this.friends.forEach(friend => {
        names += friend.name + ", ";
    });
    return names;
};

const dog = new Inhabitant("dog", "Buddy", "male", 4, 0, "woof-woof!");
print(dog.getTextForPrint());
const cat = new Inhabitant("cat", "Garfield", "male", 4, 0, "meu", dog);
print(cat.getTextForPrint());
const man = new Inhabitant("human", "Jonathan", "male", 2, 2, "Hello!", dog, cat);
print(man.getTextForPrint());
const woman = new Inhabitant("human", "Megan", "female", 2, 2, "Hi!");
print(woman.getTextForPrint());
const catWomen = new Inhabitant("cat", "Jane", "female", 4, 0, cat);
print(catWomen.getTextForPrint());
