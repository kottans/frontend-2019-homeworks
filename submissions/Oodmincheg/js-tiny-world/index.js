/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const Inhabition = function(specie, name, gender, legs, hands, saying){
    this.specie = specie;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying
    this.hands == 0 ? this.handsString = "no" : this.handsString = this.hands
    this.hiString = `"${this.saying}"\n Hi. I'm ${this.name}. I'm a ${this.specie}. I have ${this.handsString} hands. I have ${this.legs} legs. And I'm a ${this.gender}\n `
    
}

const dog = new Inhabition('dog', 'Mr. Pickles', 'male', 4, 0, "MRRRR. PIIICLEEESSSS GOOOOD BOOOOOYYYY")
const cat = new Inhabition('cat', 'Felix', 'male', '4', '0', 'Felix the cat. The wonderful, wonderful cat!')
const man = new Inhabition('human', 'Luntik', 'male', '2', '2', 'Ya rodilsya')
const woman = new Inhabition('human', 'Eva', 'female', '2', '2', 'Ya sozdana iz rebra')
print(cat.hiString);
print(dog.hiString);
print(man.hiString);
print(woman.hiString)

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


