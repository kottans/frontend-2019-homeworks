let allEnemies = [];

const ENEMIES_POSITION = [60, 140, 220],
    WIDTH_PLAYER = 60,
    HEIGHT_PLAYER = 70,
    WIDTH_BLOCK = 150,
    WIDTH_FIELD = 500,
    RANDOM_INDEX = 125,
    COEFFICIENT = 100,
    TIME_DELAY = 1000,
    PLAYER_X = 200,
    PLAYER_Y = 380,
    PLAYER_STEP_X = 102,
    PLAYER_STEP_Y = 83;

let Character = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Enemy = function(x, y, player) {
    Character.call(this, x, y, 'images/Gem Blue.png');
    this.player = player;
    this.motion = WIDTH_BLOCK + Math.floor(Math.random() * RANDOM_INDEX);
};

let Player = function(x, y, motion) {
    Character.call(this, x, y, 'images/char-horn-girl.png');
    this.motion = motion;
};

Player.prototype = Object.create(Character.prototype);
Enemy.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Character;
Enemy.prototype.constructor = Character;

Enemy.prototype.update = function(dt) {
    this.x += this.motion * dt;
    if (this.x > WIDTH_FIELD) {
        this.x = -WIDTH_BLOCK;
    }
    this.checkCollisions(player);
}

Enemy.prototype.checkCollisions = function(dt) {
    let position1 = this.player.x < this.x + WIDTH_PLAYER,
        position2 = this.player.x + WIDTH_PLAYER > this.x,
        position3 = this.player.y < this.y + HEIGHT_PLAYER,
        position4 = this.player.y + HEIGHT_PLAYER > this.y;
    if (position1 && position2 && position3 && position4) {
        this.player.restartPlayer();
    };
};

Player.prototype.restartPlayer = function () {
    player.x = PLAYER_X;
    player.y = PLAYER_Y
};

Player.prototype.update = function() {
    if (this.x < 0) this.x = 0;
    if (this.x > PLAYER_X * 2) this.x = PLAYER_X * 2;
    if (this.y > PLAYER_Y) this.y = PLAYER_Y;
};

Player.prototype.handleInput = function(pressedKey) {
    if (pressedKey == 'left' && this.x > 0) {
        this.x -= PLAYER_STEP_X;
    };
    if (pressedKey == 'right' && this.x < PLAYER_Y) {
        this.x += PLAYER_STEP_X;
    };
    if (pressedKey == 'up' && this.y > 0) {
        this.y -= PLAYER_STEP_Y;
        if (this.y < 0) {
            setTimeout(()=> {
                alert("You win!");
                this.restartPlayer()
            }, TIME_DELAY)
        };
    };
    if (pressedKey == 'down' && this.y < PLAYER_Y) {
        this.y += PLAYER_STEP_Y;
    };
};

const player = new Player(PLAYER_X, PLAYER_Y, 100);

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

ENEMIES_POSITION.map((enemyCoordinate) => {
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
