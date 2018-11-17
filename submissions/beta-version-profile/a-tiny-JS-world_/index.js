/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/beta-version-profile/a-tiny-JS-world
   Web app: https://beta-version-profile.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Alfa {
  constructor(species, name, gender, legs, hands, saying) {
    this.species = species
    this.legs = legs
    this.hands = hands
    this.name = name
    this.gender = gender
    this.saying = saying
  }
  say(){ 
    print(`species: <strong>${this.species}</strong>; name: <strong>${this.name}</strong>; gender: <strong>${this.gender}</strong>; legs: <strong>${this.legs}</strong>; hands: <strong>${this.hands}</strong>; saying: <strong>${this.saying}</strong>;`
    )
  }
}
class Cat extends Alfa {
    constructor(species, name, gender, legs, hands) {
      super(species, name, gender, legs, hands)
      this.saying = 'meow - meow'
    }
}

const catwoman = new Cat('human', 'Jenny', 'woman', 2, 2, 'Hello, world!!!')
const woman = new Alfa('human', 'Lana', 'woman', 2, 2, 'Hello, world!!!') 
const cat = new Cat('cat', 'Anna', 'woman', 4, 0, 'meow - meow')
const man = new Alfa('human', 'Tom', 'man', 2, 2, 'my code works i don\'t know why')
const dog = new Alfa('dog', 'Toby', 'male', 4, 0, 'woof - woof')

catwoman.say()
dog.say()
cat.say()
man.say()
woman.say()



// ... other objects ...
// print(dog.species + ';' + dog.name + ';' + dog.gender + ';' + 
//   dog.legs + ';' + dog.hands + ';' + dog.saying);


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


