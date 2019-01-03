const PLAYER_MOVE_Y = 83;
const PLAYER_MOVE_X = 101;
var arr = [60,143,226];

var Enemy = function() {
    let index = Math.floor(Math.random() * 3) + 0;
    let speed = Math.floor(Math.random() * 300) + 150;
    this.x = -100;
    this.y = arr[index];
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function() {
    if((this.x < player.x && this.x > player.x - 75) && (this.y < player.y + 20 && this.y > player.y - 25)){
        player.reset();
    }
}; 

Enemy.prototype.update = function(dt) {
    this.collision();
    this.x += dt * this.speed;
};


var Player = function() {
    this.x = 202;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 202; 
    this.y = 380;
};

var allEnemies = [];

// Adding new enemies in array with interval in 1.2 sec 
setInterval(function() {
    let enemy = new Enemy();
    allEnemies.push(enemy)
}, 1200);

// Deleting old enemies in array with interval in 1.2 sec, after 5 sec.
// so we have only a few working objects in the array and in memory
setTimeout(function () {
    setInterval(function() {
        allEnemies.shift();
    }, 1200)
}, 5000);


var player = new Player();

player.handleInput = function(key) {
    switch(key) {
        case 'left': 
            if(player.x > 20) {
                player.x -= PLAYER_MOVE_X;  
            } 
            break;

        case 'up': 
            if(player.y > 50) {
                player.y -= PLAYER_MOVE_Y;
            } else if (player.y == 48) player.reset();
            break;

        case 'right': 
            if(player.x < 404) {
                player.x += PLAYER_MOVE_X;
            } 
            break;

        case 'down': 
            if(player.y < 380) {
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

