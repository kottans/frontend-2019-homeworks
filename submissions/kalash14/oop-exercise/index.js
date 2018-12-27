/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kalash14/oop-exercise/blob/populate-world/index.js
   Web app: https://kalash14.github.io/oop-exercise/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {

    constructor(name, gender, greetingsWord, kind, favouriteDish) {
        this.name = name;
        this.kind = kind;
        this.gender = gender;
        this.greetingsWord = greetingsWord;
        this.favouriteDish = favouriteDish;
    }

    introduceCreature () {
        return `<p>${this.greetingsWord}!!! Nice to meet you. My name is ${this.name} and I'm ${this.kind}. Also, I'm a ${this.gender}. ${(this.legs ? `I have ${this.legs} legs.` : '')} My favourite dish is ${this.favouriteDish}. </p>`;
    }

}

class Human extends Inhabitant {

    constructor(name, gender, greetingsWord, kind, favouriteDish, legs = 2) {
        super(name, gender, greetingsWord, kind, favouriteDish);
        this.legs = legs;
    }

}

class Animal extends Inhabitant {

	constructor(name, gender, greetingsWord, kind, favouriteDish, legs = 4) {
        super(name, gender, greetingsWord, kind, favouriteDish);
        this.legs = legs;
	}

}

class Dog extends Animal {
    constructor(name, gender, greetingsWord = 'Bow-wow', kind = 'dog', favouriteDish, legs) {
        super(name, gender, greetingsWord, kind, favouriteDish, legs);
    }
}

class Cat extends Animal {
    constructor(name, gender, greetingsWord = 'Meow', kind = 'cat', favouriteDish, legs) {
        super(name, gender, greetingsWord, kind, favouriteDish, legs);
    }
}

class Man extends Human {
    constructor(name, gender, greetingsWord, kind, favouriteDish, legs) {
        super(name, gender, greetingsWord, kind, favouriteDish, legs);
    }
}
class Woman extends Human {
    constructor(name, gender, greetingsWord, kind, favouriteDish, legs) {
        super(name, gender, greetingsWord, kind, favouriteDish, legs);
    }
}

const inhabitantsArray = [

    new Dog('Sharik', 'male', 'Bow-wow', 'dog', 'meat'),
    new Cat('Kuzia', 'male', 'Meow-meow', 'cat', 'boiled fish'),
    new Woman('Leila', 'female', 'Hi', 'woman', 'Cesar salad'),
    new Man('Pedro Rodriguez', 'male', 'Hey, dude', 'man', 'Avocado sandwich')

];

const mainBlock = document.getElementById('main');
let inhabitantString = '';

inhabitantsArray.forEach(inhabitant => {

    inhabitantString += inhabitant.introduceCreature();

});

mainBlock.insertAdjacentHTML('beforeend',inhabitantString);

