const GAME_OUT_SCORE = 500;

const WORLD_RIGHT_BORDER = 402;
const WORLD_LEFT_BORDER = 2;
const WORLD_BOTTOM_BORDER = 380;
const WORLD_TOP_BORDER = 60;

const PLAYER_START_POS = { x: 202, y: 380 };
const PLAYER_OFFSET = { x1: 25, y1: 85, x2: -35, y2: -35 };
const PLAYER_MAX_LIFE = 3;
const PLAYER_LEFT_STEP = -100;
const PLAYER_UP_STEP = -80;
const PLAYER_RIGHT_STEP = 100;
const PLAYER_DOWN_STEP = 80;

const enemyRespawnX = -100;
const ENEMY_OFFSET = { x1: 0, y1: 80, x2: 0, y2: -30 };

const PROFIT_START_POS = { x: 25, y: 115 };
const PROFIT_OFFSET = { x1: 0, y1: 25, x2: -51, y2: -112 };
const PROFIT_SIZE = { width: 50, height: 85 };
const PROFIT_STEP = { x: 101, y: 83 };
const PROFIT_HEART_OFFSET = { x1: 20, y1: 30, x2: 50, y2: 85 };
const PROFIT_TIME_RESET = 1000;

const GREEN_GEM_POINTS = 10;
const BLUE_GEM_POINTS = 25;
const ORANGE_GEM_POINTS = 50;

const profitSprites = [
  'images/Gem Green.png',
  'images/Gem Blue.png',
  'images/Gem Orange.png',
  'images/Heart.png',
];

//=========================== Profit class ====================================

var Profit = function(img) {
  this.isGrabbed = false;
  this.show = false;
  this.x = 0;
  this.y = 0;
  this.lifeTime = generateNum(2, 4);
  //default profit sprite
  this.sprite = 'images/Gem Green.png';
  Object.defineProperty(this, 'body', {
    get: function() {
      return {
        x: this.x,
        y: this.y + PROFIT_OFFSET.y1,
        width: this.x + Resources.get(this.sprite).width + PROFIT_OFFSET.x2,
        height: this.y + Resources.get(this.sprite).height + PROFIT_OFFSET.y2,
      };
    },
  });
};

Profit.prototype.showProfit = function(sprites, scope) {
  var id;

  if (this.show) return;
  this.show = true;

  id = generateNum(0, scope);
  this.sprite = sprites[id];

  setTimeout(() => {
    this.lifeTime = generateNum(2, 4);
    this.show = false;
    this.isGrabbed = false;
  }, this.lifeTime * PROFIT_TIME_RESET);

  this.x = PROFIT_START_POS.x + PROFIT_STEP.x * generateNum(0, 5);
  this.y = PROFIT_START_POS.y + PROFIT_STEP.y * generateNum(0, 3);
};

// function(imgs, imgsScope) {}

Profit.prototype.update = function(dt) {
  var scope;
  //if Player have score 100 points, key may appear
  if (
    !hasPlayerKey() &&
    getPlayerScore() >= GAME_OUT_SCORE &&
    profitSprites.length < 5
  ) {
    profitSprites.splice(3, 0, 'images/Key.png');
  }
  if (hasPlayerKey() && profitSprites.length == 5) {
    profitSprites.splice(3, 1);
  }

  scope = profitSprites.length - 1;
  if (getPlayerHealth() < PLAYER_MAX_LIFE) {
    scope++;
  }

  this.showProfit(profitSprites, scope);
};

Profit.prototype.render = function() {
  if (!this.isGrabbed) {
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x,
      this.y,
      PROFIT_SIZE.width,
      PROFIT_SIZE.height,
    );
  }
};

