let Character = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Enemy = function(x, y, movement) {
    Character.call(this, x, y, 'images/enemy-bug.png')
    this.movement = movement;
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.constructor = Character;

Enemy.prototype.update = function(dt) {
    this.x += this.movement * dt;
    if (this.x > 505) {
        this.x = -150;
        this.movement = 150 + Math.floor(Math.random() * 800);
    }
    let pos1 = player.x < this.x + 60,
        pos2 = this.x < player.x + 37,
        pos3 = player.y < this.y + 25,
        pos4 = this.y < player.y + 30;
    if (pos1 && pos2 && pos3 && pos4) { player.x = 200; player.y = 400 };
};

let Player = function(x, y, movement) {
    Character.call(this, x, y, 'images/char-boy.png')
    this.movement = movement;
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.constructor = Character;

Player.prototype.update = function() {
    if (this.x < 0) this.x = 0;
    if (this.x > 400) this.x = 400;
    if (this.y > 380) this.y = 380;
    if (this.y < 0) {
        setTimeout(()=> {
            this.x = 200;
            this.y = 380
        }, 1000)
    };
};

Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
        case 'left':
            this.x -= this.movement + 50;
            break;
        case 'up':
            this.y -= this.movement + 30;
            break;
        case 'right':
            this.x += this.movement + 50;
            break;
        case 'down':
            this.y += this.movement + 30;
            break;
    }
};

let allEnemies = [];
const ENEMY_POSITION = [50, 130, 220];
const player = new Player(200, 400, 50);

ENEMY_POSITION.map((enemyCoordinate) => {
	let enemy = new Enemy(0, enemyCoordinate, 100 + Math.floor(Math.random() * 300));
	allEnemies.push(enemy);
});

document.addEventListener('keyup', function (e) {
	const allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
