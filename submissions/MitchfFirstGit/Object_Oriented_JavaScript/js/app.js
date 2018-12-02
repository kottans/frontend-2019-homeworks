alert(`In this game, you have a very difficult mission. Beetles have kidnapped the princess and you must help the prince save her.
    Now the princess is in the tenth principality. The Principality of Beetles is 6 kilometers(levels) away from you. You have to score 10 points to pass the first kilometer.
    Do not waste time and start the game, remember that the princess is in danger!`);
// All enemies are placed in an array
var allEnemies = [];
//amount rows and columns for canvas and images for build canvas
var rowField = 6;
var colField = 7;
var rowImages = [
  "images/water-block.png", // Top row is water
  "images/stone-block.png", // Row 1 of 3 of stone
  "images/stone-block.png", // Row 2 of 3 of stone
  "images/stone-block.png", // Row 3 of 3 of stone
  "images/grass-block.png", // Row 1 of 2 of grass
  "images/grass-block.png" // Row 2 of 2 of grass
];
var game = new Game();
function Game() {
  this.rowHeight = 83;
  this.colWidth = 101;
  this.rowYOffSet = 20;
  this.enemyYLocation = 0;
  this.enemyXLocation = 0;
  this.addField = false;
  this.edgeXField = 707;
  this.edgeYField = 415;
  this.level = 1;
  this.enemyAmount = [1, 2, 3];
  this.enemySpeed = 270;
  this.whenAddEnemy = 4;
  this.whenAddLevel = 10;
}
Game.prototype.startGame = function() {
  //Location all enemies on the y axis
  this.enemyYLocation = this.enemyAmount.map(
    rowNumber => rowNumber * this.rowHeight - this.rowYOffSet
  );
  // Creating  new Enemies objects and placing them in an array called allEnemies
  allEnemies = this.enemyYLocation.map(
    locationY =>
      new Enemy(this.enemyXLocation, locationY, this.enemySpeed, player, game)
  );
};
// add randomly new Enemy
Game.prototype.addNewEnemy = function() {
  allEnemies.push(
    new Enemy(
      this.enemyXLocation,
      this.enemyYLocation[Math.floor(Math.random() * this.enemyAmount.length)],
      this.enemySpeed,
      player,
      game
    )
  );
};
//transfer the player to new level
Game.prototype.setGameToNewLevel = function() {
  rowField++;
  colField++;
  this.edgeXField += 101;
  this.edgeYField += 83;
  this.addNewRow();
  this.addField = true;
  this.enemyAmount.push(this.enemyAmount.length + 1);
  this.updateLevel();
  this.whenAddLevel += 10;
  this.aboutLevel();
  this.startGame();
};
Game.prototype.updateLevel = function() {
  this.level++;
  document.querySelector(".level").textContent = `Level: ${this.level}`;
};
Game.prototype.addNewRow = function() {
  rowImages.splice(4, 0, "images/stone-block.png");
};
Game.prototype.aboutLevel = function() {
  if (this.level === 4) {
    this.whenAddEnemy--;
    alert(`Congratulations! Half the path is already behind you, but one of the Beetles has seen you pursue them ,
     therefore, the number of Beetles has been increased, but this is not a problem for you. Now you are on level ${
       this.level
     } to complete this level you have to score ${
      this.whenAddLevel
    } points. Be careful!`);
  } else if (this.level === 7) {
    if (
      confirm(`Congratulations, you helped the prince to save the princess and saved the kingdom. From today you can name yourself a knight!
         Do you want to restart the game?`)
    ) {
      // Start new game
      location.reload();
    } else {
      throw new Error("Game over");
    }
  } else {
    alert(
      `Congratulations! Now you are on level ${
        this.level
      } to complete this level you have to score ${this.whenAddLevel} points`
    );
  }
};

function Enemy(x, y, speed, player, game) {
  //Setting the Enemy initial location
  this.x = x;
  this.y = y;
  //Setting the Enemy speed and loading the image
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
  this.player = player;
  this.game = game;
  this.startEnemyXPosition = -50;
}

