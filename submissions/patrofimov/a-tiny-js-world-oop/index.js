/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

function Inhabitant(name, gender, species) {

    this.species = species;
    this.name = name;
    this.gender = gender;
    this.friends = [];

};


Inhabitant.prototype.addFriend = function (friend) {
    if (this.friends.includes(friend)) {
        this.friends.push(friend);
        friend.friends.push(this);
    }
};

Inhabitant.prototype.saying = 'Hello';

Inhabitant.prototype.getDescription = function (delimiter = ';') {

    let rezult = [
    this.species,
    this.name,
    this.gender,
    this.legs,
        (this.species === 'human') ? this.hands : 'no',
    this.saying,
    this.friends.length ? this.friends.map((friend) => friend.name).join(',') : ''
    ].join(delimiter);
    return rezult;
}


function Animal(name, gender, species, legs = 4) {
    Inhabitant.call(this, name, gender, species);
    this.legs = legs;
}

function Human(name, gender, species = 'human', hands = 2, legs = 2) {
    Inhabitant.call(this, name, gender, species);
    this.hands = hands;
    this.legs = legs;
}

function Dog(name, gender, species = 'dog', legs) {
    Animal.call(this, name, gender, species, legs);
};
Dog.prototype = Object.create(Inhabitant.prototype);
Dog.prototype.saying = 'woof-woof!';

function Cat(name, gender, species = 'cat', legs) {
    Animal.call(this, name, gender, species, legs);
};
Cat.prototype = Object.create(Inhabitant.prototype);
Cat.prototype.saying = 'meow-meow!';

function Man(name, gender, species, hands, legs) {
    Human.call(this, name, gender, species, hands, legs);
};
Man.prototype = Object.create(Inhabitant.prototype);
Man.prototype.saying = 'Hello, Bar!';

function Woman(name, gender, species, hands, legs) {
    Human.call(this, name, gender, species, hands, legs);
};

Woman.prototype = Object.create(Inhabitant.prototype);
Woman.prototype.saying = 'Hello, Ken!';

function WomanCat(name, gender, species, legs, hands) {
    Human.call(this, name, gender, species, hands, legs);
};
WomanCat.prototype = Object.create(Inhabitant.prototype);
WomanCat.prototype.saying = Cat.prototype.saying;

const dog = new Dog('Toby', 'male');
const cat = new Cat('Julia', 'female');
const man = new Man('Ken', 'male');
const woman = new Woman('Barbi', 'female');
const womanCat = new WomanCat('Natali', 'female');

woman.addFriend(cat);
woman.addFriend(womanCat);
womanCat.addFriend(cat);
man.addFriend(woman);
man.addFriend(dog);
[woman, man, cat, dog, womanCat].forEach((inhabitant) => print(inhabitant.getDescription()));
