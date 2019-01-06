//Initalize and define Residents classes
/*Resident is a parent class and all future classes
will inherit from this class*/
class Resident {
  constructor(species, name, gender, voice, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.voice = voice;
    this.friends = friends;
    this.residentData;
  }
  setResidentData() {
    this.residentData = Object.values(this);
  }
  getResidentInfo() {
    this.setResidentData();
    print(this.residentData.join('; '));
  }
}
class Animal extends Resident {
  constructor(species, name, gender, voice, friends) {
    super(species, name, gender, voice, friends);
    this.paws = 4;
  }
  setResidentData() {
    super.setResidentData();
    this.residentData.splice(3, 0, this.residentData.pop());
  }
}
class Human extends Resident {
  constructor(species, name, gender, voice, friends) {
    super(species, name, gender, voice, friends);
    this.legs = 2;
    this.hands = 2;
  }
  setResidentData() {
    super.setResidentData();
    let limbs = this.residentData.splice(5, 2);
    this.residentData.splice(3, 0, limbs[0], limbs[1]);
  }
}
//Defining residents objects
const Dog = new Animal('dog', 'Princess', 'female', 'woof', 'Garry, Patrick, Wendy');
const Cat = new Animal('cat', 'Garry', 'male', 'meow', 'Princess, Patrick, Wendy, Kitty');
const Man = new Human('human', 'Patrick', 'male', 'How do you do?', 'Garry, Princess, Wendy, Kitty');
const Woman = new Human('human', 'Wendy', 'female', 'Hello my friends', 'Garry, Patrick, Princess');
//Group residents object in Array for future manipulations
const residents = [Dog, Cat, Man, Woman];
//call showResidentInfo method for each residents object
residents.forEach(num => num.getResidentInfo());
