/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

class Entity {
    constructor(species, name, gender, legs) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
    }

    toString() {
        return [this.species, this.name, this.gender, this.legs].join(', ');
    }
}

class Human extends Entity {
    constructor(name, gender) {
        super('human', name, gender, 2);
        this.hands = 2;
    } 
}

class Man extends Human {
    constructor(name, saying) {
        super(name, 'man');
        this.saying = saying;
    }
    toString() {
        return super.toString() + `${this.saying}! I have ${this.hands} hands.`;
    }
}

class Woman extends Human {
    constructor(name, saying) {
        super(name, 'woman');
        this.saying = saying;
    }
    toString() {
        return super.toString() + `${this.saying}! I have ${this.hands} hands.`;
    }
}


class Animal extends Entity {
    constructor(name, gender) {
        super('aminal', name, gender, 4);
    }
}

class Dog extends Animal {
    constructor(name, gender, saying) {
        super(name, gender);
        this.saying = saying;
    }
    toString() {
        return super.toString() + `${this.saying}! I have ${this.hands} hands.`;
    }
}

class Cat extends Animal {
    constructor(name, gender, saying) {
        super(name, gender);
        this.saying = saying;
    }
    toString() {
        return super.toString() + `${this.saying}! I have ${this.hands} hands.`;
    }
}

let objs = [new Woman('Ann', 'Hi'),
            new Man('Mike', 'Hi, bro'),
            new Dog('Bobik', 'male', 'Wof-wof'),
            new Cat('Murka', 'female', 'Mur-mur')];

objs.forEach(element => {
    print(element);
});
