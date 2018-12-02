var WIDTH = 100
var HEIGHT = 83
var sprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
]

var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x
    this.y = y
    this.speed = speed
};
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt
};
Enemy.prototype.render = function() {
    if(this.x >= 515)
        this.x = 0
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function setRandomPosition(allowArray){
    return allowArray[Math.floor(Math.random() * allowArray.length)]
}

var Player = function(){
    this.x = setRandomPosition([1, 101, 201, 301, 401])
    this.y = setRandomPosition([324, 407])
    this.sprite = sprites[1];
    this.lives = 3
    this.score = 0
    this.visible = true
}
Player.prototype.update = function() {
    // noop
};
Player.prototype.render = function() {
    if(this.visible)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    if(this.visible){
        switch (key) {
            case 'left':
                if(this.x - WIDTH >= 0)
                    this.x -= WIDTH
            break;
            case 'right':
                if(this.x + WIDTH <= 404)
                    this.x += WIDTH
            break;
            case 'up':
                if(this.y - HEIGHT >= 75)
                    this.y -= HEIGHT
            break;
            case 'down':
                if(this.y + HEIGHT <= 407)
                    this.y += HEIGHT
            break;
        }
        if(key === 'space' && this.x > 200 && this.x < 300 && this.y > 350 && this.y <606){
            changeSprite(player)
        }
    }
};

function changeSprite(obj){
    var index = sprites.indexOf(obj.sprite)
    index === sprites.length-1 ? obj.sprite = sprites[0] : obj.sprite = sprites[index+1]
}

var Gem = function(){
    this.x = setRandomPosition([10, 110, 210, 310, 410])
    this.y = setRandomPosition([103, 188, 271])
    this.sprite = 'images/Gem Green.png'
    this.visible = true
}
Gem.prototype.update = function(){
    if(!this.visible){
        this.x = setRandomPosition([10, 110, 210, 310, 410])
        this.y = setRandomPosition([103, 188, 271])
    }
}
Gem.prototype.render = function() {
    if(this.visible)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 105)        
};

var Heart = function(){
    this.x = setRandomPosition([10, 110, 210, 310, 410])
    this.y = setRandomPosition([103, 188, 271])

    this.sprite = 'images/Heart.png'
    this.visible = true
}
Heart.prototype.render = function() {
    if(this.visible)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 105)        
};

var allEnemies = [
    new Enemy(-100, 63, 10),
    new Enemy(-100, 145, 100),
    new Enemy(-100, 230, 5)
]
var player = new Player()
var gem = new Gem()
var heart = new Heart()

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
