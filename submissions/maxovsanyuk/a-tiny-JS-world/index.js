/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here


class Inhabitant{
    constructor(specie, name, gender, legs, hands, introduce){
        this.specie = specie;
        this.name = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands === 0 ? '0': undefined;
        this.introduce = introduce;
        this.expression = `<b>General information</b> ( ${specie}, ${gender} ). Hello my name is: <b>${this.name}</b>.  I'm a ,and I have: <b>${this.legs}</b> legs and <b>${this.hands}</b> hands. About myself: <b>${this.introduce}</b>`;
    }
}

const man = new Inhabitant('human', 'Maks', 'male', 2, 2, 'I am a drummer.');
console.log(man);
const woman = new Inhabitant('human', 'Ira', 'female', 2, 2, 'I am a teacher.');
const cat = new Inhabitant('animal', 'pushok', 'male', 4, 0, 'I am a cat.');
const dog = new Inhabitant('animal', 'flash', 'male', 4, 0, 'I am a dog.');

print(man.expression, 'li');
print(woman.expression, 'li');
print(cat.expression, 'li');
print(dog.expression, 'li');


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


