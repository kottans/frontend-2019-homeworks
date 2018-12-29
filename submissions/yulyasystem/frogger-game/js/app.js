const initial = {
    x: 200,
    y: 400
  };
  const enemyPos = {
    x: 80,
    y: 60
  };
  const block = {
    x: 100,
    y: 80
  };
  
  function generateSpeed() {
    return Math.round(Math.random() * 400);
  }
  
  function youWin(obj) {
    alert("You win!");
    obj.y = initial.y;
  }
  
  let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/Heart.png";
  };
  
  Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    this.handleCollision();
  };
  
  Enemy.prototype.handleCollision = function() {
    if (this.x > block.x * 5) {
      this.x = -block.x;
      this.speed = generateSpeed();
    }
    if (
      player.x < this.x + enemyPos.x &&
      player.x + enemyPos.x > this.x &&
      player.y < this.y + enemyPos.y &&
      enemyPos.y + player.y > this.y
    ) {
      console.log("Handle collision");
      player.x = initial.x;
      player.y = initial.y;
    }
  };

  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  let Player = function(x, y) {
    this.sprite = "images/char-horn-girl.png";
    this.x = x;
    this.y = y;
  };
  
  Player.prototype.update = function() {};
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  Player.prototype.handleInput = function(key) {
    switch (key) {
      case "up":
      this.y > 0 ? (this.y = this.y - block.y) : (this.y = initial.y);
      this.y == 0 ? setTimeout(youWin, 250, this) : null;
      break;
      case "down":
        this.y < block.y * 5 ? (this.y = this.y + block.y) : null;
        break;
      case "left":
        this.x > 1 ? (this.x = this.x - block.x) : null;
        break;
      case "right":
        this.x < block.x * 4 ? (this.x = this.x + block.x) : null;
        break;
    }
  };

  const player = new Player(initial.x, initial.y);
  let allEnemies =[block.y, block.y*2, block.y*3].map(location => new Enemy(-block.x, location, generateSpeed()));
  
  document.addEventListener("keyup", function(e) {
    const allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
  
    player.handleInput(allowedKeys[e.keyCode]);
  });
  