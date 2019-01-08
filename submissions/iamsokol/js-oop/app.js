let allEnemies = [];

const ENEMIES_POSITION = [50, 130, 220],
    WIDTH_PLAYER = 65,
    HEIGHT_PLAYER = 75,
    WIDTH_BLOCK = 150,
    WIDTH_FIELD = 500,
    PLAYER_X = 200,
    PLAYER_Y = 380;

const Enemy = function(x, y, player) {
    this.x = x;
    this.y = y;
    this.player = player;
    this.sprite = 'images/Gem Blue.png';
    this.motion = WIDTH_BLOCK + Math.floor(Math.random() * 125);
};

const Player = function(x, y, motion) {
    this.x = x;
    this.y = y;
    this.motion = motion;
    this.sprite = 'images/char-horn-girl.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.motion * dt;
    if (this.x > WIDTH_FIELD) {
        this.x = -WIDTH_BLOCK;
    }
    this.checkCollisions();
}

Enemy.prototype.checkCollisions = function(dt) {
    let position1 = player.x < this.x + WIDTH_PLAYER,
        position2 = player.x + WIDTH_PLAYER > this.x,
        position3 = player.y < this.y + HEIGHT_PLAYER,
        position4 = player.y + HEIGHT_PLAYER > this.y;
    if (position1 && position2 && position3 && position4) {
        player.restartPlayer();
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    if (this.x < 0) this.x = 0;
    if (this.x > PLAYER_X * 2) this.x = PLAYER_X * 2;
    if (this.y > PLAYER_Y) this.y = PLAYER_Y;
    if (this.y < 0) {
        setTimeout(()=> {
            this.restartPlayer()
        }, 1000)
    };
};

Player.prototype.restartPlayer = function () {
    player.x = PLAYER_X;
    player.y = PLAYER_Y
};

Player.prototype.handleInput = function(pressedKey) {
    switch (pressedKey) {
        case 'left':
            this.x -= this.motion + 50;
            break;
        case 'up':
            this.y -= this.motion + 30;
            break;
        case 'right':
            this.x += this.motion + 50;
            break;
        case 'down':
            this.y += this.motion + 30;
            break;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let player = new Player(PLAYER_X, PLAYER_Y, 50);

ENEMIES_POSITION.map((enemyCoordinate) => {
	let enemy = new Enemy(0, enemyCoordinate, 100 + Math.floor(Math.random() * 125));
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
