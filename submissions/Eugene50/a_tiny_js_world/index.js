/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

var cat = {
    name: "Murzik",
    gender: "male",
    hands: undefined,
    legs: 4,
    say: "Mjau"
}
var dog = {
    name: "Geltiy",
    gender: "male",
    hands: undefined,
    legs: 4,
    say: "GAFFF"
}
var woman = {
    name: "Maria",
    gender: "female",
    hands: 2,
    legs: 2,
    say: "Hello everybody!!"
}
var man = {
    name: "Serg",
    gender: "male",
    hands: 2,
    legs: 2,
    say: "Hi there!!!"
}

function showObject(params) {
     var output = '';
     for(var key in params){
         output  += key + ":" + params[key] + ";" + " ";
     }
     return output;
 }


print(showObject(man));
print(showObject(cat));
print(showObject(dog));
print(showObject(woman));




// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */