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
	say : () => "Hello from Alex!",
	friends : ["Jenny", "LadyCat"]
};

let woman = {
	type : "human",
	name : "Jenny",
	gender : "female",
	legs : 2,
	hands : 2,
	say : () => "Hello from Jenny!",
	friends : ["Alex", "LadyCat"]
};

let cat = {
	type : "cat",
	name : "Murka",
	gender : "female",
	legs : 4,
	hands: 0,
	say : () => "Meow!",
	friends : ["Alex", "Jenny", "LadyCat"]
};

let dog = {
	type : "dog",
	name : "Rex",
	gender : "male",
	legs : 4,
	hands : 0,
	say : () => "Woff!",
	friends : ["Alex", "Jenny"]
};

let catWoman = {
	type : "catWoman",
	name : "LadyCat",
	gender : "female",
	legs : 2,
	hands : 2,
	say : () => cat.say(),
	friends : ["Alex", "Jenny", "Murka"]
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
	let {type, name, gender, legs, hands, say} = resident;
	let friends = resident.friends.join(", ");
	let items = [`<strong>${type}</strong>`, name, gender, legs, `${hands || ""}, ${friends || ""}`, say()];
	output = items.join(", ");
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
