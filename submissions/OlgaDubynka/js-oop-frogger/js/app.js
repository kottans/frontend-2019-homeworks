const BOARD_WIDTH = 505;
const PLAYER_WIDTH = 60;
const PLAYER_HEIGHT = 80;
const PLAYER_X = 202;
const PLAYER_Y = 405;
const PLAYER_STEP_X = 102;
const PLAYER_STEP_Y = 83;
const ENEMY_LOCATION = [60, 145, 225];
const ENEMY_START = -70;
const DELAY_TIME = 800;
const RANDOM_INDEX = 235;
const DEFAULT_SPEED = 200;
const BLOCK_WIDTH = 100;

class Enemy {
    constructor (x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update (dt) {
        this.x += this.speed * dt;
    
        if (this.x > BOARD_WIDTH) {
            this.x = ENEMY_START;
            this.speed = BLOCK_WIDTH + Math.floor(Math.random() * RANDOM_INDEX);
        };
    
        if (player.x < this.x + PLAYER_HEIGHT &&
            player.x + PLAYER_HEIGHT > this.x &&
            player.y < this.y + PLAYER_WIDTH &&
            PLAYER_WIDTH + player.y > this.y) {
            player.x = PLAYER_X;
            player.y = PLAYER_Y;
        };
    }

};

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-princess-girl.png';
    }

    render () {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }

    update (dt) {
        if (this.y < 0) {
            setTimeout(() => {
                this.x = PLAYER_X;
                this.y = PLAYER_Y;
            }, DELAY_TIME);
        };
    }

    handleInput (keyPress) {

        if (keyPress == 'left' && this.x > 0) {
            this.x -= PLAYER_STEP_X;
        };

        if (keyPress == 'right' && this.x < PLAYER_Y) {
            this.x += PLAYER_STEP_X;
        };
    
        if (keyPress == 'up' && this.y > 0) {
            this.y -= PLAYER_STEP_Y;
        };

        if (keyPress == 'down' && this.y < PLAYER_Y) {
            this.y += PLAYER_STEP_Y;
        };
    }
}

const allEnemies = [];

ENEMY_LOCATION.forEach(function (locationY) {
    let enemy = new Enemy(0, locationY, DEFAULT_SPEED);
    allEnemies.push(enemy);
});

const player = new Player(PLAYER_X, PLAYER_Y);

document.addEventListener('keyup', function(e) {

    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    let key = e.keyCode;

    if (key in allowedKeys) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});


