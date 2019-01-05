/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/krash1408/a-tiny-JS-world.git
   Web app: https://krash1408.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
let dog = {
    'inhabitant' : 'dog',
    'name' : 'Scooby',
    'gender' : 'male',
    'legs' : '4',
    'hands' : '0',
    'age' : '7',
    'phrase' : 'ScoobyDoobyDooo!'
},
cat = {
    'inhabitant' : 'cat',
    'name' : 'Simon',
    'gender' : 'male',
    'legs' : '4',
    'hands' : '0',
    'age' : '2',
    'phrase' : 'Prrrrrr...'
},
turtle = {
    'inhabitant' : 'turtle',
    'name' : 'Ugvey',
    'gender' : 'male',
    'legs' : '4',
    'hands' : '0',
    'age' : '178',
    'phrase' : 'Accidents are not accidental.'
},
man = {
    'inhabitant' : 'man',
    'name' : 'Jim',
    'gender' : 'male',
    'legs' : '2',
    'hands' : '2',
    'age' : '57',
    'phrase' : 'It`s show time!' 
},
woman = {
    'inhabitant' : 'woman',
    'name' : 'Margaret',
    'gender' : 'female',
    'legs' : '2',
    'hands' : '2',
    'age' : '94',
    'phrase' : 'Defeat? I do not understand the meaning of this word.'
}

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

print(dog.inhabitant + ' ; ' + dog.name + ' ; ' + dog.gender + ' ; ' + dog.legs + ' ; ' + dog.hands + ' ; ' + dog.age + ' ; ' + dog.phrase);
print(cat.inhabitant + ' ; ' + cat.name + ' ; ' + cat.gender + ' ; ' + cat.legs + ' ; ' + cat.hands + ' ; ' + cat.age + ' ; ' + cat.phrase);
print(turtle.inhabitant + ' ; ' + turtle.name + ' ; ' + turtle.gender + ' ; ' + turtle.legs + ' ; ' + turtle.hands + ' ; ' + turtle.age + ' ; ' + turtle.phrase);
print(man.inhabitant + ' ; ' + man.name + ' ; ' + man.gender + ' ; ' + man.legs + ' ; ' + man.hands + ' ; ' + man.age + ' ; ' + man.phrase);
print(woman.inhabitant + ' ; ' + woman.name + ' ; ' + woman.gender + ' ; ' + woman.legs + ' ; ' + woman.hands + ' ; ' + woman.age + ' ; ' + woman.phrase);