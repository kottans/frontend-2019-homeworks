// Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
    constructor(species, name, phrase, gender, legs = 0, hands = 0) {
      this.species = species;
      this.name = name;
      this.phrase = phrase;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
    }
    phraseStyle() {
        return `<em>${this.phrase}</em>; `
    }
    nameStyle() {
        return `<strong>${this.name}</strong>; `
    }
}

const dog = new Inhabitant('dog', 'Rvach', 'woof-woof', 'male', '4');
const cat = new Inhabitant('cat', 'Markiz', 'NONONONONONONO', 'male', '4');
const man = new Inhabitant('human', 'Igor', 'This is Kottaaans!', 'male', '2', '2');
const woman = new Inhabitant('human', 'Eve', 'I like Earth', 'female', '2', '2');

let message = (obj) => {
    let string = '';
    for (var key in obj) {
        if (obj[key] != 0) {
            switch (key) {
                case 'phrase':
                    string += obj.phraseStyle();
                    break;
                case 'name':
                    string += obj.nameStyle();
                    break;
                default: string += `${obj[key]}; `;
                    break;
            }
        }
    }
    return string;
}

print(message(dog), 'h3');
print(message(cat), 'h3');
print(message(man), 'h3');
print(message(woman), 'h3');

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


