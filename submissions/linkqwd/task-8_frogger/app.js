// GLOBAL GameSettings
var GameGenerator = function (props) {
    this.numRows = props.rows;
    this.numCols = props.cols;
    this.fieldHight = props.rows * 101; // height of whole canvas 
    this.fieldWidth = props.cols * 101; // width of whole canvas 
    this.pieceWidth = 101; // width of a single piece of canvas
    this.pieceHeight = 83;  // height of a single piece of canvas
    this.waterBlockRows = 1;
    this.stoneBlockRows = props.rows - 3;
    this.grassBlockRows = 2;
    this.health = props.health;
    this.scores = 0;
    this.raidPower = props.raidPower;
}

var gameProps = new GameGenerator({
    rows: 8,
    cols: 7,
    health: 0,
    raidPower: 3
});
///////////////////////////

// GLOBAL METHODS
var GlobalGameMethods = function () { }

GlobalGameMethods.prototype.getXlocation = function (x) {
    return (x * gameProps.pieceWidth) - gameProps.pieceWidth;
}

GlobalGameMethods.prototype.getYlocation = function (y) {
    return -gameProps.pieceWidth + (gameProps.pieceHeight * y)
}

GlobalGameMethods.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//////////////////////

//  ENEMY CLASS
var Enemy = function (x, y, s) {
    this.x = this.getXlocation(x);
    this.y = this.getYlocation(y);
    this.speed = s;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(GlobalGameMethods.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function (dt) {
    this.x += (dt * this.speed)
    if (this.x > gameProps.fieldWidth) {
        this.x = -100
    }
};
//////////////////////////

// PLAYER CLASS
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = this.getXlocation(Math.round(gameProps.numCols / 2));
    this.y = this.getYlocation(gameProps.numRows);
}

Player.prototype = Object.create(GlobalGameMethods.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function (move) {
    switch (move) {
        case 'up':
            if (this.y === this.getYlocation(2)) handleReachingWater();
            if (this.y === this.getYlocation(1)) break;
            this.y -= gameProps.pieceHeight;
            break;

        case 'down':
            if (this.y === this.getYlocation(gameProps.numRows)) break;
            this.y += gameProps.pieceHeight;
            break;

        case 'right':
            if (this.x === this.getXlocation(gameProps.numCols)) break;
            this.x += gameProps.pieceWidth;
            break;

        case 'left':
            if (this.x <= 0) break;
            this.x -= gameProps.pieceWidth;
            break;

        case 'space':
            if (this.y === this.getYlocation(2)) break;
            if (this.y === this.getYlocation(3)) break;
            this.y -= gameProps.pieceHeight * 2;
            break;
    }
}

Player.prototype.handleInput = function (key) {
    this.update(key)
};
/////////////////////////

// COLLATABLE ITEMS
var Collectable = function (x, y, type) {
    this.type = type;
    if (type === 'heart') {
        this.sprite = 'images/Heart.png';
    } else if (type === 'raid') {
        this.sprite = 'images/Raid.png';
    }

    this.x = this.getXlocation(x);
    this.y = this.getYlocation(y);
}

Collectable.prototype = Object.create(GlobalGameMethods.prototype);
Collectable.prototype.constructor = Collectable;
//////////////////////////

// SUBJECTS
var player = new Player();
var allEnemies = [];
var allCollectables = [];
//////////////////////

// EVENTS HANDLE
document.addEventListener('keyup', handleKeyUp);
////////////////

// UPDATE UI
var UI = {
    scoresSelector: document.querySelector('.scores span'),
    healtsSelector: document.querySelector('.health span'),
    modalSelector: document.querySelector('.modal'),
    totalScoreSelector: document.querySelector('.total-score span'),

    updateHelath: function () {
        this.healtsSelector.innerText = gameProps.health;
    },
    updateScores: function () {
        this.scoresSelector.innerText = gameProps.scores;
    },
    showModal: function () {
        console.log(this.modalSelector)
        this.modalSelector.classList.toggle('modal-visible');
    },
    updateTotalScore: function () {
        this.totalScoreSelector.innerText = gameProps.scores;
    }
};
////////////

// HELPING FUNCTIONs
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function spawnEnemys() {
    for (var i = gameProps.stoneBlockRows + gameProps.waterBlockRows; i !== 1; i--) {
        allEnemies.push(new Enemy(getRandom(-1, 1), i, getRandom(40, 180)));
    }
}

function spawnCollectables(type) {
    var x = getRandom(1, gameProps.numCols),
        y = getRandom(1, gameProps.numRows);
    allCollectables.push(new Collectable(x, y, type));
}

function handleKeyUp(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

function handleReachingWater() {
    gameProps.scores++;
    if (gameProps.scores % 2 === 0) spawnEnemys();
    if (gameProps.scores % 2 === 0) spawnCollectables('raid');
    if (allCollectables.length < 2) spawnCollectables('heart');

    UI.updateScores();

    setTimeout(function () {
        player.y = player.getYlocation(gameProps.numRows);
    }, 175);
}

UI.updateScores();
UI.updateHelath();
spawnEnemys();
spawnCollectables('heart');
spawnCollectables('raid');