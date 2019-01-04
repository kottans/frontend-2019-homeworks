const BOARD_OFFSET = 50,
      COL_WIDTH = 101,
      COL_HEIGHT = 83;

// ENEMY CLASS
var Enemy = function(row) {
    this.setSpeed();
    this.x = 0;
    this.y = (row - 1 ) * COL_HEIGHT + BOARD_OFFSET;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.setSpeed = function() {
    this.speed = Math.floor(Math.random() * 150) + 150;
}

Enemy.prototype.update = function(dt) {
    if(this.x < 505) {
        this.x += dt * this.speed;
    }
    else {
        this.setSpeed();
        this.x = 0;
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
  if (this.y > player.y - 50 && this.y < player.y + 50 && this.x > player.x - 70 && this.x < player.x + 70) {
    player.moveToStart();
  }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER CLASS
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.moveToStart();
};

Player.prototype.moveToStart = function() {
    this.x = COL_WIDTH * 2;
    this.y = COL_HEIGHT + BOARD_OFFSET * 6;
};

Player.prototype.update = function(dx, dy) {
    if(this.y == -32) {
        console.log('win');
        setTimeout(function() {
            player.moveToStart();
        }, 500);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            if(this.x > 0)
                this.x -= COL_WIDTH;
            break;
        case 'right':
            if(this.x < 505 - 101)
                this.x += COL_WIDTH;
            break;
        case 'up':
            if(this.y > 0)
                this.y -= COL_HEIGHT;
            break;
        case 'down':
            if(this.y < COL_HEIGHT * 6 - 150)
                this.y += COL_HEIGHT;
            break;
    }
};

// INIT GAME
let allEnemies = [],
    player = new Player();
[1, 2, 3].forEach(enemy => allEnemies.push(new Enemy(enemy)));

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
