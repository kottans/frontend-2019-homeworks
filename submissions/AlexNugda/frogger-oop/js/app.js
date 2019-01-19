const FROGGER_WIDTH = 505;
const FINISH_HEIGHT = -20;
const START_PLAYER_POS_X = 200;
const START_PLAYER_POS_Y = 380;
const CHARACTER_WIDTH = 101;
const CHARACTER_HEIGHT = 171;
const STEP_X = 100;
const STEP_Y = 80;
const WINS_TAB = document.getElementById("wins");
let countWins = 0;

class Enemy {
	constructor(x, y, player){
		this.width = CHARACTER_WIDTH;
		this.height = CHARACTER_HEIGHT;
		this.speed = Math.floor(Math.random() * (400 - 30)) + 30;
		this.x = x;
		this.y = y;
		this.sprite = 'images/enemy-bug.png';
		this.player = player;
	}
	
	collision(){
		return (this.y === this.player.y && this.player.x < this.x + CHARACTER_WIDTH/2 && this.player.x > this.x - CHARACTER_WIDTH/2);
	}
	
	resetPlayerPosition(){
		this.player.x = START_PLAYER_POS_X;
		this.player.y = START_PLAYER_POS_Y;
	}
	
	update(dt) {
		this.x = (this.x < FROGGER_WIDTH) ? (this.x + this.speed * dt) : 0;
		if(this.collision())
			this.resetPlayerPosition();
	};
	
	render() {		
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);	
	};
}

class Player {
    constructor(x, y) {
		this.x = x;
		this.y = y;
		this.sprite = 'images/char-boy.png';
		this.width = CHARACTER_WIDTH;
		this.height = CHARACTER_HEIGHT;
    }
  
	update() {
		if (this.y == FINISH_HEIGHT) {
			this.x = START_PLAYER_POS_X;
			this.y = START_PLAYER_POS_Y;
			WINS_TAB.innerHTML = ++countWins;
		}
	};
	
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
	
	handleInput(key) {
		switch(key){
			case "left" : 
				if(this.x > 0) this.x -= STEP_X;
			break;
			case "right" : 
				if(this.x < 400) this.x += STEP_X;
			break;
			case "up" : 
				if(this.y > 0) this.y -= STEP_Y;
			break;
			case "down" : 
				if(this.y < 380) this.y += STEP_Y;
			break;
		}
	};
}

const player = new Player(200, 380);
let allEnemies = [new Enemy(0, 60, player), new Enemy(0, 140, player), new Enemy(0, 220, player)];

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
