const CELL_WIDTH = 100
const CELL_HEIGHT = 83
const CANVAS_WIDTH = 505
const CANVAS_HEIGTH = 606
const sprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
]

let game_lavel = 1

const Element = function(){}

Element.prototype.update = function(dt) {
    this.x += this.speed * dt
};

Element.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Element.prototype.setRandomPosition = function(allowArray) {
    return allowArray[Math.floor(Math.random() * allowArray.length)]
};

Element.prototype.changeSprite = function(obj) {
    const index = sprites.indexOf(obj.sprite)
    index === sprites.length-1 ? obj.sprite = sprites[0] : obj.sprite = sprites[index+1]
};

const Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x
    this.y = y
    this.speed = speed
};

Enemy.prototype = Object.create(Element.prototype);

Element.prototype.update = function(dt) {
    this.x += this.speed * dt * game_lavel
};

Enemy.prototype.render = function() {
    if(this.x >= CANVAS_WIDTH)
        this.x = 0
    Element.prototype.render.apply(this, arguments);
};

const Player = function(){
    this.allowX = [1, 101, 201, 301, 401]
    this.allowY = [324, 407]
    this.x = this.setRandomPosition(this.allowX)
    this.y = this.setRandomPosition(this.allowY)
    this.sprite = sprites[1]
    this.lives = 3
    this.score = 0
    this.visible = true
}
Player.prototype = Object.create(Element.prototype);

Player.prototype.render = function() {
    if(this.visible)
        Element.prototype.render.apply(this, arguments);
}

Player.prototype.handleInput = function(key) {
    if(this.visible){
        switch (key) {
            case 'left':
                if(this.x - CELL_WIDTH >= this.allowX[0])
                    this.x -= CELL_WIDTH
            break;
            case 'right':
                if(this.x + CELL_WIDTH <= CANVAS_WIDTH)
                    this.x += CELL_WIDTH
            break;
            case 'up':
                if(this.y - CELL_HEIGHT <=75)
                    game_lavel++
                if(this.y - CELL_HEIGHT >= 75)
                    this.y -= CELL_HEIGHT
            break;
            case 'down':
                if(this.y + CELL_HEIGHT <= 407)
                    this.y += CELL_HEIGHT
            break;
        }
        if(key === 'space' && this.x > 200 && this.x < 300 && this.y > 350 && this.y < CANVAS_HEIGTH){
            this.changeSprite(player)
        }
    }
};

const Stuff = function(sprite){
    this.allowX = [10, 110, 210, 310, 410]
    this.allowY = [103, 188, 271]
    this.x = this.setRandomPosition(this.allowX)
    this.y = this.setRandomPosition(this.allowY)
    this.sprite = sprite
    this.visible = true
}

Stuff.prototype = Object.create(Element.prototype);

Stuff.prototype.update = function(){
    if(!this.visible){
        this.x = this.setRandomPosition(this.allowX)
        this.y = this.setRandomPosition(this.allowY)
    }
}
Stuff.prototype.render = function() {
    if(this.visible)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 105)        
};

const allEnemies = [
    new Enemy(-100, 63, 50),
    new Enemy(-100, 145, 25),
    new Enemy(-100, 230, 5)
]
const player = new Player()
const gem = new Stuff('images/Gem Green.png')
const heart = new Stuff('images/Heart.png')

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
