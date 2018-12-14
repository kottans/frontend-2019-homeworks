/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
    Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */
 // ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Creature {
  constructor(name, gender) {
    this.name = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    this.gender = gender;
  }
}

class Animal extends Creature {
  constructor(name, gender, hands=0, legs=4) {
    super(name, gender);
    this.legs = legs;
    this.hands = hands;
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super(name, gender);
    this.specie = 'dog';
    this.introduce = 'I am a dog';
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super(name, gender);
    this.introduce = 'I am a cat';
    this.specie = 'cat';
  }
}

class Human extends Creature {
  constructor(name, gender, hands=2, legs=2, specie='human') {
    super(name, gender);
    this.specie = specie;
    this.hands = hands;
    this.legs = legs;
  }
}

class Man extends Human{
  constructor(name, gender='male'){
      super(name);
      this.gender = gender;
      this.introduce = 'I am a drummer.';
  }
}

class Woman extends Human{
  constructor(name, gender='female'){
      super(name);
      this.introduce = 'I am a teacher.';
      this.gender = gender;
  }
}
  
const introduce = creature => {
  print(`<b>General information:</b>(Specie: <b>${creature.specie}</b>, Gender: <b>${creature.gender}</b>). Hello my name is: <b>${creature.name}</b>, I have: <b>${creature.legs}</b> legs and <b>${creature.hands ? creature.hands : "I have 0"}</b> hands. About myself: <b>${creature.introduce}</b>`, 'p');
};

const creaturesArray = [
  new Cat("flash", 'male'),
  new Dog("Daisy", 'femail'),
  new Man("Maks"),
  new Woman("Ira")
];

creaturesArray.map(creature => {
  introduce(creature);
});

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