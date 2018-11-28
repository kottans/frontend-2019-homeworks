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
var Enemy = function (x, y, player) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x * Math.random();
    this.y = y;
    this.player = player;
    this.speed = 400 * Math.random();
    this.update = function (dt) {
        this.x += this.speed * dt;
        if (this.x > 495) {
            this.speed = 400 * Math.random();
            this.x = 0;
        }
        this.isCollision();
    };
    this.isCollision = function () {
        if (this.y > this.player.y - 80 && this.y < this.player.y + 80 &&
            this.x > this.player.x - 80 && this.x < this.player.x + 80) {
            this.player.toStartPoint();
        }
    };
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

//==============PLAYER===============//

let Player = function () {
    this.x = 200;
    this.y = 420;
    this.sprite = 'images/char-boy.png';
    this.update = function () {
    };
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    this.toStartPoint = function () {
        this.x = 200;
        this.y = 420;
    };
    this.handleInput = function (key) {
        switch (key) {
            case 'left':
                this.x -= 100;
                if (this.x == -100) {
                    this.x = 400;
                }
                break;
            case 'up':
                this.y -= 90;
                if (this.y == -30) {

                    this.toStartPoint()
                }
                break;
            case 'right':
                this.x += 100;
                if (this.x == 500) {
                    this.x = 0;
                }
                break;
            case 'down':
                if (this.y < 420) {
                    this.y += 90;
                }
                break;
        }
        ;
    };
};

let player = new Player();

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
