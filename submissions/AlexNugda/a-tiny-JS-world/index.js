/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
let man = {
	type : "human",
	name : "Alex",
	gender : "male",
	legs : 2,
	hands : 2,
	friends : ["Jenny", "LadyCat"],
	say : () => "Hello from Alex!"
};

let woman = {
	type : "human",
	name : "Jenny",
	gender : "female",
	legs : 2,
	hands : 2,
	friends : ["Alex", "LadyCat"],
	say : () => "Hello from Jenny!"
};

let cat = {
	type : "cat",
	name : "Murka",
	gender : "female",
	legs : 4,
	friends : ["Alex", "Jenny", "LadyCat"],
	say : () => "Meow!"
};

let dog = {
	type : "dog",
	name : "Rex",
	gender : "male",
	legs : 4,
	friends : ["Alex", "Jenny"],
	say : () => "Woff!"
};

let catWoman = {
	type : "catWoman",
	name : "LadyCat",
	gender : "female",
	legs : 2,
	hands : 2,
	friends : ["Alex", "Jenny", "Murka"],
	say : () => cat.say()
};

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
const showTinyJsWorldResident = (resident) => {
	let output = "";
	let {type, name, gender, legs} = resident;
	let hands = resident.hands;
	let friends = resident.friends.join(", ");
	let say = resident.say;
	output += `<strong>${type}</strong>, ${name}, ${gender}, ${legs}, ${hands || ""}, ${friends || ""}, ${say()}`;	
	return output;
}

print(showTinyJsWorldResident(man));
print(showTinyJsWorldResident(woman));
print(showTinyJsWorldResident(cat));
print(showTinyJsWorldResident(dog));
print(showTinyJsWorldResident(catWoman));
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */


