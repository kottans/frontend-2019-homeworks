/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/nazmariam/nazmariam.github.io/tree/master/a-tiny-js-world
   Web app: https://nazmariam.github.io/a-tiny-js-world/
*/
// ======== OBJECTS DEFINITIONS ========
function Citizen(species, name, gender, legs, hands, say) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.say = say;
}
function Animal(species, name, gender, say) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = 4;
    this.hands = 0;
    this.say = say;
}
Animal.prototype = Object.create(Citizen.prototype);
Animal.prototype.constructor = Animal;
function Human(name, gender, say) {
    this.species = 'human';
    this.name = name;
    this.gender = gender;
    this.legs = 2;
    this.hands = 2;
    this.say = say;
}
Human.prototype = Object.create(Citizen.prototype);
Human.prototype.constructor = Human;
function Dog(name, gender) {
    Animal.apply(this.arguments);
    this.species = 'dog';
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.say = 'bark-bark';
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
function Cat(name, gender){
    this.species = 'cat';
    this.name = name;
    this.gender = gender;
    this.legs = 4;
    this.hands = 0;
    this.say = 'meow';
}
Cat.prototype = Object.create(Citizen.prototype);
Cat.prototype.constructor = Cat;
function CatWoman(name){
    Cat.apply(this.arguments);
    this.species = 'human';
    this.name = name;
    this.gender = 'female';
    this.legs = 2;
    this.hands = 2;
    this.say = say;
}
CatWoman.prototype = Object.create(Cat.prototype);
CatWoman.prototype.constructor = CatWoman;
let citizens = [
    new Dog('Doggo','male'),
    new Cat('Kitty','female'),
    new Human('Meg White','female','I\'m gonna fight them off'),
    new Human('Jack White','male','A seven nation army couldn\'t hold me back'),
    new CatWoman('Selina Kyle')];
// ======== OUTPUT ========
citizens.forEach(el => {
    print("Hi! I'm a "+el.species+". My name is "+el.name+". My gender is: "+el.gender+". I have: "+el.legs+" legs and "+el.hands+" hands"+". I speak like this:\""+el.say+"\"");
});


