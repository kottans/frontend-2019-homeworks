var VERTICAL_STEP = 90;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 700;
var GORIZONTAL_STEP = CANVAS_WIDTH / 5;
var IMG_HEIGHT = 171;
var IMG_WIDTH = 101;
var player_parametrs = {
    x: () => Math.floor(Math.random() * CANVAS_WIDTH - IMG_WIDTH * 0.5),
    y: () =>Math.floor(CANVAS_HEIGHT - IMG_HEIGHT * 1.25),
    sprite: 'images/char-cat-girl.png'
};
var enemy_parametrs = {
    x: -100,
    y: [Math.floor(CANVAS_HEIGHT / 15), Math.floor(CANVAS_HEIGHT / 3.15), Math.floor(CANVAS_HEIGHT / 1.75)],
    speed: () => Math.floor(Math.random() * 100) + CANVAS_WIDTH / 7,
    sprite: 'images/enemy-bug.png'
};
var victory_parametrs = {
    x: Math.floor(Math.random() * 400),
    y: Math.floor(-IMG_HEIGHT * 0.25),
    speed: 50,
    sprite: [
        'images/char-boy.png',
        'images/princess.png',
        'images/Key.png'
    ]
};
var bonus_parametrs = {
    x: () => Math.floor(Math.random() * CANVAS_WIDTH  * 0.6 + CANVAS_WIDTH * 0.1),
    y: () => Math.floor(Math.random() * CANVAS_HEIGHT * 0.3 + CANVAS_HEIGHT * 0.25),
    sprite: 'images/Heart.png'
};


var Character = function (x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = typeof sprite == 'object' && sprite.length ? sprite[Math.floor(Math.random() * sprite.length)] : sprite;
    this.speed = speed ? speed : 0;
    this.visibility = 1;
};

Character.prototype.render =  function () {
    if (this.visibility) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


var Enemy = function (x, y, speed, sprite ) {
    Character.apply(this, [arguments[0], arguments[1], arguments[2], arguments[3]]);
    this.speed = speed;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > CANVAS_WIDTH) {
        this.x = - IMG_WIDTH * 1.25;
    }
};

var Player = function (x, y, sprite) {
    Character.apply(this, [arguments[0], arguments[1], 0, arguments[2]]);
    this.lives = 1;
    this.lock = 0;
    this.stone = 0;
    this.stoneSprite = '';
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function (key) {
    if (this.lock) {
        return;
    }
    switch (key) {
        case 'up':
            if (this.y - VERTICAL_STEP >= -IMG_HEIGHT / 2) {
                this.y -= VERTICAL_STEP;
            }
            break;
        case 'down':
            if (this.y + VERTICAL_STEP <= 480)
                this.y += VERTICAL_STEP;
            break;
        case 'left':
            if (this.x - GORIZONTAL_STEP >= -IMG_WIDTH * 0.5)
                this.x -= GORIZONTAL_STEP;
            break;
        case 'right':
            if (this.x + GORIZONTAL_STEP <= CANVAS_WIDTH - IMG_WIDTH * 0.5)
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

var Victory = function (x, y, speed, sprite) {
    Character.apply(this, [arguments[0], arguments[1], arguments[2], arguments[3]]);
    this.line = 1;
};
Victory.prototype = Object.create(Character.prototype);
Victory.prototype.constructor = Victory;
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

var Bonus = function (x, y, sprite, bonusType) {
    Character.apply(this, [arguments[0], arguments[1], "", arguments[2]]);
    this.type = bonusType;

};
Bonus.prototype = Object.create(Character.prototype);
Bonus.prototype.constructor = Bonus;

var Сannonball = function () {
    Character.apply(this, arguments);
    this.speed = 500;
    this.visibility = 0;
    this.sprite = 'images/Gem Blue.png';
};
Сannonball.prototype = Object.create(Character.prototype);
Сannonball.prototype.constructor = Сannonball;
Сannonball.prototype.update = function (dt) {
    this.y -= this.speed * dt;
    if (this.y < IMG_HEIGHT * 0.3) {
        this.visibility = 0;
    }
};




var player = new Player(player_parametrs.x(), player_parametrs.y(), player_parametrs.sprite);
var enemy1 =  new Enemy(enemy_parametrs.x, enemy_parametrs.y[0], enemy_parametrs.speed(), enemy_parametrs.sprite);
var enemy2 =  new Enemy(enemy_parametrs.x, enemy_parametrs.y[1], enemy_parametrs.speed(), enemy_parametrs.sprite);
var enemy3 =  new Enemy(enemy_parametrs.x, enemy_parametrs.y[2], enemy_parametrs.speed(), enemy_parametrs.sprite);
var allEnemies = [enemy1, enemy2, enemy3];
var victory = new Victory(victory_parametrs.x, victory_parametrs.y, victory_parametrs.speed, victory_parametrs.sprite);
var heart = new Bonus(bonus_parametrs.x(), bonus_parametrs.y(), bonus_parametrs.sprite, 'heart');
var stone = new Bonus(bonus_parametrs.x(), bonus_parametrs.y(), ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'], 'stone');
var cannonball = new Сannonball ();
