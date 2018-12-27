let Inhabitant = function (gender, name, saying) {
  this.gender = gender;
  this.name = name;
  this.saying = saying;
};

Inhabitant.prototype.makeMessage = function () {
  if (this.paws !== undefined) {
    return `Hello i am a <strong>${this.species}</strong>. My name is <strong>${this.name}</strong> and i am a ${this.gender}.I have <strong>${this.paws}</strong> paws and i saying: <em>${this.saying}</em><hr>`;
  } else {
    return `Hello i am a <strong>${this.species}</strong>. My name is <strong>${this.name}</strong> and i am a ${this.gender}.I have <strong>${this.legs}</strong> legs and <strong>${this.hands}</strong> hands and i saying: <em>${this.saying}</em><hr>`;
  }
};

let Dog = function (gender, name, saying) {
  Inhabitant.call(this, gender, name, saying);
  this.species = 'dog';
  this.paws = 4;
};

Dog.prototype = Object.create(Inhabitant.prototype);

let Cat = function (gender, name, saying) {
  Inhabitant.call(this, gender, name, saying);
  this.species = 'cat';
  this.paws = 4;
};

Cat.prototype = Object.create(Inhabitant.prototype);

let Human = function (gender, name, saying) {
  Inhabitant.call(this, gender, name, saying);
  this.species = 'human';
  this.legs = 2;
  this.hands = 2;
};

Human.prototype = Object.create(Inhabitant.prototype);

let Cathuman = function (gender, name) {
  Inhabitant.call(this, gender, name, cat, woman);
  this.species = 'cat-human';
  this.legs = 2;
  this.hands = 2;
  this.cat = cat;
  this.woman = woman;
  this.saying = this.sayMutate();
};

Cathuman.prototype = Object.create(Inhabitant.prototype);
Cathuman.prototype.sayMutate = function () {
  return `${this.woman.saying} and sometimes ${this.cat.saying}`;
};

let dog = new Dog('male', 'Toby', 'woof-woof!');
let cat = new Cat('female', 'Murka', 'meow-meow!');
let man = new Human('male', 'Vasiliy', 'I am hungry!');
let woman = new Human('female', 'Marusiya', 'Listen to me!');
let catwoman = new Cathuman('female', 'Selina Kyle');

print(dog.makeMessage());
print(cat.makeMessage());
print(man.makeMessage());
print(woman.makeMessage());
print(catwoman.makeMessage());
