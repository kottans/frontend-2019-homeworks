const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
const BOARD_WIDTH = CELL_WIDTH * 5;
const ENEMIES_COUNT = 3;

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

const Enemy = function (x, y, speed, player) {
  Character.call(this, x, y, sprite = ENEMY.sprite);
  this.speed = speed;
  this.player = player;
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;

  if (this.x > BOARD_WIDTH) {
    this.x = ENEMY.startPosition;
  }

  this.handleCollision();
};

Enemy.prototype.handleCollision = function () {
  if (this.player.x < this.x + ENEMY.width &&
    this.player.x + ENEMY.width > this.x &&
    this.player.y < this.y + ENEMY.height &&
    ENEMY.height + this.player.y > this.y) {
    this.player.reset();
  };
}

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

const allEnemies = [];
for (let i = 0; i < ENEMIES_COUNT; i++) {
  let enemyLocationX = -CELL_WIDTH;
  let enemyLocationY = i * CELL_HEIGHT + ENEMY.height;
  let enemySpeed = 50 + Math.floor(Math.random() * 150);
  allEnemies.push(new Enemy(enemyLocationX, enemyLocationY, enemySpeed, player));
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
