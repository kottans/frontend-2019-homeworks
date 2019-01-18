let allEnemies = [];
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

// Enemies our player must avoid
let Creature = function (x,y,sprite) {
    this.x = x ;
    this.y = y;
    this.sprite = sprite;
};

Creature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Enemy = function () {
    Creature.call(this, 0, this.enemyStartY(), 'images/enemy-bug.png');
    this.speed = randomInteger(50, 150);
};
Enemy.prototype = Object.create(Creature.prototype);
Enemy.prototype.enemyStartY =  function(){
    let EnemyStartPos = [50,150,250];

    return EnemyStartPos[randomInteger(0,2)];
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// Draw the enemy on the screen, required method for game
Enemy.prototype.update = function(dt) {
    let maximalXPos = 600;
    if(this.x >= maximalXPos){
        this.x = 0;
    }else
        this.x += dt*this.speed;
    if( (player.x >= Math.floor(this.x)-60)&&
        (player.x <= Math.floor(this.x)+60)&&
        (player.y >= Math.floor(this.y)-80)&&
        (player.y <= Math.floor(this.y)+30)){
        player.loseGame();
    }
};

// Now write your own player class

const Player = function () {
    Creature.call(this, 200, 400, 'images/char-boy.png');

    this.round = 1;


};
Player.prototype = Object.create(Creature.prototype);


Player.prototype.update = function () {
    if (this.y < 0) {
        this.nextRound();
    }
};

Player.prototype.nextRound = function(){
    this.round++;
    allEnemies.push (new Enemy());
    this.x = 200;
    this.y = 400;
};

Player.prototype.loseGame = function(){
    player.round = 0;
    allEnemies = [];
    player.nextRound();
};
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
};
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies.push (new Enemy());
player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});