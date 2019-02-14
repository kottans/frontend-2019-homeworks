/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Vitaminvp/a-tiny-JS-world
   Web app: https://vitaminvp.github.io/a-tiny-JS-world
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const man = {
    species: 'human',
    gender: 'male',
    name: 'John',
    legs: 2,
    hands: 2,
    saying: 'boys will be boys.',
    friends: []
};
const woman = {
    species: 'human',
    gender: 'female',
    name: 'Sarah',
    legs: 2,
    hands: 2,
    saying: 'Love saves the world.',
    friends: []
};
const dog = {
    species: 'dog',
    gender: 'male',
    name: 'Toby',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!',
    friends: []
};
const cat = {
    species: 'cat',
    gender: 'female',
    name: 'Maya',
    legs: 4,
    hands: 0,
    saying: 'meow',
    friends: []
};
const catWoman= {
    species: woman.species,
    gender: woman.gender,
    name: 'Sophie',
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: []
};
man.friends = [woman, dog];
woman.friends = [man, cat];
dog.friends = [man, woman];
cat.friends = [woman];
catWoman.friends = [];

function printCreature(creature){
	return ['species', 'name', 'gender', 'legs', 'hands', 'saying']
			  .map(key => creature[key])
			  .concat(creature.friends.map(friend => friend.name))
			  .join('; ');
}

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

print(printCreature(man));
print(printCreature(woman));
print(printCreature(dog));
print(printCreature(cat));
print(printCreature(catWoman));

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */


