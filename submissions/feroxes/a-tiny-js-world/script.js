class Creature {
    constructor(whoIs, gender, name, say, legs){
        this.whoIs = whoIs;
        this.gender = gender;
        this.name = name;
        this.say = say;
        this.legs = legs;
    }
    toSay(){
            console.log(this.say);
        }
    print(){
        let info = [];
        
        for(let key in this){
           info.push(this[key]);
        }
        let str = info.join('; ');
        console.log(str);
    }
}
class Person extends Creature{
     constructor(whoIs, gender, name, say, legs, hands, friends){
        super(whoIs, gender, name, say, legs)
        this.hands = hands;
        this.friends = friends;
     }
}



let nick = new Person('human', 'male', 'Nick','Hellooooo...',2 ,2, ['Kate', 'Jane']);
let helen = new Person('human', 'female', 'Helen', 'Hi!', 2,2)

let bars = new Creature('cat', 'female', 'Bars', 'Meuuuu', 4, 0);
let skot = new Creature('dog', 'male', 'Skot', 'Auuuuu!', 4,0);

// I think it`s nothing to change:)