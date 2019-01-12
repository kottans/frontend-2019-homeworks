var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;    
    if(Math.abs(this.x - player.x) < 70 && Math.abs(this.y - player.y) < 50) {
        player.x = 200; 
        player.y = 400;
    }
    if (this.x > 650) {
        this.x = Math.floor(Math.random(-400, -100));
        this.speed = this.speed * Math.floor(Math.round(1, 10));
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    if (this.y <= 40  || this.y >= 450 || this.x <= -40  || this.x >= 440) {
        this.x = 200; 
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKey) {
    switch (allowedKey){
        case 'left':
            this.x -= 30;
            break;
        case 'up':
            this.y -= 30;
            break;
        case 'right':
            this.x += 30;
            break;
        case 'down':
            this.y += 30;
            break;
    }
};

var player = new Player();

var allEnemies = [new Enemy(-50, 60, 100), new Enemy(-150, 140, 100), new Enemy(-100, 230, 100)]

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

