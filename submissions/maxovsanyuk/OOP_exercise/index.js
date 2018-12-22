/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
    Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */
 // ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Creature {
  constructor(name, gender, legs, hands, introduce) {
    this.name = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    this.gender = gender;
    this.hands = hands;
    this.legs = legs;
    
    this.introduce = introduce;
  }
  
  sayAboutSelf(){
  return `<b>General information</b>(Specie: <b>${this.specie}</b>, Gender: <b>${this.gender}</b>). Hello my name is: <b>${this.name}</b>, I have: <b>${this.legs}</b> legs and <b>${this.hands ? this.hands : "0"}</b> hands. About myself: <b>${this.introduce}</b>`;
  } 

}

class Dog extends Creature{
  constructor(name, gender) {
    super(name, gender);
    this.specie = 'dog';
    this.legs = 4;
    this.hands = 0;
    this.introduce = 'I am a dog';
  }
}

class Cat extends Creature{
  constructor(name, gender) {
    super(name, gender);
    this.specie = 'cat';
    this.legs = 4;
    this.hands = 0;
    this.introduce = 'I am a cat';
  }
}

class Man extends Creature{
  constructor(name){
      super(name);
      this.gender = 'male';
      this.specie = 'human';
      this.hands = 2;
      this.legs = 2;
      this.introduce = 'I am a drummer.';
  }
}

class Woman extends Creature{
  constructor(name){
      super(name);
      this.gender = 'female';
      this.specie = 'human';
      this.hands = 2;
      this.legs = 2;
      this.introduce = 'I am a teacher.';
  }
}

const creaturesArray = [
  new Man("Maks"),
  new Woman("Ira"),
  new Cat("flash", 'male'),
  new Dog("Daisy", 'female')
];

creaturesArray.map(creature => {
  print(creature.sayAboutSelf(), 'p');
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
