/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
let being = {
    addFriend: function (friend) {
        this.friends.push(Object.assign(friend));
        friend.friends.push(Object.assign(this));
    }
};
let dog = {
    name: 'Hachiko',
    species: 'dog',
    gender: 'male',
    hands: 0,
    legs: 4,
    say: function () {
        return 'Woof!';
    },
    friends:[],
    addFriend: being.addFriend
};
let cat = {
    name: 'Akiko',
    species: 'cat',
    gender: 'female',
    hands: 0,
    legs: 4,
    say: function () {
        return 'Nya!';
    },
    friends:[],
    addFriend: being.addFriend
};

let woman = {
    name: 'Tomoe',
    species: 'human',
    gender: 'female',
    hands: 2,
    legs: 2,
    say: function () {
        return 'Of justice you will find none...';
    },
    friends:[],
    addFriend: being.addFriend
};
let man = {
    name: 'Oda',
    species: 'human',
    gender: 'male',
    hands: 2,
    legs: 2,
    say: function () {
        return 'If you wish for peace, then prepare for war';
    },
    friends:[],
    addFriend: being.addFriend
};
let catwoman = {
    name: 'Koneko',
    species: 'cathuman',
    gender: 'female',
    hands: 2,
    legs: 2,
    say: cat.say,
    friends:[],
    addFriend: being.addFriend
};
dog.addFriend(cat);
cat.addFriend(woman);
man.addFriend(dog);
catwoman.addFriend(cat);

function getInfo(being){
    return [
        `Name: ${being.name}`,
        `species: ${being.species}`,
        `gender: ${being.gender}`,
        `hands: ${being.hands}`,
        `legs: ${being.legs}`,
        `phrase:${being.say()}`,
        `friends:${being.friends.map(i => i.name).toString()}`
    ].join('; ');
}

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
print(getInfo(dog));
print(getInfo(cat));
print(getInfo(woman));
print(getInfo(man));
print(getInfo(catwoman));
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */


