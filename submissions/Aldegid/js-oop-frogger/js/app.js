const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 83;
const FIELD_WIDTH = 505;
const START_POSITION_X = 202;
const START_POSITION_Y = 404;

const WIN_CONTAINER = document.querySelector('.wins');
const LIVES_CONTAINER = document.querySelector('.lives');
const GAME_OVER = document.querySelector('.game-over');

const ENEMY_CONF = {
    sprite: 'images/enemy-bug.png',
    startX: -50,
    startY: 63,
    spaceBetween: 20
};
const PLAYER_CONF = {
    sprite: 'images/char-boy.png',
    spriteWidth: 65,
    spriteHeight: 75,
    spriteIsRip: 'images/rip.png'
};

let wins = 0;
let lives = 3;

let Unit = function (x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

Unit.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Enemy = function (x, y, player) {
    Unit.call(this, x, y, ENEMY_CONF.sprite);
    this.speed = this.generteSpeed();
    this.player = player;
    console.log(this.player);
};

Enemy.prototype = Object.create(Unit.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.generteSpeed = function () {
    return 100 + Math.floor(Math.random() * 200);
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > FIELD_WIDTH) {
        this.x = -BLOCK_WIDTH;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function () {
    if (this.player.x < this.x + PLAYER_CONF.spriteWidth &&
        this.player.x + PLAYER_CONF.spriteWidth > this.x &&
        this.player.y < this.y + PLAYER_CONF.spriteHeight &&
        this.player.y + PLAYER_CONF.spriteHeight > this.y) {
        player.goToStartPosition();
        lives--;
        updateResult();
        if (lives === 0) {
            allEnemies = [];
            GAME_OVER.setAttribute("style", "display: block; margin: 0; font-size: 40px; color: red;");
            player.sprite = rip.sprite;
        }
    }
};

let RipPlayer = function (x, y) {
    Unit.call(this, x, y, PLAYER_CONF.spriteIsRip);
};

RipPlayer.prototype = Object.create(Unit.prototype);
RipPlayer.prototype.constructor = RipPlayer;

let Player = function (x, y) {
    Unit.call(this, x, y, PLAYER_CONF.sprite);
    this.stepX = BLOCK_WIDTH;
    this.stepY = BLOCK_HEIGHT;
    this.sprite = PLAYER_CONF.sprite;
};
Player.prototype = Object.create(Unit.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
};

Player.prototype.goToStartPosition = function () {
    this.x = START_POSITION_X;
    this.y = START_POSITION_Y;
};

Player.prototype.handleInput = function (dir) {
    if (lives !== 0) {
        switch (dir) {
            case 'left':
                this.x >= this.stepX ? this.x -= this.stepX : this.x -= 0;
                break;
            case 'right':
                this.x <= (this.stepX * 3) ? this.x += this.stepX : this.x += 0;
                break;
            case 'up':
                this.y -= this.stepY;
                if (this.y < 72) {
                    wins++;
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

function updateResult() {
    WIN_CONTAINER.innerHTML = wins;
    LIVES_CONTAINER.innerHTML = lives;
}

let player = new Player(START_POSITION_X, START_POSITION_Y);
let allEnemies = [1, 2, 3].map(coordsY => new Enemy(ENEMY_CONF.startX, (coordsY * BLOCK_HEIGHT) - ENEMY_CONF.spaceBetween, player));
let rip = new RipPlayer();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
