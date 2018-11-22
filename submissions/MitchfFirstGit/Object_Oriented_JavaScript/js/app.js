
var Enemy = function(x, y, speed) {
    //Setting the Enemy initial location
    this.x = x;
    this.y = y;
    //Setting the Enemy speed and loading the image
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    // Updates the Enemy location 
    this.x += this.speed * dt;
    if (this.x > 710) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 100);
    };
    //Handles collision with the Player 
     if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 303;
        player.y = 415;
        player.updateHelth(-1);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y, score, helth) {
    // Setting the Player initial helth and score
    this.score = score;
    this.helth = helth;
    // Setting the Player initial location
    this.x = x;
    this.y = y;
    //Loading the image for changing Player
    this.changePlayer = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    // Setting the Player initial image
    this.player ='images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

//update Player's score
Player.prototype.updateScore = function () {
    this.score+= 1;
    document.querySelector('.score').textContent = `Score: ${this.score}`;
    // add randomly new Enemy
    if(this.score % 5 == 0){ 
    allEnemies.push(new Enemy(0, enemyLocation[Math.floor(Math.random() * 3)], 270));
    }
};

//update Player's helth
Player.prototype.updateHelth = function (decrement) {
    if( decrement < 0 ){ 
     this.helth -=1;
     if(this.helth == 0){
        if(confirm(`Game over! Your score - ${this.score}. Do you want to restart the game?`)){
            this.newGame(); 
        }
        else{
            throw new Error("Game over");
        }
     }
    }
    else{
        this.helth +=1;
    }
    document.querySelector('.helth').textContent = `Helth: ${this.helth}`; 
};

// Start new game
Player.prototype.newGame = function () {
    allEnemies = [];
    createEnemy(); 
    this.helth = 3;
    this.score = 0;
    document.querySelector('.score').textContent = `Score: ${this.score}`;
};

// Draw the player on the screen,
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

//handleInput  receives user input, allowedKeys (the key which was pressed) 
//and move the player according to that input
Player.prototype.handleInput = function (keyPress) {
    //Left key  move the player to the left, right key to the right,
    // up  move the player up and down  move the player down.
    // player cannot move off screen
    
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 101;    
    };
  
    if (keyPress == 'right' && this.x < 606) {
        this.x += 101;
    };                               
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
        
    };
    if (keyPress == 'down' && this.y < 415) {
        this.y += 83;
    };
    if( this.x ==606 && this.y == 415 ){
    //  user randomly  select the image for the player character 
        this.player =  this.changePlayer[ Math.floor(Math.random() * this.changePlayer.length) ];
    }
    //player reaches the water, reset the player back to the initial location  
    if (this.y <=0) {
        setTimeout(() => {
                this.x = 303;
                this.y = 415;
                this.updateScore();
        }, 100);
    };
};

//add gems(heart) to the game
var Collectables = function (randomX, randomY){
this.heart = 'images/Heart.png';
this.switch = true;
this.randomX=randomX;
this.randomY=randomY; 
}

//add random location for heart image
Collectables.prototype.addLocation = function(){
    this.randomX = Math.floor(Math.random() * 7) * 101;
    this.randomY = Math.floor(Math.random() * 6) * 83;
}

//add  heart image on the screen 
Collectables.prototype.render = function () {

    if(this.switch){
            ctx.drawImage(Resources.get(this.heart), this.randomX, this.randomY );
            this.removeHeart();
    }

};

// remove heart image off the  screen if player touch the heart image
Collectables.prototype.removeHeart = function () {
    if(player.x == this.randomX && player.y == this.randomY){
        player.updateHelth();
        this.switch =false;
        this.addLocation();
        this.changeSwith();
    }
};

// change switch to add heart image
Collectables.prototype.changeSwith = function () {
    var that = this;
    setTimeout( function(){
       that.switch = true;
    },10000 );
}

// All enemies are placed in an array
var allEnemies = [];
//Location all enemies on the y axis 
var enemyLocation = [65, 145, 230]; 

// Creating  new Enemies objects and placing them in an array called allEnemies
function createEnemy(){
    enemyLocation.forEach(function (locationY) {
    allEnemies.push(new Enemy(0, locationY, 270));
});
}
createEnemy();

// Creating a new Player object
var player = new Player(303, 415, 0, 3);

// // Creating a new Collectables object
var collectables = new Collectables(303, 0);
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


