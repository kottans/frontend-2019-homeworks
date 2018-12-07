var VERTICAL_STEP = 90;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 700;
var GORIZONTAL_STEP = CANVAS_WIDTH / 5;


var Character = function (sprite) {
    this.sprite = sprite;
};

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.visibility = true;
};

Enemy.prototype = new Character('images/enemy-bug.png');

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    var imgWidht = 75;
    this.x += this.speed * dt;
    if (this.x > CANVAS_WIDTH + 50) {
        this.x = -imgWidht;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    if (this.visibility) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var allEnemies = [
    new Enemy(-100, CANVAS_HEIGHT / 15, Math.random() * 100 + 30),
    new Enemy(-100, CANVAS_HEIGHT / 3.15, Math.random() * (35 - 30) + 30),
    new Enemy(-100, CANVAS_HEIGHT / 1.75, Math.random() * (70 - 30) + 30)
];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.bugs = {
        imgHeight: 220
    };
    this.x = Math.random() * CANVAS_WIDTH - 50;
    this.y = CANVAS_HEIGHT - this.bugs.imgHeight;
    this.lives = 1;
    this.lock = 0;
    this.stone = 0;
    this.stoneSprite = '';

};

Player.prototype = new Character('images/char-cat-girl.png');

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

var Victory = function () {
    var verticalCorrection = 45;
    this.x = Math.floor(Math.random() * 400);
    this.y = -verticalCorrection;
    var imgs = [
        'images/char-boy.png',
        'images/princess.png',
        'images/Key.png'
    ];
    this.line = 1;
    this.speed = 50;
    this.sprite = imgs[Math.floor(Math.random() * imgs.length)];
};

Victory.prototype.update = function (dt) {
    if (this.x <= CANVAS_WIDTH - 100 && this.line) {
        this.x += this.speed * dt;
    } else {
        this.line = 0;
    }

    if (this.x >= 0 && !this.line) {
        this.x -= this.speed * dt;
    } else {
        this.line = 1;
    }
};

Victory.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Heart = function () {
    this.x = Math.random() * 300 + 150;
    this.y = Math.random() * 200 + 150;

    this.sprite = 'images/Heart.png';
    this.visibility = 1;
};

Heart.prototype = new Character('images/Heart.png');

Heart.prototype.render = function () {
    if (this.visibility) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var Stone = function () {
    this.x = Math.random() * 300 + 150;
    this.y = Math.random() * 200 + 150;

    var imgs = [
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'
    ];

    this.sprite = imgs[Math.floor(Math.random() * imgs.length)];
    this.visibility = 1;
};

Stone.prototype.render = function () {
    if (this.visibility) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Stone.prototype.update = function () {
    this.x += 10;
};

var Сannonball = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = 500;
    this.sprite = 'images/Gem Blue.png';
    this.visibility = 0;
}

Сannonball.prototype.render = function () {
    if (this.visibility) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Сannonball.prototype.update = function (dt) {
    var imgWidht = 75;
    this.y -= this.speed * dt;
    if (this.y < 50) {
        this.visibility = 0;
    }
};

Player.prototype.handleInput = function (key) {
    var gorizontalCorrection = 50;
    var verticalCorrection = 90;
    if (this.lock) {
        return;
    }
    switch (key) {
        case 'up':
            if (this.y - VERTICAL_STEP >= -verticalCorrection) {
                this.y -= VERTICAL_STEP;
            }
            break;
        case 'down':
            if (this.y + VERTICAL_STEP <= 480)
                this.y += VERTICAL_STEP;
            break;
        case 'left':
            if (this.x - GORIZONTAL_STEP >= -gorizontalCorrection)
                this.x -= GORIZONTAL_STEP;
            break;
        case 'right':
            if (this.x + GORIZONTAL_STEP <= CANVAS_WIDTH - gorizontalCorrection)
                this.x += GORIZONTAL_STEP;
            break;

        case 'space':
            if(this.stone) {
                this.stone = 0;
                cannonball.x = this.x;
                cannonball.y = this.y;
                cannonball.visibility = 1;
                cannonball.sprite = this.stoneSprite;
            }
    }
};


var player = new Player();
var victory = new Victory();
var heart = new Heart();
var stone = new Stone();
var cannonball = new Сannonball ();
