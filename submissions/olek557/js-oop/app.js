const BOARD_OFFSET_TOP = 50,
      BOARD_OFFSET_BOTTOM = 100,
      COL_WIDTH = 101,
      COL_HEIGHT = 83,
      ROWS_AMOUNT = 6,
      COLS_AMOUNT = 5,
      BOARD_WIDTH = COLS_AMOUNT * COL_WIDTH,
      PLAYER_START_X = COL_WIDTH * Math.floor(COLS_AMOUNT / 2),
      PLAYER_START_Y = COL_HEIGHT * ROWS_AMOUNT - BOARD_OFFSET_BOTTOM,
      PLAYER_FINISH_X = -17,
      PLAYER_VERTICAL_OFFSET = 50,
      PLAYER_HORIZONTAL_OFFSET = 70;

// ENEMY CLASS
var Enemy = function(row, player) {
    this.setSpeed();
    this.x = 0;
    this.y = (row - 1) * COL_HEIGHT + BOARD_OFFSET_TOP;
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

Enemy.prototype.setSpeed = function() {
    this.speed = Math.floor(Math.random() * 150) + 150;
}

Enemy.prototype.update = function(dt) {
    if(this.x < BOARD_WIDTH) {
        this.x += dt * this.speed;
    }
    else {
        this.setSpeed();
        this.x = 0;
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
  if (this.y > this.player.y - PLAYER_VERTICAL_OFFSET && this.y < this.player.y + PLAYER_VERTICAL_OFFSET && this.x > this.player.x - PLAYER_HORIZONTAL_OFFSET && this.x < this.player.x + PLAYER_HORIZONTAL_OFFSET) {
    this.player.moveToStart();
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
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
};

Player.prototype.update = function(dx, dy) {
    if(this.y == PLAYER_FINISH_X) {
        console.log('win');
        setTimeout(() => {
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
            if(this.x < BOARD_WIDTH - COL_WIDTH)
                this.x += COL_WIDTH;
            break;
        case 'up':
            if(this.y > 0)
                this.y -= COL_HEIGHT;
            break;
        case 'down':
            if(this.y < COL_HEIGHT * ROWS_AMOUNT - BOARD_OFFSET_BOTTOM)
                this.y += COL_HEIGHT;
            break;
    }
};

// INIT GAME
let player = new Player(),
    allEnemies = [1, 2, 3].map(enemy => (new Enemy(enemy, player)));

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
