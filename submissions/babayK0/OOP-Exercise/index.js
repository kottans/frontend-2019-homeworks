/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const MALE = 'male';
const FEMALE = 'female';
class Organism{
   constructor(gender,name,saying,friends,species,legs,hands){
      this.species=species;
      this.gender=gender;
      this.name=name;
      this.saying=saying;
      this.friends=null;
      this.legs=legs;
      this.hands=hands;
   }
   get info(){
      return `I am ${this.species}-${this.gender}.My name is <strong>${this.name} </strong>.`
         +(this.hands=='0' ? `I have not hands but have ${this.legs} legs!`:`I have ${this.hands} hands and ${this.legs} legs!`)
         +(this.friends==null ? '...oh, i haven\'t friends:(':`My friends are ${this.friends}.`)
         +`My favorite phrase is: <strong>${this.saying}</strong>`;
   }
}
class Human extends Organism{
   constructor(gender,name,saying,friends,species='human',legs='2',hands='2'){
      super(gender,name,saying,friends,species,legs,hands);
   }
}
class Animal extends Organism{
   constructor(gender,name,saying,friends,species,legs='4',hands){
      super(gender,name,saying,friends,species,legs,hands);
   }
}
class Dog extends Animal{
   constructor(gender,name,saying,friends,species='dog',legs,hands='0'){
      super(gender,name,saying,friends,species,legs,hands);
      this.saying='argf-argf!';
   }
}
class Cat extends Animal{
   constructor(gender,name,saying,friends,species='cat',legs,hands='0'){
      super(gender,name,saying,friends,species,legs,hands);
      this.saying='meeoow!';
   }
}
class CatWoman extends Cat{
   constructor(gender,name,saying,friends,species='cat-woman',legs='2',hands='2'){
      super(gender,name,saying,friends,species,legs,hands);
   }
}
let dog = new Dog(MALE,'Wolf');
let cat = new Cat(FEMALE,'Serafina');
let woman = new Human(FEMALE,'Oprah','Failure is another steppingstone to greatness.');
let man = new Human(MALE,'John','Your well-being depends on your own decisions.');
let catwoman = new CatWoman(FEMALE,'Vi');

dog.friends = `${cat.name} and ${man.name}`;
cat.friends = `${dog.name} and ${woman.name}`;
woman.friends = `${man.name} and ${cat.name}`;
man.friends = `${woman.name} and ${dog.name}`;
catwoman.friends = `${woman.name} and ${woman.friends}`
// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.
   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.*/
print(dog.info);
print(cat.info);
print(woman.info);
print(man.info);
print(catwoman.info);
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */

