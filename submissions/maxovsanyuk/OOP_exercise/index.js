class Inhabitant {
    constructor(name, gender, specie, saying) {
        this.name  `${name.charAt(0).toUpperCase() + name.slice(1)}`;
        this.gender = gender;
        this.specie = specie;
        this.saying = saying;
    }
    introduce(){
      print(`<b>General information</b> ( ${this.specie}, ${this.gender} ). Hello my name is: <b>${this.name}</b>, I have: <b>${this.legs}</b> legs and <b>${this.hands? this.hands: "I don't have hands"}</b> hands. About myself: <b>${this.introduce}</b>`);
    }
  }
  class Dog extends Inhabitant {
    constructor(name, gender) {
      super(name, gender, 'Dog');
      this.legs = 4;
      this.saying = 'I am a dog.';
    }
  }
  class Cat extends Inhabitant {
    constructor(name, gender) {
      super(name, gender, 'Cat');
      this.legs = 4;
      this.saying = 'I am a cat.';
    }
  }
  class Man extends Inhabitant {
    constructor(name, gender) {
      super(name, gender, 'Man');
      this.hands = 2;
      this.legs = 2;
      this.saying = 'I am a drummer.';
    }
  }
  class Woman extends Inhabitant {
    constructor(name, gender) {
      super(name, gender, 'Woman');
      this.hands = 2;
      this.legs = 2;
      this.saying = 'I am a teacher.';
    }
  }
const inhabitantsArray = [ 
    man = new Man('Maks', 'male'),
    woman = new Woman('Ira', 'female'),
    cat = new Cat('Daisy','female'),
    dog = new Dog('flash', 'male')
];
inhabitantsArray.forEach( inhabitant => inhabitant.introduce());
