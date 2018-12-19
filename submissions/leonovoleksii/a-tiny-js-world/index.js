/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const man = {
    species: 'human',
    name: 'Sheldon',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Bazinga!',
    friends: ['Amy', 'Julia']
};

const cat = {
    species: 'cat',
    name: 'Vesta',
    gender: 'female',
    legs: 4,
    hands: 0,
    saying: 'Meow!',
    friends: ['Iron', 'Amy', 'Julia']
};

const dog = {
    species: 'dog',
    name: 'Iron',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'Woof!',
    friends: ['Vesta', 'Amy', 'Julia']
};

const woman = {
    species: 'woman',
    name: 'Amy',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Microbiology is my favourite field of science!',
    friends: ['Vesta', 'Iron', 'Sheldon']
};

const catWoman = {
    species: 'cat',
    name: 'Julia',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: ['Sheldon', 'Vesta', 'Iron']
};

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

function objectInfo(obj) {
    let line = '';
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof(obj[key]) === 'object') {
                line += obj[key].join(', ') + '; ';
            } else {
                line += obj[key] + '; ';
            }
        }
    }
    return line;
}

print(objectInfo(man), 'div');
print(objectInfo(woman), 'div');
print(objectInfo(dog), 'div');
print(objectInfo(cat), 'div');
print(objectInfo(catWoman), 'div');



