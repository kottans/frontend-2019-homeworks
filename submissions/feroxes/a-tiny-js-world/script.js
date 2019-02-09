class Inhabitant {
    constructor(species, gender, name, saying, legs, hands) {
        this.species = species;
        this.gender = gender;
        this.name = name;
        this.saying = saying;
        this.legs = legs;
        this.hands = hands;
    }
}

class Dog extends Inhabitant {
    constructor(gender, name, say = 'Auuuuu!', legs = 4, hands = 0) {
        super('Dog', gender, name, say, legs, hands);
    }
}

class Cat extends Inhabitant {
    constructor(gender, name, say = 'Meuuu!', legs = 4, hands = 0) {
        super('Cat', gender, name, say, legs, hands);
    }
}

class Human extends Inhabitant {
    constructor(gender, name, say, legs = 2, hands = 2) {
        super('Human', gender, name, say, legs, hands);
    }
}

const printInfo = inhabitant => {
    print(`${inhabitant.species}; ${inhabitant.name}; ${inhabitant.gender}; ${inhabitant.legs}; ${inhabitant.hands}; ${inhabitant.saying}`);
}

const inhabitantsArray = [
    new Human( 'male', 'Nick', 'Hellooooo...'),
    new Human('female', 'Helen', 'Hi!'),
    new Dog('female', 'Bars'),
    new Cat('male', 'Skot')
]

inhabitantsArray.forEach(inhabitant => {
    printInfo(inhabitant);
});
