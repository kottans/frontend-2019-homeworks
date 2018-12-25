/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/bugagashinka/a-tiny-JS-world
   Web app: https://bugagashinka.github.io/a-tiny-JS-world/
   */

//Inheritance
function extend(ParentClass, ChildClass) {
  ChildClass.prototype = Object.create(ParentClass.prototype);
  ChildClass.prototype.constructor = ParentClass;
}

//Inhabit class declaration
function Inhabit(species, name, gender, saying) {
  this.species = species;
  this.name = name;
  this.gender = gender;
  this.saying = saying;
  this.friends = [];
}

Inhabit.prototype.addFriends = function(friends) {
  this.friends = this.friends.concat(friends);
};

//Animal class declaration
function Animal(species, name, gender, saying, legs = 4) {
  Inhabit.call(this, species, name, gender, saying);
  this.legs = legs;
}
extend(Inhabit, Animal);

//Cat class declaration
function Cat(name, gender, saying = 'Meow') {
  Animal.call(this, 'Cat', name, gender, saying);
}
extend(Animal, Cat);

//Dog class declaration
function Dog(name, gender, saying = 'Woof-woof') {
  Animal.call(this, 'Dog', name, gender, saying);
}
extend(Animal, Dog);

//Human class declaration
function Human(name, gender, saying = `Hello, my name is ${name}`) {
  Inhabit.call(this, 'Human', name, gender, saying);
  this.hands = 2;
}
extend(Inhabit, Human);

//CatWoman class declaration
function CatWoman(name) {
  Human.call(this, 'Cat woman', name, 'female');
}
extend(Human, CatWoman);

Object.defineProperties(CatWoman.prototype, {
  saying: {
    get: function() {
      return cat.saying;
    },
  },
});

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = new Dog('Frodo', 'male'),
  cat = new Cat('Mrs.Smith', 'female', 'Meeeeeeow'),
  woman = new Human('Jany', 'female', 'I have a headache'),
  man = new Human('Piter', 'male', 'Honey come on'),
  catWoman = new CatWoman('Kitty woman');

woman.addFriends([cat, man, catWoman]);
man.addFriends([woman, dog]);
dog.addFriends([man]);
cat.addFriends([woman, catWoman]);
catWoman.addFriends([woman, cat]);

const inhabitants = [dog, cat, woman, man, catWoman];
const props = [
  'species',
  'name',
  'gender',
  'legs',
  'hands',
  'saying',
  'friends',
];

// ======== OUTPUT ========
inhabitants.forEach(inhabitant => {
  const info = props.map(prop => {
    return prop === 'friends'
      ? inhabitant[prop].map(friend => friend.name).join(', ')
      : inhabitant[prop];
  });

  print(info.join('; '), 'div');
});
