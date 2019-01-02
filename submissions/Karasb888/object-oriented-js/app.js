var lives = 5;
var wins = 0;

function setScore() {
  if (lives === 0) {
    table.innerHTML = 'YOU LOSE';
    alert('YOU LOSE');
  } else {
    table.innerHTML = 'Lives: ' + lives + ' | Wins: ' + wins;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const table = document.getElementById('table');
  setScore();
});

//MAIN constans
var gameParams = {
  canvas_width: 505,
  canvas_height: 606,
  row_height: 83,
  colums_width: 101,
  colums_numb: 6,
  player_start_x: 202,
  player_start_y: 398
};

//coeficient to fix picture size (enemy, player) and game(canvas) object
SIZING_COEFICIENT = 70;
//coeficient to fix enemys position in rows
POSITION_COEFICIENT = 10;
//Maximum speed of enemy (from 1 to below)
MAX_SPEED = 6;
//winning row
WIN_ROW = 6;
//starting row
START_ROW = 1;
//number of enemy
ENEMIES = 3;
//sprites
const SPRITES = {
  player: 'images/char-boy.png',
  enemy: 'images/enemy-bug.png'
}
//Generate random
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//SUPERCLASS
var Character = function(sprite, x, y) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
};

Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//Enemy class
var Enemy = function(row, player) {
  Character.call(this, SPRITES.enemy, -gameParams.colums_width, (gameParams.row_height - POSITION_COEFICIENT) * row);
  this.width = gameParams.colums_width;
  this.height = gameParams.row_height;
  this.row = gameParams.colums_numb - row;
  this.player = player;
  this.start();
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.start = function() {
  this.x = -gameParams.colums_width;
  this.speed = getRandomArbitrary(1, MAX_SPEED);
};

Enemy.prototype.collide = function() {
  //On collide with player
  if (this.x >= this.player.x - SIZING_COEFICIENT && this.x - SIZING_COEFICIENT <= this.player.x && this.row === this.player.row) {
    this.player.start();
    lives--;
    setScore();
  }
  //when enemy out of game board
  if (this.x + this.speed >= gameParams.canvas_width + this.width) {
    this.start();
  }
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed;
  this.collide();
};

//player class
var Player = function() {
  Character.call(this, SPRITES.player, gameParams.player_start_x, gameParams.player_start_y);
  this.start();
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.start = function() {
  this.row = START_ROW;
  this.x = gameParams.player_start_x;
  this.y = gameParams.player_start_y;
}

Player.prototype.update = function() {};

Player.prototype.checkStatus = function() {
  if (this.row === WIN_ROW) {
    this.start();
    wins++;
    setScore();
  }
};

Player.prototype.handleInput = function(dir) {
  switch (dir) {
    case 'left':
      if (this.x > 0) {
        this.x -= gameParams.colums_width;
      }
      break;
    case 'right':
      if (this.x + gameParams.colums_width < gameParams.canvas_width) {
        this.x += gameParams.colums_width;
      }
      break;
    case 'up':
      this.y -= gameParams.row_height;
      this.row++;
      break;
    case 'down':
      if (this.row > START_ROW) {
        this.y += gameParams.row_height;
        this.row--;
      }
      break;
  };
  this.checkStatus();
};

var player = new Player();

var allEnemies = [];
for (var i = 1; i <= ENEMIES; i++) {
  allEnemies.push(new Enemy(i, player));
}
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
