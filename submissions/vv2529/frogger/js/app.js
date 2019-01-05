// A common class for Enemy and Player
var Entity = function(x, y){
	this.x = x;
	this.y = y;
}
Entity.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, speed){
	Entity.call(this, x, y);
	this.speed = speed;
};
Enemy.prototype = Object.create(Entity.prototype);
// I refuse to write `Enemy.prototype` on every single line!
Enemy.prototype = Object.assign(Enemy.prototype, {
	constructor: Enemy,
	sprite: 'images/enemy-bug.png',
	width: 98,
	height: 66,
	update: function(dt){
		this.x += this.speed * dt;

		// Get an enemy back on track when it is gone
		if(this.x > 800) this.restart();

		// Check for collision
		if((((this.x > player.x) && (this.x < player.x + player.width)) ||
			((this.x + this.width > player.x) && (this.x + this.width < player.x + player.width))) &&
			(((this.y > player.y) && (this.y < player.y + player.height)) ||
			((this.y + this.height > player.y) && (this.y + this.height < player.y + player.height))))
			player.restart('lose');
	},
	restart: function(){
		this.x = -this.width;
		this.y = random(3) * 80 + 60 // = 60, 140 or 220
		this.speed = random(500, 100);
	}
});

// Player class
var Player = function(x, y){
	Entity.call(this, x, y);
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype = Object.assign(Player.prototype, {
	constructor: Player,
	sprite: 'images/char-boy.png',
	width: 67,
	height: 77,
	update: () => {},
	handleInput: function(dir){
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
	},
	restart: function(msg){
		console.log(msg+'!');
		if(msg == 'win') getId('wins').textContent++;
		else if(msg == 'lose') getId('losses').textContent++;

		this.x = 200;
		this.y = 400;
	}
});

// Now instantiate your objects.
const player = new Player(200, 400);
const allEnemies = [
	new Enemy(100, 60, 200),
	new Enemy(0, 140, 100),
	new Enemy(-100, 220, 400)
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
