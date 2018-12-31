const start = {
    x: 202,
    y: 390
};
const field = {
    w: 505,
    h: 606
};
// const randSpeed =
let win = 0;
var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
    if (checkCollision(this)){
        alert("You loose");
        player.x = start.x;
        player.y = start.y;
    }
};
Enemy.prototype.render = function() {
    if(this.x >= field.w)
        this.x = -20;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = start.x;
    this.y = start.y;
    this.visible = true;
};
Player.prototype.update = function() {

};
Player.prototype.render = function() {
    this.visible &&
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
Player.prototype.toStart = function () {
    this.x = start.x;
    this.y = start.y;
};
Player.prototype.handleInput = function(code){
    switch (code) {
        case 'left':
            this.x-=100;
            if(this.x<0){
                this.x = 0;
            }
            break;
        case 'down':
            this.y+=82;
            if(this.y>390){
                this.y=390;
            }
            break;
        case 'right':
            this.x+=100;
            if(this.x>field.w-20){
                this.x=field.w-102;
            }
            break;
        case 'up':

            this.y-=82;
            if (this.y < 0) {
                win++;
                console.log(win);
                alert("Happy New Year! You win "+win+" times!");
                this.toStart();
            }
            break;
    }
};
function checkCollision(enemy) {
    if (
        player.x < enemy.x + 62 &&
        player.x + 62 > enemy.x &&
        player.y < enemy.y + 20 &&
        player.y + 20 > enemy.y
    ) {
        return true;
    } else {
        return false;
    }
}
let allEnemies = [
    new Enemy(-100, 55, 100),
    new Enemy(-400, 135, 70),
    new Enemy(0, 135, 35),
    new Enemy(0, 220, 50),
    new Enemy(-300, 220, 70)
];
let player = new Player();
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
