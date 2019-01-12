const INITIAL_DATA_GRID = {
    cellWidth: 80,
    cellHeight: 60,
    start: 0,
    end: 400,
    trackEnd: 500
};
const INITIAL_DATA_PLAYER = {
    x: 200,
    y: 400,
    sprite: 'images/char-boy.png',
    step: 10
};
const INITIAL_DATA_ENEMY = {
    x: -100,
    y: 200,
    sprite: 'images/enemy-bug.png',
    speed: 10,
    distance: 40
};

var Entity = function (x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

Entity.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function (x, y, player, sprite = '', speed = 0) {
    sprite = (sprite === '') ? INITIAL_DATA_ENEMY.sprite : sprite;
    speed = (speed === 0) ? INITIAL_DATA_ENEMY.speed : speed;
    Entity.call(this, x, y, sprite);
    this.speed = speed;
    this.player = player;
};

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function (dt) {
    this.x += dt * this.speed;
    this.rerun();
    this.handleCollision();
};

Enemy.prototype.rerun = function () {
    this.x = (this.x > INITIAL_DATA_GRID.trackEnd) ? INITIAL_DATA_ENEMY.x : this.x;
};

Enemy.prototype.handleCollision = function () {
    [this.player.x, this.player.y] = (this.player.x > this.x - INITIAL_DATA_GRID.cellWidth && this.player.x < this.x + INITIAL_DATA_GRID.cellWidth && this.player.y > this.y - INITIAL_DATA_GRID.cellHeight && this.player.y < this.y + INITIAL_DATA_GRID.cellHeight) ? [INITIAL_DATA_PLAYER.x, INITIAL_DATA_PLAYER.y] : [this.player.x, this.player.y];
};

var Player = function (x, y, sprite = '', step = 0) {
    sprite = (sprite === '') ? INITIAL_DATA_PLAYER.sprite : sprite;
    step = (step === 0) ? INITIAL_DATA_PLAYER.step : step;
    Entity.call(this, x, y, sprite);
    this.step = step;
};

Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {};

Player.prototype.handleInput = function (key) {

    switch (key) {
        case 'left':
            this.x = (this.x > INITIAL_DATA_GRID.end) ? this.x : this.x - this.step;
            break;
        case 'down':
            this.y = (this.y > INITIAL_DATA_GRID.end) ? this.y : this.y + this.step;
            break;
        case 'right':
            this.x = (this.x <= INITIAL_DATA_GRID.start) ? this.x : this.x + this.step;
            break;
        case 'up':
            this.y = (this.y <= INITIAL_DATA_GRID.start) ? this.y : this.y - this.step;
    }

};
const player = new Player(INITIAL_DATA_PLAYER.x, INITIAL_DATA_PLAYER.y);

const allEnemies = [0, 1, 2, 3].map((element, index) => {
    return new Enemy(INITIAL_DATA_ENEMY.x, INITIAL_DATA_ENEMY.y + INITIAL_DATA_ENEMY.distance * index, player)});

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
