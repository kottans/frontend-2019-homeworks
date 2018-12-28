var dog = { kind:"animal",
            who:"dog",
            legs:"4",
            hands:"0",
            name:"Rex",
            gender:"male",
            say:"woof-woof!",
            friend:"Mary, Jon"};

var cat = { kind:"animal",
            who:"cat",
            legs:"4",
            hands:"0",
            name:"Lisa",
            gender:"female",
            say:"meow!"};

var woman = { kind:"human",
              who:"woman",
              legs:"2",
              hands:"2",
              name:"Mary",
              gender:"female",
              say:"Hello Jon!",
              friend:"Mary, Rex"};

var man = { kind:"human",
            who:"man",
            legs:"2",
            hands:"2",
            name:"Jon",
            gender:"male",
            say:"Hello Mary!",
            friend:"Jon, Rex"};

var  inhabitantes = [dog, cat, woman, man];

inhabitantes.forEach(function(element){
    var personArr = [];
    var personStr = "";
    personArr.push(element.kind, element.who, element.legs, element.hands, element.name, element.gender, element.say);
    personStr = personArr.join(";");
    personStr += (element.friend !== undefined) ?  ("; " + element.friend): "";

    print(personStr);
});
