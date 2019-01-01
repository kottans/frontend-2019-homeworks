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
let win = 0;
let Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
Enemy.prototype.update = function(dt,gamer) {
    this.x += dt*this.speed;

    if (this.checkCollision(gamer)){
        alert("You loose");
        gamer.x = START.x;
        gamer.y = START.y;
    }
};
Enemy.prototype.render = function() {
    if(this.x >= FIELD.w)
        this.x = 0;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollision = function(gamer){

    if (
       gamer.x < this.x + STEP.x/2 &&
        gamer.x + STEP.x/2 > this.x &&
        gamer.y < this.y + STEP.y/4 &&
        gamer.y + STEP.y/4 > this.y
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
const allEnemies = [
    new Enemy(-100, 55, 100),
    new Enemy(-400, 135, 70),
    new Enemy(0, 135, 35),
    new Enemy(0, 220, 50),
    new Enemy(-300, 220, 70)
];

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
