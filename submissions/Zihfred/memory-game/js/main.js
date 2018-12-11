let images = [
    'img/Amy.jpg',
    'img/Bender.png',
    'img/Fry.png',
    'img/Hubert.jpg',
    'img/Zapp.jpg',
    'img/Zoidberg.png',
];
function randomArr(arr) {
    return arr.sort(function() { return 0.5 - Math.random() });
}
class Game {
    constructor(images) {
        this.form = document.querySelector('#Game');
        this.cardItems = document.getElementsByClassName('cardItem');
        this.cardsNumber = 6;
        this.imageArr = images;
        this.cards = [];
        this.canRotate = 2;  //count of possible clicks in this moment
        this.collisionToWin = 6;  //count of collision to win game
        this.initGame();  //initial game
        this.moves = []; //array of player clicked cards
        this.checkCollision = this.checkCollision.bind(this);
        this.rotateCard = this.rotateCard.bind(this);
        this.addEventListeners();


        //timers
        this.beforeShowTimer = 300;
        this.showTimer = 2000;
        this.timerBeforeNextMove = 1000;
        this.showWinMessageTimer = 2500;
    }

    initGame() {
        this.render();
    }

    render() {
        this.imageArr = this.imageArr.concat(this.imageArr);
        randomArr(this.imageArr);
        for (let i = 0; i < this.cardsNumber * 2; i++) {
           this.createCardDiv(i);
        }
    }

    createCardDiv(index){
        this.cards.push(new Card(this.imageArr[index]));
        let cardItem = document.createElement('div');
        cardItem.classList.add('cardItem');
        let cardImage = document.createElement('img');
        cardImage.classList.add('hidden');
        cardImage.setAttribute('src', this.cards[index].img);
        cardItem.appendChild(cardImage);
        this.form.appendChild(cardItem);
    }

    rotateCard(e) {
        let clickedItem = e.target.closest('div');

        if (this.canRotate > 0) {
            this.moves.push(clickedItem);
            this.canRotate--;
            this.checkCollision();
            clickedItem.classList.add('flip');
            setTimeout(() => {
                clickedItem.querySelector('img').classList.remove('hidden');
                this.rotateCardFront(clickedItem);
            }, this.beforeShowTimer);
        }else if(this.canRotate > 2) {
            this.canRotate = 2;
        }
    }

    rotateCardFront(clickedItem) {
        setTimeout(() => {
            this.rotateCardBack(clickedItem);
        }, this.showTimer);
    }

    rotateCardBack(clickedItem) {
        clickedItem.classList.remove('flip');
        clickedItem.querySelector('img').classList.add('hidden');
        setTimeout(() => {

            this.canRotate++;
        }, this.timerBeforeNextMove);
    }

    checkCollision() {
        let nowMoveImg = 'now';
        let nowMove = 'now';
        let prewMove = 'prev';
        let prevMoveImg = 'prev';
        if (this.moves.length >= 2) {
            nowMove = this.moves[this.moves.length - 1];
            prewMove = this.moves[this.moves.length - 2];
            nowMoveImg = nowMove
                .querySelector('img')
                .getAttribute('src');
            prevMoveImg = prewMove
                .querySelector('img')
                .getAttribute('src');
        }
        if (nowMoveImg.toString() === prevMoveImg.toString() &&
            (nowMove !== prewMove)) {
            nowMove.classList.add('flip');
            nowMove.classList.add('hidden');
            prewMove.classList.add('hidden');

            this.collisionToWin--;
        }
        if (this.collisionToWin === 0) {
            setTimeout(function () {
                alert('You Win');
            }, this.showWinMessageTimer);
        }
    }

    addEventListeners() {
        this.form.addEventListener('click',this.rotateCard);
    }
}

class Card {
    constructor(img) {
        this.img = img;
    }
}

new Game(images);

