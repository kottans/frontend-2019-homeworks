var Enemy = function() {
    
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 63;
    this.speed = (function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      })(70,400);   //random speed of object   
    this.width = 101;
    this.height = 171;  

};

Enemy.prototype.update = function(dt) {    
    if (this.x < 505){
    this.x += (this.speed * dt);
    } else { 
        this.x = 0;
    }
};

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

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});