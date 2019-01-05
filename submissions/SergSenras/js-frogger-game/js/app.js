const BLOCK_HEIGHT = 83;
const BLOCK_WIDTH = 101;
const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;
const IMAGE_WIDTH = 101;
const IMAGE_HEIGHT = 171;
const OFFSET = 20;
const START_Y = BLOCK_WIDTH * 4;
const START_X = BLOCK_WIDTH * 2;

// Enemies our player must avoid
var Enemy = function(x, y, speed, player) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.player = player;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < (CANVAS_WIDTH + BLOCK_WIDTH)){
    this.x += this.speed * dt;
  } else {
    this.x = -BLOCK_WIDTH;
  }
  this.handleCollision(this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.handleCollision = function(x, y) {
  if (
    this.x > this.player.x - BLOCK_WIDTH + OFFSET &&
    this.x < this.player.x + BLOCK_WIDTH - OFFSET &&
    this.y > this.player.y - BLOCK_HEIGHT + OFFSET &&
    this.y < this.player.y + BLOCK_HEIGHT - OFFSET
  ) {
    console.log("Handle collision");
    alert('you lose')
    player.toInitialPosition();
  }
}

let Player = function() {
  this.x = CANVAS_WIDTH / 2 - (IMAGE_WIDTH / 2);
  this.y = CANVAS_HEIGHT - IMAGE_HEIGHT - OFFSET * 2;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {}

Player.prototype.toInitialPosition = function() {
  this.x = CANVAS_WIDTH / 2 - (IMAGE_WIDTH / 2);
  this.y = CANVAS_HEIGHT - IMAGE_HEIGHT - OFFSET * 2;
}

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left': 
      if((this.x - BLOCK_WIDTH + 2) >= 0) this.x -= BLOCK_WIDTH;
      break;
    case 'right': 
      if((this.x + BLOCK_WIDTH + 3) < CANVAS_WIDTH) this.x += BLOCK_WIDTH;
      break;
    case 'up': 
      if(this.y > -15) 
        this.y -= BLOCK_HEIGHT;
      else{
        alert('you won!');
        player.toInitialPosition();
      }
      break;
    case 'down': 
      if((this.y + BLOCK_HEIGHT + 3) < START_Y) this.y += BLOCK_HEIGHT;
      break;
    default:
      break;
  }
  console.log('this.y - '+this.y+'; START_Y - '+START_Y);
}
  
function getRandomSpeed() {
  var min = 50, 
      max = 400;
  return Math.floor(Math.random() * (max - min)) + min;
} 

const player = new Player(START_X, START_Y);
let allEnemies = [new Enemy(-BLOCK_WIDTH, BLOCK_HEIGHT - OFFSET, getRandomSpeed()),
                  new Enemy(-BLOCK_WIDTH, BLOCK_HEIGHT * 2 - OFFSET, getRandomSpeed()),
                  new Enemy(-BLOCK_WIDTH, BLOCK_HEIGHT * 3 - OFFSET, getRandomSpeed())];

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
