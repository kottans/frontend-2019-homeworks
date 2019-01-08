/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

let addFriend = function(friend) {
    if (this.friends.indexOf(friend) == -1) {
        this.friends.push(friend);
        friend.friends.push(this);
    }
}

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

listObj = [];
listObj.push(woman);
listObj.push(man);
listObj.push(cat);
listObj.push(dog);
listObj.push(womancat);

let objToString = function(obj, lim = ';') {
    let rezult = '';
    for (key in obj) {

        if (key == 'addFriend') {
            continue;
        } else if (key == 'friends') {
            for (let i = 0; i < obj[key].length; i++) {

                rezult = rezult + ((i == 0) ? '' : ',') + obj[key][i].name;
            }

        } else rezult += obj[key];
        rezult += lim;

    }
    return rezult;
}

listObj.forEach(function(obj) {
	if (obj.hands != 0)
    print(objToString(obj));
});
