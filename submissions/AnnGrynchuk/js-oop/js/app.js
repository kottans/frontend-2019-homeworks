// Enemies our player must avoid

const edgeField = 400;

const Enemy = function(x, y, speed, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
     this.x = x;
     this.y = y;
     this.speed = speed;
     this.sprite = 'images/enemy-bug.png';
     this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt; 

    if(this.x > edgeField){
      this.x = -30;
      this.speed = Math.floor(Math.random() * 200) + 70;
    };

    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function(){
    if(this.x + this.player.width > this.player.x && this.player.width + this.player.x > this.x && this.y + this.player.height > this.player.y && this.player.height + this.player.y > this.y) {
        this.player.x = 200;
        this.player.y = 400;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x, y, width, height, moveX, moveY) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.width = width;
    this.height = height;
    this.moveX = moveX;
    this.moveY = moveY;
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key){
    
        if(key == 'left' && this.x>0){
            this.x-= this.moveX;
        }  else if (key == 'right' && this.x<400) { 
            this.x+= this.moveX;
        } else if (key =='up' && this.y>0) { 
            this.y-= this.moveY;
        } else if (key == 'down' && this.y<400) { 
            this.y+=this.moveY;
        } ;
  
        if(this.y < 0){
            setTimeout(function () {
                alert("You are the winner!");
                player.x = 200;
                player.y = 400;
            }, 300);
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200,400,70,80,101,85);
const enemy1 = new Enemy(50,80,100,player);
const enemy2 = new Enemy(30,220,50,player);
let allEnemies = [enemy1,enemy2];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
