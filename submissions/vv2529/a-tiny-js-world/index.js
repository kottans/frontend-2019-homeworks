/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
	type: 'dog',
	name: 'Bobik',
	gender: 'male',
	legs: 4,
	hands: 0,
	says: 'Woof!'
},
cat = new Proxy({
	type: 'cat',
	name: 'Cutie',
	gender: 'female',
	legs: 4,
	hands: 0,
	says: 'Meow!'
}, {
	set: function(obj, prop, value){
		// When cat.says updates, catWoman.says also updates
		if(prop == 'says') catWoman.says = value;
		// Simulate default behavior
		obj[prop] = value;
	}
}),
woman = {
	type: 'human',
	name: 'Kate',
	gender: 'female',
	legs: 2,
	hands: 2,
	says: 'What a beautiful day!'
},
man = {
	type: 'human',
	name: 'Eric',
	gender: 'male',
	legs: 2,
	hands: 2,
	says: 'Lets go!'
},
catWoman = {
	type: 'half-cat/half-human',
	name: 'Felicia',
	gender: 'female',
	legs: 2,
	hands: 2,
	says: cat.says
};

// Cant set friends during initialization
dog.friends = [cat, woman, man];
cat.friends = [woman, catWoman];
woman.friends = [cat, man];
man.friends = [dog, woman];
catWoman.friends = [cat];

// ======== OUTPUT ========
[dog, cat, woman, man, catWoman].forEach(entity => {
	const props = [];
	['type', 'name', 'gender', 'legs', 'hands', 'says'].forEach(prop => {
		props.push(entity[prop]);
	});
	props.push(entity.friends.map(item => item.name).join(', '));
	print(props.join('; '));
});

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


