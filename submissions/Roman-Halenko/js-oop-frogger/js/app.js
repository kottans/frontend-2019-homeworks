// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = randomSpeed(80, 290);
    this.sprite = 'images/enemy-bug.png';
};

function randomSpeed(min, max) {
    return Math.random() * (max - min) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 505) {
      this.x += dt * this.speed;
    } else {
    this.x = -101;
    this.speed = randomSpeed(100, 300);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.toBegin = function(d) {
    if (d === 0) {
      this.x = 202;
      this.y = 400;
    } else {
        var that = this;
        setTimeout(function () {
          that.x = 202;
          that.y = 400;
        }, d);
    }
};

Player.prototype.update = function() {
    if (this.y === -20) {
        this.toBegin(400);
    }
    allEnemies.forEach( (e) => {
        if (e.y === player.y && (player.x <= e.x+80 && player.x+90 >= e.x+15)) {
            this.toBegin(0);
        }
    })
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x !== 0) {
      this.x -= 101;
    } else if (key === 'right' && this.x !== 404) {
      this.x += 101;
    } else if (key === 'down' && this.y !== 400) {
      this.y += 84;
    } else if (key === 'up' && this.y !== -20) {
      this.y -= 84;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-101, 64),
    enemy2 = new Enemy(-101, 148),
    enemy3 = new Enemy(-101, 232);

var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();


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
