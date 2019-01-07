// Enemies our player must avoid
const Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 80;
    this.speed = randomSpeed(80, 290);
    this.edge = {right: 500, left: -101}
    this.sprite = 'images/enemy-bug.png';
};

function randomSpeed(min, max) {
    return Math.random() * (max - min) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < this.edge.right) {
      this.x += dt * this.speed;
    } else {
    this.x = this.edge.left;
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
const Player = function() {
    this.width = 80;
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
    this.stepX = 101;
    this.stepY = 84;
    this.edge = {top: -20, right: 404, bottom: 400, left: 0};
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.toBegin = function(d) {
    if (d === 0) {
      this.x = 202;
      this.y = 400;
    } else {
        let that = this;
        setTimeout(function () {
          that.x = 202;
          that.y = 400;
        }, d);
    }
};

Player.prototype.update = function() {
    if (this.y === this.edge.top) {
        this.toBegin(400);
    }
    this.checkEnemyCollision();
};

Player.prototype.checkEnemyCollision = function() {
    allEnemies.forEach( e => {
        let that = this;
        if (e.y === that.y && that.x <= e.x + e.width && that.x + that.width >= e.x) {
          that.toBegin(0);
        }
      })
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x !== this.edge.left) {
      this.x -= this.stepX;
    } else if (key === 'right' && this.x !== this.edge.right) {
      this.x += this.stepX;
    } else if (key === 'down' && this.y !== this.edge.bottom) {
      this.y += this.stepY;
    } else if (key === 'up' && this.y !== this.edge.top) {
      this.y -= this.stepY;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-101, 64),
      enemy2 = new Enemy(-101, 148),
      enemy3 = new Enemy(-101, 232);

const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
