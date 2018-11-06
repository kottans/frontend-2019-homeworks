const img = {
    enemy: 'images/enemy-bug.png',
    player: 'images/char-cat.png',
}

class Character {
    constructor(x = 0, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Character {
    constructor(x = 0, y, speed = 200, sprite = img.enemy) {
        super(x, y, sprite)
        this.speed = speed;
    }
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 510) {
            this.x = -50;
            this.speed = 100 + Math.floor(Math.random() * 256);
        }
        //Credit collision detection: https://stackoverflow.com/questions/2440377/javascript-collision-detection
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            player.y + 60 > this.y) {
            player.x = 202;
            player.y = 405;
        }
    }
}

class Player extends Character {
    constructor(x, y, sprite = img.player) {
        super(x, y, sprite)
    }
    update(dt) {
        
    }
    handleInput(key) {
        if (key == 'left' && this.x > 0)  this.x -= 102;
        if (key == 'right' && this.x < 405) this.x += 102;
        if (key == 'up' && this.y > 0) this.y -= 83;
        if (key == 'down' && this.y < 405) this.y += 83;
        if (this.y < 0) {
            setTimeout(() => {
                this.x = 202;
                this.y = 405;
            }, 500);
        }
    }
}

let allEnemies = [];
let enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(500, locationY);
    allEnemies.push(enemy);
});

let player = new Player(202, 405);

document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});