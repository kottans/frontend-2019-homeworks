// Enemies our player must avoid
const playerWidth = 70;
const playerHeight = 80;
const moveX = 101;
const moveY = 85;

const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
     this.x = x;
     this.y = y;
     this.speed = speed;
     this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt; 

    if(this.x >400){
      this.x = -30;
      this.speed = Math.floor(Math.random() * 200) + 70;
    };
};

Enemy.prototype.checkCollisions = function(){

    if( this.x + playerWidth > player.x && playerWidth + player.x > this.x && this.y + playerHeight > player.y && playerHeight + player.y > this.y ){
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  
       for(var i=0; i < allEnemies.length; i++){
           if(allEnemies[i].x + playerWidth > player.x && playerWidth +  player.x > allEnemies[i].x &&  allEnemies[i].y + playerHeight > player.y && playerHeight +  player.y > allEnemies[i].y){
            player.x = 200;
            player.y = 400;  
           }
       }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key){
    
        if(key == 'left' && player.x>0){
            player.x-= moveX;
        }  else if (key == 'right' && player.x<400) { 
            player.x+= moveX;
        } else if (key =='up' && player.y>0) { 
            player.y-= moveY;
        } else if (key == 'down' && player.y<400) { 
            player.y+= moveY;
        } ;
        if(player.y < 0){
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
let allEnemies = [];
const enemy1 = new Enemy(50,80,100);
const enemy2 = new Enemy(30,220,50);

allEnemies.push(enemy1, enemy2);

const player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
