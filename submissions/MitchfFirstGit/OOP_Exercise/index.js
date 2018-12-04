class Inhabitant {
  constructor(species, name, gender, legs, hands, saying, ...friends ) {
  this.species = species;
  this.name = name;
  this.gender = gender;
  this.legs = legs;
  this.hands = hands;
  this.saying = saying;
  this.friends =friends;
  }
  say(){
    if(!this.friends.length) this.friends = `I have no friends, I'm lonely in this world`;
    if(typeof(this.saying)==='object'){
      print(`species: ${this.species}; name: ${this.name}; gender: ${this.gender}; legs: ${this.legs}; hands: ${this.hands}; saying: ${this.saying.saying}; friends: ${this.friends}`, 'div');
    }
    else{ 
      print(`species: ${this.species}; name: ${this.name}; gender: ${this.gender}; legs: ${this.legs}; hands: ${this.hands}; saying: ${this.saying}; friends: ${this.friends}`, 'div');
    }
  }
}
const dog = new Inhabitant('dog', 'Toby', 'male', 4, 0, 'woof-woof', 'man', 'woman');
const cat = new Inhabitant('cat', 'Milka', 'female', 4, 0, 'meow-meow', 'man', 'woman');
const woman = new Inhabitant('woman', 'Emma', 'female', 2, 2, 'Hello everyone!', 'man', 'cat', 'dog');
const man = new Inhabitant('man', 'Alex', 'male',2, 2, 'Hello everyone!', 'dog', 'cat', 'woman');
const catWoman = new Inhabitant('catWoman', 'Mia', 'female',2, 2, cat);
dog.say();
cat.say();
woman.say();
man.say();
catWoman.say();