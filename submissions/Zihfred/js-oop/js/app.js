let allEnemies = [];
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

// Enemies our player must avoid
class Creature {
    constructor(x,y,sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
}


class Enemy extends Creature {
    constructor(y,sprite = 'images/enemy-bug.png',x = 0){
        super(x ,y,sprite);
        this.speed = randomInteger(50,150);
        this.y = this.enemyStartY();
    }
}


Creature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.enemyStartY =  function(){
    let EnemyStartPos = [50,150,250];

    return EnemyStartPos[randomInteger(0,2)];
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    let maximalXPos = 600;
    if(this.x >= maximalXPos){
        this.x = 0;
    }else
    this.x += dt*this.speed;
    if( (player.x >= Math.floor(this.x)-60) &&  (player.x <= Math.floor(this.x)+60)
        &&
        (player.y >= Math.floor(this.y)-80) &&  (player.y <= Math.floor(this.y)+30)  ){
      loseGame();
    };
};

// Draw the enemy on the screen, required method for game


// Now write your own player class

class Player extends Creature{
    constructor(x = 200,y = 400, sprite ='images/char-boy.png' ){
        super(x,y,sprite);
        this.round = 1;
    }

};
Player.prototype.update = function () {
    if (this.y < 0) {
        this.nextRound();
    };


};

Player.prototype.nextRound = function(){
    this.round++;
    allEnemies.push (new Enemy());
    this.x = 200;
    this.y = 400;
}

function loseGame(){
    player.round = 0;
    allEnemies = [];
    player.nextRound();
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.handleInput = function (key) {
    switch (key){
        case'up':
            this.y-=50;
            break;
        case'down':
            this.y+=50;
            break;
        case'left':
            this.x-=50;
            break;
        case'right':
            this.x+=50;
            break;
    }

}



allEnemies.push (new Enemy(0));


player = new Player();
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
