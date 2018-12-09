const blockX = 102;
const blockY = 83;
const enemyBoundsX = 82;
const enemyBoundsY = 63;
const initialX = 205;
const initialY = 405;

const winSound = new Audio("sounds/Success 1.mp3");
const looseSound = new Audio("sounds/Error 1.mp3");

// Helper Functions ---------------------------------------------------------------------------
function generateRandomSpeed() {
  return 100 + Math.floor(Math.random() * 300);
}

function checkCollision(enemy) {
  if (
    player.x < enemy.x + enemyBoundsX &&
    player.x + enemyBoundsX > enemy.x &&
    player.y < enemy.y + enemyBoundsY &&
    enemyBoundsY + player.y > enemy.y
  ) {
    return true;
  } else {
    return false;
  }
}

// Enemy Class --------------------------------------------------------------------------------
var Enemy = function(x, y, speed) {
  this.sprite = "images/enemy-bug.png";

  this.x = x;
  this.y = y;
  this.speed = speed;
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;

  if (this.x > blockX * 5) {
    this.x = -blockX;
    this.speed = generateRandomSpeed();
  }

  if (checkCollision(this)) {
    looseSound.play();
    player.x = initialX;
    player.y = initialY;
  }
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class --------------------------------------------------------------------------------
var Player = function(x, y) {
  this.player = "images/char-boy.png";
  this.x = x;
  this.y = y;
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == "left" && this.x > 1) {
    this.x -= blockX;
  }
  if (keyPress == "right" && this.x < blockX * 4) {
    this.x += blockX;
  }
  if (keyPress == "up" && this.y > 0) {
    this.y -= blockY;
  }
  if (keyPress == "down" && this.y < blockY * 4) {
    this.y += blockY;
  }
  if (this.y < 0) {
    winSound.play();
    setTimeout(() => {
      this.x = initialX;
      this.y = initialY;
    }, 500);
  }
};

//--------------------------------------------------------------------------------------------
var player = new Player(initialX, initialY);
var allEnemies = [];

[blockY - 20, blockY * 2 - 20, blockY * 3 - 20].forEach(function(locationY) {
  enemy = new Enemy(-blockX, locationY, generateRandomSpeed());
  allEnemies.push(enemy);
});

document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
