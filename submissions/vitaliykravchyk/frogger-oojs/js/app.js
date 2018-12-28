const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 83;
const SPRITE_WIDTH = 78;
const ENEMY_HEIGHT = 12;
const RIGHT_BORDER = 505;
const START_Y_POINT = BLOCK_WIDTH * 4;
const START_X_POINT = BLOCK_WIDTH * 2;
let Creature = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};
Creature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
let Enemy = function(x, y, speed) {
    Creature.call(this, x, y, 'images/enemy-bug.png')
    this.speed = speed;
};
Enemy.prototype = Object.create(Creature.prototype);
Enemy.prototype.constructor = Creature;

Enemy.prototype.update = function(dt) {
    if(this.x < RIGHT_BORDER){
        this.x += this.speed * dt;
    } else {
        this.x = -BLOCK_WIDTH;
    }
};

let Player = function(x, y){
    Creature.call(this, x, y, 'images/char-boy.png');
    this.count = 0;
}
Player.prototype = Object.create(Creature.prototype);
Player.prototype.constructor = Creature;

Player.prototype.handleInput = function(key){
    switch (key) {
        case 'left': this.x -= BLOCK_WIDTH;
            break;
        case 'right': this.x += BLOCK_WIDTH;
            break;
        case 'up': this.y -= BLOCK_HEIGHT;
            break;
        case 'down': this.y += BLOCK_HEIGHT;
        default:
            break;
    }
}
Player.prototype.update = function() {
    if(this.y > START_Y_POINT){
        this.y  = START_Y_POINT;
    }
    if(this.y < 0){
        this.count++
        this.y = START_Y_POINT;
    }
    if(this.x > (RIGHT_BORDER - BLOCK_WIDTH)){
        this.x -= RIGHT_BORDER;
    }
    if(this.x < 0){
        this.x = (RIGHT_BORDER - BLOCK_WIDTH);
    }
}

function checkCollisions(){
    let arrayLength = allEnemies.length;
    let x = player.x;
    let y = player.y;
    for(let i = 0; i < arrayLength; i++){
        let backCollision = x <= (parseInt(allEnemies[i].x) + SPRITE_WIDTH) && x >= parseInt(allEnemies[i].x);
        let frontCollision = (x + SPRITE_WIDTH) >= parseInt(allEnemies[i].x) && (x + SPRITE_WIDTH) <= parseInt(allEnemies[i].x + SPRITE_WIDTH);
        let heightCollision = (y - ENEMY_HEIGHT) === (parseInt(allEnemies[i].y));
        if( (backCollision || frontCollision) && heightCollision){
            player.y = START_Y_POINT;
            player.x = START_X_POINT;
            player.count = 0;
        }
    }
}

let player = new Player(START_X_POINT, START_Y_POINT);
let allEnemies = [new Enemy(-BLOCK_WIDTH, 60, 50), new Enemy(-BLOCK_WIDTH, 143, 25), new Enemy(-BLOCK_WIDTH, 226, 75)];

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]); 
});
