/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Karasb888/a-tiny-JS-world
   Web app: https://karasb888.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

var dog = {
   species: 'dog' ,
   name: 'Tommy',
   gender:'male',
   legs: 4,
   hands: 0,
   saying:'uf-uf' ,
   output: function(){
     let message = '';
     for(key in dog){
       if(key !== 'output'){
        message+=dog[key] + ' ;';
     }
   }
     return message;
   }
};

var human = {
   species: 'human',
   name: 'Ivan',
   gender:'male' ,
   legs: 2,
   hands: 2,
   saying: 'kek kek',
   output: function(){
     let message = '';
     for(key in human){
       if(key !== 'output'){
        message+=human[key] + ' ;';
     }
   }
     return message;
   }
};

var robot = {
   species: 'robot',
   name: 'IO-42',
   gender: 'none',
   legs: 2,
   hands: 2,
   saying: 'kill all humans',
   output: function(){
     let message = '';
     for(key in robot){
       if(key !== 'output'){
        message+=robot[key] + ' ;';
     }
   }
     return message;
   }
};

var cat = {
   species: 'cat',
   name: 'Kitty' ,
   gender: 'female' ,
   legs: 4,
   hands: 0,
   saying: 'meow-meow',
   output: function(){
     let message = '';
     for(key in cat){
       if(key !== 'output'){
        message+=cat[key] + ' ;';
     }
   }
     return message;
   }
};

var cyborg = {
   species: 'cyborg',
   name: human.name + ' ' + robot.name,
   gender: human.gender,
   legs: human.legs,
   hands: human.hands,
   saying: `${human.saying} ${robot.saying} except Arnold Schwarzenegger` ,
   output: function(){
     let message = '';
     for(key in cyborg){
       if(key !== 'output'){
        message+=cyborg[key] + ' ;';
     }
   }
     return message;
   }
};

// ======== OUTPUT ========
print(dog.output(), 'div');
print(cat.output(), 'div');
print(human.output(), 'div');
print(robot.output(), 'div');
print(cyborg.output(), 'div');
