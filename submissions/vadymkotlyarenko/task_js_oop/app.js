const PLAYER_START_X = 200;
const PLAYER_START_Y = 400;
const DISTANCE_FOR_LOSE_X = 70;
const DISTANCE_FOR_LOSE_Y = 50;
const END_GAME_FIELD_FOR_ENEMY = 650;
const ENEMY_START_SPEED = 100;
const PLAYER_STEP_LENGTH = 30;
const PLAYER_GAME_FIELD = {
    left : -40,
    up : 450,
    right : 450,
    down : 40
}
const ENEMY_START_LIMITS = {
    left : -400,
    right : -100
}
const ENEMY_BOOST_LIMITS = {
    min : 1,
    max : 10
}
const ENEMYS_START_GAME_POSITION = {
    first : {
        x : -50,
        y : 60
    },
    second : {
        x : -150,
        y : 140
    },
    third  : {
        x : -100,
        y : 230
    }
}


let Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;    
    if (Math.abs(this.x - player.x) < DISTANCE_FOR_LOSE_X && Math.abs(this.y - player.y) < DISTANCE_FOR_LOSE_Y) {
        player.x = PLAYER_START_X; 
        player.y = PLAYER_START_Y;
    }
    if (this.x > END_GAME_FIELD_FOR_ENEMY) {
        this.x = Math.floor(Math.random(ENEMY_START_LIMITS.left, ENEMY_START_LIMITS.right));
        this.speed = this.speed * Math.floor(Math.round(ENEMY_BOOST_LIMITS.min, ENEMY_BOOST_LIMITS.max));
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
};

Player.prototype.update = function(dt) {
    if (this.y <= PLAYER_GAME_FIELD.down  || this.y >= PLAYER_GAME_FIELD.right 
        || this.x <= PLAYER_GAME_FIELD.left  || this.x >= PLAYER_GAME_FIELD.up) {
            this.x = PLAYER_START_X; 
            this.y = PLAYER_START_Y;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKey) {
    switch (allowedKey){
        case 'left':
            this.x -= PLAYER_STEP_LENGTH;
            break;
        case 'up':
            this.y -= PLAYER_STEP_LENGTH;
            break;
        case 'right':
            this.x += PLAYER_STEP_LENGTH;
            break;
        case 'down':
            this.y += PLAYER_STEP_LENGTH;
            break;
    }
};

var player = new Player();

var allEnemies = [new Enemy(ENEMYS_START_GAME_POSITION.first.x, ENEMYS_START_GAME_POSITION.first.y, ENEMY_START_SPEED), 
    new Enemy(ENEMYS_START_GAME_POSITION.second.x, ENEMYS_START_GAME_POSITION.second.y, ENEMY_START_SPEED), 
    new Enemy(ENEMYS_START_GAME_POSITION.third.x, ENEMYS_START_GAME_POSITION.third.y, ENEMY_START_SPEED)]

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

