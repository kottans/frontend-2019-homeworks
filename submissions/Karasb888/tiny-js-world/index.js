/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Karasb888/a-tiny-JS-world
   Web app: https://karasb888.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

var Inhabits = function (species, name, gender, legs, hands, saying) {
  this.species = species;
  this.name = name;
  this.gender = gender;
  this.legs = legs;
  this.hands = hands;
  this.saying = saying;
};

Inhabits.prototype.output = function() {
  let message = '';
  for(key in this){

    if(key !== 'output'){
     message += this[key] + ' ';
    }

  }
  return message;

};
var dog = new Inhabits('dog', 'Tommy', 'male', 4, 0, 'uf-uf');
var human = new Inhabits('human', 'Ivan', 'male', 2, 2, 'kek kek');
var robot = new Inhabits('robot', 'IO-42', 'none', 2, 2, 'kill all humans');
var cat = new Inhabits('cat', 'Kitty', 'female', 4, 0, 'meow-meow');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var Mutant = function(species, first, second){
  var params = [];
  for(key in first){
  let random = getRandomInt(1, 4);

  switch (random){
    case 1:
    typeof first[key] === 'number' ? params.push(first[key] + second[key]) : params.push(first[key] + ' - ' + second[key]);
    break;

    case 2:
    params.push(first[key]);
    break;

    case 3:
    params.push(second[key]);
    break;

  }
}
  Inhabits.apply(this, params);
  this.saying = `${first.saying} ${second.saying} I AM ALIIIIIVEEEEEEE` ;
}

Mutant.prototype = Inhabits.prototype;

var cyborg = new Mutant('cyborg', human, robot);
var catHuman = new Mutant('cat-women', cat, human);
var dogRobot = new Mutant('dogRobot', dog, robot);

// ======== OUTPUT ========
print(dog.output(), 'div');
print(cat.output(), 'div');
print(human.output(), 'div');
print(robot.output(), 'div');
print(cyborg.output(), 'div');
print(catHuman.output(), 'div');
print(dogRobot.output(), 'div');
