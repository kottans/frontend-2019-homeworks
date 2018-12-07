// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 63;
    this.speed = (function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      })(70,400);   //random speed of object   
    this.width = 101;
    this.height = 171;  

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505){
    this.x += (this.speed * dt);
    } else { 
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {  //отрисовка жуков
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width,this.height);
    
        var  XColl=false;
        var  YColl=false;
              
        if (((this.x+10) + (this.width-50) >= (player.x+10)) && ((this.x+10) <= (player.x+10) + (player.width-50))) XColl = true;
        if (((this.y+20) + (this.height-120) >= player.y+10) && ((this.y+10) <= (player.y+10)+ player.height-120)) YColl = true;    
             
        if (XColl&&YColl){
            player.x = 200;
            player.y = 380;
        };
};     

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.width = 101;
    this.height = 171;

  };

  

Player.prototype.update = function () {
       if (this.y <= 40) {
           this.x = 200;
           this.y = 380;
       };

       
       
    };

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width,this.height);    
};

Player.prototype.handleInput = function (key) {

    if (key == 'left'&& this.x > 0){
         this.x -= 100;
    } else if (key == 'right'&& this.x < 400){
        this.x += 100;
    } else  if (key == 'up'&& this.y > 0) {
        this.y -= 80;
    } else if (key == 'down'&& this.y < 380) {
        this.y += 80;
    }
};


 

/* var Stones = function () {
    this.sprite; 
    this.y; 
    this.x; 
};

Stones.prototype.render = function() {
    if(player.y<100) 
    {ctx.drawImage(Resources.get(this.sprite), this.x, this.y);}
};  //отрисовка камней 

Stones.prototype.update = function () {
   if(player.y>100){
       
      this.sprite = (function () {
        var am = ['images/Gem_Green.png','images/Gem Orange.png','images/Gem Blue.png'];
        this.sprite = Math.floor(Math.random() * am.length);
        return am[this.sprite];
      }());
       
      this.y = (function () {
        var arr = [380,300,220,140,60];
        this.y = Math.floor(Math.random() * arr.length);
         return arr[this.y];
      }());
      
      this.x =  (function () {
        var arr = [100,200,300,400];
        this.x = Math.floor(Math.random() * arr.length);
         return arr[this.x];
      }());      
   }
};  */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy = new Enemy();

var enemy_1 = new Enemy();
    enemy_1.y = 145;
    

var enemy_2 = new Enemy();
    enemy_2.y = 228;

var enemy_3 = new Enemy(); 
var enemy_4 = new Enemy();
    enemy_4.y = 145;   
    
        

var allEnemies = [];
    allEnemies.push( enemy,enemy_1,enemy_2,enemy_3,enemy_4);

 
  
var player = new Player();
//var stone = new Stones();


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