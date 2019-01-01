/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const allProps = ["type", "legs", "hands", "gender", "name", "saying", "friendList"];

class MainForm {
  constructor(type, legs, hands, gender, name, saying, friendList) {
    this.type = type;
    this.legs = legs;
    this.hands = hands;
    this.gender = gender;
    this.name = name;
    this.saying = saying;
    this.friendList = friendList;
  }

  toString() {
    return allProps
      .map(item => {
        if (Array.isArray(this[item])) {
          return this[item].join(", ");
        }
        return `${this[item]}`;
      })
      .join("; ");
  }

  showSaying() {
    return this.saying;
  }

  showFriendsList() {
    return `<em>${this.friendList}</em>`;
  }
}

class Human extends MainForm {
  constructor(legs, hands, gender, name, friendList, saying) {
    super("human", legs, hands, gender, name, saying, friendList);
  }
}

class Dog extends MainForm {
  constructor(legs, hands, gender, name, friendList, saying = "bark") {
    super("dog", legs, false, gender, name, saying, friendList);
  }
}

const Cat = (legs, gender, name, friendList) => {
  let state = {
    type: "cat",
    legs,
    gender,
    name,
    friendList,
    saying: "meow",
  }

  return Object.assign(
    {},
    new MainForm(state.type, state.legs, state.gender, state.name, state.saying, state.friendList)
  )
}

const CatWoman = (legs, hands, gender, name, friendList) => {
  let state = {
    legs,
    hands,
    gender,
    name,
    friendList,
  }

  return Object.assign(
    {},
    Cat(state.legs, state.gender, state.name, state.friendList)
  )
}


const man = new Human(2, 2, "male", "Andrew", "Hello, Eva!", [
  "Eva",
  "Masya"
]);
const woman = new Human(2, 2, "female", "Eva", "Hello, Andrew!", [
  "Andrew",
  "Barkl"
]);
const dog = new Dog(4, "male", "Barkl", "bark", [
  "Eva",
  "Andrew"
]);

const cat = Cat(4, "female", "Masya", ["Andrew"]);
const catWoman = CatWoman(2, 2, "female", "Eva", ["Andrew", "Barkl"]);
const allInhabitans = [man, woman, dog, cat, catWoman];

allInhabitans.forEach(item => print(item));
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