//=========================== Enemy class ====================================
// Enemies our player must avoid
var Enemy = function(startPos, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = startPos.x;
  this.y = startPos.y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  Object.defineProperty(this, 'body', {
    get: function() {
      return {
        x: this.x,
        y: this.y + ENEMY_OFFSET.y1,
        width: this.x + Resources.get(this.sprite).width,
        height: this.y + Resources.get(this.sprite).height + ENEMY_OFFSET.y2,
      };
    },
  });
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > ctx.canvas.width) {
    this.x = enemyRespawnX;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//=========================== Player class ====================================

// Now write your own player class
var Player = function(startPos) {
  this.x = startPos.x;
  this.y = startPos.y;
  this.onBridge = false;
  this.hasKey = false;
  this.score = 0;
  this.lifes = PLAYER_MAX_LIFE;
  this.sprite = 'images/char-boy.png';

  Object.defineProperty(this, 'body', {
    get: function() {
      return {
        x: this.x + PLAYER_OFFSET.x1,
        y: this.y + PLAYER_OFFSET.y1,
        width: this.x + Resources.get(this.sprite).width + PLAYER_OFFSET.x2,
        height: this.y + Resources.get(this.sprite).height + PLAYER_OFFSET.y2,
      };
    },
  });
};

// This class requires an update(), render() and
Player.prototype.update = function(dt) {
  this.x = this.x;
  this.y = this.y;
};

Player.prototype.checkCollisions = function() {
  let that = this;
  let allEntities = allEnemies.concat(allProfits);

  allEntities.forEach(entity => {
    if (entity instanceof Enemy) {
      if (checkBodiesCollide(that.body, entity.body)) {
        that.reset();
      }
    } else if (entity instanceof Profit) {
      if (checkBodiesCollide(that.body, entity.body) && !entity.isGrabbed) {
        entity.isGrabbed = true;
        that.addPoints();
      }
    }
  });
};

function checkBodiesCollide(playerBody, objectBody) {
  return (
    playerBody.x <= objectBody.width &&
    playerBody.width >= objectBody.x &&
    playerBody.y <= objectBody.height &&
    playerBody.height >= objectBody.y
  );
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.renderLifes();
};

Player.prototype.renderLifes = function(col, row) {
  for (var i = this.lifes; i > 0; i--) {
    ctx.drawImage(
      Resources.get('images/Heart.png'),
      475 - i * PROFIT_HEART_OFFSET.x1,
      PROFIT_HEART_OFFSET.y1,
      PROFIT_HEART_OFFSET.x2,
      PROFIT_HEART_OFFSET.y2,
    );
  }
};

Player.prototype.addPoints = function() {
  let that = this;
  allProfits.forEach(profit => _addPoints(that, profit));

  function _addPoints(that, profit) {
    const profitId = profitSprites.indexOf(profit.sprite);
    if (profitId == 0) {
      that.score += GREEN_GEM_POINTS;
    } else if (profitId == 1) {
      that.score += BLUE_GEM_POINTS;
    } else if (profitId == 2) {
      that.score += ORANGE_GEM_POINTS;
    } else if (profitId == profitSprites.length - 1) {
      //life sprite always has last array index
      that.lifes++;
    } else if (profitId == 3) {
      that.hasKey = true;
    }
  }
};

// a handleInput() method.
Player.prototype.handleInput = function(direction) {
  if (direction == 'left') {
    this.move({
      x: this.x + PLAYER_LEFT_STEP,
      y: this.y,
    });
  } else if (direction == 'up') {
    this.move({
      x: this.x,
      y: this.y + PLAYER_UP_STEP,
    });
  } else if (direction == 'right') {
    this.move({
      x: this.x + PLAYER_RIGHT_STEP,
      y: this.y,
    });
  } else if (direction == 'down') {
    this.move({
      x: this.x,
      y: this.y + PLAYER_DOWN_STEP,
    });
  }
};

Player.prototype.move = function move(newPos) {
  if (
    newPos.x > WORLD_RIGHT_BORDER ||
    newPos.x < WORLD_LEFT_BORDER ||
    newPos.y > WORLD_BOTTOM_BORDER ||
    newPos.y < WORLD_TOP_BORDER
  ) {
    if (this.hasKey && newPos.y < 60 && newPos.x == 202) {
      this.x = newPos.x;
      this.y = newPos.y;
      this.onBridge = true;
      return;
    }
    if (newPos.y < WORLD_TOP_BORDER) {
      this.reset();
    }
    return;
  }
  this.x = newPos.x;
  this.y = newPos.y;
};

//Reset Player to initial position
Player.prototype.reset = function() {
  this.lifes--;
  this.x = PLAYER_START_POS.x;
  this.y = PLAYER_START_POS.y;
};

//=========================== General ====================================
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies, allProfits, player;

function createChars() {
  allEnemies = [
    new Enemy({ x: 0, y: 55 }, 80),
    new Enemy({ x: 0, y: 145 }, 100),
    new Enemy({ x: -250, y: 55 }, 80),
    new Enemy({ x: -250, y: 230 }, 120),
  ];
  allProfits = [new Profit()];

  // Place the player object in a variable called player
  player = new Player(PLAYER_START_POS);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function generateNum(min, max) {
  return min + Math.floor(Math.random() * max);
}

function hasPlayerKey() {
  return player && player.hasKey;
}

function getPlayerScore() {
  return player && player.score;
}

function getPlayerHealth() {
  return player && player.lifes;
}
