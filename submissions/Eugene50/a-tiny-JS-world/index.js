class Citizen {
    constructor (species, gender, name, say, legs = 0, hands = null ){
     this.species = species;
     this.gender = gender;
     this.name = name;
     this.legs = legs;
     this.hands = hands;
     this.say = say;
    }
 };
 
 class Human extends Citizen {
      constructor(species, gender, name, say, legs, hands ) {
         super(species, gender, name, say, 2, 2)
      }
 }
 class Animal extends Citizen {
      constructor(species, gender, name, say, legs ) {
          super(species, gender, name, say, 4)
      }
 }
 class Dog extends Animal {
      constructor(gender, name, say){
         super('dog', gender, name, say)
      }
 }
 class Cat extends Animal {
      constructor(gender, name, say){
         super('cat', gender, name, say)
      }
 }
 class Man extends Human {
      constructor(gender, name, say){
         super('human', gender, name, say)
      }
 }
 class Woman extends Human {
      constructor(gender,  name, say){
         super('human', gender, name, say )
      }
 }
 
 const dog = new Dog('male','Sharik','Gaf-gaf!!!');
 const cat = new Cat('male', 'Murzik','Mjau)');
 const man = new Man('male','Alex','Hello to All!!!');
 const woman = new Woman('female','Maria','I want coffee!!!');
 
 const all = [man, woman, cat, dog];
 all.forEach(element => {
    print([element.species, element.gender, element.name, element.say, element.legs, element.hands].join('; '));
 })
 