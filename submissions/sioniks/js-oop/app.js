// Enemies our player must avoid

// All game value set in pixel
const playerImg = 'images/char-boy.png',
    playerSizeX = 80,
    playerSizeY = 60,

    enemyImg = 'images/enemy-bug.png',
    enemySpeed = 220,
    enemyLocation = [63, 147, 230],
    maxEnemyPosition = 505,
    startEnemyPosition = -50,

    oneRowHeight = 101,
    lastRoadRowPosition = 404,
    middleRoadRowPosition = 202,
    lastColumnPosition = 404,
    oneColumnWidth = 85;




class GameUnit {
    constructor(x = 0, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends GameUnit {
    constructor(x = 0, y, speed = enemySpeed, sprite = enemyImg) {
        super(x, y, sprite)
        this.speed = speed;
    }
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > maxEnemyPosition) {
            this.x = startEnemyPosition;
            this.speed = 100 + Math.floor(Math.random() * enemySpeed);
        }

        if (player.x < this.x + playerSizeX &&
            player.x + playerSizeX > this.x &&
            player.y < this.y + playerSizeY &&
            player.y + playerSizeY > this.y) {
            player.x = middleRoadRowPosition;
            player.y = lastRoadRowPosition;
        }
    }
}

class Player extends GameUnit {
    constructor(x, y, sprite = playerImg) {
        super(x, y, sprite)
    }
    update(dt) {

    }
    handleInput(key) {
        if (key == 'left' && this.x > 0) this.x -= oneRowHeight;
        if (key == 'right' && this.x < lastRoadRowPosition) this.x += oneRowHeight;
        if (key == 'up' && this.y > 0) this.y -= oneColumnWidth;
        if (key == 'down' && this.y < lastColumnPosition) this.y += oneColumnWidth;
        if (this.y < 0) {
            setTimeout(() => {
                this.x = middleRoadRowPosition;
                this.y = lastColumnPosition;
            }, 600);
        }
    }
}

let allEnemies = [];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(500, locationY);
    allEnemies.push(enemy);
});

let player = new Player(middleRoadRowPosition, lastColumnPosition);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});