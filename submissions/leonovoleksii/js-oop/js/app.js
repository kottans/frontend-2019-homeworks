const START_X = 202.5;
const START_Y = 383;
const MAX_LIVES = 3;
const ENEMY_X = [80, 100, 120];
const ENEMY_Y = [55, 145, 230, 300];
const ENEMY_SPEED = [80, 100, 120];

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //move enemy to the left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//This function adds new enemy
var increaseDifficulty = function(enemyArr) {
    var enemy = new Enemy(ENEMY_X[getRandomInt(3)],
        ENEMY_Y[getRandomInt(3)],
        ENEMY_SPEED[getRandomInt(3)])
    enemyArr.push(enemy);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.lives = MAX_LIVES;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // function not needed right now
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= 100;
    }
    if (keyPress == 'up') {
        player.y -= 80;
    }
    if (keyPress == 'right') {
        player.x += 100;
    }
    if (keyPress == 'down') {
        player.y += 80;
    }
    console.log('keyPress is: ' + keyPress);
};

var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
            console.log('collided');
            player.lives--;
            player.x = START_X;
            player.y = START_Y;
        }

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y <= 0) {
        player.x = START_X;
        player.y = START_Y;
        player.score++;
        increaseDifficulty(allEnemies);
    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
increaseDifficulty(allEnemies);
var player = new Player(START_X, START_Y);



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
