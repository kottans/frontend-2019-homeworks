/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature{
    constructor(name,gender,type){
            this.type = type;
            this.name = name;
            this.gender = gender;
    }
     getInfo(){
        let resArr = [`name: ${this.name}`,`type: ${this.type}`,` gender: ${this.gender}, `];
        return resArr.join();
    }


}
class Animal extends  Creature{
    constructor(name,gender,type){
        super(name,gender,type);
        this.legs = 4;
        this.hands = 0;
    }
    getInfo(){
        return super.getInfo() + `Legs: ${this.legs}, ` + `Hands: ${this.hands}, ` ;
    }

}
class Dog extends  Animal{
    constructor(name,gender,type = 'Dog'){
        super(name,gender,type);
        this.gender = gender;
        this.say = 'Woof!'
        }
    getInfo(){
        return super.getInfo() + `Say: ${this.say}`;
    }
}
class Cat extends Animal{
    constructor(name,gender,type = 'Cat'){
        super(name,gender,type);
        this.gender = gender;
        this.say = 'Woof!'

    }
    getInfo(){
        return super.getInfo() + `Say: ${this.say}`;
    }

}
class Human extends Animal{
    constructor(name,gender,type = 'Human'){
        super(name,gender,type);
        this.say = "Hello"
    }
    getInfo(){
        return super.getInfo() + `Say: ${this.say}`;
    }
}
let Population = [
    new Dog('Alfred','male'),
    new Cat('Lila','female'),
    new Human('Alisa','female'),
    new Human('Gianni','male')
]

Population.forEach((elem)=> print(elem.getInfo()));
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