Enemy.prototype.update = function(dt) {
  // Updates the Enemy location
  this.x += this.speed * dt;
  if (this.x > this.game.edgeXField) {
    this.x = this.startEnemyXPosition;
    this.speed = 100 + Math.floor(Math.random() * 100);
  }
  //Handles collision with the Player
  if (
    this.player.x < this.x + this.player.playerSizeX &&
    this.player.x + this.player.playerSizeX > this.x &&
    this.player.y < this.y + this.player.playerSizeY &&
    this.player.playerSizeY + this.player.y > this.y
  ) {
    this.player.x = 606;
    this.player.y = this.game.edgeYField;
    this.player.updateHelth(-1);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Creating a new Player object
var player = new Player(0, 3, game);
game.startGame();
function Player(score, helth, game) {
  // Setting the Player initial helth and score
  this.score = score;
  this.helth = helth;
  // Setting the Player initial location
  this.x = 606;
  this.y = game.edgeYField;
  //Loading the image for changing Player
  this.changePlayer = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"
  ];
  // Setting the Player initial image
  this.player = "images/char-boy.png";
  this.game = game;
  this.playerSizeX = 80;
  this.playerSizeY = 60;
}

Player.prototype.update = function(dt) {};

//update Player's score
Player.prototype.updateScore = function() {
  this.score++;
  document.querySelector(".score").textContent = `Score: ${this.score}`;
  if (this.score % this.game.whenAddEnemy === 0) {
    this.game.addNewEnemy();
  }
  if (this.score % this.game.whenAddLevel === 0) {
    this.helth = 3;
    this.score = 0;
    document.querySelector(".helth").textContent = `Helth: ${this.helth}`;
    document.querySelector(".score").textContent = `Score: ${this.score}`;
    this.game.setGameToNewLevel();
  }
};

//update Player's helth
Player.prototype.updateHelth = function(decrement) {
  decrement === -1 ? this.helth-- : this.helth++;
  if (this.helth === 0) {
    if (
      confirm(
        `Game over! Your level - ${
          this.game.level
        }. Do you want to restart the game?`
      )
    ) {
      // Start new game
      location.reload();
    } else {
      throw new Error("Game over");
    }
  }
  document.querySelector(".helth").textContent = `Helth: ${this.helth}`;
};
// Draw the player on the screen,
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

//handleInput  receives user input, allowedKeys (the key which was pressed)
//and move the player according to that input
Player.prototype.handleInput = function(keyPress) {
  //Left key  move the player to the left, right key to the right,
  // up  move the player up and down  move the player down.
  // player cannot move off screen

  if (keyPress === "left" && this.x > 0) {
    this.x -= this.game.colWidth;
  }

  if (
    keyPress === "right" &&
    this.x < this.game.edgeXField - this.game.colWidth
  ) {
    this.x += this.game.colWidth;
  }
  if (keyPress === "up" && this.y > 0) {
    this.y -= this.game.rowHeight;
  }
  if (keyPress === "down" && this.y < this.game.edgeYField) {
    this.y += this.game.rowHeight;
  }
  if (
    this.x === this.game.edgeXField - this.game.colWidth &&
    this.y === this.game.edgeYField
  ) {
    //  user randomly  select the image for the player character
    this.player = this.changePlayer[
      Math.floor(Math.random() * this.changePlayer.length)
    ];
  }
  //player reaches the water, reset the player back to the initial location
  if (this.y <= 0) {
    setTimeout(() => {
      this.updateScore();
      this.x = 606;
      this.y = this.game.edgeYField;
    }, 100);
  }
};

// Creating a new Collectables object
var collectables = new Collectables(303, 0, player);
//add gems(heart) to the game
function Collectables(randomX, randomY, player) {
  this.heart = "images/Heart.png";
  this.switch = true;
  this.randomX = randomX;
  this.randomY = randomY;
  this.player = player;
}

//add random location for heart image
Collectables.prototype.addLocation = function() {
  this.randomX = Math.floor(Math.random() * colField) * 101;
  this.randomY = Math.floor(Math.random() * rowField) * 83;
};

//add  heart image on the screen
Collectables.prototype.render = function() {
  if (this.switch) {
    ctx.drawImage(Resources.get(this.heart), this.randomX, this.randomY);
    this.removeHeart();
  }
};

// remove heart image off the  screen if player touch the heart image
Collectables.prototype.removeHeart = function() {
  if (this.player.x === this.randomX && this.player.y === this.randomY) {
    this.player.updateHelth();
    this.switch = false;
    this.addLocation();
    this.changeSwitch();
  }
};

// change switch to add heart image
Collectables.prototype.changeSwitch = function() {
  var that = this;
  setTimeout(function() {
    that.switch = true;
  }, 10000);
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
