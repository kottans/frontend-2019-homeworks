/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kalash14/a-tiny-JS-world/blob/populate-world/index.js
   Web app: https://kalash14.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

let inhabitant = function(species, name, gender, legs, hands, saying){
	
	this.species = species;
	this.name = name;
	this.gender = gender;
	this.legs = legs;
	this.hands = hands;
	this.saying = saying;
	
};

let dog = new inhabitant('dog', 'Sharik', 'male', 4, 0, 'Bow-wow!');
let cat = new inhabitant('cat', 'Pushok', 'male', 4, 0, 'Meoooow!!!');
let woman = new inhabitant('woman', 'Elizabeth Taylor', 'female', 2, 2, 'Hello!');
let man = new inhabitant('man', 'John Doe', 'male', 2, 2, 'Hi!');



// ======== OUTPUT ========
   
print('<strong>Dog greetings</strong>');
print('<blockquote>' + dog.saying + '</blockquote>');
print(' You hear ' + dog.species + ' ' + dog.name + '. He likes playing with ' + cat.name + ' and he also has ' + dog.legs + ' paws.', 'div');
print('<hr>');
print('<strong>Cat greetings</strong>');
print('<blockquote>' + cat.saying + ' ' + cat.saying + '</blockquote>');
print(' It\'s ' + cat.species + ' ' + cat.name + ' asks for eating this big fish ' + 'and he has ' + cat.legs + ' paws.', 'div', 'div');
print('<hr>');
print('<strong>Woman greetings</strong>');
print('<blockquote>' + woman.saying + '</blockquote>');
print(' I\'m ' + ' ' + woman.name + ' and I work as a teacher. Also I am a ' + woman.gender + ' ' + 'and I have ' + woman.legs + ' legs and ' + woman.hands + ' hands.', 'div');
print('<hr>');
print('<strong>Man greetings</strong>');
print('<blockquote>' + man.saying + '</blockquote>');
print(' My name is ' + man.name + ' and I like to travel.' + ' I\'m a 23 years old ' + man.gender + ' ' + 'and I have ' + man.legs + ' legs and ' + man.hands + ' hands.', 'div');
print('<hr>');
print('<br>');


