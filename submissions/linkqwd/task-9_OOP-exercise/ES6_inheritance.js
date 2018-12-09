class Inhabitant {
    constructor(props) {
        this.species = this.constructor.name;
        this.name = props.name;
        this.sex = props.sex;
        this.sound = props.sound;
    }

    toString() {
        return Object.entries(this)
        .map(value => `<strong>${value[0]}:</strong> ${value[1]}`)
        .join('; ')
    }
}

class Human extends Inhabitant {
    constructor(props) {
        super(props)
        this.legs = 2;
        this.arms = 2;
    }
}

class Cat extends Inhabitant {
    constructor(props) {
        super(props)
        this.paws = 4;
    }
}

class Dog extends Inhabitant {
    constructor(props) {
        super(props)
        this.paws = 4;
    }
}

let inhabitants = [];

spawnInhabitant(Human, {name: 'jhon', sex: 'male', sound: 'How your doin\''});
spawnInhabitant(Human, {name: 'whitney', sex: 'female', sound: 'Hi guys'});
spawnInhabitant(Cat, {name: 'houston', sex: 'male', sound: 'Mmmrrrrr'});
spawnInhabitant(Dog, {name: 'rex', sex: 'male', sound: 'Ggrrrrr'});

function spawnInhabitant(cls, props) {
    inhabitants.push(new cls(props));
}

inhabitants.forEach(el => print(el));