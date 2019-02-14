const PLAYER_INIT_POS = {
    x: 200,
    y: 350
}

const BORDER_FIELD = {
    xMax: 400,
    xMin: 0,
    yMax: 400,
    yMin: 0
}

const STEP = {
    x: 100,
    y: 50
}

const WIDTH = 550;

let Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

let Enemy = function(x, y, speed, player) {
    Character.call(this, x, y, 'images/enemy-bug.png');
    this.speed = speed;
    this.player = player;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    if (this.x <= WIDTH) {
        this.x += this.speed;
    } else {
        this.x = 0;
        this.speed = getRandomNumber();
    }

    this.handlesCollision();
}

Enemy.prototype.handlesCollision = function() {
    if (this.player.x < this.x + 60 && this.x < this.player.x + 65 &&
        this.player.y < this.y + 70 && this.y < this.player.y + 75) {
        showMessage(false);
        this.player.toInitialPosition(PLAYER_INIT_POS.x, PLAYER_INIT_POS.y);
    }
}

let Player = function(x, y) {
    Character.call(this, x, y, 'images/char-boy.png');
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) {};

Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y <= BORDER_FIELD.yMin) {
        showMessage(true);
        this.toInitialPosition(PLAYER_INIT_POS.x, PLAYER_INIT_POS.y);
    }

    if (direction === 'left' && this.x > BORDER_FIELD.xMin) {
        this.x -= STEP.x;
    }
    if (direction === 'up' && this.y > BORDER_FIELD.yMin) {
        this.y -= STEP.y;
    }
    if (direction === 'right' && this.x < BORDER_FIELD.xMax) {
        this.x += STEP.x;
    }
    if (direction === 'down' && this.y < BORDER_FIELD.yMax) {
        this.y += STEP.y;
    }
}

Player.prototype.toInitialPosition = function(coordX, coordY) {
    this.x = coordX;
    this.y = coordY;
}

const getRandomNumber = function() {
    return Math.floor(Math.random() * Math.floor(8 - 2) + 2);
}

const showMessage = function(boolean) {
    boolean ? alert('You won!') : alert('You lost!');
}

const player = new Player(PLAYER_INIT_POS.x, PLAYER_INIT_POS.y);
const enemy1 = new Enemy(-50, 210, getRandomNumber(), player);
const enemy2 = new Enemy(-50, 130, getRandomNumber(), player);
const enemy3 = new Enemy(-50, 60, getRandomNumber(), player);

const allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
