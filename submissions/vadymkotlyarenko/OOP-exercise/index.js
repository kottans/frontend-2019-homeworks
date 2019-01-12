/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var Inhabitant = function (species, name, gender, legs, hands, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
};

Inhabitant.prototype.printInformation = function() {
    var textToPrint = '';
    for (const key in this) {
        if (!this[key] || typeof(this[key]) === 'function') {
            continue;
        }
        if (key === 'friends') {
            if (this[key] && this[key].length){
                textToPrint += capitalizeFirstLetter(key) + '=>';
                for (var index = 0; index < this[key].length; index++) {
                    textToPrint +=  this[key][index].name + ','
                }
                textToPrint += ';';
            } else {
                textToPrint += capitalizeFirstLetter(key) + '=>' + this[key].name + ';'
            }
            continue;
        }
        if (key === 'saying') {
            textToPrint += capitalizeFirstLetter(key) + '=>' + (typeof(this[key]) === 'object' ? this[key].saying : this[key]) + ';'
            continue;
        }
        textToPrint += capitalizeFirstLetter(key) + '=>' + this[key] + ';'
    }
    print(textToPrint);
};
  
const dog = new Inhabitant('dog', 'Buddy','male', 4, 0 , 'woof-woof');
dog.printInformation();
const cat = new Inhabitant('cat', 'Garfield','male', 4, 0 , 'mew', dog);
cat.printInformation();
const man = new Inhabitant('human', 'Jonathan','male', 2, 2 , 'Hello!',[dog,dog]);
man.printInformation();
const woman = new Inhabitant('human', 'Megan','female', 2, 2 , 'Hi!');
woman.printInformation();
const catWomen = new Inhabitant('cat', 'Joe','female', 4, 0 , cat, dog);
catWomen.printInformation();

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


