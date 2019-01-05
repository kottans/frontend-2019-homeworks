const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  UP:'up',
  DOWN: 'down'
};

const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;

// Enemies our player must avoid
var Enemy = function(startCol, startRow, options) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startCol * 101;
    this.y = startRow * 83 - 20;
    this.velocity = options.velocity || this.setRndVelocity();
    this.direction = options.direction || DIRECTIONS.RIGHT;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.HEIGHT = 171;
Enemy.WIDTH = 101;

Enemy.MIN_VELOCITY = 20;
Enemy.MAX_VELOCITY = 120;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.direction === DIRECTIONS.LEFT) {
      this.x = this.x - this.velocity * dt;
    }
    if (this.direction === DIRECTIONS.RIGHT) {
      this.x = this.x + this.velocity * dt;
    }
    if (this.x < -Enemy.WIDTH || this.x > CANVAS_WIDTH) {
        this.reset();
    }

    this.checkCollisions(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(velocity) {
  this.setRndVelocity();
  if (this.direction === DIRECTIONS.LEFT) {
    this.x = CANVAS_WIDTH + Enemy.WIDTH;
  }
  if (this.direction === DIRECTIONS.RIGHT) {
    this.x = -Enemy.WIDTH;
  };
};

Enemy.prototype.setRndVelocity = function() {
    var randVel = Enemy.MIN_VELOCITY - 0.5 + Math.random() * (Enemy.MAX_VELOCITY - Enemy.MIN_VELOCITY + 1)
    randVel = Math.round(randVel);
    this.velocity = randVel;
    return this.velocity;
};

Enemy.prototype.checkCollisions = function(player) {
    let collisionX = Math.abs((this.x + Enemy.WIDTH) - (player.x + Player.WIDTH)) < Enemy.WIDTH/2;
    let collisionY = Math.abs((this.y + Enemy.HEIGHT) - (player.y + Player.HEIGHT)) < Enemy.HEIGHT/2;

    if (collisionX && collisionY) {
      player.dead();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
  this.x = 2 * 101;
  this.y = 5 * 83 - 20;
  this.velocity = 50;
  this.sprite = 'images/char-boy.png';
};

Player.HEIGHT = 171;
Player.WIDTH = 101;

Player.prototype.update = function(dt){
  if (this.direction === DIRECTIONS.LEFT) {
    this.x = this.x - this.velocity * dt;
  }
  if (this.direction === DIRECTIONS.RIGHT) {
    this.x = this.x + this.velocity * dt;
  }
  if (this.direction === DIRECTIONS.UP) {
    this.y = this.y - this.velocity * dt;
  }
  if (this.direction === DIRECTIONS.DOWN) {
    this.y = this.y + this.velocity * dt;
  }

  if (this.x < -10) {
    this.x = -10;
  }
  if (this.x > CANVAS_HEIGHT - Player.HEIGHT) {
    this.x = CANVAS_HEIGHT - Player.HEIGHT;
  }
  if (this.y < -10) {
    this.y = -10;
    this.win();
  }
  if (this.y > CANVAS_WIDTH - Player.WIDTH + 20) {
    this.y = CANVAS_WIDTH - Player.WIDTH + 20;
  }
};


Player.prototype.reset = function(){
  this.x = 2 * 101;
  this.y = 5 * 83 - 20;
  this.direction = null;
};

Player.prototype.dead = function(){
  alert('You ate bugs! You lose! :(');
  this.reset();
};

Player.prototype.win = function(){
  alert('You have reached the water! You win!');
  this.reset();
};

Player.prototype.handleInput = function(inputDirection){
  this.direction = inputDirection;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(0, 1, {
    direction: DIRECTIONS.RIGHT
  }),
  new Enemy(0, 2, {
    direction: DIRECTIONS.RIGHT
  }),
  new Enemy(0, 3, {
    direction: DIRECTIONS.RIGHT
  })
];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
