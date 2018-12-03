// Enemies our player must avoid
const BLOCKWIDTH = 101;
const BLOCKHEIGHT = 83;
let count = 0;
let Enemy = function(x, y, speed) {
    // variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < 506){
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.handleInput = function(key){
    switch (key) {
        case 'left': this.x -= BLOCKWIDTH;
            break;
        case 'right': this.x += BLOCKWIDTH;
            break;
        case 'up': this.y -= BLOCKHEIGHT;
            break;
        case 'down': this.y += BLOCKHEIGHT;
        default:
            break;
    }
}

Player.prototype.update = function() {
    if(this.y > 404){
        this.y  = 404;
    }
    if(this.y < 0){
        count++
        this.y = 404;
    }
    if(this.x > 404){
        this.x -= 505;
    }
    if(this.x < 0){
        this.x = 404;
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a letiable called player

let player = new Player(202, 404, 50);
let allEnemies = [new Enemy(-101, 60, 50), new Enemy(-101, 143, 25), new Enemy(-101, 226, 75)];

function checkCollisions(){
    let arrayLength = allEnemies.length;
    let x = player.x;
    let y = player.y;
    for(let i = 0; i < arrayLength; i++){
        let backCollision = x <= (parseInt(allEnemies[i].x) + 78) && x >= parseInt(allEnemies[i].x);
        let frontCollision = (x + 78) >= parseInt(allEnemies[i].x) && (x + 78) <= parseInt(allEnemies[i].x + 78);
        let heightCollision = (y - 12) === (parseInt(allEnemies[i].y));
        if( (backCollision || frontCollision) && heightCollision){
            player.y = 404;
            player.x = 202;
            count = 0;
        }
    }
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]); 
});
