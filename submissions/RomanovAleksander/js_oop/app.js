const convasWidh = 505,
      blockWidth = 101,
      blockHeight = 83,
      initialX = blockWidth * 2,
      initialY = 404;

let imagesOfHeroes = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

let Enemy = function (x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 250) + 70;
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.update = function (dt) {
    if (this.x < convasWidh) {
        this.x += this.speed * dt
    } else {
        this.x = -blockWidth;
    }

    if (!(this.y + blockHeight < player.y ||
        this.y > player.y + blockHeight ||
        this.x + blockWidth < player.x ||
        this.x > player.x + blockWidth)) {
        player.x = initialX;
        player.y = initialY;
    }

};

let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = imagesOfHeroes[Math.floor(Math.random() * 5)];
    console.log('Score: ' + this.score);
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {
    if (this.x >= convasWidh) {
        this.x -= convasWidh;
    }
    if (this.y > initialY) {
        this.y = initialY;
    }
    if(this.y < 0){
        this.score++;
        this.y = initialY;
        document.querySelector('.score').innerHTML = this.score;
        console.log('Score: ' + this.score);
    }
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') this.x = this.x - blockWidth;
    if (key === 'right') this.x = this.x + blockWidth;
    if (key === 'up') this.y = this.y - blockHeight;
    if (key === 'down') this.y = this.y + blockHeight;
};

let allEnemies = [
    new Enemy(-blockWidth, 63),
    new Enemy(-blockWidth, 146),
    new Enemy(-blockWidth, 229)
];
let player = new Player(initialX, initialY);

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
