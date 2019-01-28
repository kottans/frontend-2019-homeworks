const FROGGER_WIDTH = 505;
const FINISH_HEIGHT = -20;
const START_PLAYER_POS_X = 200;
const START_PLAYER_POS_Y = 380;
const START_ENEMY_POS_Y = 60;
const CHARACTER_WIDTH = 101;
const CHARACTER_HEIGHT = 171;
const STEP_X = 100;
const STEP_Y = 80;
const WINS_TAB = document.getElementById("wins");
let countWins = 0;

const Enemy = function(x, y, player) {
	this.width = CHARACTER_WIDTH;
	this.height = CHARACTER_HEIGHT;
	this.speed = Math.floor(Math.random() * (FROGGER_WIDTH - CHARACTER_WIDTH)) + CHARACTER_WIDTH;
	this.x = x;
	this.y = y;
	this.sprite = 'images/enemy-bug.png';
	this.player = player;
};

Enemy.prototype.checkCollision = function(){
	return (this.y === this.player.y && this.player.x < this.x + CHARACTER_WIDTH/2 && this.player.x > this.x - CHARACTER_WIDTH/2);
};

Enemy.prototype.update = function(dt) {
	this.x = (this.x < FROGGER_WIDTH) ? (this.x + this.speed * dt) : 0;
		if(this.checkCollision())
			this.player.resetPlayerPosition();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
	this.width = CHARACTER_WIDTH;
	this.height = CHARACTER_HEIGHT;
};
	
Player.prototype.resetPlayerPosition = function(){
	this.x = START_PLAYER_POS_X;
	this.y = START_PLAYER_POS_Y;
};
  
Player.prototype.update = function() {
	if (this.y == FINISH_HEIGHT) {
		this.resetPlayerPosition();
		WINS_TAB.innerHTML = ++countWins;
	}
};
	
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
	
Player.prototype.handleInput = function(key) {
	switch(key){
		case "left" : 
			if(this.x > 0) this.x -= STEP_X;
		break;
		case "right" : 
			if(this.x < STEP_X * 4) this.x += STEP_X;
		break;
		case "up" : 
			if(this.y > 0) this.y -= STEP_Y;
		break;
		case "down" : 
			if(this.y < START_PLAYER_POS_Y) this.y += STEP_Y;
		break;
	}
};

const player = new Player(START_PLAYER_POS_X, START_PLAYER_POS_Y);
let allEnemies = [new Enemy(0, START_ENEMY_POS_Y, player), new Enemy(0, START_ENEMY_POS_Y + STEP_Y, player), new Enemy(0, START_ENEMY_POS_Y + STEP_Y * 2, player)];

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
