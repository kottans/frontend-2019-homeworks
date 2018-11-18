function Inhabitant(props) {
    this.species = props.species;
    this.name = props.name;
    this.sex = props.sex;
    this.arms = props.arms;
    this.legs = props.legs;
    this.sound = props.sound;
    this.friends = props.friends;
    this.getInhabitantInfo = function () {
        return this.species + '; '
            + this.name + '; '
            + this.sex + '; '
            + this.arms + '; '
            + this.legs + '; '
            + this.sound + '; '
            + this.friends
    }
}

const man = new Inhabitant({
    species: 'human',
    name: 'Jhon',
    sex: 'male',
    arms: 2,
    legs: 2,
    sound: 'Hello girls'
});

const woman = new Inhabitant({
    species: 'human',
    name: 'Whitney',
    sex: 'female',
    arms: 2,
    legs: 2,
    sound: 'Hello boys',
    friends: ['Houston']
});

const cat = new Inhabitant({
    species: 'cat',
    name: 'Houston',
    sex: 'male',
    legs: 4,
    sound: 'Meow-meow',
    friends: ['Whitney']
});

const dog = new Inhabitant({
    species: 'dog',
    name: 'Rex',
    sex: 'male',
    legs: 4,
    sound: 'Barking'
});

const catWoman = new Inhabitant({
    species: 'human',
    name: 'Selina',
    sex: 'female',
    arms: 2,
    legs: 2,
    sound: (typeof cat === 'undefined') ? 'Hello kitties' : cat.sound,
    friends: ['Whitney', 'Houston']
});

print(man.getInhabitantInfo());
print(woman.getInhabitantInfo());
print(cat.getInhabitantInfo());
print(dog.getInhabitantInfo());
print(catWoman.getInhabitantInfo());