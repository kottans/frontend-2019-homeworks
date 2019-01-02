//Initalize and define Residents classes
/*Resident is a parent class and all future classes
will inherit from this class*/
class Resident {
  constructor(species, name, gender, legs, hands, voice, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.voice = voice;
    this.friends = friends;
  }
  showResidentInfo() {
    let residentData = Object.values(this);
    residentData = residentData.filter(num => num != 'paws');
    print(residentData.join('; '));
  }
}
class Animal extends Resident {
  constructor(species, name, gender, legs, hands, voice, friends) {
    super(species, name, gender, legs, hands, voice, friends);
  }
}
class Human extends Resident {
  constructor(species, name, gender, legs, hands, voice, friends) {
    super(species, name, gender, legs, hands, voice, friends);
  }
}
class Miracle extends Resident {
  constructor(species, name, gender, paws, hands, voice, friends) {
    super(species, name, gender, paws, hands, voice, friends);
  }
}
//Defining residents objects
const Dog = new Animal('dog', 'Princess', 'female', 4, 'paws', 'woof', 'Garry, Patrick, Wendy');
const Cat = new Animal('cat', 'Garry', 'male', 4, 'paws', 'meow', 'Princess, Patrick, Wendy, Kitty');
const Man = new Human('human', 'Patrick', 'male', 2, 2, 'How do you do?', 'Garry, Princess, Wendy, Kitty');
const Woman = new Human('human', 'Wendy', 'female', 2, 2, 'Hello my friends', 'Garry, Patrick, Princess');
const catWoman = new Miracle('human', 'Kitty', 'female', 2, 2, 'meow', 'Garry, Patrick');
//Group residents object in Array for future manipulations
const residents = [Dog, Cat, Man, Woman];
//call showResidentInfo method for each residents object
residents.forEach(num => num.showResidentInfo());
