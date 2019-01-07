/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/vv2529/a-tiny-JS-world
   Web app: https://vv2529.github.io/a-tiny-JS-world
   */

// ======== CLASS DEFINITIONS ========
class Inhabitant {
	constructor(type, name, gender, legs, says, friends = []){
		this.type = type;
		this.name = name;
		this.gender = gender;
		this.legs = legs;
		this.says = says;
		this.friends = friends;
	}
	toString(){
		const props = ['type', 'name', 'gender', 'legs', 'says'].map(prop => this[prop]);
		props.push(this.friends.map(item => item.name).join(', '));
		return props.join('; ');
	}
}

class Pet extends Inhabitant {
	constructor(type, name, gender, says){
		super(type, name, gender, 4, says);
	}
}
class Dog extends Pet {
	constructor(name, gender){
		super('dog', name, gender, 'Woof!');
	}
}
class Cat extends Pet {
	constructor(name, gender){
		super('cat', name, gender, 'Meow!');
	}
}

class Human extends Inhabitant {
	constructor(name, gender, says){
		super('human', name, gender, 2, says);
		this.hands = 2;
	}
	toString(){
		return super.toString() + '; ' + this.hands;
	}
}

class CatHuman extends Human {
	constructor(attachedTo, name, gender){
		super(name, gender, attachedTo.says);
		this.attachedTo = attachedTo;
	}
	get type(){
		return 'half-cat/half-human';
	}
	set type(value){}

	get says(){
		return this.attachedTo.says;
	}
	set says(value){}
}

// ======== OBJECT DEFINITIONS ========
const dog = new Dog('Bobik', 'male'),
cat = new Cat('Matilda', 'female'),
woman = new Human('Kate', 'female', 'What a beautiful day!'),
man = new Human('Eric', 'male', 'Lets go!'),
catWoman = new CatHuman(cat, 'Felicia', 'female');

dog.friends = [cat, woman, man];
cat.friends = [woman, catWoman];
woman.friends = [cat, man];
man.friends = [dog, woman];
catWoman.friends = [cat];

// ======== OUTPUT ========
[dog, cat, woman, man, catWoman].forEach(entity => print(entity));
