class Inhabitant {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }
}

class Human extends Inhabitant {
	constructor(name, gender){
		super(name, gender);
		this.species = "Human";
		this.hands = 2;
		this.legs = 2;
		this.saying = `Hello from ${this.name}`;
	}
}

class Animal extends Inhabitant {
	constructor(name, gender){
		super(name, gender);
		this.paws = 4;
	}
}

class Cat extends Animal {
	constructor(name, gender){
		super(name, gender);
		this.species = "Cat";
		this.saying = "Meow";
	}
}

class Dog extends Animal {
	constructor(name, gender){
		super(name, gender);
		this.species = "Dog";
		this.saying = "Woff";
	}
}

class catWoman extends Human {
	constructor(name, gender){
		super(name, gender);
		this.species = "catWoman";
		this.saying = new Cat().saying;
	}
}

let inhabitants = [new Human("Alex", "male"), new Human("Jenny", "female"), new Cat("Murka", "female"), new Dog("Rex", "male"), new catWoman("LadyCat", "female")];

const showInhabitant = ( inhabitant ) => {
	let{species, name, gender, hands, legs, paws, saying} = inhabitant;
	return (`<strong>${species}</strong>, ${name}, ${gender}, hands: ${hands || "0"}, legs: ${legs || "0"}, paws: ${paws || "0"}, saying: ${saying}`);
}

inhabitants.forEach(inhabitant => print(showInhabitant(inhabitant)));
