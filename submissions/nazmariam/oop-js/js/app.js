const START = {
    x: 202,
    y: 390
};
const FIELD = {
    w: 505,
    h: 606
};
const STEP = {
    x:102,
    y:82
};
const SPEED = (min = 40, max = 170) => Math.random() * (max - min) + min;
const ENEMY_ROWS = [1, 2, 3].map(rowNum => rowNum * STEP.y - STEP.x/5);
let win = 0;
let Enemy = function(x,y,speed, gamer) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.gamer = gamer;
};
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;

    if (this.checkCollision()){
        alert("You loose");
        this.gamer.x = START.x;
        this.gamer.y = START.y;
    }
};
Enemy.prototype.render = function() {
    if(this.x >= FIELD.w)
        this.x = -STEP.x;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollision = function(){

    if (
       this.gamer.x < this.x + STEP.x/2 &&
        this.gamer.x + STEP.x/2 > this.x &&
        this.gamer.y < this.y + STEP.y/4 &&
        this.gamer.y + STEP.y/4 > this.y
    ) {
        return true;
    } else {
        return false;
    }
};
let Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = START.x;
    this.y = START.y;
    this.visible = true;
};
Player.prototype.update = function() {

};
Player.prototype.render = function() {
    this.visible &&
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
Player.prototype.toStart = function () {
    this.x = START.x;
    this.y = START.y;
};
Player.prototype.handleInput = function(code){
    switch (code) {
        case 'left':
            this.x-=STEP.x;
            if(this.x<0){
                this.x = 0;
            }
            break;
        case 'down':
            this.y+=STEP.y;
            if(this.y>START.y){
                this.y=START.y;
            }
            break;
        case 'right':
            this.x+=STEP.x;
            if(this.x>FIELD.w-STEP.x/5){
                this.x=FIELD.w-STEP.x;
            }
            break;
        case 'up':

            this.y-=STEP.y;
            if (this.y < 0) {
                win++;
                console.log(win);
                alert("Happy New Year! You win "+win+" times!");
                this.toStart();
            }
            break;
    }
};
const player = new Player();

const allEnemies = ENEMY_ROWS.map(rowNum => new Enemy(-STEP.x, rowNum, SPEED(), player));

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
