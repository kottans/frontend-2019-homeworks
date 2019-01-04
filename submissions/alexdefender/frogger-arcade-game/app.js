const xStartPlayer = 200;
const yStartPlayer = 400;
let countWin = 0;

var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        this.speed = Math.random() * (500 - 50) + 50;
    }

    if ((player.y + 5 === this.y || player.y + 13 === this.y || player.y + 20 === this.y)
        && player.x < this.x + 50 && player.x > this.x - 50) {
        player.goStartPosition();
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (arr) {

    if (arr === 'left' && this.x > 0) {
        this.x -= 100;
    } else if (arr === 'right' && this.x < 400) {
        this.x += 100;
    } else if (arr === 'up') {
        this.y -= 90;
        if (this.y < 39) {
            player.goStartPosition();
            alert("Wins: " + ++countWin);
        }
    } else if (arr === 'down' && this.y < 400) {
        this.y += 90;
    }
}

Player.prototype.goStartPosition = function () {
    this.x = xStartPlayer;
    this.y = yStartPlayer;
}

var enemie1 = new Enemy(0, 60, 100);
var enemie2 = new Enemy(0, 143, 300);
var enemie3 = new Enemy(0, 225, 200);

var player = new Player(xStartPlayer, yStartPlayer);

var allEnemies = [enemie1, enemie2, enemie3];

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
