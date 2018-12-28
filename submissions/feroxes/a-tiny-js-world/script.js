class Creature {
    constructor(whoIs, gender, name, say) {
        this.whoIs = whoIs;
        this.gender = gender;
        this.name = name;
        this.say = say;
    }

    toSay() {
        console.log(this.say);
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

class Animal extends Creature {
    constructor(whoIs, gender, name, say) {
        super(whoIs, gender, name, say)
        this.legs = 4;
    }
}

class Human extends Creature {
    constructor(whoIs, gender, name, say) {
        super(whoIs, gender, name, say)
        this.hands = 2;
        this.legs = 2;
    }
}


let nick = new Human('human', 'male', 'Nick', 'Hellooooo...');
let helen = new Human('human', 'female', 'Helen', 'Hi!');

let bars = new Animal('cat', 'female', 'Bars', 'Meuuuu');
let skot = new Animal('dog', 'male', 'Skot', 'Auuuuu!');
