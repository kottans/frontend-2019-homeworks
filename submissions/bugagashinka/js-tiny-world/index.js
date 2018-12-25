/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/bugagashinka/a-tiny-JS-world
   Web app: https://bugagashinka.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
var dog, cat, woman, man, catWoman;

dog = {
  species: 'dog',
  name: 'Frodo',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!',
};
cat = {
  species: 'cat',
  name: 'Mr.Smith',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'meeeeeeow',
};
woman = {
  species: 'human',
  name: 'Jany',
  gender: 'female',
  legs: 0,
  hands: 2,
  saying: 'I have a headache',
};
man = {
  species: 'human',
  name: 'Piter',
  gender: 'male',
  legs: 0,
  hands: 2,
  saying: 'Honey come on',
};
catWoman = {
  species: 'human',
  name: 'Kitty woman',
  gender: 'female',
  legs: 0,
  hands: 2,
  get saying() {
    return cat.saying;
  },
};
const props = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];
const inhabitants = [dog, cat, woman, man, catWoman];

woman.friends = [cat, man, catWoman];
man.friends = [woman, dog];
dog.friends = [man];
cat.friends = [woman, catWoman];
catWoman.friends = [woman, cat];

// ======== OUTPUT ========
inhabitants.forEach(inhabitant => {
  const info = props.map(prop => {
    if (prop === 'friends') {
      return inhabitant[prop].map(friend => friend.name).join(',');
    }
    return inhabitant[prop];
  });

  print(info.join('; '), 'div');
});
