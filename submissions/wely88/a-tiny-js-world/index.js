/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/wely88/a-tiny-JS-world
   Web app: https: https://wely88.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
  species: 'dog',
  name: 'Baster',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'arrrrr-aaaargh!'
}

const cat = {
  species: 'cat',
  name: 'Seliodka',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow!'
}

const woman = {
  species: 'human',
  name: 'Anna',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Wow!'
}

const man = {
  species: 'human',
  name: 'Tod',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'What a nice day!'
}

const catWoman = {
  species: 'human',
  name: 'cat-woman',
  gender: 'female',
  legs: 2,
  hands: 2
}

dog.friends = [woman.name, man.name].join(', ')
cat.friends = cat.species
woman.friends = man.name
man.friends = [woman.name, dog.name].join(', ')
catWoman.saying = cat.saying
catWoman.friends = cat.friends

function showInhabitant(inhabitant){
	var obj = []
	for (var key in inhabitant){
		obj.push(inhabitant[key])  
	}
  return obj.join('; ')
}	

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
   
print(showInhabitant(dog))
print(showInhabitant(cat))
print(showInhabitant(woman))
print(showInhabitant(man))
print(showInhabitant(catWoman))

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */


