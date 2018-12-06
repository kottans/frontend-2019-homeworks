// Enemies our player must avoid
var Enemy = function(y,player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.y = y;
    this.x = 0;
    this.player = player;
    this.sprite = 'images/enemy-bug.png';
    this.randomSpeed();
};

Enemy.prototype.randomSpeed = function(){
    this.speed = ( Math.random() + 1 ) * 120 ;
  };

Enemy.prototype.handlCollision = function(player){
    if( this.x < player.x + 80 &&
        this.x + 70 > player.x &&
        this.y < player.y + 40 &&
        this.y + 40 > player.y)
        {
            this.player.goToInitialPosition();
            --this.player.health;
            this.player.gameOver();            
         }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    this.handlCollision(player);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
Enemy.prototype.finishPach = function(){
    const END_ROW = 505;
    const ENEMY_SIZE = 50;
    const START_ROW = Math.random() * (-90) - ENEMY_SIZE;
        if(this.x >= END_ROW){
            return this.x = START_ROW;
        }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.finishPach();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = "images/char-boy.png";
    this.goToInitialPosition();
    this.resetState();
};

Player.prototype.goToInitialPosition = function() {
    const INITIAL_PLAYER_POSITION ={
      x: 200,
      y: 360  
    }
      this.x = INITIAL_PLAYER_POSITION.x,
      this.y = INITIAL_PLAYER_POSITION.y
};

Player.prototype.resetState = function() {
    const INITIAL_PLAYER_DATA ={
     score: 0,
     health: 2  
    }
     this.score = INITIAL_PLAYER_DATA.score,
     this.health = INITIAL_PLAYER_DATA.health
};

Player.prototype.reachFinish = function(){
    if (this.y < 0) {
        setTimeout(() => {
            this.goToInitialPosition();
            player.score++
        }, 300);
    }

}

Player.prototype.gameOver = function(){
    if(player.health === 0){
        alert(` Game Over
        \n You score : ${player.score}`);
        player.resetState();
        }
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    if (key === 'left' && this.x >= 50){
        this.x -= 101;
    }else if(key === 'right' && this.x <= 400){
        this.x += 101;
    }else if(key === 'up' && this.y >= 0){
        this.y -= 80;
        this.reachFinish();
    }else if(key === 'down' && this.y <= 300){
        this.y += 80;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
const ROW_HEIGHT = 80;
const ROW_DIFF = 40;
const POSITION_DIRECTION_Y =[1,1,2,2,3,].map(function(heightY){
    return (heightY * ROW_HEIGHT) - ROW_DIFF ;
});

const allEnemies = POSITION_DIRECTION_Y.map(function(instance){
    return new Enemy(instance,player);
})

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


