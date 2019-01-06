/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/allykrupina/allykrupina.github.io/a-tiny-JS-world
   Web app: https://allykrupina.github.io/a-tiny-js-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {
    constructor(species, name, gender, saying, legs = 4) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.legs = legs;
    }
    toString(){
        return ['<em>' + this.species + '</em>', '<strong>' + this.name + '</strong>', this.gender, this.saying, this.legs + '; '].join ('; ');
    }
}

class Human extends Inhabitant {
    constructor(species, name, gender, saying, legs = 2, hands = 2) {
        super(species, name, gender, saying, legs);
        this.hands = hands;
    }
    toString(){
        return super.toString() + this.hands + ';';
    }
}

class Dog extends Inhabitant {
    constructor(name, gender) {
        super('dog', name, gender, 'wooooof');
    }
}

class Cat extends Inhabitant {
    constructor(name, gender) {
        super('cat', name, gender, 'murrr');
    }
}

const inhabitants = [
    new Human('Woman', 'Nika', 'female', 'I love my cat'),
    new Human('Man', 'Kurt', 'male', 'I love my dog'),
    new Dog('Grey', 'male'),
    new Cat('Assol', 'female')
];

inhabitants.forEach(inhabitant =>
    print(inhabitant)
);
