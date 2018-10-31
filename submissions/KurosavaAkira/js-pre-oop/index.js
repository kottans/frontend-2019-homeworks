// Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Species {
    constructor(species, name, phrase, gender, legs = 0, hands = 0) {
      this.species = species;
      this.name = name;
      this.phrase = phrase;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
    }
    
}

const dog = new Species('dog', 'Rvach', 'woof-woof', 'male', '4');
const cat = new Species('cat', 'Markiz', 'NONONONONONONO', 'male', '4');
const man = new Species('man', 'Sebastian', 'This us Kottaaans!', 'male', '2', '2');
const woman = new Species('woman', 'Eve', 'I like Earth', 'female', '2', '2');

let message = (obj) => {
    let string = '';
    for (var key in obj) {
        if (obj[key] != 0) {
            if (key === 'phrase') {
                string += `<em>${obj[key]}</em>; `;
            }
            else if (key === 'name') {
                string += `<strong>${obj[key]}</strong>; `;
            }
            else string += `${obj[key]}; `;
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


