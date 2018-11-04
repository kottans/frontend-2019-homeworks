class Enemy {
    constructor(x = 0, y, speed = 200) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
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
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-cat.png';
    }
    update(dt) {
        
    }
    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
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