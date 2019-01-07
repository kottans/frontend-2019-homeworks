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

class Man extends Inhabitant {
    constructor(name, gender, saying, legs = 2, hands = 2) {
        super('human', name, gender, saying, legs);
        this.hands = hands;
    }
    toString(){
        return super.toString() + this.hands + ';';
    }
}

class Woman extends Inhabitant {
    constructor(name, gender, saying, legs = 2, hands = 2) {
        super('human', name, gender, saying, legs);
        this.hands = hands;
    }
    toString(){
        return super.toString() + this.hands + ';';
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
    new Man('Dima', 'male', 'I live in Kyiv'),
    new Woman('Viktoria', 'female', 'I live in Dnipro'),
    new Cat('Mark', 'male', 'may-may'),
    new Dog('Lola', 'female', 'gav-gav'),
    new Catwoman('Catwoman', 'female', 'may-may')
];

inhabitants.forEach(inhabitant =>
    print(inhabitant)
);
