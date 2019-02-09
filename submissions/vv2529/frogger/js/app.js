// Global variables
const roadRows = [65, 145, 225];

// A common class for Enemy and Player
var Entity = function(x, y, sprite){
	this.x = x;
	this.y = y;
	this.sprite = sprite;
}
Entity.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, speed, target){
	Entity.call(this, x, y, 'images/enemy-bug.png');
	this.speed = speed;
	this.target = target;
	this.width = 98;
	this.height = 66;
	this.roadLimit = 800;
	this.speedRange = [100, 500];
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt){
	this.x += this.speed * dt;

	this.checkOffscreen();
	this.checkForCollision();
}

Enemy.prototype.restart = function(){
	this.y = roadRows[random(roadRows.length)];
	this.x = -this.width;
	this.speed = random(this.speedRange[1], this.speedRange[0]);
}

Enemy.prototype.checkOffscreen = function(){
	if(this.x > this.roadLimit) this.restart();
}

Enemy.prototype.checkForCollision = function(){
	const t = this.target;
	if((((this.x > t.x) && (this.x < t.x + t.width)) ||
		((this.x + this.width > t.x) && (this.x + this.width < t.x + t.width))) &&
		(((this.y > t.y) && (this.y < t.y + t.height)) ||
		((this.y + this.height > t.y) && (this.y + this.height < t.y + t.height))))
		t.restart('lose');
}

// Player class
var Player = function(x, y){
	Entity.call(this, x, y, 'images/char-boy.png');
	this.spawnX = x;
	this.spawnY = y;
	this.stepX = 100;
	this.stepY = 85;
	this.width = 67;
	this.height = 77;
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function(){};
Player.prototype.handleInput = function(dir){
	if(!dir) return;
	const shifts = {
		left: [-1,0],
		up: [0,-1],
		right: [1,0],
		down: [0,1]
	};
	const shift = shifts[dir];
	const newX = this.x + shift[0] * this.stepX;
	const newY = this.y + shift[1] * this.stepY;
	// Check if the player is within the screen; values were picked empirically
	if(0 <= newX && newX <= 400) this.x = newX;
	if(0 <= newY && newY <= 450) this.y = newY;
	// Check if the player reached the water
	if(newY < 0){
		this.restart('win');
	}
}

Player.prototype.restart = function(msg){
	console.log(msg+'!');
	if(msg == 'win') getId('wins').textContent++;
	else if(msg == 'lose') getId('losses').textContent++;

	this.x = this.spawnX;
	this.y = this.spawnY;
}

// Now instantiate your objects.
const player = new Player(200, 400);
const allEnemies = [
	new Enemy(100, roadRows[0], 200, player),
	new Enemy(0, roadRows[1], 100, player),
	new Enemy(-100, roadRows[2], 400, player)
];

/*
 * Events
 */

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e){
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

const skinBox = getId('skin-box');

getId('btn-change-skin').addEventListener('click', () => {
	skinBox.classList.toggle('hidden');
});

getId('skin-box').addEventListener('click', (event) => {
	const elem = event.target;
	if(elem.nodeName != 'IMG') return;
	// Directly changing player.sprite doesn't seem to work :(
	player.sprite = 'images' + elem.src.slice(elem.src.lastIndexOf('/'));
});

/*
 * Helper functions
 */

function random(to = 2, from = 0){
	return Math.floor(Math.random() * (to-from)) + from;
}
function getId(id){return document.getElementById(id)}
