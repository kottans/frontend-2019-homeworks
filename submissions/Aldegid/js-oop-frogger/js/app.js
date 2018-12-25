const playerStepY = 101;
const playerStepX = 83;
let wins = 0;
let lives = 3;
let winContainer = document.querySelector('.wins');
let livesContainer = document.querySelector('.lives');
let gameOver = document.querySelector('.game-over');
// const startPlayerPosition =
// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505){
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
    if( player.x < this.x + 75 &&
        player.x + 75 > this.x &&
        player.y < this.y + 65 &&
        player.y + 65 > this.y){
            player.goToStartPosition();
            lives --;
            updateResult();
            if(lives === 0){
                //console.log('rip');
                allEnemies = [];
                gameOver.setAttribute("style", "display: block; margin: 0; font-size: 40px; color: red;");
                player.sprite = rip.sprite;
            }

        }
};

var RipPlayer = function(){
    this.sprite = 'images/rip.png';
};

RipPlayer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 202;
    this.y = 404;
    this.stepX = 101;
    this.stepY = 83;
    this.sprite = 'images/char-boy.png';

}

Player.prototype.update = function(){

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.goToStartPosition = function() {
    this.x = 202;
    this.y = 404;

};

Player.prototype.handleInput = function(dir) {
    if(lives !== 0){
        switch (dir) {
            case 'left':
            this.x >= this.stepX ? this.x -= this.stepX : this.x -= 0;
                break;
            case 'right':
            this.x <= (this.stepX * 3) ? this.x += this.stepX : this.x += 0;
                break;
            case 'up':
            this.y -= this.stepY;
            if(this.y < 72){
                wins ++;
                updateResult();
                this.goToStartPosition();
            }
                break;
            case 'down':
            this.y <= (this.stepY * 4) ? this.y += this.stepY : this.y += 0;
                break;

        }
    }

    //console.log(this.x);
    //console.log(this.y);
};

function updateResult(){
    winContainer.innerHTML = wins;
    livesContainer.innerHTML = lives;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();
let allEnemies = [new Enemy(0, 220, 50), new Enemy(-50, 140, 80), new Enemy(-100, 60, 100)];
let rip = new RipPlayer();

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
