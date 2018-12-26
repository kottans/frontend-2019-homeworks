const startSpeed = 300;
const spriteWidth = 101;
const spriteHeight = 171;
const imagesPath = 'images/';

const canvasParams = {
  width: 505,
  height: 606,
  cellStep: 83,
  topOffset: 83 - spriteWidth
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomEnemyRow() {
  return canvasParams.topOffset + randomInt(1, 4) * canvasParams.cellStep;
}

const Sprite = function() {
  this.spriteSize = { width: spriteWidth, height: spriteHeight };
};
Sprite.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Sprite.prototype.getImagePath = function(imageName) {
  return imagesPath + imageName;
};

const Enemy = function(player) {
  Sprite.call(this);
  this.player = player;
  this.x = -this.spriteSize.width;
  this.y = getRandomEnemyRow();
  this.speed = startSpeed * Math.random();
  this.sprite = this.getImagePath('enemy-bug.png');
};
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > canvasParams.width) this.x = -this.spriteSize.width;

  if (this.checkCollision()) this.player.setStartPoint();
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
  Sprite.call(this);
  this.sprite = this.getImagePath('char-boy.png');
  this.setStartPoint();
};
Boy.prototype = Object.create(Sprite.prototype);
Boy.prototype.constructor = Boy;
Boy.prototype.update = function() {};
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
const allEnemies = [new Enemy(player), new Enemy(player), new Enemy(player)];

document.addEventListener('keyup', e => {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
