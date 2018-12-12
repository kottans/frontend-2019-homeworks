class Citizens {
    constructor(species, gender, name, lags ='', hands = '', say){
     this.species = species;
     this.gender = gender;
     this.name = name;
     this.lags = lags;
     this.hands = hands;
     this.say = say;   
    }
};


 let dog = new Citizens('dog','male','Sharik',2, 4,'Gaf!!!');
 let cat = new Citizens('cat', 'male', 'Murzik', 4, 0,'Mjau)' );
 let man = new Citizens('human','male','Alex','2','2','Hello to All!!!');
 let woman = new Citizens('human','female','Maria','2','2','I want coffee!!!');

print(`${dog.species}; ${dog.gender}; ${dog.name};  ${dog.lags}; ${dog.hands}; ${dog.say} `);
print(`${cat.species}; ${cat.gender}; ${cat.name};  ${cat.lags}; ${cat.hands}; ${cat.say} `);
print(`${man.species}; ${man.gender}; ${man.name};  ${man.lags}; ${man.hands}; ${man.say} `);
print(`${woman.species}; ${woman.gender}; ${woman.name};  ${woman.lags}; ${woman.hands}; ${woman.say} `);