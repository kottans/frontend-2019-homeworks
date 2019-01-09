const START_X = 200;
const START_Y = 390;
const WINDOW_WIDTH = 505
const STEP_X = 100
const STEP_Y = 80

var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if(this.x >= WINDOW_WIDTH)
        this.x = -STEP_X;
    else
        this.x += dt*this.speed;

    if (player.x < this.x + STEP_X/2 &&
        player.x + STEP_X/2 > this.x &&
        player.y < this.y + STEP_Y/4 &&
        player.y + STEP_Y/4 > this.y) {
        player.x = START_X;
        player.y = START_Y;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(){
    this.x = START_X;
    this.y = START_Y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    switch (key) {
        case 'left':
            this.x-=STEP_X;
            if(this.x<0){
                this.x = 0;
            }
            break;
        case 'down':
            this.y+=STEP_Y;
            if(this.y>START_X){
                this.y=START_Y;
            }
            break;
        case 'right':
            this.x+=STEP_X;
            if(this.x>WINDOW_WIDTH-STEP_X/5){
                this.x=WINDOW_WIDTH-STEP_X;
            }
            break;
        case 'up':
            this.y-=STEP_Y;
            if (this.y < 0) {
                this.x = START_X;
                this.y = START_Y;
            }
            break;
    }
};
const player = new Player();
function speed(){
    var minVal = 40;
    var maxVal = 180;
    return Math.random() * (180 - 40) + 40;
}

function getEnemyRows(){
    quantityOfEnemies = 3;
    var rows = []
    for(var i = 1; i<=quantityOfEnemies; ++i)
        rows.push(i * STEP_Y - STEP_X/5);
    return rows;
}
const enemyRows = getEnemyRows();
function createEnemies(){
    var enemies = [];
    for(var i = 0; i < enemyRows.length;i++)
        enemies.push( new Enemy(0, enemyRows[i], speed()));
    return enemies;
}
const allEnemies = createEnemies();

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});