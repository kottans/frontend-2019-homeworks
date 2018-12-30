class Entity {
    constructor(species, name, gender, legs) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;

    }
    saying() {
        return `I am ${this.species} my name ${this.name}`;
    }
}

class Human extends Entity {
    constructor(name, gender, hands) {
        super('human', name, gender, 2);
        this.hands = 2;
    }
    saying() {
        return super.saying() + `I have ${this.hands} hands and ${this.legs} legs. It is no suprise`;
    }
}

class Animal extends Entity {
    constructor(species, name, gender) {
        super(species, name, gender, 4);
    }
    saying() {
        return super.saying() + ` I am Proud to be ${this.species}`;
    }
}

class CatWoman extends Human {
    constructor(species, name, gender) {
        super(species, name, gender);

    }
}

const man = new Human('George', 'male');
const woman = new Human('Alisa', 'female');
const cat = new Animal('cat', 'Velik', 'male');
const dog = new Animal('dog', 'Hugo', 'male');
const catWoman = new CatWoman('cat-woman', 'Hinata', 'female');

print(man.saying());
print(woman.saying());
print(cat.saying());
print(dog.saying());
print(catWoman.saying());
