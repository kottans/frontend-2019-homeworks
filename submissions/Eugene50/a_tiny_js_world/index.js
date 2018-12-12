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

let dog = new Citizens('dog','male','Sharik', 2, 4,'Gaf!!!');
let cat = new Citizens('cat', 'male', 'Murzik', 4, 0,'Mjau)' );
let man = new Citizens('human','male','Alex', 2, 2, 'Hello to All!!!');
let woman = new Citizens('human','female','Maria', 2, 2, 'I want coffee!!!');

print(`${dog.species}; ${dog.gender}; ${dog.name};  ${dog.legs}; ${dog.hands}; ${dog.say}`);
print(`${cat.species}; ${cat.gender}; ${cat.name};  ${cat.legs}; ${cat.hands}; ${cat.say}`);
print(`${man.species}; ${man.gender}; ${man.name};  ${man.legs}; ${man.hands}; ${man.say}`);
print(`${woman.species}; ${woman.gender}; ${woman.name};  ${woman.legs}; ${woman.hands}; ${woman.say}`);