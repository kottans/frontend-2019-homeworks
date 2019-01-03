class Enemy {
    constructor (x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update (dt) {
        this.x += this.speed * dt;
    
        if (this.x > 505) {
            this.x = -70;
            this.speed = 100 + Math.floor(Math.random() * 235);
        };
    
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
            player.x = 202;
            player.y = 405;
        };
    }

};

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-princess-girl.png';
    }

    render () {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }

    update (dt) {
        if (this.y < 0) {
            setTimeout(() => {
                this.x = 202;
                this.y = 405;
            }, 800);
        };
    }

    handleInput (keyPress) {
        
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 83;
        };
    
        if (keyPress == 'down' && this.y < 405) {
            this.y += 83;
        };
    
        if (keyPress == 'right' && this.x < 405) {
            this.x += 101;
        };
    
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 101;
        };
    
    }
}

const allEnemies = [];

const enemyLocation = [60, 145, 225];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

const player = new Player(202, 405);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


