class Inhabitant {
    constructor(species, name, gender, saying, legs = 4) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.legs = legs;
    }
    toString(){
        return [this.species, this.name, this.gender, this.saying, this.legs + '; '].join ('; ');
    }
}

class Human extends Inhabitant {
    constructor(species, name, gender, saying, legs = 2, hands = 2) {
        super(species, name, gender, saying, legs);
        this.hands = hands;
    }
    toString(){
        return super.toString() + this.hands + ';';
    }
}

class Man extends Human {
    constructor(name, saying) {
        super('human', name, 'male', saying);
    }
}

class Woman extends Human {
    constructor(name, saying) {
        super('human', name, 'female', saying);
    }
}

class Cat extends Inhabitant {
    constructor(name, gender, saying) {
        super('cat', name, gender, saying);
    }
}

class Dog extends Inhabitant {
    constructor(name, gender, saying) {
        super('dog', name, gender, saying);
    }
}

class Catwoman extends Inhabitant {
    constructor(name, gender, saying) {
        super('catwoman', name, gender, saying);
    }
}

const inhabitants = [
    new Man('Dima', 'I live in Kyiv'),
    new Woman('Viktoria', 'I live in Dnipro'),
    new Cat('Mark', 'male', 'may-may'),
    new Dog('Lola', 'female', 'gav-gav'),
    new Catwoman('Catwoman', 'female', 'may-may')
];

inhabitants.forEach(inhabitant =>
    print(inhabitant)
);
