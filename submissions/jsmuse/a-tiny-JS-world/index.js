const catSay = 'meow';

const dog = {
    species: 'dog',
    name: 'Toby',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!',
};

const cat = {
    species: 'cat',
    name: 'Markiz',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: catSay,
    friends: ['Mouse', 'Tom'],
};

const woman = {
    species: 'human',
    name: 'Sarah',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'hey, sweetheart!',
    friends: ['Rex', 'Tom', 'Jenn'],
};

const man = {
    species: 'human',
    name: 'Joe',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'hello there',
};

const catWoman = {
    species: 'cat-woman',
    name: 'Cat Woman',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: catSay,
};

const listObj = (obj) => {
    return [
        `${obj.species}`,
        `${obj.name}`,
        `${obj.gender}`,
        `${obj.legs}`,
        `${obj.hands}`,
        `${obj.saying}`,
        obj.friends && `${obj.friends}`,
    ].join('; ');
};

[dog, cat, woman, man, catWoman].forEach((item) => print(listObj(item)));
