const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 60;
const PLAYER_X_START = 405;
const PLAYER_Y_START = 405;

const X_STEP = 100;
const Y_STEP = 85;
//speed of our Enemy
const SPEED = 150; 

const X_CENTER = 205;
const X_END = 405; 
const Y_END = 405;

const ENEMY_Y_POSITION = [1, 2, 3].map(row => row * 70 );//Y axis
const ENEMY_START_POSITION = -100;  //X axis
const ENEMY_END_POSITION = 600;     //X axis


// Enemies our player must avoid
class Enemy{
    constructor(x,y,speed,sprite){
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = SPEED;
    }
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt){
        this.x+=dt * this.speed;
        if(this.x > ENEMY_END_POSITION){
            this.x = ENEMY_START_POSITION;
            //every time speed will be increased 
            this.speed =SPEED+Math.floor(Math.random()*100);
        }
        if (player.x < this.x + PLAYER_WIDTH &&
            player.x + PLAYER_WIDTH> this.x &&
            player.y < this.y + PLAYER_HEIGHT &&
            player.y + PLAYER_HEIGHT > this.y) {
            player.x = PLAYER_X_START;
            player.y = PLAYER_Y_START;
        }
    }
// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
    constructor(x,y,sprite){
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-horn-girl.png';
    }
    update(dt){}
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key){
        if(key == 'left' && this.x > 5) this.x-=X_STEP;
        if(key == 'up' && this.y > 5) this.y-=Y_STEP;
        if(key == 'right' && this.x < X_END) this.x+=X_STEP;
        if(key == 'down' && this.y < Y_END) this.y+=Y_STEP;
        //if we got to the river return to the start
        if(this.y < 5){
            setTimeout(()=>{
                this.x = PLAYER_X_START;
                this.y = PLAYER_Y_START;
            }, 1000);
        }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
ENEMY_Y_POSITION.forEach(function(yPosition) {
    enemy = new Enemy(ENEMY_START_POSITION, yPosition);
    allEnemies.push(enemy);
});
// Place the player object in a variable called player
let player = new Player(PLAYER_X_START, PLAYER_Y_START);

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
