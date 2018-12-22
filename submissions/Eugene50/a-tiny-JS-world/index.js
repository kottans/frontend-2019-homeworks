class Citizens {
    constructor (species, gender, name, say, legs = 'null', hands = 'null' ){
     this.species = species;
     this.gender = gender;
     this.name = name;
     this.legs = legs;
     this.hands = hands;
     this.say = say;
    }
};

let dog = new Citizens('dog','male','Sharik','Gaf!!!', 4);
let cat = new Citizens('cat', 'male', 'Murzik','Mjau)', 4 );
let man = new Citizens('human','male','Alex','Hello to All!!!', 2, 2);
let woman = new Citizens('human','female','Maria','I want coffee!!!', 2, 2);

const all = [man, woman, cat, dog];
all.forEach(element => {
    print([element.species, element.gender, element.name, element.say, element.legs, element.hands].join('; '));
})