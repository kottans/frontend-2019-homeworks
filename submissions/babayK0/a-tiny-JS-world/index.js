/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: 'dog',
   gender: 'male',
   name: 'Wolf',
   legs: '4',
   hands: '0',
   saying: 'arf-aarf!',
   friends: undefined
};
const cat = {
   species: 'cat',
   gender: 'female',
   name: 'Serafina',
   legs: '4',
   hands: '0',
   saying: 'meeeow!',
   friends: undefined   
};
const woman = {
   species: 'human',
   gender: 'female',
   name: 'Oprah',
   legs: '2',
   hands: '2',
   saying: 'Failure is another steppingstone to greatness.',
   friends: undefined
};
const man = {
   species: 'human',
   gender: 'male',
   name: 'John',
   legs: '2',
   hands: '2',
   saying: 'Your well-being depends on your own decisions.',
   friends: undefined
};
const catwoman= {
   species: woman.species,
   gender: woman.gender,
   name: 'Vi',
   legs: '2',
   hands: '2',
   saying: cat.saying,
   friends: undefined
};
dog.friends = `${cat.name} and ${man.name}`;
cat.friends = `${dog.name} and ${woman.name}`;
woman.friends = `${man.name} and ${cat.name}`;
man.friends = `${woman.name} and ${dog.name}`;
catwoman.friends = `${woman.name} and ${woman.friends}`

function creatingOrganism(obj){
      return `I am ${obj.species}-${obj.gender}. My name is ${obj.name}.I have ${obj.legs} legs and ${obj.hands} hands.`+(obj.friends==undefined ? '...oh, i haven\'t friends' : `My friends are ${obj.friends}`)+`.My favorite phrase is: <strong>${obj.saying}</strong>`;
}

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.
   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.*/
print(creatingOrganism(dog));
print(creatingOrganism(cat));
print(creatingOrganism(woman));
print(creatingOrganism(man));
print(creatingOrganism(catwoman));
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */


