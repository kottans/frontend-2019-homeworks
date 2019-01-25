const playerStartLocation = { 'x' : 202, 'y' : 405 },
      playerStep = { 'x' : 102, 'y' : 83 },
      randomSpeed = function () {
        return 100 + Math.floor(Math.random() * 222);
      }
// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    // The following variables are used to determine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy of cockroach that is added to the playing field 
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.speed * dt;
    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = randomSpeed();
    };
    // Checks for collisions between the player and the enemies
    this.checkCollisium();
};
// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player class focusing on x and y axis
Enemy.prototype.checkCollisium = function () {
    if (player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 60 &&
    60 + player.y > this.y) {
    player.x = playerStartLocation.x;
    player.y = playerStartLocation.y;
};
}
const Player = function (x, y) {
    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;
    //The image of the player of horn-girl is added to the playing field 
    this.sprite = 'images/char-cat-girl.png';
};
Player.prototype.update = function (dt) {
};
// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {
    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0) {
        this.x -= playerStep.x;
    };
    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (keyPress == 'right' && this.x < 405) {
        this.x += playerStep.x;
    };
    // Enables user on up arrow key to move upwards on the y axis by 83
    if (keyPress == 'up' && this.y > 0) {
        this.y -= playerStep.y;
    };
    // Enables user on down arrow key to move downwards on the y axis by StepY
    // Also enables user not to go off the game tiles on the bottom side
    if (keyPress == 'down' && this.y < 405) {
        this.y += playerStep.y;
    };
    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    if (this.y < 0) {
        setTimeout(() => {
            this.x = playerStartLocation.x;
            this.y = playerStartLocation.y;
        }, 800);
    };
};
// All enemies are placed in an array
const allEnemies = [63, 147, 230].map(value => {return new Enemy( 0, value, ( 0 + randomSpeed() ) )});
// The starting location of the player is located at x=200, y=405
const player = new Player( playerStartLocation.x, playerStartLocation.y );
// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
