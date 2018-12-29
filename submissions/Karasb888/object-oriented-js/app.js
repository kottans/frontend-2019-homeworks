var lives = 5;
var wins = 0;

function setScore(){

  if(lives === 0){
    table.innerHTML = 'YOU LOSE';
    alert('YOU LOSE');
  }else{
  table.innerHTML = 'Lives: ' + lives + ' | Wins: ' + wins;
  }

};

document.addEventListener('DOMContentLoaded', function(){

  const table = document.getElementById('table');
  setScore();

});

//MAIN constans
var GAME_PARAMS = {
  canvas_width: 505,
  canvas_height: 606,
  row_height: 83,
  coll_width: 101,
  coll_numb: 6,
  player_start_x: 202,
  player_start_y: 398
};

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
var Character = function(sprite, x, y){
  this.sprite = sprite;
  this.x = x;
  this.y = y;
};

Character.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//Enemy class
var Enemy = function(row, player) {
    Character.call(this, SPRITES.enemy , -GAME_PARAMS.coll_width , (GAME_PARAMS.row_height - 10) * row );
    this.width = GAME_PARAMS.coll_width;
    this.height = GAME_PARAMS.row_height;
    this.row = GAME_PARAMS.coll_numb - row;
    this.player = player;
    this.start();
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.start = function() {
  this.x = -GAME_PARAMS.coll_width;
  this.speed = getRandomArbitrary(1, 6);
};

Enemy.prototype.collision = function() {
  //On collision with player
  if(this.x  >= player.x - 70 && this.x - 70 <= player.x && this.row === player.row ){
    this.player.start();
    lives--;
    setScore();
  }
  //when enemy out of game board
  if(this.x + this.speed >= GAME_PARAMS.canvas_width + this.width){
    this.start();
  }
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed;
    this.collision();
};

//player class
var Player = function(){
    Character.call(this, SPRITES.player , GAME_PARAMS.player_start_x, GAME_PARAMS.player_start_y );
    this.start();
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.start = function() {
  this.row = 1;
  this.x = GAME_PARAMS.player_start_x;
  this.y = GAME_PARAMS.player_start_y;
}

Player.prototype.update = function() {
};

Player.prototype.checkStatus = function() {
  if(this.row === 6){
    this.start();
    wins++;
    setScore();
  }
};

Player.prototype.handleInput = function(dir){

  switch(dir){

    case 'left':
      if(this.x > 0){
        this.x -= GAME_PARAMS.coll_width;
      }
    break;

    case 'right':
      if(this.x + GAME_PARAMS.coll_width < GAME_PARAMS.canvas_width){
        this.x += GAME_PARAMS.coll_width;
      }
    break;

    case 'up':
        this.y -= GAME_PARAMS.row_height;
        this.row++;
    break;

    case 'down':
      if(this.row > 1){
        this.y += GAME_PARAMS.row_height;
        this.row--;
      }
    break;

  };

  this.checkStatus();

};

var player = new Player();

var allEnemies = [];
for (var i = 1; i <= 3; i ++){
  allEnemies.push( new Enemy(i, player) );
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
