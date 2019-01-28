const canvasWidth = 505,
      blockWidth = 101,
      blockHeight = 83,
      initialX = blockWidth * 2,
      initialY = 400,
      minSpeed = 120;

let imagesOfHeroes = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

const Enemy = function (x, y, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.player = player;
    this.speed = Math.floor(Math.random() * 250) + minSpeed;
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.update = function (dt) {
    if (this.x < canvasWidth) {
        this.x += this.speed * dt;
    } else {
        this.x = -blockWidth;
    }

    this.isCollide();
};

Enemy.prototype.isCollide = function () {
    if (this.y + blockHeight > this.player.y &&
        this.y < this.player.y + blockHeight &&
        this.x + blockWidth > this.player.x &&
        this.x < this.player.x + blockWidth) {
        this.player.x = initialX;
        this.player.y = initialY;
        this.player.health--;
        if (this.player.health > 0) {
            this.player.score = 0;
        }
    }
};


let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.health = 3;
    this.sprite = imagesOfHeroes[Math.floor(Math.random() * 5)];
    console.log('Score: ' + this.score);
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.querySelector('.score').innerHTML = `Score: ${this.score}`;
    document.querySelector('.health').innerHTML = `Health: ${this.health}`;
};

Player.prototype.update = function () {
    if (this.x >= canvasWidth) {
        this.x -= canvasWidth;
    }
    if (this.x < 0) {
        this.x = (canvasWidth - blockWidth);
    }
    if (this.y > initialY) {
        this.y = initialY;
    }
    if (this.y < 0) {
        this.score++;
        this.y = initialY;
        allEnemies.forEach(enemy => {
            enemy.speed = Math.floor(Math.random() * 300) + minSpeed;
        });
        console.log('Score: ' + this.score);
    }
    if (this.health <= 0) {
        alert(`Game Over! Your score: ${this.score}. Click OK if you want to continue`);
        this.health = 3;
        this.score = 0;
    }
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') this.x = this.x - blockWidth;
    if (key === 'right') this.x = this.x + blockWidth;
    if (key === 'up') this.y = this.y - blockHeight - 1;
    if (key === 'down') this.y = this.y + blockHeight + 1;
};

let player = new Player(initialX, initialY);
let allEnemies = [
    new Enemy(-blockWidth, 63, player),
    new Enemy(-blockWidth, 147, player),
    new Enemy(-blockWidth, 231, player)
];

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
