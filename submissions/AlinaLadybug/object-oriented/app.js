const CELL = {
    width: 101,
    height: 83
};
const CANVAS = {
    width: 505,
    height: 606,
    offsetY: 31
};
const ENEMY = {
    speed: 100,
    startPosition: -50,
    width: 80,
    height: 60,
    sprite: 'images/enemy-bug.png'
};
const PLAYER = {
    xAxis: 200,
    yAxis: 400,
    sprite: 'images/char-boy.png'
};

const Creature = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}


Creature.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
const Enemy = function (x, y, speed, player) {
    Creature.call(this, x, y, sprite = ENEMY.sprite);
    this.speed = speed;
    this.player = player;
};


Enemy.prototype = Object.create(Creature.prototype);

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > CANVAS.width) {
        this.x = ENEMY.startPosition;
        this.speed = Math.floor(Math.random() * 200) + ENEMY.speed;
    }
    this.handleCollision();
};
Enemy.prototype.handleCollision = function () {
    if (this.player.x > this.x - ENEMY.width && this.player.x < this.x + ENEMY.width &&
        this.player.y > this.y - ENEMY.height && this.player.y < this.y + ENEMY.height) {
        this.player.x = PLAYER.xAxis;
        this.player.y = PLAYER.yAxis;
    }
}


const Player = function (x, y) {
    Creature.call(this, x, y, sprite = PLAYER.sprite);
}

Player.prototype = Object.create(Creature.prototype);
Player.prototype.update = function (dt) {
}

Player.prototype.handleInput = function (key) {
    if (key == 'left' && this.x > 0) {
        this.x = this.x - CELL.width;
    }
    if (key == 'right' && this.x < 400) {
        this.x = this.x + CELL.width;
    }
    if (key == 'up' && this.y > 0) {
        this.y = this.y - CELL.height
    }
    if (key == 'down' && this.y < PLAYER.yAxis) {
        this.y = this.y + CELL.height
    }
    if (this.y < 0) {
        this.x = PLAYER.xAxis;
        this.y = PLAYER.yAxis;
    }
}


let player = new Player(PLAYER.xAxis, PLAYER.yAxis);

let allEnemies = [1, 2, 3]
    .map(row => row * CELL.height - CANVAS.offsetY)
    .map(locationY => new Enemy(0, locationY, ENEMY.speed, player))



document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
