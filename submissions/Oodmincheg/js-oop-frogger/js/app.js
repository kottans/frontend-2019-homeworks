// Enemies our player must avoid
var Enemy = function(y, player) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = 1;
  this.y = y;
  this.player = player;
  this.setSpeed(); //random initial speed for bugs
};
Enemy.prototype.setSpeed = function() {
  this.speed = 100 * (Math.random() * 3 + 1);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x > 500) {
    this.setSpeed(); //random  new speed
    this.x = 0;
  }
  this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//check collision bugs with hero
Enemy.prototype.checkCollision = function() {
  if (
    this.y > this.player.y - 50 &&
    this.y < this.player.y + 50 &&
    this.x > this.player.x - 50 &&
    this.x < this.player.x + 50
  ) {
    this.player.health--;
    this.player.fromStart();
  }
};

// Player class
// render() and
// a handleInput() method.
var Hero = function() {
  this.sprite = "images/char-boy.png";
  this.fromStart();
  this.score = 0;
  this.health = 2;
};

Hero.prototype.fromStart = function() {
  const START_HERO_COORDINATS = {
    x: 203,
    y: 398
  };
  this.x = START_HERO_COORDINATS.x;
  this.y = START_HERO_COORDINATS.y;
};

Hero.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Hero.prototype.handleInput = function(key) {
  switch (key) {
    case "left":
      this.x > 50 && (this.x -= 50);
      break;
    case "right":
      this.x < 400 && (this.x += 50);
      break;
    case "down":
      this.y < 398 && (this.y += 50);
      break;
    case "up":
      this.y -= 50;
      if (this.y < 40) {
        this.score++;
        this.fromStart();
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const ROW_HEIGHT = 80;
const ROW_0_OFFSET = -30;
const FIELD_ROWS_Y = [1, 2, 3].map(row => ROW_0_OFFSET + row * ROW_HEIGHT);
let allEnemies = FIELD_ROWS_Y.map(rowY => new Enemy(rowY, player));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
