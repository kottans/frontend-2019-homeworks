// ======== OBJECTS DEFINITIONS ========
let Inhabitant = function(species, name, legs, hands, gender, phrase) {
  this.species = species;
  this.name = name;
  this.legs = legs;
  this.hands = hands;
  this.gender = gender;
  this.phrase = phrase;
}

let getInhabitantInfo = function(inhabitant) {
  return [inhabitant.species, inhabitant.name, inhabitant.legs, inhabitant.hands, inhabitant.gender, inhabitant.phrase].join("; ")
}

const dog = new Inhabitant('dog', 'Barsik', 4, 0, 'male', 'Woof woof', 'Alex', 'Bobby'),
      man = new Inhabitant('man', 'Max', 2, 2, 'male', 'Hello world!!'),
      woman = new Inhabitant('woman', 'Merry', 2, 2, 'female', 'Hello all'),
      cat = new Inhabitant('cat', 'Tom', 4, 0, 'male', 'Meow'),
      catWoman = new Inhabitant('cat-woman', 'Kitty', 2, 2, 'female', cat.phrase);
// ======== OUTPUT ========
print(getInhabitantInfo(dog));
print(getInhabitantInfo(man));
print(getInhabitantInfo(woman));
print(getInhabitantInfo(cat));
print(getInhabitantInfo(catWoman));