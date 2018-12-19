const CELL_WIDTH = 100
const CELL_HEIGHT = 83

const CANVAS_WIDTH = 505
const CANVAS_HEIGTH = 606

const START_X_POSITION = 0
const END_X_POSITION = 404

const START_Y_POSITION = 75
const END_Y_POSITION = 407

const INIT_PLAYER_COORDINATES = {x: 201, y: 407} 

const ALLOW_STUFF_X = [10, 110, 210, 310, 410]
const ALLOW_STUFF_Y = [103, 188, 271]

const SPRITES = [
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
        this.x = START_X_POSITION
    Element.prototype.render.apply(this, arguments);
};

const Player = function(){
    this.x = INIT_PLAYER_COORDINATES.x
    this.y = INIT_PLAYER_COORDINATES.y
    this.sprite = SPRITES[1]
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
                if(this.x - CELL_WIDTH >= START_X_POSITION)
                    this.x -= CELL_WIDTH
            break;
            case 'right':
                if(this.x + CELL_WIDTH <= END_X_POSITION)
                    this.x += CELL_WIDTH
            break;
            case 'up':
                if(this.y - CELL_HEIGHT <=START_Y_POSITION)
                    game_lavel++
                if(this.y - CELL_HEIGHT >= START_Y_POSITION)
                    this.y -= CELL_HEIGHT
            break;
            case 'down':
                if(this.y + CELL_HEIGHT <= END_Y_POSITION)
                    this.y += CELL_HEIGHT
            break;
        }
        if(key === 'space' && this.x === INIT_PLAYER_COORDINATES.x && this.y ===INIT_PLAYER_COORDINATES.y){
            const index = SPRITES.indexOf(player.sprite)
            player.sprite = index === SPRITES.length-1 ? SPRITES[0] : SPRITES[index+1]
        }
    }
};

const Stuff = function(sprite){
    this.x = this.setRandomPosition(ALLOW_STUFF_X)
    this.y = this.setRandomPosition(ALLOW_STUFF_Y)
    this.sprite = sprite
    this.visible = true
}

Stuff.prototype = Object.create(Element.prototype);

Stuff.prototype.update = function(){
    if(!this.visible){
        this.x = this.setRandomPosition(ALLOW_STUFF_X)
        this.y = this.setRandomPosition(ALLOW_STUFF_Y)
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
