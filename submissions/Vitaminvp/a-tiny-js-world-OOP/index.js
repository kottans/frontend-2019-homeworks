/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
	constructor(species,  gender, name, legs, hands, saying) {
		this.species = species;
		this.legs    = legs;
		this.hands   = hands;
		this.name    = name;
		this.gender  = gender;
		this.saying  = saying;
		this.friends = [];
	}
    addFriends(...args){
        this.friends = [...args];
    }
	printCreature(){
		return ['species', 'gender', 'name', 'legs', 'hands', 'saying']
				  .map(key => `<strong>${this[key]}</strong>`)
				  .concat(this.friends.map(friend => `<em>${friend['name']}</em>`))
				  .join('; ');
	}
}

class SuperHero extends Creature {
    constructor(prototipe1, prototipe2, name, legs, hands) {
      super(null, null, name, legs, hands);
	  this.species = prototipe1.species + '-' + prototipe2.species;
	  this.gender  = prototipe1.gender;
      this.saying  = prototipe2.saying;
    }
}

const woman    = new Creature('human', 'female', 'Sarah', 2, 2, 'Love saves the world.');
const man      = new Creature('human', 'male', 'John', 2, 2, 'Boys will be boys.');
const cat      = new Creature('cat', 'female', 'Maya', 4, 0, 'Meow.');
const dog      = new Creature('dog', 'male', 'Toby', 4, 0, 'Woof-woof!');
const catWoman = new SuperHero(woman, cat, 'Sophie', 2, 2);
const dogMan   = new SuperHero(man, dog, 'Barsik', 2, 2);


woman.addFriends(man, cat);
man.addFriends(woman, dog);
dog.addFriends(woman, man);
catWoman.addFriends(cat, dog);
dogMan.addFriends(cat, dog, woman, man);

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
   [woman, man, cat, dog, catWoman, dogMan].map(creature => print(creature.printCreature()));

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */


