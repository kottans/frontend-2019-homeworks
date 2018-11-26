/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const Inhabition = function(specie, name, gender, legs, hands, saying) {
  this.specie = specie;
  this.name = name;
  this.gender = gender;
  this.legs = legs;
  this.saying = saying;
  this.handsString = +hands === 0 ? "no" : hands;
  this.hiString = `"${this.saying}"\n Hi. I'm ${this.name}. I'm a ${
    this.specie
  }. I have ${this.handsString} hands. I have ${this.legs} legs. And I'm a ${
    this.gender
  }\n `;
};

const dog = new Inhabition(
  "dog",
  "Mr. Pickles",
  "male",
  4,
  0,
  "MRRRR. PIIICLEEESSSS GOOOOD BOOOOOYYYY"
);
const cat = new Inhabition(
  "cat",
  "Felix",
  "male",
  4,
  0,
  "Felix the cat. The wonderful, wonderful cat!"
);
const man = new Inhabition("human", "Luntik", "male", 2, 2, "Ya rodilsya");
const woman = new Inhabition(
  "human",
  "Eva",
  "female",
  2,
  2,
  "Ya sozdana iz rebra"
);
print(cat.hiString);
print(dog.hiString);
print(man.hiString);
print(woman.hiString);
