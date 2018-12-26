const startSpeed = 300;
const canvasParams = {
  width: 505,
  height: 606,
  cellStep: 83,
  topOffset: 83 - 101
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomEnemyRow() {
  return canvasParams.topOffset + randomInt(1, 4) * canvasParams.cellStep;
}

const Enemy = function(player) {
  this.player = player;
  this.spriteSize = { width: 101, height: 171 };
  this.x = -this.spriteSize.width;
  this.y = getRandomEnemyRow();
  this.speed = startSpeed * Math.random();
  this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > canvasParams.width) this.x = -this.spriteSize.width;

  if (this.checkCollision()) this.player.setStartPoint();
};
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollision = function() {
  if (
    this.y > this.player.y - canvasParams.cellStep &&
    this.y < this.player.y + canvasParams.cellStep &&
    this.x > this.player.x - canvasParams.cellStep &&
    this.x < this.player.x + canvasParams.cellStep
  ) {
    return true;
  }
  return false;
};

const Boy = function() {
  this.spriteSize = { width: 101, height: 171 };
  this.sprite = 'images/char-boy.png';
  this.setStartPoint();
};
Boy.prototype.update = function() {};
Boy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Boy.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'left':
      this.x -= this.spriteSize.width;
      if (this.x <= 0) {
        this.x = 0;
      }
      break;
    case 'up':
      this.y -= canvasParams.cellStep;
      if (this.y <= canvasParams.topOffset) {
        this.setStartPoint();
      }
      break;
    case 'right':
      this.x += this.spriteSize.width;
      if (this.x >= canvasParams.width) {
        this.x -= this.spriteSize.width;
      }
      break;
    case 'down':
      this.y += canvasParams.cellStep;
      if (this.y >= canvasParams.height - this.spriteSize.height) {
        this.y -= canvasParams.cellStep;
      }
      break;
    default:
      break;
  }
};
Boy.prototype.setStartPoint = function() {
  this.x = this.spriteSize.width * 2;
  this.y = canvasParams.topOffset + 5 * canvasParams.cellStep;
};

const player = new Boy();
const allEnemies = [
    new Enemy(player),
    new Enemy(player),
    new Enemy(player)
];

document.addEventListener('keyup', e => {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
