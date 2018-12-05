/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
let Creature = function(species, name, hands, legs, gender, phrase){
    this.species = species;
    this.name = name;
    this.hands = hands;
    this.legs = legs;
    this.gender = gender;
    this.phrase = phrase;
    this.friendList = [];
}
Creature.prototype.friends = function(...friend){
    friend.forEach(element => {
                this.friendList.push(element.name);
            });
}
const man = new Creature('human', 'Garry', 2, 2, 'male', 'Hi hello good bye');
const women = new Creature('human', 'Lori', 2, 2, 'female', 'Girl PWR');
const dog = new Creature('dog', 'Garold', 0, 4, 'male', 'Woof-woof');
const cat = new Creature('cat', 'Jinny', 0, 4, 'female', 'Meeeeooow');
const catWomen = new Creature('catwoman', 'Emma', 2, 2, 'female', cat.phrase);

man.friends(women, dog);
women.friends(man, cat);
cat.friends(women, catWomen);
dog.friends(man);
catWomen.friends(cat);
function info(obj){
    return obj.species + ';' + obj.name + ';' + obj.hands + ';' + obj.legs + ';' + obj.gender + ';' + obj.phrase + ';' + obj.friendList;
}
// ======== OUTPUT ========
print(info(man));
print(info(women));
print(info(dog));
print(info(cat));
print(info(catWomen));
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


