function Inhabitant(props) {
    this.name = props.name;
    this.sex = props.sex;
    this.sound = props.sound;
}

Inhabitant.prototype.toString  = function () {
    return Object.values(this).join('; ')
}

function Human(props) {
    Inhabitant.call(this, props)
    this.species = 'human';
    this.arms = 2;
    this.legs = 2;
}

function Cat(props) {
    Inhabitant.call(this, props);
    this.species = 'cat';
    this.sound = 'Meowing'
    this.legs = 4;
}

function Dog(props) {
    Inhabitant.call(this, props);
    this.species = 'dog';
    this.sound = 'Barking';
    this.legs = 4;
}

Human.prototype = Object.create(Inhabitant.prototype);
Cat.prototype = Object.create(Inhabitant.prototype);
Dog.prototype = Object.create(Inhabitant.prototype);

var jhon = new Human({
    name: 'Jhon',
    sex: 'male',
    sound: 'How your doin\''
});

var whitney = new Human({
    name: 'Whitney',
    sex: 'female',
    sound: 'Hello boys'
});

var houston = new Cat({
    name: 'Houston',
    sex: 'male'
});

var rex = new Dog({
    name: 'Rex',
    sex: 'male'
});

print(jhon);
print(whitney);
print(houston);
print(rex);