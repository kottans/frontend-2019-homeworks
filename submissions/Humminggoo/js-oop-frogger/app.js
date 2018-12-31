const INITIAL_STAT_GRID = {cellWidth: 80, cellHeight: 60, start: 0, end: 400, trackEnd:500};
const INITIAL_STAT_PLAYER = {x: 200, y: 400, sprite: 'images/char-cat-girl.png', step:40};
const INITIAL_STAT_ENEMY = {x: -100, y:50, sprite: 'images/enemy-bug.png', minspeed:70, maxspeed:200, scale: 90};
function Creature(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}
Creature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies our player must avoid
function Enemy(x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Creature.call(this, x, y, sprite);
    this.speed = speed;
}
Enemy.prototype = Object.create(Creature.prototype);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    this.rerun();
    this.handleCollision();
};
Enemy.prototype.randomSpeed = function(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
};
Enemy.prototype.rerun = function() {
    [this.x, this.speed] = (this.x < INITIAL_STAT_GRID.trackEnd) ?
        [this.x, this.speed] :
        [INITIAL_STAT_ENEMY.x, this.randomSpeed(INITIAL_STAT_ENEMY.minspeed, INITIAL_STAT_ENEMY.maxspeed)];
};
Enemy.prototype.handleCollision = function() {
    [player.x, player.y] = (this.x < player.x + INITIAL_STAT_GRID.cellWidth &&
        this.x + INITIAL_STAT_GRID.cellWidth > player.x &&
        this.y < player.y + INITIAL_STAT_GRID.cellHeight &&
        INITIAL_STAT_GRID.cellHeight + this.y > player.y) ?
        [INITIAL_STAT_PLAYER.x, INITIAL_STAT_PLAYER.y]: [player.x, player.y];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player(x, y, sprite, step) {
    Creature.call(this, x, y, sprite);
    this.step = step;
}
Player.prototype = Object.create(Creature.prototype);
Player.prototype.update = function(dt) {};
Player.prototype.handleInput = function(key) {
    switch (key){
        case'up':
            [this.y, this.x] = (this.y > INITIAL_STAT_GRID.start) ?
                [this.y - this.step, this.x] :
                [INITIAL_STAT_PLAYER.y, INITIAL_STAT_PLAYER.x];
            break;
        case'down':
            this.y = (this.y < INITIAL_STAT_GRID.end) ? this.y + this.step : this.y;
            break;
        case'left':
            this.x = (this.x > INITIAL_STAT_GRID.start) ?  this.x - this.step : this.x;
            break;
        case'right':
            this.x = (this.x < INITIAL_STAT_GRID.end) ? this.x + this.step : this.x;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = Array.from(Array(3), (el, i) => {
    return new Enemy(INITIAL_STAT_ENEMY.x, INITIAL_STAT_ENEMY.y+INITIAL_STAT_ENEMY.scale*i,
        INITIAL_STAT_ENEMY.minspeed, INITIAL_STAT_ENEMY.sprite)
});
const player = new Player(INITIAL_STAT_PLAYER.x, INITIAL_STAT_PLAYER.y, INITIAL_STAT_PLAYER.sprite, INITIAL_STAT_PLAYER.step);


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
