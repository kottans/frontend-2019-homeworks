/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

var entity = function (obj, species, name, gender, legs, hands, saying, friends) {
    obj.species = species;
    obj.name = name;
    obj.gender = gender;
    obj.legs = legs;
    obj.hands = hands;
    obj.saying = saying;
    obj.friends = friends;
    obj.infoEntityes = [species, name, gender, legs, hands, saying, friends].join("; ");

    return obj;
}

const dog = entity({}, 'dog', 'Tody', 'male', 4, 0, 'woof-woof!', ['Sharik', 'Anfisa']);
const cat = entity({}, 'cat', 'Kira', 'female', 4, 0, 'meow-meow!', ['Murka', 'Vaska']);
const woman = entity({}, 'human', 'Elena', 'female', 2, 2, 'I am a woman!', ['Anna', 'Jon']);
const man = entity({}, 'human', 'Alex', 'male', 2, 2, 'I am a man!', ['Tim', 'Petr']);
const catWoman = entity({}, 'human', 'Eleonora', 'female', 2, 2, cat.saying, ['Super-man', 'Spider-man']);

var entityes = [dog, cat, woman, man, catWoman];

entityes.forEach(element => {
    print(element.infoEntityes);
});
