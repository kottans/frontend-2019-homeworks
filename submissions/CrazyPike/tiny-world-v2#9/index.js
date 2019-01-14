/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Being {
    constructor(species,legs,name,gender,phrase){
        this.species = species;
        this.legs = legs;
        this.name = name;
        this.gender = gender;
        this.phrase = phrase;
    }
}

class Dog extends Being{
    constructor(legs,name,gender,phrase) {
        super('dog', legs,name,gender,phrase);


    }


}

class Cat extends Being{
    constructor(legs,name,gender,phrase) {
        super('cat',legs,name,gender,phrase);


    }


}

class Human extends Being{
    constructor(legs,hands,name,gender,phrase) {
        super('human',legs,name,gender,phrase);
        this.hands = hands

    }


}


const dog = new Dog(4,0,'Woof','male','Poof');
const cat = new Cat(4,0,'Cat','male','meow');
const woman = new Human(2,2,'Jenny','female','Jack');
const man = new Human(2,2,'Jack','male','Jenny');




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

print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
print(`${dog.species}; ${dog.name}; ${dog.gender}; ${dog.legs}; ${dog.hands}; ${dog.phrase}`);
print(`${cat.species}; ${cat.name}; ${cat.gender}; ${cat.legs}; ${cat.hands}; ${cat.phrase}`);
print(`${man.species}; ${man.name}; ${man.gender}; ${man.legs}; ${man.hands}; ${man.phrase}`);
print(`${woman.species}; ${woman.name}; ${woman.gender}; ${woman.legs}; ${woman.hands}; ${woman.phrase}`);
