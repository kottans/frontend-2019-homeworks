/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

//Return string of all property obj values
function toString(obj) {
  return allProps
    .map(item => {
      if (Array.isArray(obj[item])) {
        return obj[item].join(", ");
      }
      return `${obj[item]}`;
    })
    .join("; ");
}

const allProps = [
  "type",
  "legs",
  "hands",
  "gender",
  "name",
  "saying",
  "friendList"
];

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

  say() {
    return this.saying;
  }

  friends() {
    return `<em>${this.friendList}</em>`;
  }
}

class Cat extends MainForm {
  constructor(type, legs, hands, gender, name, friendList, saying = "meow") {
    super(type, legs, hands, gender, name, saying, friendList);
  }
}

const man = new MainForm("human", 2, 2, "male", "Andrew", "Hello, Eva!", [
  "Eva",
  "Masya"
]);
const woman = new MainForm("human", 2, 2, "female", "Eva", "Hello, Andrew!", [
  "Andrew",
  "Barkl"
]);
const dog = new MainForm("animal", 4, 0, "male", "Barkl", "bark", [
  "Eva",
  "Andrew"
]);

const cat = new Cat("animal", 4, 0, "female", "Masya", ["Andrew"]);

const catWoman = new Cat("human", 2, 2, "female", "Eva", ["Andrew", "Barkl"]);

print(toString(man));
print(toString(woman));
print(toString(dog));
print(toString(cat));
print(toString(catWoman));
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
