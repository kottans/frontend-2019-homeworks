/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/o-msh/a-tiny-JS-world
   Web app: https://o-msh.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const output = function () {
    let props = [];
    Object.values(this).filter(prop => typeof prop !== "function").forEach(el => {
        if (typeof el === "object") {
            el.length > 0 ? props.push(el.map(deepEl => deepEl.name)) : false;
        } else {
            props.push(el);
        }
    });
    return props.join(";");
};

const dog = {
    species: "dog",
    name: "Kord",
    gender: "male",
    legs: 4,
    hands: 0, 
    saying: "woof!",
    friends: [],
    output: output
};

const cat = {
    species: 'cat',
    name: 'Whiskas',
    gender: "male",
    legs: 4,
    hands: 0,
    saying: 'meeow!',
    friends: [],
    output: output
};

const woman = {
    species: "human",
    name: "Michelle",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: "I'm a woman!",
    friends: [],
    output: output
};

const man = {
    species: "human",
    name: "Tony",
    gender: "male",
    legs: 2,
    hands: 2,
    saying: "I'm a man!",
    friends: [dog, cat, woman],
    output: output
};

const catWoman = {
    species: "human",
    name: "Dianne",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: [],
    output: output
};

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

print(dog.output());
print(cat.output());
print(woman.output());
print(man.output());
print(catWoman.output());