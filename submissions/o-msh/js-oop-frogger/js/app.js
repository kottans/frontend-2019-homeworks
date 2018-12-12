const BLOCK_CHUNK_WIDTH = 101;
const BLOCK_CHUNK_HEIGTH = 83;
const CANVAS_FULL_WIDTH = 505;

const ENEMIES_CONF = {
    NUMBERS: 3,
    SPRITE: 'images/enemy-bug.png',
    MIN_SPEED: 100,
    MAX_SPEED: 250,
    START_X: 0,
    START_Y: 63,
    OFFSET_Y: 20
};

const PLAYER_CONF = {
    SPRITE: 'images/char-boy.png',
    START_X: BLOCK_CHUNK_WIDTH * 2,
    START_Y: BLOCK_CHUNK_WIDTH * 4,
    WIDTH: 80,
    HEIGHT: 60,
    MAX_LIFE: 3
};

let Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Enemy = function(x, y, player) {
    Character.call(this, x, y, ENEMIES_CONF.SPRITE);
    this.speed = this.getRandomSpeed();
    this.player = player;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.getRandomSpeed = function() {
    return Math.random() * (ENEMIES_CONF.MAX_SPEED - ENEMIES_CONF.MIN_SPEED) + ENEMIES_CONF.MIN_SPEED;
};

Enemy.prototype.isCollision = function() {
    if (this.player.x < this.x + PLAYER_CONF.WIDTH && this.player.x + PLAYER_CONF.WIDTH > this.x && this.player.y < this.y + PLAYER_CONF.HEIGHT && this.player.y + PLAYER_CONF.HEIGHT > this.y) {
        this.player.x = PLAYER_CONF.START_X;
        this.player.y = PLAYER_CONF.START_Y;
        this.player.desreaseLife();
    }
};

Enemy.prototype.update = function(dt) {
    if (this.x > CANVAS_FULL_WIDTH) {
        this.x = 0;
        this.speed = this.getRandomSpeed();
    } else {
        this.x += this.speed * dt;
        this.isCollision();
    }
};

let Player = function(x, y) {
    Character.call(this, x, y);
    this.sprite = PLAYER_CONF.SPRITE;
    this.score = 0;
    this.life = PLAYER_CONF.MAX_LIFE;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.increaseScore = function() {
    this.score ++;
};

Player.prototype.desreaseLife = function() {
    if (this.life > 0) {
        this.life --;
    } else {
        this.resetState();
    }
};

Player.prototype.resetState = function() {
    this.score = 0;
    this.life = PLAYER_CONF.MAX_LIFE;
};

Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.increaseScore();
        this.x = PLAYER_CONF.START_X;
        this.y = PLAYER_CONF.START_Y;
    }
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x -= this.x > 0 && BLOCK_CHUNK_WIDTH;
            break;
        case 'right':
            this.x += this.x < CANVAS_FULL_WIDTH - BLOCK_CHUNK_WIDTH && BLOCK_CHUNK_WIDTH; 
            break;
        case 'up':
            this.y -= this.y > 0 && BLOCK_CHUNK_HEIGTH;
            break;
        case 'down':
            this.y += this.y < PLAYER_CONF.START_Y && BLOCK_CHUNK_HEIGTH;
        default:
            break;
    }
};

let player = new Player(PLAYER_CONF.START_X, PLAYER_CONF.START_Y);
let allEnemies = [1, 2, 3].map(positionY => new Enemy(ENEMIES_CONF.START_X, (positionY * BLOCK_CHUNK_HEIGTH) - ENEMIES_CONF.OFFSET_Y, player));

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});