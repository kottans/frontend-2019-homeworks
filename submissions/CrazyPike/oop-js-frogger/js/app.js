// Enemies our player must avoid
const coordinatesYBugs = [60,145,230];
const LEFT_BORDER_CANVAS = -100;
const RIGHT_BORDER_CANVAS = 600;
const START_X_PLAYER = 200;
const START_Y_PLAYER = 300;
const STEP_X_PLAYER = 100;
const STEP_Y_PLAYER = 80;

var Enemy = function(player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 100 + Math.floor(Math.random()*50);
    this.y = coordinatesYBugs[Math.floor(Math.random()*3)];
    this.x = LEFT_BORDER_CANVAS;
    this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x =+ this.x+dt*this.speed;
    if (this.x > RIGHT_BORDER_CANVAS) { this.x = LEFT_BORDER_CANVAS;
                        this.y = coordinatesYBugs[Math.floor(Math.random()*3)];
                        this.speed = 100 + Math.floor(Math.random()*50);}
    if (this.isCollision(this,this.player)) this.player.reset();

};

Enemy.prototype.isCollision = function(enemy,player){
    return (Math.abs(enemy.x - player.x) < 50 && Math.abs(enemy.y - player.y) < 30)
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
    if (this.y <= 40) setTimeout(()=>{this.x = START_X_PLAYER; this.y = START_Y_PLAYER;},500)
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
        case 'up': {if (this.y > 40) this.y -= STEP_Y_PLAYER;
                    break;
                    }
        case 'left': {if (this.x > 60) this.x -= STEP_X_PLAYER;
                    break;
                    }
        case 'down': {if (this.y < 360) this.y += STEP_Y_PLAYER;
                    break;
                    }
        case 'right': {if (this.x < 400) this.x += STEP_X_PLAYER;
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

