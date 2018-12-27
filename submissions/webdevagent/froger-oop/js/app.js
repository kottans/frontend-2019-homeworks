/*Initalize and define basic Gameplay Object with
gameplay properties and methods*/
const GamePlay = {
  navMenu: document.querySelectorAll('.nav'),
  canMove: true,
  points: 0,
  lifes: 3,
  stats: 'play',
  getStats() {
    return this.stats;
  },
  getLifes() {
    return this.lifes;
  },
  getPoints() {
    return this.points;
  },
  setResult() {
    if (this.lifes == 0) {
      this.stats = 'GAME OVER';
      this.canMove = false;
    }
    if (this.points == 10) {
      this.stats = 'YOU WIN';
      this.canMove = false
    }
  }
};

//Initalize and define GameActor classes
/*GameActor is a parent class and all future classes
will inherit from this class*/
class GameActor {
  constructor(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.collide=false;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  checkCollision( y, x, action, property) {
    if (
      this.y > player.y - y &&
      this.y < player.y + y &&
      this.x > player.x - x &&
      this.x < player.x + x){
      this.collide=true;
      player.y = 400;
    }
  };
};

class Enemy extends GameActor {
  constructor(y) {
    super('images/enemy-bug.png', -100, y);
    this.speed = Math.floor((Math.random() * 150) + 20);
  }
  setMoveSpeed() {
    this.speed = Math.floor((Math.random() * 150) + 10 + GamePlay.points * 20);
  }
  checkCollision() {
    super.checkCollision(55, 50);
    if(this.collide){
      GamePlay.lifes-=1;
      this.collide=false;
    }
  };
  update(dt) {
    if (GamePlay.canMove) {
      this.checkCollision();
      if (this.x > 500) {
        this.x = -100;
        this.setMoveSpeed();
      } else {
        this.x += this.speed * dt;
      }
    }
  };
};




class Hero extends GameActor {
  constructor(y) {
    super('images/char-boy.png', 200, y);
    this.lifes = 3;
  }
  handleInput(key) {
    if (GamePlay.canMove) {
      if (key == 'left' && this.x > 20) this.x -= 25;
      if (key == 'right' && this.x < 400) this.x += 25;
      if (key == 'up' && this.y > -10) this.y -= 25;
      if (key == 'down' && this.y < 400) this.y += 25;
    }
  };
};

class Star extends GameActor {
  constructor(y) {
    super('images/Star.png', 200, -10);
  }
  checkCollision() {
    super.checkCollision(25,15);

    if(this.collide){
      GamePlay.points+=1;
      this.x = Math.floor((Math.random() * 400) + 10);
      this.collide=false;}
  }
  pointCollector() {
    this.checkCollision();
  };

};

//Defining gameActor objects
const allEnemies = [new Enemy(50), new Enemy(130), new Enemy(220)];
const player = new Hero(300);
const pointStar = new Star();

//Adding EventListeners to for player navigation
//navigation for keybord
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
//navigation for buttons
GamePlay.navMenu.forEach(num => num.addEventListener('click', (ev) => {
  player.handleInput(ev.target.classList[0]);
}));
