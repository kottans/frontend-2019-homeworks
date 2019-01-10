

   /*Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

const dog = {
    species: "dog",
    name: "Mukhtar",
    legs: 4, 
    hands: 0,
    gender: "male",
    saying: "woof",
    friends: "Murchik, Yuriy"
}

const cat = {
    species: "cat",
    name: "Murchik",
    legs: 4,
    hands: 0,
    gender: "male",
    saying: "meow",
    friends: "Alina, Mukhtar, Yuriy"
}

const man = {
    species: "human",
    name: "Yuriy",
    legs: 2,
    hands: 2,
    gender: "male",
    saying: "Privet",
    friends: "Alina, Mukhtar, Murchik"
}

const woman = {
    species: "human",
    name: "Alina",
    legs: 2,
    hands: 2,
    gender: "female",
    saying: "Hello",
    friends: "Yuriy, Murchik"
}

function printInhabitant(obj) {
    print([obj.species, obj.name, obj.gender, obj.legs, obj.hands, obj.saying, obj.friends].join("; "));
}

[dog, cat, man, woman].forEach(element => {
    return printInhabitant(element);
});

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


