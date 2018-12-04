//=============CHOOSE CHARACTER==============//
// let character = 'images/char-boy.png';
// chooseCharacter = function (e) {
//     let imgName = e.target.id;
//     character = `images/${imgName}.png`;
//     console.log(character)
//
// }
//
//
// let menu = document.querySelector('.menu');
// menu.addEventListener('click', chooseCharacter);


//===============Enemy================//
const startPoint = {
    x: 200,
    y: 420
};
const startSpeed = 400;
const gameArea = {
    start: 0,
    end: 400,
    outside: 500
};
const playerStep = {
    horizontal: 100,
    vertical: 90
};
const playerWidth = 80;


const Enemy = function (x, y, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x * Math.random();
    this.y = y;
    this.player = player;
    this.speed = startSpeed * Math.random();
    this.update = function (dt) {
        this.x += this.speed * dt;
        if (this.x > gameArea.outside) {
            this.speed = startSpeed * Math.random();
            this.x = gameArea.start;
        }
        if (this.checkCollision()) {
            this.player.toStartPoint();
        }
        ;

    };
    this.checkCollision = function () {
        if (this.y > this.player.y - playerWidth && this.y < this.player.y + playerWidth &&
            this.x > this.player.x - playerWidth && this.x < this.player.x + playerWidth) {
            return true;
        }
    };
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

//==============PLAYER===============//

const Player = function () {
    this.sprite = 'images/char-boy.png';
    this.update = function () {
    };
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    this.toStartPoint = function () {
        this.x = startPoint.x;
        this.y = startPoint.y;
    };
    this.handleInput = function (key) {
        switch (key) {
            case 'left':
                this.x -= playerStep.horizontal;
                if (this.x == -playerStep.horizontal) {
                    this.x = gameArea.end;
                }
                break;
            case 'up':
                this.y -= playerStep.vertical;
                if (this.y == -30) {
                    this.toStartPoint()
                }
                break;
            case 'right':
                this.x += playerStep.horizontal;
                if (this.x == gameArea.outside) {
                    this.x = gameArea.start;
                }
                break;
            case 'down':
                if (this.y < 420) {
                    this.y += playerStep.vertical;
                }
                break;
        }
        ;
    };
};

let player = new Player();
player.toStartPoint();

let bug1 = new Enemy(100, 50, player);
let bug2 = new Enemy(200, 130, player);
let bug3 = new Enemy(300, 230, player);

let allEnemies = [bug1, bug2, bug3, player];


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
