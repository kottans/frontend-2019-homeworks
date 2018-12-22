/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/igkostyuk/a-tiny-JS-world/blob/master/index.js
   Web app: https://igkostyuk.github.io/a-tiny-JS-world/
   */


// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
    species: "dog",
    name: "Toby",
    gender: "male",
    legs: 4,
    hands: 0,
    saying: "woof-woof!",
    friends: ["Artur"]
};
const cat = {
    species: "cat",
    name: "Tomy",
    gender: "male",
    legs: 4,
    hands: 0,
    saying: "meow-meow!",
    friends: ["Jane"]
};
const woman = {
    species: "human",
    name: "Jane",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: "Hey! I am a STRONG WOMAN",
    friends: ["Artur", "Tomy"]
};
const man = {
    species: "human",
    name: "Artur",
    gender: "male",
    legs: 2,
    hands: 2,
    saying: "All right everyone, listen up.",
    friends: ["Jane", "Toby"]
};
const catWoman = {
    species: "cat-woman",
    name: "Selina",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: ["Tomy"]
};
function output(obj) {
    let message = "";
    for (let key of Object.keys(obj)) {
        message += obj[key] + " ;";
    }
    return message;
}

// ======== OUTPUT ========
print(output(dog));
print(output(cat));
print(output(woman));
print(output(man));
print(output(catWoman));
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
