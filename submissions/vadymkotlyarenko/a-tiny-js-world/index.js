function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Inhabitant(species, name, gender, legs, hands, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
    this.getTextForPrint = function() {
        var textToPrint = '';
        for (const key in this) {
            if (!this[key] || typeof(this[key]) === 'function') {
                continue;
            }
            if (this[key] === friends) {
                if (this[key] && this[key].length){
                    textToPrint += capitalizeFirstLetter(key) + '=>';
                    for (var index = 0; index < this[key].length; index++) {
                        textToPrint +=  this[key][index].name + ','
                    }
                    textToPrint += ';';
                } else {
                    textToPrint += capitalizeFirstLetter(key) + '=>' + this[key].name + ';'
                }
                continue;
            }
            if (this[key] === saying) {
                textToPrint += capitalizeFirstLetter(key) + '=>' + (typeof(this[key]) === 'object' ? this[key].saying : this[key]) + ';'
                continue;
            }
            textToPrint += capitalizeFirstLetter(key) + '=>' + this[key] + ';'
        }
        return textToPrint;
    };
};
  
const dog = new Inhabitant('dog', 'Buddy','male', 4, 0 , 'woof-woof');
print(dog.getTextForPrint());
const cat = new Inhabitant('cat', 'Garfield','male', 4, 0 , 'mew', dog);
print(cat.getTextForPrint());
const man = new Inhabitant('human', 'Jonathan','male', 2, 2 , 'Hello!',[dog,dog]);
print(man.getTextForPrint());
const woman = new Inhabitant('human', 'Megan','female', 2, 2 , 'Hi!');
print(woman.getTextForPrint());
const catWomen = new Inhabitant('cat', 'Joe','female', 4, 0 , cat, dog);
print(catWomen.getTextForPrint());
