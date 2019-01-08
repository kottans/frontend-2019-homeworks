/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
class Inhab {
    constructor(nature, gender, name, says, legs, hands) {
        this.nature = nature;
        this.gender = gender;
        this.name = name;
        this.says = says;
        this.legs = legs;
        this.hands = hands;
        this.friends = [];
    }

    addFriend() {
        let arr = Array.prototype.slice.call(arguments);
        arr.forEach(e => this.friends.push(e));
    }

    about() {
        return [
          `${this.name} is a `,
          `${this.nature}. Sometime says: `,
          `${this.says} Has `,
          `${this.legs} legs, `,
          `${this.hands} hands. Friendly with: `,
          `${this.friends.map(e => e.name).join(', ')}. `,
          `${this.gender}, as you may guess.`
        ].join('');
    }
};

class Human extends Inhab {
    constructor(nature, gender, name, says, legs = 2, hands = 2) {
        super(nature, gender, name, says, legs, hands);
    }
};

class Animal extends Inhab {
    constructor(nature, gender, name, says, legs = 4, hands = 0) {
        super(nature, gender, name, says, legs, hands);
    }
};

const cat = new Animal('cat', 'female', 'Jessy', 'Wanna eat!');
const dog = new Animal('dog', 'male', 'Kim', 'Awa-waw!');
const woman = new Human('woman', 'female', 'Kate', 'I need hugs!');
const man = new Human('man', 'male', 'Justin', 'I love comics.');

cat.addFriend(man);
dog.addFriend(woman, man);
man.addFriend(woman, dog, cat);
woman.addFriend(man, dog);

[cat, dog, man, woman].forEach( e => { print(e.about()) });
