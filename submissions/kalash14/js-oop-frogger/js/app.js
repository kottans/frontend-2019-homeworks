// Constants for the game init

const blockWidth = 101,
      blockHeight = 83,
      startX = blockWidth * 2,
      startY = blockWidth * 4,
      boundaryRight = 505;

let playerImageSrc = "",
    notEmptyInputField = false;

/* Necessary DOM nodes */

const userNameInput = document.querySelector('.start-game-input'),
    startGameButton = document.querySelector('.start-game-button'),
    userNameBlock = document.querySelector('.game-session__user'),
    startModal = document.querySelector('.start-game-modal'),
    copyRightSection = document.querySelector('.copyright-section'),
    audioTrack = document.querySelector('.audio-track'),
    soundSwitcher = document.querySelector('.sound-switcher'),
    gameSession = document.querySelector('.game-session'),
    playersGrid = document.querySelector('.players-row'),
    playerScoreElement = document.querySelector('.game-session__score'),
    highScoreElement = document.querySelector('.game-session__maxscore');

// Enemies our player must avoid
let Enemy = function(xCord, yCord) {
    this.sprite = 'images/enemy-bug.png';
    this.x = xCord;
    this.y = yCord;
    this.speed = Math.floor(Math.random() * 200) + 120;
};

Enemy.prototype.update = function(dt) {

    if (this.x < boundaryRight) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -blockWidth;
    }

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function(xCord, yCord) {
    this.score = 0;
    this.highScore = 0;
    this.x = xCord;
    this.y = yCord;
};

Player.prototype.update = function() {

    if(this.y > startY){
        this.y  = startY;
    }
    if(this.y < 0){
        this.score++;
        this.y = startY;
    }
    if(this.x > (boundaryRight - blockWidth)){
        this.x -= boundaryRight;
    }
    if(this.x < 0){
        this.x = (boundaryRight - blockWidth);
    }

};

/* detecting collision between enemies and player */

let checkCollision = function(enemy, player) {
    if (!(enemy.y + blockHeight < player.y ||
        enemy.y > player.y + blockHeight ||
        enemy.x + blockWidth < player.x ||
        enemy.x > player.x + blockWidth)) {
        checkHighScore(player.score, player.highScore);
        return true;
    }
    else {
        return false;
    }
};

let checkHighScore = (score, highScore) => {

    if (score > highScore) {
        highScore = score;
        highScoreElement.innerHTML = highScore;
    }

};

Player.prototype.render = function() {
    let imageElement = document.createElement('img');
    imageElement.src = playerImageSrc;
    ctx.drawImage(imageElement, this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {

    switch(keyCode) {

        case 'up': this.y -= blockHeight; break;
        case 'down': this.y += blockHeight; break;
        case 'right': this.x += blockWidth; break;
        case 'left': this.x -= blockWidth; break;

        default: break;

    }

};

/* defining enemies and player */

let firstEnemy = new Enemy(-blockWidth, 60),
    secondEnemy = new Enemy(-blockWidth, 145),
    thirdEnemy = new Enemy(-blockWidth, 220),
    allEnemies = [firstEnemy, secondEnemy, thirdEnemy],
    player = new Player(startX,startY);

/* changing disable state of START button */

let checkStartButton = () => {

    if (notEmptyInputField && playerImageSrc !== "") {
        startGameButton.disabled = false;
    }
    else {
        startGameButton.disabled = true;
    }

};

/* adding active class to user thumbs */

let checkActiveClass = (target) => {

    let activeElement = document.querySelector('.player-item.active');
    if (activeElement) {
        activeElement.classList.remove('active');
    }
    target.classList.add('active');

};

/* removing start window and start playing game */

function startGame() {
    let userName = userNameInput.value;
    userNameBlock.textContent = userName;
    startModal.classList.add('closed');
    copyRightSection.classList.add('closed');
    gameSession.classList.remove('closed');

    /* looping audio track playing */
    audioTrack.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audioTrack.play();

};

let setupEventListeners = () => {

    /* listening key codes */

    document.addEventListener('keyup', function(e) {

        if (e.keyCode === 13 && e.which === 13 && !startGameButton.disabled) {
            startGame();
        }

        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

    /* listening value from user name input */

    userNameInput.addEventListener('input', (event) => {

        if (event.target.value.length > 0) {
            notEmptyInputField = true;
        }
        else {
            notEmptyInputField = false;
        }

        checkStartButton();

    });

    startGameButton.addEventListener('click', () => {
        startGame();
    });

    /* turning on/off sound control */

    soundSwitcher.addEventListener('click', (event) => {

        let currentTarget = event.target;
        currentTarget.classList.toggle('off');

        if (currentTarget.classList.contains('off')) {
            audioTrack.pause();
        }
        else {
            audioTrack.play();
        }


    });

    /* choosing player thumb */

    playersGrid.addEventListener('click', (event) => {

        if (event.target.classList.contains('player-item')) {
            playerImageSrc = event.target.dataset.src;
            checkActiveClass(event.target);
            checkStartButton();
        }
        else if (event.target.classList.contains('player-item__image')) {
            playerImageSrc = event.target.parentNode.dataset.src;
            checkActiveClass(event.target.parentNode);
            checkStartButton();
        }

    });

};

/* setup event listeners when page is loaded */

document.addEventListener('DOMContentLoaded', function initHandler() {

    setupEventListeners();
    document.removeEventListener('DOMContentLoaded', initHandler);

});