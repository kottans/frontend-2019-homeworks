// Constants for the game init

const blockWidth = 101,
      blockHeight = 83,
      startX = blockWidth * 2,
      startY = blockWidth * 4,
      boundaryRight = 505,
      fieldTopOffsetPx = 20;

let playerImageSrc = 'images/char-boy.png',
    notEmptyInputField = false;

/* Necessary DOM nodes */

const UI_ELEMENTS = {
    userNameInput: document.querySelector('.start-game-input'),
    startGameButton: document.querySelector('.start-game-button'),
    userNameBlock: document.querySelector('.game-session__user'),
    startModal: document.querySelector('.start-game-modal'),
    copyRightSection: document.querySelector('.copyright-section'),
    audioTrack: document.querySelector('.audio-track'),
    soundSwitcher: document.querySelector('.sound-switcher'),
    gameSession: document.querySelector('.game-session'),
    playersGrid: document.querySelector('.players-row'),
    playerScoreElement: document.querySelector('.game-session__score'),
    highScoreElement: document.querySelector('.game-session__maxscore')
};

// Enemies our player must avoid

let Enemy = function(xCord, yCord) {
    this.sprite = 'images/enemy-bug.png';
    this.x = xCord;
    this.y = yCord;
    this.speed = Math.floor(Math.random() * 200) + 120;
};

Enemy.prototype.update = function(dt) {
    this.x < boundaryRight ? this.x += this.speed * dt : this.x = -blockWidth;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* detecting collision between enemies and player */
Enemy.prototype.checkCollision = function() {
    if (!(this.y + blockHeight < player.y ||
        this.y > player.y + blockHeight ||
        this.x + blockWidth < player.x ||
        this.x > player.x + blockWidth)) {
        player.checkHighScore();
        return true;
    }
    else {
        return false;
    }
};

let Player = function(xCord, yCord) {
    this.score = 0;
    this.highScore = 0;
    this.x = xCord;
    this.y = yCord;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function() {

    if(this.x > (boundaryRight - blockWidth)){
        this.x -= boundaryRight;
    }
    if(this.x < 0){
        this.x = (boundaryRight - blockWidth);
    }
    if(this.y > startY){
        this.y  = startY;
    }
    if(this.y < 0){
        this.score++;
        this.y = startY;
    }

};

Player.prototype.checkHighScore = function() {
    if (this.score > this.highScore) {
        this.highScore = this.score;
        UI_ELEMENTS.highScoreElement.innerHTML = this.highScore;
    }
};

Player.prototype.render = function() {
    this.sprite = playerImageSrc;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

let allEnemies = [1, 2, 3].map(fieldRow => new Enemy(-blockWidth, fieldRow * blockHeight - fieldTopOffsetPx)),
    player = new Player(startX,startY);

/* changing disable state of START button */

let checkStartButton = () => {

    UI_ELEMENTS.startGameButton.disabled = !(notEmptyInputField && playerImageSrc !== "");

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
    let userName = UI_ELEMENTS.userNameInput.value;
    UI_ELEMENTS.userNameBlock.textContent = userName;
    UI_ELEMENTS.startModal.classList.add('closed');
    UI_ELEMENTS.copyRightSection.classList.add('closed');
    UI_ELEMENTS.gameSession.classList.remove('closed');

    /* looping audio track playing */
    UI_ELEMENTS.audioTrack.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    UI_ELEMENTS.audioTrack.play();

};

let setupEventListeners = () => {

    /* listening key codes */

    document.addEventListener('keyup', function(event) {

        if (event.keyCode === 13 && event.which === 13 && !UI_ELEMENTS.startGameButton.disabled) {
            startGame();
        }

        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[event.keyCode]);
    });

    /* listening value from user name input */

    UI_ELEMENTS.userNameInput.addEventListener('input', (event) => {

        notEmptyInputField = event.target.value.length > 0 ? true : false;
        checkStartButton();

    });

    UI_ELEMENTS.startGameButton.addEventListener('click', () => {
        startGame();
    });

    /* turning on/off sound control */

    UI_ELEMENTS.soundSwitcher.addEventListener('click', (event) => {

        let currentTarget = event.target;
        currentTarget.classList.toggle('off');
        currentTarget.classList.contains('off') ? UI_ELEMENTS.audioTrack.pause() : UI_ELEMENTS.audioTrack.play();

    });

    /* choosing player thumb */

    UI_ELEMENTS.playersGrid.addEventListener('click', (event) => {

        let currentTarget = event.target;

        if (currentTarget.classList.contains('player-item')) {
            playerImageSrc = currentTarget.dataset.src;
            checkActiveClass(currentTarget);
            checkStartButton();
        }
        else if (currentTarget.classList.contains('player-item__image')) {
            playerImageSrc = currentTarget.parentNode.dataset.src;
            checkActiveClass(currentTarget.parentNode);
            checkStartButton();
        }

    });

};

/* setup event listeners when page is loaded */

document.addEventListener('DOMContentLoaded', function initHandler() {

    setupEventListeners();
    document.removeEventListener('DOMContentLoaded', initHandler);

});