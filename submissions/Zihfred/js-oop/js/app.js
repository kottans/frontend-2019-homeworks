function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    this.x = 0;
    this.y = this.enemyStartY();
    this.speed = randomInteger(50,150);
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.enemyStartY =  function(){
    let variables = [50,150,250];

    return variables[randomInteger(0,2)];
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x >= 600){
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
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function(){
    this.x = 200;
    this.y = 400;
    this.sprite =  'images/char-boy.png';
};
Player.prototype.update = function () {
    if (this.y < 0) {
        this.nextRound();
    };
    roundView = round;
    console.log(roundView)

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.nextRound = function(){
    round++;
    allEnemies.push (new Enemy());
    this.x = 200;
    this.y = 400;
}

function loseGame(){
    round = 0;
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

let round = 1;
let allEnemies = [];

    allEnemies.push (new Enemy());


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
