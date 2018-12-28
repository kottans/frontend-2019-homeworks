// ======== OBJECTS DEFINITIONS ========
function Inhabitant(species, name, legs, hands, gender, phrase) {
   return {
      species: species,
      name: name,
      legs: legs,
      hands: hands,
      gender: gender,
      phrase: phrase,
      // friends: arguments.slice(6),
      getInfo: function() {
         return [species, name, legs, hands, gender, phrase].join("; ");
      }
   }
}
const dog = Inhabitant('dog', 'Barsik', 4, 0, 'male', 'Woof woof', 'Alex', 'Bobby'),
      man = Inhabitant('man', 'Max', 2, 2, 'male', 'Hello world!!'),
      woman = Inhabitant('woman', 'Merry', 2, 2, 'female', 'Hello all'),
      cat = Inhabitant('cat', 'Tom', 4, 0, 'male', 'Meow'),
      catWoman = Inhabitant('cat-woman', 'Kitty', 2, 2, 'female', cat.phrase);
// ======== OUTPUT ========
print(dog.getInfo());
print(man.getInfo());
print(woman.getInfo());
print(cat.getInfo());
print(catWoman.getInfo());