const CELL = { width: 101, height: 83 };
const CANVAS = { width: 505, height: 606 };
const ENEMY = { speed: 100, startPosition: -50, width: 80, height: 60 };
const PLAYER_LOCATION = { x_axis: 200, y_axis: 400 };

const Creature = function (x, y) {
    this.x = x;
    this.y = y;
}
// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    Creature.call(this, x, y);
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > CANVAS.width) {
        this.x = ENEMY.startPosition;
        this.speed = Math.floor(Math.random() * 200) + ENEMY.speed;
    }

    if (player.x > this.x - ENEMY.width && player.x < this.x + ENEMY.width &&
        player.y > this.y - ENEMY.height && player.y < this.y + ENEMY.height) {
        player.x = PLAYER_LOCATION.x_axis;
        player.y = PLAYER_LOCATION.y_axis;
    }

};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (x, y) {
    Creature.call(this, x, y);

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    if (key == 'down' && this.y < PLAYER_LOCATION.y_axis) {
        this.y = this.y + CELL.height
    }
    if (this.y < 0) {
        this.x = PLAYER_LOCATION.x_axis;
        this.y = PLAYER_LOCATION.y_axis;
    }
}

let allEnemies = [];
let player = new Player(PLAYER_LOCATION.x_axis, PLAYER_LOCATION.y_axis);
let enemiesLocation = [52, 132, 212];
enemiesLocation.forEach(elem => {
    let enemy = new Enemy(0, elem, ENEMY.speed);
    allEnemies.push(enemy);
})

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
