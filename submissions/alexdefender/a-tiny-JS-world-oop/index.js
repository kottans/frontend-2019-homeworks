/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

class Entity {
    constructor(species, name, gender, legs, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.saying = saying;
    }

    toString() {
        return [this.species, this.name, this.gender, this.legs, this.saying].join(', ');
    }
}

class Human extends Entity {
    constructor(name, gender, saying) {
        super('human', name, gender, 2, saying);
        this.hands = 2;
    } 
}

class Man extends Human {
    constructor(name, saying) {
        super(name, 'man', saying);
    }
    toString() {
        return super.toString() + `! I have ${this.hands} hands.`;
    }
}

class Woman extends Human {
    constructor(name, saying) {
        super(name, 'woman', saying);
    }
    toString() {
        return super.toString() + `! I have ${this.hands} hands.`;
    }
}


class Animal extends Entity {
    constructor(species, name, gender, saying) {
        super(species, name, gender, 4, saying);
    }
}

class Dog extends Animal {
    constructor(name, gender, saying) {
        super('dog', name, gender, saying);
    }
    toString() {
        return super.toString() + `! I have ${this.hands} hands.`;
    }
}

class Cat extends Animal {
    constructor(name, gender, saying) {
        super('cat', name, gender, saying);
    }
    toString() {
        return super.toString() + `! I have ${this.hands} hands.`;
    }
}

let objs = [new Woman('Ann', 'Hi'),
            new Man('Mike', 'Hi, bro'),
            new Dog('Bobik', 'male', 'Wof-wof'),
            new Cat('Murka', 'female', 'Mur-mur')];

objs.forEach(element => {
    print(element);
});
