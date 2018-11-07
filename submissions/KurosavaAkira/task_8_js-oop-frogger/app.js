const img = {
    enemy: 'images/enemy-bug.png',
    player: 'images/char-cat.png',
}

const LAST_ROW_POSITION_PIXEL = 405; 
const MIDDLE_ROW_POSITION_PIXEL = 202;
const ONE_ROW_PIXEL = 102;

const LAST_COLUMN_POSITION_PIXEL = 405;
const ONE_COLUMN_PIXEL = 83;

const ENEMY_ENTRY_POINTS_Y_AXIS = [1, 2, 3].map(rowNo => rowNo * ONE_COLUMN_PIXEL - 20);

const MAX_ENEMY_POSITION_PIXEL = 510; 
const START_ENEMY_POSITION_PIXEL = -50; 
const ENEMY_SPEED = 256; 

const PLAYER_SIZE_X = 80;
const PLAYER_SIZE_Y = 60;

class Character {
    constructor(x = 0, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Character {
    constructor(x = 0, y, speed = ENEMY_SPEED, sprite = img.enemy) {
        super(x, y, sprite)
        this.speed = speed;
    }
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > MAX_ENEMY_POSITION_PIXEL) {
            this.x = START_ENEMY_POSITION_PIXEL;
            this.speed = 100 + Math.floor(Math.random() * ENEMY_SPEED);
        }
        //Credit collision detection: https://stackoverflow.com/questions/2440377/javascript-collision-detection
        if (player.x < this.x + PLAYER_SIZE_X &&
            player.x + PLAYER_SIZE_X > this.x &&
            player.y < this.y + PLAYER_SIZE_Y &&
            player.y + PLAYER_SIZE_Y > this.y) {
            player.x = MIDDLE_ROW_POSITION_PIXEL;
            player.y = LAST_COLUMN_POSITION_PIXEL;
        }
    }
}

class Player extends Character {
    constructor(x, y, sprite = img.player) {
        super(x, y, sprite)
    }
    update(dt) {
        
    }
    handleInput(key) {
        if (key == 'left' && this.x > 0)  this.x -= ONE_ROW_PIXEL;
        if (key == 'right' && this.x < LAST_ROW_POSITION_PIXEL) this.x += ONE_ROW_PIXEL;
        if (key == 'up' && this.y > 0) this.y -= ONE_COLUMN_PIXEL;
        if (key == 'down' && this.y < LAST_COLUMN_POSITION_PIXEL) this.y += ONE_COLUMN_PIXEL;
        if (this.y < 0) {
            setTimeout(() => {
                this.x = MIDDLE_ROW_POSITION_PIXEL;
                this.y = LAST_COLUMN_POSITION_PIXEL;
            }, 500);
        }
    }
}

let allEnemies = [];

ENEMY_ENTRY_POINTS_Y_AXIS.forEach(function (locationY) {
    enemy = new Enemy(500, locationY);
    allEnemies.push(enemy);
});

let player = new Player(MIDDLE_ROW_POSITION_PIXEL, LAST_COLUMN_POSITION_PIXEL);

document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});