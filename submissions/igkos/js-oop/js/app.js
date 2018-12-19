const BLOCK_HEIGHT = 83;
const BLOCK_WIDTH = 101;
const TOP_OffSET = 20;
const ROWS_NUMBER = 5;
const COLS_NUMBER = 4;
const INITIAL_PLAYER_ROW = 5;
const INITIAL_PLAYER_COL = 2;
const INITIAL_PLAYER_LIFE = 3;
const SCORE_PER_LEVEL = 3;

const FIELD_HEIGHT = BLOCK_HEIGHT * ROWS_NUMBER;
const FIELD_WIDTH = BLOCK_WIDTH * COLS_NUMBER;
const INITIAL_PLAYER_X = INITIAL_PLAYER_COL * BLOCK_WIDTH;
const INITIAL_PLAYER_Y = INITIAL_PLAYER_ROW * BLOCK_HEIGHT;

const INITIAL_ENEMIES_ROWS = [1, 2, 3].map(
  rowNumber => rowNumber * BLOCK_HEIGHT - TOP_OffSET
);
const RANDOM_SPEED = (min = 60, max = 200) =>
  Math.floor(Math.random() * (max - min)) + min;

let Element = function() {};

Element.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Element.prototype.collision = function() {
  if (
    this.x > player.x - BLOCK_WIDTH + TOP_OffSET &&
    this.x < player.x + BLOCK_WIDTH - TOP_OffSET &&
    this.y > player.y - BLOCK_HEIGHT + TOP_OffSET &&
    this.y < player.y + BLOCK_HEIGHT - TOP_OffSET
  ) {
    this.interaction();
  }
};

let Enemy = function(x, y, speed) {
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = speed;
};

Enemy.prototype = Object.create(Element.prototype);

Enemy.prototype.update = function(dt) {
  this.x < FIELD_WIDTH + BLOCK_WIDTH
    ? (this.x += this.speed * dt * player.level)
    : (this.x = -BLOCK_WIDTH);
  this.collision();
};

Enemy.prototype.interaction = function() {
  player.life--;
  if (!player.life) {
    player.life = INITIAL_PLAYER_LIFE;
    player.level = 1;
  }
  player.x = INITIAL_PLAYER_X;
  player.y = INITIAL_PLAYER_Y;
};

let Player = function(x, y) {
  this.sprite = "images/char-boy.png";
  this.x = x;
  this.y = y;
  this.life = INITIAL_PLAYER_LIFE;
  this.level = 1;
  this.score = 0;
};

Player.prototype = Object.create(Element.prototype);

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if (key === "left" && this.x > 0) this.x -= BLOCK_WIDTH;
  if (key === "right" && this.x < FIELD_WIDTH) this.x += BLOCK_WIDTH;
  if (key === "up") this.y -= BLOCK_HEIGHT;
  if (key === "down" && this.y < FIELD_HEIGHT) this.y += BLOCK_HEIGHT;
};

Player.prototype.update = function() {
  if (this.y < 0) {
    this.y = FIELD_HEIGHT;
    this.score++;
    if (!(this.score % SCORE_PER_LEVEL)) {
      this.level++;
    }
  }
};

let allEnemies = INITIAL_ENEMIES_ROWS.map(
  rowNumber => new Enemy(-BLOCK_WIDTH, rowNumber, RANDOM_SPEED())
);
console.log(allEnemies);

let player = new Player(INITIAL_PLAYER_X, INITIAL_PLAYER_Y);

document.addEventListener("keyup", function(e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
