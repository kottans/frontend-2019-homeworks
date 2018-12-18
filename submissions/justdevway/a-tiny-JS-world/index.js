/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabited {
    constructor(species, legs, gender, name, phrase) {
        this.species = species;
        this.legs = legs;
        this.gender = gender;
        this.name = name;
        this.phrase = phrase;
    }

    sayAbout() {
        let str = 'My name is ' + this.name + '. And now, as any ' + this.species + ', I say "' + this.phrase + '!".';
        return str;
    }
}

class Human extends Inhabited {
    constructor(gender, name, friends, phrase) {
        super('human', 2, gender, name, 'Human, human');
        this.hands = 2;
        this.friends = friends;
        this.phrase = phrase;
    }

    sayAbout() {
        let str = '';
        let friends = this.friends;
        if(friends && friends.length) {
            let friendsName = 'So as any human I have friends: ';
            friends.forEach( (el, index) => {
                if(index == friends.length - 1) {
                 friendsName += `${el.name}.`;
                } else {
                    friendsName += `${el.name} and `;
                }
            });
            str += ` ${friendsName}`;
        }
        return super.sayAbout() + str;
    }
}

class Cat extends Inhabited {
    constructor(gender, name) {
        super('cat', 4, gender, name, 'Meo, meo, meo');
    }
}

class Dog extends Inhabited {
    constructor(gender, name) {
        super('dog', 4, gender, name, 'Rrrrrrr');
    }
}


const Robot1 = new Human('male', 'Robot1', [new Cat('male', 'Sun'), new Human('female', 'Ann', 'Hello from Ann')], 'I am a man');
const Robot2 = new Human('female', 'Robot2', [new Dog('male', 'Dark'), new Human('male', 'Jack', 'Hello from Jack')], 'I am a female');
const Robot3 = new Human('Bot', 'Computer', [Robot1], 'assembler');
const Bark = new Dog('male', 'Bark');
const Star = new Cat('female', 'Star');

const makeCatWoman = (name, friends) => {
    const tempObj = new Inhabited('human', 2, 'female', name);
    const phrase = new Cat().phrase;
    const sayAbout = new Inhabited().sayAbout;

    return Object.assign(
        {},
        tempObj,
        {
            hands: 2,
            phrase,
            friends,
            sayAbout
        }
    )
};





const catWoman = makeCatWoman('Cat Woman', [Robot1, Robot1]);

print('<div>' + Robot1.sayAbout() + '</div><hr>');
print('<div>' + Robot2.sayAbout() + '</div><hr>');
print('<div>' + Robot3.sayAbout() + '</div><hr>');
print('<div>' + Bark.sayAbout() + '</div><hr>');
print('<div>' + Star.sayAbout() + '</div><hr>');
print('<div>' + catWoman.sayAbout() + '</div><hr>');

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */