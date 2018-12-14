class Unit {
    constructor(props) {
        this.name = props.name
        this.species = props.species;
        this.gender = props.gender;
        this.say = props.say;
        this.friends = [];
    };

    setFriends(friends) {
        this.friends = [...friends];
    }

    toString() {
        return Object.keys(this).map(value => value === "friends" ? this[value].map(friend => friend.name) : this[value]).join(";");
    }
};

const SayCatMixin = superclass => class extends superclass {
    constructor(props) {
        props.say = "Meow";
        super(props);
    };
};

class Animals extends Unit {
    constructor(props) {
        super(props);
        this.legs = props.legs || 4;
    };
};

class Dog extends Animals {
    constructor(props) {
        props.species = "Dog";
        props.say = "Woof";
        super(props);
    };
};

class Cat extends SayCatMixin(Animals) {
    constructor(props) {
        props.species = "Cat";
        super(props);
    };
};

class Humans extends Unit {
    constructor(props) {
        props.species = "Human";
        super(props);
        this.legs = 2;
        this.hands = 2;
    };
};

class Man extends Humans {
    constructor(props) {
        props.gender = "Male";
        super(props);
    };
};

class Woman extends Humans {
    constructor(props) {
        props.gender = "Female";
        super(props);
    };
};

class CatWoman extends SayCatMixin(Humans) {
    constructor(props) {
        props.gender = "Female";
        super(props);
    };
};

const inhabitans = [
    new Dog({name: "Kord", gender: "Male"}),
    new Cat({name: "Whiskas", gender: "Male"}),
    new Man({name: "Tony", say: "Where is my socks?"}),
    new Woman({name: "Michelle", say: "Ooops"}),
    new CatWoman({name: "Dianne"})
];

inhabitans.forEach(inhabitant => {
    inhabitant.setFriends(inhabitans.filter(currentInhabitant => currentInhabitant.name !== inhabitant.name));
    print(inhabitant);
});