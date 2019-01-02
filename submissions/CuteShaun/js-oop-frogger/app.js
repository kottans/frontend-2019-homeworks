class Core {
  constructor(x, y, speed) {
    (this.x = x), (this.y = y), (this.speed = speed);
  }
}

// Draw the enemy on the screen, required method for game
Core.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Enemy extends Core {
  constructor(x, y, speed) {
    super(x, y, speed);
    this.sprite = "images/enemy-bug.png";
  }
}

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  if (this.x <= 665) {
    this.x += this.speed;
    //start enemy position and generate new number
  } else {
    this.x = 0;
    this.speed = generateRandomNum();
  }

  //colision
  if (
    (player.x - this.x < 50 && player.x - this.x >= 2 && player.y === this.y) ||
    (this.x - player.x < 50 && this.x - player.x >= 2 && player.y === this.y)
  ) {
    player.x = player.initialX;
    player.y = player.initialY;
  }
};

class Player extends Core {
  constructor(x, y, speed) {
    super(x, y, speed);
    this.initialX = 203;
    this.initialY = 380;
    this.speed = 0;
    this.sprite = "images/char-boy.png";
  }
}

Player.prototype.update = function(dt) {};

//Change player positions
Player.prototype.handleInput = function(keycode) {
  //if we have reached sea, reset player positions
  if (keycode === "up" && this.y === 48) {
    player.x = player.initialX;
    player.y = player.initialY;
  }

  if (keycode === "left" && this.x > 1) {
    this.x -= 101;
  }

  if (keycode === "up" && this.y > 0) {
    this.y -= 83;
  }

  if (keycode === "right" && this.x < 400) {
    this.x += 101;
  }

  if (keycode === "down" && this.y < 379) {
    this.y += 83;
  }
};

//Helper function for generate enemies random speed
const generateRandomNum = function(speed) {
  speed = Math.floor(Math.random(2) * Math.floor(8 - 4) + 4);
  return speed;
};

//Init all instances
let player = new Player(203, 380);
let enemy1 = new Enemy(0, 48, generateRandomNum());
let enemy2 = new Enemy(0, 131, generateRandomNum());
let enemy3 = new Enemy(0, 214, generateRandomNum());

enemy1.update();
player.update();

const allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
