/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Organism{
   constructor(species,gender,name,legs,hands,saying,friends){
   this.species=species;
   this.gender=gender;
   this.name=name;
   this.legs=legs;
   this.hands=hands;
   this.saying=saying;
   this.friends=undefined;
   }
   get Info(){
      return `I am ${this.species}-${this.gender}. My name is ${this.name}.I have ${this.legs} legs and ${this.hands} hands.`
      +(this.friends==undefined ? '...oh, i haven\'t friends' : `My friends are ${this.friends}`)
      +`.My favorite phrase is: <strong>${this.saying}</strong>`;
   }
}

let dog = new Organism('dog','male','Wolf','4','0','arf-aarf!');
let cat = new Organism('cat','female','Serafina','4','0','meeeow!');
let woman = new Organism('human','female','Oprah','2','2','Failure is another steppingstone to greatness.');
let man = new Organism('human','male','John','2','2','Your well-being depends on your own decisions.');
let catwoman = new Organism(woman.species+cat.species,woman.gender,'Vi','2','2',cat.saying);

dog.friends = `${cat.name} and ${man.name}`;
cat.friends = `${dog.name} and ${woman.name}`;
woman.friends = `${man.name} and ${cat.name}`;
man.friends = `${woman.name} and ${dog.name}`;
catwoman.friends = `${woman.name} and ${woman.friends}`
// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.
   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.*/
print(dog.Info);
print(cat.Info);
print(woman.Info);
print(man.Info);
print(catwoman.Info);
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */

