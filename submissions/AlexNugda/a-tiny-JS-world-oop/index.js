class Inhabitant{
	constructor(name, gender, species, saying){
		this.name = name;
		this.gender = gender;
		this.species = species;
		this.saying = saying || `Hello from ${this.name}`;
	}
	toString(){
		let inhabitantInfo = [`<strong>${this.species}</strong>`, this.name, this.gender, this.saying, ""];
		return inhabitantInfo.join(", ");
	}
}

class Human extends Inhabitant {
	constructor(name, gender, species){
		super(name, gender, species || "Human");
		this.hands = 2;
		this.legs = 2;
	}
	toString(){
		let inhabitantInfo = [`hands: ${this.hands}`, `legs: ${this.legs}`]; 
		return super.toString() + inhabitantInfo.join(", ");
	}
}

class Animal extends Inhabitant {
	constructor(name, gender, species, saying){
		super(name, gender, species, saying);
		this.paws = 4;
	}
	toString(){
		let inhabitantInfo = [`paws: ${this.paws}`]; 
		return super.toString() + inhabitantInfo.join();
	}
}

class Cat extends Animal {
	constructor(name, gender){
		super(name, gender, "Cat", "Meow");
	}
}

class Dog extends Animal {
	constructor(name, gender){
		super(name, gender, "Dog", "Woff");
	}
}

class CatWoman extends Human {
	constructor(name, gender){
		super(name, gender, "CatWoman");
		this.saying = new Cat().saying;
	}
}

let inhabitants = [new Human("Alex", "male"), new Human("Jenny", "female"), new Cat("Murka", "female"), new Dog("Rex", "male"), new CatWoman("LadyCat", "female")];

inhabitants.forEach(inhabitant => print(inhabitant));
