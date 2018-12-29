const CARD = 'card',
      FRONT_OF_CARD = 'front',
      BACK_OF_CARD = 'back',
      SELECTED_CARD = 'selected';

class Game {
    constructor(targetElement, cardsArray) {
        this.targetEl = targetElement;
        this.cardsArray = cardsArray;
        this.gameGrid = this.cardsArray.concat(this.cardsArray);
        this.firstGuess = '';
        this.secondGuess = '';
        this.count = 0;
        this.delay = 1000;
        this.renderList();
        this.isClick();
    }

    render(item) {
            const {name, img} = item;
            this.card = document.createElement('div');
            this.front = document.createElement('div');
            this.back = document.createElement('div');

            this.card.classList.add(CARD);
            this.front.classList.add(FRONT_OF_CARD);
            this.back.classList.add(BACK_OF_CARD);

            this.card.dataset.name = name;
            this.back.style.backgroundImage = `url(${img})`;

            this.card.appendChild(this.front);
            this.card.appendChild(this.back);
            this.targetEl.appendChild(this.card);
    }

    renderList() {
        this.gameGrid.sort(() => 0.5 - Math.random());
        this.gameGrid.forEach(item => {
            this.render(item)
        });
    }

    isVarious() {
        this.firstGuess = '';
        this.secondGuess = '';
        this.count = 0;

        document.querySelectorAll('.selected').forEach(card => {
            card.classList.remove(SELECTED_CARD);
        });
    }

    clickLogic(event) {
        const target = event.target;
        if (this.count < 2) {
            this.count++;
            if (this.count === 1) {
                this.firstGuess = target.parentNode.dataset.name;
                target.parentNode.classList.add(SELECTED_CARD);
            } else {
                this.secondGuess = target.parentNode.dataset.name;
                target.parentNode.classList.add(SELECTED_CARD);
            }

            if (this.firstGuess && this.secondGuess) {
                if (this.firstGuess === this.secondGuess) {
                    setTimeout(() => {
                        document.querySelectorAll('.selected').forEach(card => {
                            card.classList.add('pair');
                        });
                    }, this.delay);
                }
                setTimeout(this.isVarious.bind(this), this.delay);
            }
        }
    }

    isClick() {
        this.targetEl.addEventListener('click', event => {

            const target = event.target;

            if (
                target.className === 'game' ||
                target.parentNode.classList.contains(SELECTED_CARD) ||
                target.parentNode.classList.contains('pair')
            ) {
                return
            }
            this.clickLogic(event);
        });
    }
}

const game = new Game(document.querySelector('.game'), [
    {
        'name': 'monster',
        'img': 'images/monster.png',
    },
    {
        'name': 'eve',
        'img': 'images/eve.png',
    },
    {
        'name': 'walle',
        'img': 'images/walle.png',
    },
    {
        'name': 'bart',
        'img': 'images/bart.png',
    },
    {
        'name': 'mike',
        'img': 'images/mike.png',
    },
    {
        'name': 'alex',
        'img': 'images/alex.png',
    }
]);

