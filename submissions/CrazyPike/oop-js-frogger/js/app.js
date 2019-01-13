// Enemies our player must avoid
const COORDINATES_Y_ENEMIES = [60,145,230];
const LEFT_BORDER_CANVAS = -100;
const RIGHT_BORDER_CANVAS = 600;
const START_X_PLAYER = 200;
const START_Y_PLAYER = 300;
const STEP_X_PLAYER = 100;
const STEP_Y_PLAYER = 80;
const SPEED_ENEMY = 100;
const SPEED_VARIANCE_ENEMY = 50;
const COLLISION_DIFF_X = 50;
const COLLISION_DIFF_Y = 30;
const TOP_ROW_Y = 40;
const BOTTOM_ROW_Y = 360;
const LEFT_COLUMN_X = 60;
const RIGHT_COLUMN_Y = 400;


var Enemy = function(gamer) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = SPEED_ENEMY + Math.floor(Math.random()*SPEED_VARIANCE_ENEMY);
    this.y = COORDINATES_Y_ENEMIES[Math.floor(Math.random()*COORDINATES_Y_ENEMIES.length)];
    this.x = LEFT_BORDER_CANVAS;
    this.player = gamer;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x =+ this.x+dt*this.speed;
    if (this.x > RIGHT_BORDER_CANVAS) {this.reset();}
    if (this.isCollision(this,this.player)) this.player.reset();

};

Enemy.prototype.reset = function(){
    this.x = LEFT_BORDER_CANVAS;
    this.y = COORDINATES_Y_ENEMIES[Math.floor(Math.random()*COORDINATES_Y_ENEMIES.length)];
    this.speed = SPEED_ENEMY + Math.floor(Math.random()*SPEED_VARIANCE_ENEMY);
}

Enemy.prototype.isCollision = function(enemy,gamer){
    return (Math.abs(enemy.x - gamer.x) < COLLISION_DIFF_X && Math.abs(enemy.y - gamer.y) < COLLISION_DIFF_Y)
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = START_X_PLAYER;
    this.y = START_Y_PLAYER;
}

Player.prototype.update = function () {
    if (this.y <= TOP_ROW_Y) setTimeout(()=>{this.x = START_X_PLAYER; this.y = START_Y_PLAYER;},500)
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = START_X_PLAYER;
    this.y = START_Y_PLAYER;
}

Player.prototype.handleInput = function (key) {

    switch (key) {
        case 'up': {if (this.y > TOP_ROW_Y) this.y -= STEP_Y_PLAYER;
                    break;
                    }
        case 'left': {if (this.x > LEFT_COLUMN_X) this.x -= STEP_X_PLAYER;
                    break;
                    }
        case 'down': {if (this.y < BOTTOM_ROW_Y) this.y += STEP_Y_PLAYER;
                    break;
                    }
        case 'right': {if (this.x < RIGHT_COLUMN_Y) this.x += STEP_X_PLAYER;
                    break;
                    }
    }
    this.render();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [new Enemy(player), new Enemy(player), new Enemy(player), new Enemy(player)]





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

