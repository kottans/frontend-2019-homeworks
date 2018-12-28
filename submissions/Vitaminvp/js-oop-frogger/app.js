const CELL = {
    width:  100,
    height: 80
};
const ENEMY = {
    width:  80,
    height: 60
};
const INITIAL = {
    x: 200,
    y: 400
};

const SPRITES = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

function getRandomSpeed() {
    return Math.round(Math.random() * 600);
}

// Enemies our player must avoid
const Enemy = function(x, y, speed, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;
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

    if (this.x > CELL.width * 5) {
        this.x = -CELL.width;
        this.speed = getRandomSpeed();
    }

    if (this.player.x < this.x + ENEMY.width  && this.player.x     + ENEMY.width > this.x &&
        this.player.y < this.y + ENEMY.height && ENEMY.height + this.player.y    > this.y) {
        this.player.x = INITIAL.x;
        this.player.y = INITIAL.y;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.player = SPRITES[0];//"images/char-boy.png";
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key){
        case'up':
            (this.y > 0) ? this.y = this.y- CELL.height : this.y = INITIAL.y;
            break;
        case'down':
            (this.y < CELL.height * 5) ? this.y = this.y + CELL.height : null;
            break;
        case'left':
            (this.x > 1) ? this.x =  this.x - CELL.width : null;
            break;
        case'right':
            (this.x < CELL.width * 4) ? this.x = this.x + CELL.width : null;
            break;
    }
};

const player = new Player(INITIAL.x, INITIAL.y);
const allEnemies = [];

[CELL.height , CELL.height * 2, CELL.height * 3].forEach(function(y) {
    const enemy = new Enemy(0, y, getRandomSpeed(), player);
    allEnemies.push(enemy);
});
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
