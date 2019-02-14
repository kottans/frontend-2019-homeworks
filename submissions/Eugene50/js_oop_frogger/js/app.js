const imgBug = 'images/enemy-bug.png';
const imgBoy = 'images/char-boy.png';
const widthField = 505;
const heightField = 40;
const playerPositionX = 200;
const playerPositionY = 380;
// random speed
function enemyRandomSpeed(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  class Player {
    constructor(x, y, width, height, sprite = imgBoy) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sprite = sprite;
    }
  }

  Player.prototype.update = function () {
    if (this.y <= heightField) {
      this.x = playerPositionX;
      this.y = playerPositionY;
    };
  };

  Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  };

  Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x > 0) {
      this.x -= 100;
    } else if (key === 'right' && this.x < 400) {
      this.x += 100;
    } else if (key === 'up' && this.y > 0) {
      this.y -= 80;
    } else if (key === 'down' && this.y < 380) {
      this.y += 80;
    }
  };

  const player = new Player(200, 380, 101, 171);

  class Enemy {
    constructor(x, y, width, height, boy, speed, sprite = imgBug) {
      this.speed = speed;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sprite = sprite;
      this.boy = boy;
    }
  }

  Enemy.prototype.update = function (dt) {
    if (this.x < widthField) {
      this.x += (this.speed * dt);
    } else {
      this.x = 0;
    }
  };

  Enemy.prototype.render = function () {
    let XColl = false;
    let YColl = false;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);

    if (((this.x + 10) + (this.width - 50) >= (this.boy.x + 10)) && ((this.x + 10) <= (this.boy.x + 10) + (this.boy.width - 50))) XColl = true;
    if (((this.y + 20) + (this.height - 120) >= this.boy.y + 10) && ((this.y + 10) <= (this.boy.y + 10) + this.boy.height - 120)) YColl = true;

  // back to the start point
    if (XColl && YColl) {
      this.boy.x = playerPositionX;
      this.boy.y = playerPositionY;
    };
  };
  //------------------------------------------------------
  const enemy = new Enemy(0, 63, 101, 171, player, enemyRandomSpeed(70, 200));
  const enemyJack = new Enemy(0, 145, 101, 171, player, enemyRandomSpeed(90, 200));
  const enemyMarty = new Enemy(0, 228, 101, 171, player, enemyRandomSpeed(40, 250));
  const enemyBuba = new Enemy(0, 63, 101, 171, player, enemyRandomSpeed(68, 150));
  //------------------------------------------------------
  const allEnemies = [enemy, enemyJack, enemyMarty, enemyBuba];
  //------------------------------------------------------
  document.addEventListener('keyup', function(e) {
    const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };

      player.handleInput(allowedKeys[e.keyCode]);
      
  });
