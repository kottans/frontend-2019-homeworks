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
        return ['<em>' + this.species + '</em>', '<strong>' + this.name + '</strong>', this.gender, this.saying, this.legs, this.hands].join ('; ');
    }
}

class Woman extends Inhabitant {
    constructor(name, gender, saying) {
        super('woman', name, gender, saying);
        this.hands = 2;
        this.legs = 2;
        this.saying = 'I love my cat';
    }
}

class Man extends Inhabitant {
    constructor(name, gender, saying) {
        super('man', name, gender, saying);
        this.hands = 2;
        this.legs = 2;
        this.saying = 'I love my dog';
    }
}

class Dog extends Inhabitant {
    constructor(name, gender) {
        super('dog', name, gender);
        this.legs = 4;
        this.saying = 'wooooof';
    }
}

class Cat extends Inhabitant {
    constructor(name, gender) {
        super('cat', name, gender);
        this.legs = 4;
        this.saying = 'murrr';
    }
}

const inhabitants = [
    new Woman('Nika', 'female'),
    new Man('Kurt', 'male'),
    new Dog('Grey', 'male'),
    new Cat('Assol', 'female')
];

inhabitants.forEach(inhabitant =>
    print(inhabitant)
);
