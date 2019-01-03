const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
const BOARD_WIDTH = CELL_WIDTH * 5;

const ENEMY = {
    startPosition: -50,
    width: 80,
    height: 60,
    sprite: 'images/enemy-bug.png'
};
const PLAYER = {
    startX: CELL_WIDTH * 2,
    startY: CELL_HEIGHT * 5,
    sprite: 'images/char-boy.png'
};

const Character = function (x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
}

Character.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

const Enemy = function (x, y, speed) {
  Character.call(this, x, y, sprite = ENEMY.sprite);
  this.speed = speed;
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

  if (this.x > BOARD_WIDTH) {
    this.x = ENEMY.startPosition;
  }

  if (player.x < this.x + ENEMY.width &&
    player.x + ENEMY.width > this.x &&
    player.y < this.y + ENEMY.height &&
    ENEMY.height + player.y > this.y) {
    player.reset();
  };
};

const Player = function (x, y) {
  Character.call(this, x, y, sprite = PLAYER.sprite);
}

Player.prototype = Object.create(Character.prototype);

Player.prototype.update = function() {
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.x > PLAYER.startY) {
    this.x = PLAYER.startY;
  }
  if (this.y > PLAYER.startY) {
    this.y = PLAYER.startY;
  }
  if (this.y < 0) {
    this.reset();
  };
};

Player.prototype.reset = function() {
  this.x = PLAYER.startX;
  this.y = PLAYER.startY;
};

Player.prototype.handleInput = function(key){
  switch (key) {
    case 'left':
      this.x -= CELL_WIDTH;
      break;
    case 'right':
      this.x += CELL_WIDTH;
      break;
    case 'up':
      this.y = this.y - CELL_HEIGHT;
      break;
    case 'down':
      this.y = this.y + CELL_HEIGHT;
      break;
    default:
      break;
  }
}

const player = new Player(PLAYER.startX, PLAYER.startY);
const allEnemies = [
  new Enemy(-CELL_WIDTH, 63, 100),
  new Enemy(-CELL_WIDTH, 145, 50),
  new Enemy(-CELL_WIDTH, 230, 75)
];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
