let allEnemies = [];
const ENEMY_POSITION = [50, 130, 220],
    PLAYER_X = 200,
    PLAYER_Y = 380,
    PLAYER_STEP_X = 50,
    PLAYER_STEP_Y = 30,
    PLAYER_MOVEMENT = 50,
    RANDOM_COEFFICIENT = 100,
    DELAY_TIME = 1000,
    PLAYER_WIDTH = 65,
    PLAYER_HEIGHT = 75,
    BLOCK_WIDTH = 150,
    FIELD_WIDTH = 505;

let Character = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Enemy = function(x, y, player) {
    Character.call(this, x, y, 'images/enemy-bug.png')
    this.player = player;
    this.movement = this.enemySpeed();
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.constructor = Character;

Enemy.prototype.enemySpeed = function () {
    return BLOCK_WIDTH + Math.floor(Math.random() * RANDOM_COEFFICIENT);
};

Enemy.prototype.update = function(dt) {
    this.x += this.movement * dt;
    if (this.x > FIELD_WIDTH) {
        this.x = -BLOCK_WIDTH;
    }
    this.checkCollisions();
}

Enemy.prototype.checkCollisions = function(dt) {
    let pos1 = this.player.x < this.x + PLAYER_WIDTH,
        pos2 = this.x < this.player.x + PLAYER_WIDTH,
        pos3 = this.player.y < this.y + PLAYER_HEIGHT,
        pos4 = this.y < this.player.y + PLAYER_HEIGHT;
    if (pos1 && pos2 && pos3 && pos4) player.startPosition();
};

let Player = function(x, y, movement) {
    Character.call(this, x, y, 'images/char-boy.png')
    this.movement = movement;
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.constructor = Character;

Player.prototype.startPosition = function () {
    player.x = PLAYER_X;
    player.y = PLAYER_Y
};

Player.prototype.update = function() {
    if (this.x < 0) this.x = 0;
    if (this.x > PLAYER_Y) this.x = PLAYER_Y;
    if (this.y > PLAYER_Y) this.y = PLAYER_Y;
    if (this.y < 0) {
        setTimeout(()=> {
            this.startPosition();
        }, DELAY_TIME)
    };
};

Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
        case 'left':
            this.x -= this.movement + PLAYER_STEP_X;
            break;
        case 'up':
            this.y -= this.movement + PLAYER_STEP_Y;
            break;
        case 'right':
            this.x += this.movement + PLAYER_STEP_X;
            break;
        case 'down':
            this.y += this.movement + PLAYER_STEP_Y;
            break;
    }
};

const player = new Player(PLAYER_X, PLAYER_Y, PLAYER_MOVEMENT);

ENEMY_POSITION.map((enemyCoordinate) => {
	let enemy = new Enemy(0, enemyCoordinate, player);
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
