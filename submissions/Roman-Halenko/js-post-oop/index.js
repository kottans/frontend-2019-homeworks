/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitian {
    constructor(nature, gender, name, says, legs) {
        this.nature = nature;
        this.gender = gender;
        this.name = name;
        this.says = says;
        this.legs = legs;
        this.friends = [];
    }

    addFriend(...friendObjects) {
        this.friends = this.friends.concat(friendObjects);
    }

    about() {
        return [
          `name: ${this.name}`,
          `nature: ${this.nature}`,
          `says: ${this.says}`,
          `legs: ${this.legs}`,
          `friends: ${this.friends.map(e => e.name).join(', ')}`,
          `gender: ${this.gender}`
        ].join('; ');
    }
};

class Human extends Inhabitian {
    constructor(nature, gender, name, says, legs = 2, hands = 2) {
        super(nature, gender, name, says, legs);
        this.hands = hands;
    }

    about() {
        return super.about() + `; hands: ${this.hands};`;
    }
};

class Cat extends Inhabitian {
    constructor(nature, gender, name, says, legs = 4) {
        super(nature, gender, name, says, legs);
    }
};

class Dog extends Inhabitian {
    constructor(nature, gender, name, says, legs = 4) {
        super(nature, gender, name, says, legs)
    }
};

const cat = new Cat('cat', 'female', 'Jessy', 'Wanna eat!');
const dog = new Dog('dog', 'male', 'Kim', 'Awa-waw!');
const woman = new Human('woman', 'female', 'Kate', 'I need hugs!');
const man = new Human('man', 'male', 'Justin', 'I love comics.');

cat.addFriend(man);
dog.addFriend(woman, man);
man.addFriend(woman, dog, cat);
woman.addFriend(man, dog);

[cat, dog, man, woman].forEach( e => { print(e.about()) });
