class Inhabitant {
    constructor(gender, name, saying, legs, hands) {
        this.gender = gender;
        this.name = name;
        this.saying = saying;
        this.legs = legs;
        this.hands = hands;
    }

    print() {
        let info = [];
        for (let key in this) {
            info.push(this[key]);
        }
        let str = info.join('; ');
        console.log(str);
    }
}

class Dog extends Inhabitant {
    constructor(gender, name, say = 'Auuuuu!', legs = 4, hands = 0) {
        super(gender, name, say, legs, hands);
    }
}

class Cat extends Inhabitant {
    constructor(gender, name, say = 'Meuuu!', legs = 4, hands = 0) {
        super(gender, name, say, legs, hands);
    }
}

class Human extends Inhabitant {
    constructor(gender, name, say, legs = 2, hands = 2) {
        super(gender, name, say, legs, hands);
    }
}


let nick = new Human( 'male', 'Nick', 'Hellooooo...');
let helen = new Human('female', 'Helen', 'Hi!');

let bars = new Dog('female', 'Bars');
let skot = new Cat('male', 'Skot');