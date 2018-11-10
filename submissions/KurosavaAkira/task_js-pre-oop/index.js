// Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
    constructor(name, gender, phrase, species, legs, hands, string = Inhabitant.message(name, gender, phrase, species, legs, hands)) {
      this.species = species;
      this.name = name;
      this.phrase = phrase;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
      this.string = string;
    }
    static message(name, gender, phrase, species, legs, hands) {
        let legs_string = legs === null ? '' : `${legs}; `;
        let hands_string = hands === null ? '' : `${hands}; `;
        return `${species}; ` + `<strong>${name}</strong>; ` + `<em>${phrase}</em>; ` + `${gender}; ` + legs_string + hands_string;
    }
}

class Human extends Inhabitant {
    constructor(name, gender, phrase, species = 'human', legs = 2, hands = 2, string = Inhabitant.message(name, gender, phrase, species, legs, hands)) {
        super(name, gender, phrase, species, legs, hands, string);
    }
}

class Dog extends Inhabitant {
    constructor(name, gender, phrase = 'woof-woof', species = 'dog' , legs = 4, hands = null, string = Inhabitant.message(name, gender, phrase, species, legs, hands)) {
        super(name, gender, phrase, species, legs, hands, string);
    }
}

class Cat extends Inhabitant {
    constructor(name, gender, phrase = 'Meow!', species = 'cat' , legs = 4, hands = null, string = Inhabitant.message(name, gender, phrase, species, legs, hands)) {
        super(name, gender, phrase, species, legs, hands, string);
    }
}

const inhabitant_id_1= new Dog('Rvach', 'male');
const inhabitant_id_2 = new Cat('Tora', 'male');
const inhabitant_id_3 = new Human('Igor', 'male', 'This is Kottaaans!');
const inhabitant_id_4 = new Human('Eve', 'female', 'I like Earth');

print(inhabitant_id_1.string, 'h3');
print(inhabitant_id_2.string, 'h3');
print(inhabitant_id_3.string, 'h3');
print(inhabitant_id_4.string, 'h3');

// ======== OUTPUT ========
// Use print(message) for output.
// Default tag for message is <pre>. Use print(message,'div') to change containing element tag.
// Massage can contain HTML markup.
// Feel free tweaking index.html and styles.css, just don't focus on output design too much.

// Examples:
// print('ABC');
// print('<strong>ABC</strong>');
// print('<strong>ABC</strong>', 'div');
// print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
// print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
// print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');


