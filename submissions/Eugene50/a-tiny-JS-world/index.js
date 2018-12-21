class Citizens {
    constructor (species, gender, name, legs = '', hands = '', say){
     this.species = species;
     this.gender = gender;
     this.name = name;
     this.legs = legs;
     this.hands = hands;
     this.say = say;   
    }
};

let dog = new Citizens('dog','male','Sharik', 2, 4, 'Gaf!!!');
let cat = new Citizens('cat', 'male', 'Murzik', 4, 0, 'Mjau)' );
let man = new Citizens('human','male','Alex', 2, 2, 'Hello to All!!!');
let woman = new Citizens('human','female','Maria', 2, 2, 'I want coffee!!!');

const all = [man, woman, cat, dog];
all.forEach(element => {
    print(`${element.species}; ${element.gender}; ${element.name}; ${element.legs}; ${element.hands}; ${element.say}`);
})