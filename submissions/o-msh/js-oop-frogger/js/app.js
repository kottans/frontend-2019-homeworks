const canvas_chunk_width = 101;
const canvas_chunk_heigth = 83;
const canvas_full_width = 505;

const enemiesConf = {
    sprite: 'images/enemy-bug.png',
    speed: {min: 100, max: 250},
    startXPosition: 0,
    startYPosition: 63
};

const playerConf = {
    sprite: 'images/char-boy.png',
    score: 0,
    life: 3,
    startXPosition: canvas_chunk_width * 2,
    startYPosition: 405,
    widthSize: 80,
    heightSize: 60
};

var generateEnemies = function() {
    return [
        new Enemy(enemiesConf.startXPosition, enemiesConf.startYPosition),
        new Enemy(enemiesConf.startXPosition, enemiesConf.startYPosition + canvas_chunk_heigth),
        new Enemy(enemiesConf.startXPosition, enemiesConf.startYPosition + (canvas_chunk_heigth * 2))
    ];
};

var getRandomSpeed = function() {
    return Math.random() * (enemiesConf.speed.max - enemiesConf.speed.min) + enemiesConf.speed.min;
};

var Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function(x, y) {
    Character.call(this, x, y, enemiesConf.sprite);
    this.speed = getRandomSpeed();
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.isCollision = function() {
    if (player.x < this.x + playerConf.widthSize && player.x + playerConf.widthSize > this.x && player.y < this.y + playerConf.heightSize && player.y + playerConf.heightSize > this.y) {
        player.x = playerConf.startXPosition;
        player.y = playerConf.startYPosition;
        player.desreaseLife();
    }
};

Enemy.prototype.update = function(dt) {
    if (this.x > canvas_full_width) {
        this.x = 0;
        this.speed = getRandomSpeed();
    } else {
        this.x += this.speed * dt;
        this.isCollision();
    }
};

var Player = function(x, y, sprite) {
    Character.call(this, x, y, sprite);
    this.score = playerConf.score;
    this.life = playerConf.life;
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
    this.score = playerConf.score;
    this.life = playerConf.life;
};

Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.increaseScore();
        this.y = playerConf.startYPosition;
        this.x = playerConf.startXPosition;
    }
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x -= this.x > 0 && canvas_chunk_width;
            break;
        case 'right':
            this.x += this.x < canvas_full_width - canvas_chunk_width && canvas_chunk_width; 
            break;
        case 'up':
            this.y -= this.y > 0 && canvas_chunk_heigth;
            break;
        case 'down':
            this.y += this.y < playerConf.startYPosition && canvas_chunk_heigth;
        default:
            break;
    }
};

var allEnemies = generateEnemies();
var player = new Player(playerConf.startXPosition, playerConf.startYPosition, playerConf.sprite);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});