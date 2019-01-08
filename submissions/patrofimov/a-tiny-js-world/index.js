/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */


var addFriend = function (friend) {
   
    if (this.friends.indexOf(friend) === -1) {
        this.friends.push(friend);
        friend.friends.push(this);
    }
};

const dog = {
    species: 'dog',
    name: 'Toby',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!',
    friends: [],
    addFriend: addFriend
};

const cat = {
    species: 'cat',
    name: 'Julia',
    gender: 'female',
    legs: 4,
    hands: 0,
    saying: 'meow-meow!',
    friends: [],
    addFriend: addFriend
};

const man = {
    species: 'human',
    name: 'Ken',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hello, Bar!',
    friends: [],
    addFriend: addFriend
};


const woman = {
    species: 'human',
    name: 'Barbi',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hello, Ken!',
    friends: [],
    addFriend: addFriend
};


const womancat = {
    species: 'human',
    name: 'Barbi',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: cat.saying,
    friends: [],
    addFriend: addFriend
};

woman.addFriend(cat);
woman.addFriend(womancat);

womancat.addFriend(cat);

man.addFriend(woman);
man.addFriend(dog);

let inhabitants = [woman, man, cat, dog, womancat];

let getDescription = function (inhabitant, delimiter = ';') {
    let rezult = [
    inhabitant.species,
    inhabitant.name,
    inhabitant.gender,
    inhabitant.legs,
    inhabitant.hands,
    inhabitant.saying,
    inhabitant.friends.length ? inhabitant.friends.map((friend) =>friend.name).join(',') : ''    
    ].join(delimiter);
    return rezult;
}

inhabitants.forEach((inhabitant) => {
    if (inhabitant.hands != 0) print(getDescription(inhabitant));
});