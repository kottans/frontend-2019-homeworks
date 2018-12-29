var lives = 5;
var wins = 0;
function setScore(){
  console.log(lives);
  if(lives === 0){
    table.innerHTML = 'YOU LOSE';
    alert('YOU LOSE')
  }else{
  table.innerHTML = 'Lives: ' + lives + ' | Wins: ' + wins;
  }
};
document.addEventListener('DOMContentLoaded', function(){
  const table = document.getElementById('table');
  setScore();
});
//Starting values
const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;
const ROW_HEIGHT = 83;
const COLL_WIDTH = 101;

const INFO = {
  player_start_x: CANVAS_WIDTH/2 - COLL_WIDTH/2,
  player_start_y: CANVAS_HEIGHT - ROW_HEIGHT*2.5,
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//Enemy class
var Enemy = function(row) {
   //Initial location x and y
    this.start();
    this.y = (ROW_HEIGHT - 10) * row;
    this.width = COLL_WIDTH;
    this.height = ROW_HEIGHT;
    this.row = 6 - row;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.start = function() {
  this.x = -COLL_WIDTH;
  this.speed = getRandomArbitrary(1, 6);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed;

    if(this.x  >= player.x - 70 && this.x - 70 <= player.x && this.row === player.row ){
      player.start();
      lives--;
      setScore();
    }
    if(this.x + this.speed >= CANVAS_WIDTH + this.width){
      this.start();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.start();
};

Player.prototype.update = function(){
  if(this.row === 6){
    this.start();
    wins++;
    setScore();
  }
};

Player.prototype.start = function() {
  this.row = 1;
  this.x = INFO.player_start_x;
  this.y = INFO.player_start_y;
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir){
  switch(dir){
    case 'left':
      if(this.x > 0){
        this.x -= COLL_WIDTH;
      }
    break;

    case 'right':
      if(this.x + COLL_WIDTH < CANVAS_WIDTH){
        this.x += COLL_WIDTH;
      }
    break;

    case 'up':
        this.y -= ROW_HEIGHT;
        this.row++;
    break;

    case 'down':
      if(this.row > 1){
        this.y += ROW_HEIGHT;
        this.row--;
      }
    break;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
for (var i = 1; i <= 3; i ++){
  allEnemies.push( new Enemy(i) );
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
