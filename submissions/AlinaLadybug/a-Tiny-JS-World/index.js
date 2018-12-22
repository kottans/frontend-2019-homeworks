/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: "dog",
  name: "Didko",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof",
  friends: ["John", "Seba"]
};
const cat = {
  species: "cat",
  name: "John",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "meow",
  friends: ["Didko"]
};
const woman = {
  species: "human",
  name: "Polina",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Hi, beauty!",
  friends: ["Murmuletka", "Seba"]
};
const man = {
  species: "human",
  name: "Seba",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "What's up, man?",
  friends: ["Polina", "Didko"]
};
const catWoman = {
  species: "cat-woman",
  name: "Murmuletka",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends: ["Polina"]
};

// ======== OUTPUT ========
//another approach
function getMessage(obj) {
  var message = "";
    for (var key of Object.keys(obj)) {
        message += obj[key] + " ;";
    }
    return message;
}

print(getMessage(dog));
print(getMessage(cat));
print(getMessage(woman));
print(getMessage(man));
print(getMessage(catWoman));

