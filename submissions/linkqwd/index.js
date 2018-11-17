function Inhabitnat(props) {
    this.species = props.species;
    this.name = props.name;
    this.sex = props.sex;
    this.arms = props.arms;
    this.legs = props.legs;
    this.sound = props.sound;
    this.friends = props.friends;
    this.inhabitnatInfo = function() {
        return JSON.stringify(this)
        .split('')
        .map(function (el) {
            return el === '"' || el === '[' || el === ']' ? '' : el === ',' ? '; ' : el
        })
        .join('')
        .slice(1, -1);
    }
}

const man = new Inhabitnat({
    species: 'human',
    name: 'Jhon',
    sex: 'male',
    arms: 2,
    legs: 2,
    sound: 'Hello girls'
});

const woman = new Inhabitnat({
    species: 'human',
    name: 'Whitney',
    sex: 'female',
    arms: 2,
    legs: 2,
    sound: 'Hello boys',
    friends: ['Houston']
});

const cat = new Inhabitnat({
    species: 'cat',
    name: 'Houston',
    sex: 'male',
    legs: 4,
    sound: 'Meow-meow',
    friends: ['Whitney']
});

const dog = new Inhabitnat({
    species: 'dog',
    name: 'Rex',
    sex: 'male',
    legs: 4,
    sound: 'Barking'
});

const catWoman = new Inhabitnat({
    species: 'human',
    name: 'Selina',
    sex: 'female',
    arms: 2,
    legs: 2,
    sound: (typeof cat === 'undefined') ? 'Hello kitties' : cat.sound, 
    friends: ['Whitney', 'Houston']
});

print(man.inhabitnatInfo());
print(woman.inhabitnatInfo());
print(cat.inhabitnatInfo());
print(dog.inhabitnatInfo());
print(catWoman.inhabitnatInfo());