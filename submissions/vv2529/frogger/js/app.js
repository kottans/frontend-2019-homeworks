// A common class for Enemy and Player
var Entity = function(x, y){
	this.x = x;
	this.y = y;
}
Entity.prototype.render = function(){
	// Every instance of child class of Entity should have its sprite
	if('sprite' in this){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
};

// Enemies our player must avoid
var Enemy = function(x, y, speed, target){
	Entity.call(this, x, y);
	this.speed = speed;
	this.target = target;
	this.sprite = 'images/enemy-bug.png';
	this.width = 98;
	this.height = 66;
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt){
	this.x += this.speed * dt;

	this.checkOffscreen();
	this.checkForCollision();
}

Enemy.prototype.restart = function(){
	this.x = -this.width;
	this.y = random(3) * 80 + 65 // = 65, 145 or 225 - rows on the road
	this.speed = random(500, 100);
}

Enemy.prototype.checkOffscreen = function(){
	if(this.x > 800) this.restart();
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
	Entity.call(this, x, y);
	this.spawnX = x;
	this.spawnY = y;
	this.sprite = 'images/char-boy.png';
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
	const newX = this.x + shift[0] * 100;
	const newY = this.y + shift[1] * 85;
	// Check if the player is within the screen; values were picked empirically
	if(0 <= newX && newX <= 400) this.x = newX;
	if(0 <= newY && newY <= 450) this.y = newY;
	// Check if the player reached the water
	if(newY < 0){
		this.restart('win');
	}
};
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
	new Enemy(100, 65, 200, player),
	new Enemy(0, 145, 100, player),
	new Enemy(-100, 225, 400, player)
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
