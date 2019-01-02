var PLAYER_INIT_POS = {
    x: 200,
    y: 350
} 

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if (this.x <= 550) {
        this.x = this.x + this.speed;
    } else {
        this.x = 0;
        this.speed = getRandomNumber();
    }

    this.handlesCollision();
};

Enemy.prototype.handlesCollision = function () {
    if (player.x < this.x + 60 && this.x < player.x + 65 &&
        player.y < this.y + 70 && this.y < player.y + 75) {
        showMessage(false);
        player.x = PLAYER_INIT_POS.x;
        player.y = PLAYER_INIT_POS.y;
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y <= 0) {
        showMessage(true);
        this.x = PLAYER_INIT_POS.x;
        this.y = PLAYER_INIT_POS.y;
    }

    if (direction === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 50;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 50;
    }
}

var getRandomNumber = function() {
    return Math.floor(Math.random() * Math.floor(8 - 2) + 2);
}

var showMessage = function(boolean) {
    boolean ? alert('You won!') : alert('You lost!');
}

var player = new Player(PLAYER_INIT_POS.x, PLAYER_INIT_POS.y);
var enemy1 = new Enemy(-50, 210, getRandomNumber());
var enemy2 = new Enemy(-50, 130, getRandomNumber());
var enemy3 = new Enemy(-50, 60, getRandomNumber());

var allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
