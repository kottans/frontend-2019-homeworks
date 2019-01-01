/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/allykrupina/allykrupina.github.io/a-tiny-JS-world
   Web app: https://allykrupina.github.io/a-tiny-js-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {
    constructor(species, name, gender, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
    }
    toString(){
        return ['<em>' + this.species + '</em>', '<strong>' + this.name + '</strong>', this.gender, this.saying, this.legs + '; '].join ('; ');
    }
}

class Human extends Inhabitant {
    constructor(name, gender, saying) {
        super('Human', name, gender, saying);
        this.hands = 2;
        this.legs = 2;
    }
    toString(){
        return super.toString() + this.hands + ';';
    }
}

class Woman extends Human {
    constructor(species, name, gender, saying) {
        super(...arguments);
    }
}

class Man extends Human {
    constructor(species, name, gender, saying) {
        super(...arguments);
    }
}

class Dog extends Inhabitant {
    constructor(name, gender, saying) {
        super('dog', name, gender, saying);
        this.legs = 4;
        this.saying = 'wooooof';
    }
}

class Cat extends Inhabitant {
    constructor(name, gender, saying) {
        super('cat', name, gender, saying);
        this.legs = 4;
        this.saying = 'murrr';
    }
}

const inhabitants = [
    new Woman('Nika', 'female', 'I love my cat'),
    new Man('Kurt', 'male', 'I love my dog'),
    new Dog('Grey', 'male'),
    new Cat('Assol', 'female')
];

inhabitants.forEach(inhabitant =>
    print(inhabitant)
);
