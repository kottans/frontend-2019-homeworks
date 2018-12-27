/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kalash14/oop-exercise/blob/populate-world/index.js
   Web app: https://kalash14.github.io/oop-exercise/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {

	constructor(name, kind, gender, greetingsWord, favouriteDish) {
		this.name = name;
		this.kind = kind;
		this.gender = gender;
		this.greetingsWord = `${greetingsWord}!!!`;
		this.favouriteDish = favouriteDish;
	}

}

class Human extends Inhabitant {

    constructor(name, kind, gender, greetingsWord, favouriteDish, hands, legs, hairColor) {
        super(name, kind, gender, greetingsWord, favouriteDish);
        this.hands = hands;
        this.legs = legs;
        this.hairColor = hairColor;
    }

}

class Animal extends Inhabitant {

	constructor(name, kind, gender, greetingsWord, favouriteDish, paws, furColor) {
        super(name, kind, gender, greetingsWord, favouriteDish);
        this.paws = paws;
        this.furColor = furColor;
	}

}

const introduceCreature = (creature) => {

	return `<p>${creature.greetingsWord} Nice to meet you. My name is ${creature.name} and I'm ${creature.kind}. Also, I'm a ${creature.gender}. ${(creature.legs && creature.hands ? `I have ${creature.legs} legs and ${creature.hands} hands.` : '')} ${(creature.paws ? `I have ${creature.paws} paws.` : '')} My favourite dish is ${creature.favouriteDish}. ${(creature.hairColor ? `I have a ${creature.hairColor} hair.` : '')} ${(creature.furColor ? `I have a ${creature.furColor} fur.` : '')}  </p>`;

};

const inhabitantsArray = [

    new Animal('Sharik', 'dog', 'male', 'Bow-wow', 'meat', 4, 'white'),
    new Animal('Kuzia', 'cat', 'male', 'Meow-meow', 'boiled fish', 4, 'red'),
    new Human('Leila', 'woman', 'female', 'Hi', 'Cesar salad', 2, 2, 'orange'),
    new Human('Pedro Rodriguez', 'man', 'male', 'Hey, dude', 'Avocado sandwich', 2, 2, 'black')

];

const mainBlock = document.getElementById('main');
let inhabitantString = '';

inhabitantsArray.forEach(inhabitant => {

    inhabitantString += introduceCreature(inhabitant);

});

mainBlock.insertAdjacentHTML('beforeend',inhabitantString);

