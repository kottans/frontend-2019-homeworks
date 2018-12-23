const ONE_SECOND = 1000;
const GAME_OUT_SCORE = 500;
const PLAYER_MAX_LIFE = 3;

const enemyRespawnX = -100;

const playerStartPos = { x: 202, y: 380 };

const profitStartPos = { x: 25, y: 115 };
const profitStep = { x: 101, y: 83 };

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
  this.x = -50;
  this.y = 0;
  this.lifeTime = generateNum(2, 4);
  this.sprite = null;
};

function showProfit(imgs) {
  if (this.show) return;
  this.show = true;

  var imgScope = imgs.length - 1;
  if (player.lifes < PLAYER_MAX_LIFE) {
    imgScope++;
  }
  imgIndx = generateNum(0, imgScope);
  this.sprite = imgs[imgIndx];

  setTimeout(() => {
    this.lifeTime = generateNum(2, 4);
    this.show = false;
    this.isGrabbed = false;
  }, this.lifeTime * ONE_SECOND);

  this.x = profitStartPos.x + profitStep.x * generateNum(0, 5);
  this.y = profitStartPos.y + profitStep.y * generateNum(0, 3);
}

Profit.prototype.update = function(dt) {
  //if Player have score 100 points, key may appear
  if (
    !player.hasKey &&
    player.score >= GAME_OUT_SCORE &&
    profitSprites.length < 5
  ) {
    profitSprites.splice(3, 0, 'images/Key.png');
  }
  if (player.hasKey && profitSprites.length == 5) {
    profitSprites.splice(3, 1);
  }

  showProfit.call(this, profitSprites);
};

Profit.prototype.render = function() {
  if (!this.isGrabbed) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 85);
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
};

// This class requires an update(), render() and
Player.prototype.update = function(dt) {
  this.x = this.x;
  this.y = this.y;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.renderLifes();
};

Player.prototype.renderLifes = function(col, row) {
  for (var i = player.lifes; i > 0; i--) {
    ctx.drawImage(Resources.get('images/Heart.png'), 475 - i * 20, 30, 50, 85);
  }
};

Player.prototype.addPoints = function() {
  const profitId = profitSprites.indexOf(profit.sprite);
  if (profitId == 0) {
    this.score += 10;
  } else if (profitId == 1) {
    this.score += 25;
  } else if (profitId == 2) {
    this.score += 50;
  } else if (profitId == profitSprites.length - 1) {
    //life sprite always has last array index
    this.lifes++;
  } else if (profitId == 3) {
    player.hasKey = true;
  }
};

// a handleInput() method.
Player.prototype.handleInput = function(direction) {
  if (direction == 'left') {
    this.move({
      x: this.x - 100,
      y: this.y,
    });
  } else if (direction == 'up') {
    this.move({
      x: this.x,
      y: this.y - 80,
    });
  } else if (direction == 'right') {
    this.move({
      x: this.x + 100,
      y: this.y,
    });
  } else if (direction == 'down') {
    this.move({
      x: this.x,
      y: this.y + 80,
    });
  }
};

Player.prototype.move = function move(newPos) {
  if (newPos.x > 402 || newPos.x < 2 || newPos.y > 380 || newPos.y < 60) {
    if (this.hasKey && newPos.y < 60 && newPos.x == 202) {
      this.x = newPos.x;
      this.y = newPos.y;
      this.onBridge = true;
      return;
    }
    if (newPos.y < 60) {
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
  this.x = playerStartPos.x;
  this.y = playerStartPos.y;
};

//=========================== General ====================================
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy({ x: 0, y: 55 }, 80),
    new Enemy({ x: 0, y: 145 }, 100),
    new Enemy({ x: -250, y: 55 }, 80),
    new Enemy({ x: -250, y: 230 }, 120),
  ],
  // Place the player object in a variable called player
  player = new Player(playerStartPos),
  profit = new Profit();

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
