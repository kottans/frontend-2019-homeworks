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

/* function showObject(params) {
     var output = '';
     for(var key in params){
         output  += key + ":" + params[key] + ";" + " ";
     }
     return output;
 }


print(showObject(man));
print(showObject(cat));
print(showObject(dog));
print(showObject(woman)); */

function keys(elm) {
    return Object.keys(elm);
}

var x = keys(man);
print(<strong>x[0]</strong> +':' + man.name+';'+' '+ x[1] +':'+ man.gender+';'+' '+ x[2]+':'+man.hands+';'+' '+x[3]+':'+man.legs+';'+' '+x[4]+':'+man.say);
var a = keys(cat);
print(a[0] +':' + cat.name+';'+' '+ a[1] +':'+ cat.gender+';'+' '+ a[2]+':'+cat.hands+';'+' '+a[3]+':'+cat.legs+';'+' '+a[4]+':'+cat.say);
var b = keys(dog);
print(b[0] +':' + dog.name+';'+' '+ b[1] +':'+ dog.gender+';'+' '+ b[2]+':'+dog.hands+';'+' '+b[3]+':'+dog.legs+';'+' '+b[4]+':'+dog.say)

// print(man.say);
// print(woman.name);
// print()
// print()


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