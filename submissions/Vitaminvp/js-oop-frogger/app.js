const CELL = {
    width: 100,
    height: 80
};
const ENEMY = {
    width: 80,
    height: 60
};
const INITIAL = {
    x: 200,
    y: 400
};

const SPRITES = {
    player: 'images/char-boy.png',
    enemy: 'images/enemy-bug.png'
};

function getRandomSpeed() {
    return Math.round(Math.random() * 600);
}

const Creature = function(x, y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Creature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
const Enemy = function(x, y, speed, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Creature.call(this, x, y, SPRITES.enemy);
    this.speed = speed;
    this.player = player;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

Enemy.prototype = Object.create(Creature.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    this.handleCollision();

};

Enemy.prototype.handleCollision = function() {
    if (this.x > CELL.width * 5) {
        this.x = -CELL.width;
        this.speed = getRandomSpeed();
    }
    if (this.player.x < this.x + ENEMY.width && this.player.x + ENEMY.width > this.x &&
        this.player.y < this.y + ENEMY.height && ENEMY.height + this.player.y > this.y){
        this.player.x = INITIAL.x;
        this.player.y = INITIAL.y;
    };
};

// Draw the enemy on the screen, required method for game
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x, y) {
    Creature.call(this, x, y, SPRITES.player);
};

Player.prototype = Object.create(Creature.prototype);

Player.prototype.update = function() {};

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

const allEnemies = [1, 2, 3]
    .map(fieldRow => fieldRow * CELL.height)
    .map(y => new Enemy(0, y, getRandomSpeed(), player));


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
