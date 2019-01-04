const ENEMY_START_Y = [60,143,226];
const ENEMY_START_X = -100;
const MAX_ENEMY_SPEED = 300;
const MIN_ENEMY_SPEED = 150;
const PLAYER_START_Y = 380;
const PLAYER_START_X = 202;
const PLAYER_MOVE_Y = 83;
const PLAYER_MOVE_X = 101;
const PLAYER_BODY = 80;
const FREE_GAME_CELLS = 4;
const MAX_PLAYGROUND_Y = FREE_GAME_CELLS * PLAYER_MOVE_Y;
const MAX_PLAYGROUND_X = FREE_GAME_CELLS * PLAYER_MOVE_X;
var allEnemies = [];

var Enemy = function(index, speed) {
    this.x = ENEMY_START_X;
    this.y = ENEMY_START_Y[index];
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.contact = function() {
    if((this.x < player.x && this.x > player.x - PLAYER_BODY) && (this.y < player.y + (PLAYER_BODY / 3) && this.y > player.y - (PLAYER_BODY / 3))){
        player.reset();
    }
}; 

Enemy.prototype.update = function(dt) {
    this.contact();
    this.x += dt * this.speed;
    for(let i = 0; i < allEnemies.length; i++) {
        if(allEnemies[0].x > MAX_PLAYGROUND_X + PLAYER_MOVE_X) {
            allEnemies.shift();
            this.addEnemys(1);
        }
    }
};

Enemy.prototype.addEnemys = function(amount) {
    for(let i = 0; i < amount; i++) {
        let index = Math.floor(Math.random() * ENEMY_START_Y.length) + 0;
        let speed = Math.floor(Math.random() * MAX_ENEMY_SPEED) + MIN_ENEMY_SPEED;
        let enemy = new Enemy(index, speed);
        allEnemies.push(enemy);
    } 
};


var Player = function() {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = PLAYER_START_X; 
    this.y = PLAYER_START_Y;
};

Enemy.prototype.addEnemys(3);

var player = new Player();

player.handleInput = function(key) {
    switch(key) {
        case 'left': 
            if(player.x > 0) {
                player.x -= PLAYER_MOVE_X;  
            } 
            break;

        case 'up': 
            if(player.y > PLAYER_MOVE_Y) {
                player.y -= PLAYER_MOVE_Y;
            } else if (player.y < PLAYER_MOVE_Y) player.reset();
            break;

        case 'right': 
            if(player.x < MAX_PLAYGROUND_X) {
                player.x += PLAYER_MOVE_X;
            } 
            break;

        case 'down': 
            if(player.y < MAX_PLAYGROUND_Y) {
                player.y += PLAYER_MOVE_Y;
            } 
            break;
    }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

