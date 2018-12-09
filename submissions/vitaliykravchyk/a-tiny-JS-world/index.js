/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/vitaliykravchyk/a-tiny-JS-world/blob/gh-pages/index.js
   Web app: https://vitaliykravchyk.github.io/a-tiny-JS-world
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
    species: 'human',
    name: 'Garry',
    hands: 2,
    legs: 2,
    gender: 'male',
    phrase: 'Hi hello good bye',
}
const women = {
    species: 'human',
    name: 'Lori',
    hands: 2,
    legs: 2,
    gender: 'female',
    phrase: 'Girl PWR',
}
const dog = {
    species: 'dog',
    name: 'Garold',
    hands: 0,
    legs: 4,
    gender: 'male',
    phrase: 'Woof-woof',
}
const cat = {
    species: 'cat',
    name: 'Jinny',
    hands: 0,
    legs: 4,
    gender: 'female',
    phrase: 'Meeeeooow',
}
const catWomen = {
    species: 'catwoman',
    name: 'Emma',
    hands: 2,
    legs: 2,
    gender: 'female',
}
function friends(...friend){
    let friendList = [];
    friend.forEach(element => {
       friendList.push(element.name);
    });
    return friendList;
}
man.friendList = friends(women, dog);
women.friendList = friends(man, cat);
cat.friendList = friends(women, catWomen);
dog.friendList = friends(man);
catWomen.friendList = friends(cat);
catWomen.phrase = cat.phrase;
// ======== OUTPUT ========
print(man.species + ';' + man.name + ';' + man.hands + ';' + man.legs + ';' + man.gender + ';' + man.phrase + ';' + man.friendList);
print(women.species + ';' + women.name + ';' + women.hands + ';' + women.legs + ';' + women.gender + ';' + women.phrase + ';' + women.friendList);
print(dog.species + ';' + dog.name + ';' + dog.hands + ';' + dog.legs + ';' + dog.gender + ';' + dog.phrase + ';' + dog.friendList);
print(cat.species + ';' + cat.name + ';' + cat.hands + ';' + cat.legs + ';' + cat.gender + ';' + cat.phrase + ';' + cat.friendList);
print(catWomen.species + ';' + catWomen.name + ';' + catWomen.hands + ';' + catWomen.legs + ';' + catWomen.gender + ';' + catWomen.phrase + ';' + catWomen.friendList);
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


