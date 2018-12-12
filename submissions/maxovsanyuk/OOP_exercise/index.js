/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
    Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */
 // ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant{
  constructor(name,gender){ 
      this.name = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
  }
}
class Human extends Inhabitant{
  constructor(name) {
      super(name);
      this.specie = 'Human';
      this.legs = '2';
      this.hands = '2';
  }
}
class Man extends Human{
  constructor(name){
      super(name);
      this.gender = 'Male';
      this.introduce = 'I am a drummer.';
      this.expression = `<b>General information</b> ( ${this.specie}, ${this.gender} ). Hello my name is: <b>${this.name}</b>, I have: <b>${this.legs}</b> legs and <b>${this.hands}</b> hands. About myself: <b>${this.introduce}</b>`;
  }
}
class Woman extends Human{
  constructor(name){
      super(name);
      this.gender = 'Female';
      this.introduce = 'I am a teacher.';
      this.expression = `<b>General information</b> ( ${this.specie}, ${this.gender} ). Hello my name is: <b>${this.name}</b>, I have: <b>${this.legs}</b> legs and <b>${this.hands}</b> hands. About myself: <b>${this.introduce}</b>`;
  }
}
class Animal extends Inhabitant{
  constructor(name){
      super(name);
      this.specie = 'animal';
      this.legs = '4';
      this.hands = '0'; 
  }
}
class Cat extends Animal{
  constructor(name,gender){
      super(name, gender);
      this.gender = gender;
      this.introduce = 'I am a cat.';
      this.expression = `<b>General information</b> ( ${this.specie}, ${this.gender} ). Hello my name is: <b>${this.name}</b>, I have: <b>${this.legs}</b> legs and <b>${this.hands}</b> hands. About myself: <b>${this.introduce}</b>`;
  }
}
class Dog extends Animal{
  constructor(name,gender){
      super(name, gender);
      this.gender = gender;
      this.introduce = 'I am a dog.';
      this.expression = `<b>General information</b> ( ${this.specie}, ${this.gender} ). Hello my name is: <b>${this.name}</b>, I have: <b>${this.legs}</b> legs and <b>${this.hands}</b> hands. About myself: <b>${this.introduce}</b>`;
  }
}
const man = new Man('Maks');
const woman = new Woman('Ira');
const cat = new Cat('Daisy','Female');
const dog = new Dog('flash', 'Male');
print(man.expression);
print(woman.expression);
print(cat.expression);
print(dog.expression);
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