/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/MitchfFirstGit/a-tiny-JS-world
   Web app: https://mitchffirstgit.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
    this.saying = `Hi, my name is ${this.name}. What about you?`;
  }
}
class Dog extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Dog"; 
    this.legs = 4;
  }
}
class Cat extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Cat";
    this.legs = 4;
  }
}
class Man extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Man";
    this.hands = 2;
    this.legs = 2;
  }
}
class Woman extends Inhabitant {
  constructor(name, gender) {
    super(name, gender);
    this.specie = "Woman";
    this.hands = 2;
    this.legs = 2;
  }
}
const inhabitantsArray = [ 
  new Dog('Toby', 'male'),
  new Cat('Milka', 'female'),
  new Man('Alex', 'male'),
  new Woman('Emma','female')
 ];
inhabitantsArray.forEach( inhabitant => print(`specie: ${inhabitant.specie}; name: ${inhabitant.name}; gender: ${inhabitant.gender}; hands: ${inhabitant.hands? inhabitant.hands: "Oh my God, I don't feel my hands, but wait a minute, I don't have them and it's okey for me hah"}; legs: ${inhabitant.legs}; saying: ${inhabitant.saying}`, 'div') );
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
