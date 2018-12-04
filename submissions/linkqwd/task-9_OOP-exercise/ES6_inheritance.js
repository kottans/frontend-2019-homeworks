class Inhabitant {
    constructor(props) {
        this.name = props.name;
        this.sex = props.sex;
        this.sound = props.sound;
    }

    static getInhabitantInfo(instance) {
        return Object.entries(instance)
        .map(value => `<strong>${value[0]}:</strong> ${value[1]}`)
        .join('; ')
    }
}

class Human extends Inhabitant {
    constructor(props) {
        super(props)
        this.species = 'human'
        this.legs = 2;
        this.arms = 2;
    }
}

class Cat extends Inhabitant {
    constructor(props) {
        super(props)
        this.species = 'cat'
        this.paws = 4;
    }
}

class Dog extends Inhabitant {
    constructor(props) {
        super(props)
        this.species = 'dog'
        this.paws = 4;
    }
}

const jhon = new Human({
    name: 'Jhon',
    sex: 'male',
    sound: 'How your doin\''
});

const whitney = new Human({
    name: 'Whitney',
    sex: 'female',
    sound: 'Hi guys'
});

const houston = new Cat({
    name: 'Houston',
    sex: 'male',
    sound: 'Mmmrrrrr'
});

const rex = new Dog({
    name: 'Rex',
    sex: 'male',
    sound: 'Ggrrrrr'
});

print(Inhabitant.getInhabitantInfo(jhon));
print(Inhabitant.getInhabitantInfo(whitney));
print(Inhabitant.getInhabitantInfo(houston));
print(Inhabitant.getInhabitantInfo(rex));