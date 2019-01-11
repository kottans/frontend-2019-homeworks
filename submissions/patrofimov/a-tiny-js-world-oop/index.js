/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

function Inhabitant(species, name, gender, legs, hands) {

    this.species = species;
    this.name = name;
    this.gender = gender;
    this.hands = hands;
    this.legs = legs;
    this.friends = [];

};

Inhabitant.prototype.getDescription = function (delimiter = ';') {
    let rezult = [
    this.species,
    this.name,
    this.gender,
    this.legs,
    this.hands,
    this.saying,
    this.friends.length ? this.friends.map((friend) => friend.name).join(',') : ''
    ].join(delimiter);
    return rezult;
}

Inhabitant.prototype.addFriend = function (friend) {
    if (this.friends.indexOf(friend) === -1) {
        this.friends.push(friend);
        friend.friends.push(this);
    }
};

Inhabitant.prototype.saying = '';

function Dog(name, gender, legs = 2) {
    Inhabitant.call(this, 'dog', name, gender, legs, 0);
};
Dog.prototype = Object.create(Inhabitant.prototype);
Dog.prototype.saying = 'woof-woof!';

function Cat(name, gender, legs = 2) {
    Inhabitant.call(this, 'cat', name, gender, legs, 0);
};
Cat.prototype = Object.create(Inhabitant.prototype);
Cat.prototype.saying = 'meow-meow!';

function Man(name, gender, legs = 2, hands = 2) {
    Inhabitant.call(this, 'human', name, gender, legs, hands);
};
Man.prototype = Object.create(Inhabitant.prototype);
Man.prototype.saying = 'Hello, Bar!';

function Woman(name, gender, legs = 2, hands = 2) {
    Inhabitant.call(this, 'human', name, gender, legs, hands);
};

Woman.prototype = Object.create(Inhabitant.prototype);
Woman.prototype.saying = 'Hello, Ken!';

function WomanCat(name, gender, legs = 2, hands = 2) {
    Inhabitant.call(this, 'human', name, gender, legs, hands, 0);
};
WomanCat.prototype = Object.create(Inhabitant.prototype);
WomanCat.prototype.saying = Cat.prototype.saying;
let dog = new Dog('Toby', 'male');
let cat = new Cat('Julia', 'female');
let man = new Man('Ken', 'male');
let woman = new Woman('Barbi', 'female');
let womanCat = new WomanCat('Natali', 'female');

woman.addFriend(cat);
woman.addFriend(womanCat);
womanCat.addFriend(cat);
man.addFriend(woman);
man.addFriend(dog);
[woman, man, cat, dog, womanCat].forEach((inhabitant) => print(inhabitant.getDescription()));
