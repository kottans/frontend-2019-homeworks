/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/allykrupina/allykrupina.github.io/a-tiny-JS-world
   Web app: https://allykrupina.github.io/a-tiny-js-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {
    constructor(species, name, gender, legs, hands, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.saying = saying;
    }
}

class Woman extends Inhabitant {
    constructor(species, name, gender, saying, legs, hands) {
        super(...arguments);
    }
}

class Man extends Inhabitant {
    constructor(species, name, gender, saying, legs, hands) {
        super(...arguments);
    }
}

class Dog extends Inhabitant {
    constructor(species, name, gender, saying, legs, hands) {
        super(...arguments);
    }
}

class Cat extends Inhabitant {
    constructor(species, name, gender, saying, legs, hands) {
        super(...arguments);
    }
}

const inhabitants = [
    new Woman('human', 'Nika', 'female', 'I love my cat', 2, 2),
    new Man('human', 'Kurt', 'male', 'I love my dog', 2, 2),
    new Dog('dog', 'Grey', 'male', 'wooooof', 4, 0),
    new Cat('cat', 'Assol', 'female', 'murrr', 4, 0)
];

function inhabitantToString(obj){
    return ['<em>' + obj.species + '</em>', '<strong>' + obj.name + '</strong>', obj.gender, obj.legs, obj.hands, obj.saying].join ('; ');
}

inhabitants.forEach(inhabitant =>
    print(inhabitantToString(inhabitant))
);
