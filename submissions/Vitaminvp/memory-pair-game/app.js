const APP_CONFIG = {
    maxFlippedCardsAmount: 2,
    width: 4,
    height: 4,
    arrImgSrc: ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg"],
    cardFlipTime: 2000,
    cardDeleteTime: 750,
    winningText: 'You won!'
};
const BLOCKS_AMOUNT = APP_CONFIG.width*APP_CONFIG.height;

const shuffle = arr => arr.sort(() => 0.5 - Math.random());

const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

class Card {
    constructor(target, callback, imageSrc) {
        this.target = target;
        this.callback = callback;
        this.render(imageSrc);
        this.id = "";
    }

    render(imageSrc) {
        const fragment = document.createDocumentFragment();
        const flipContainer = document.createElement('div');
        const flipper = document.createElement('div');
        const front = document.createElement('div');
        const back = document.createElement('div');
        flipContainer.classList.add('flip-container');
        flipper.classList.add('flipper');
        front.classList.add('front');
        back.classList.add('back');
        flipContainer.id = generateId();
        flipper.appendChild(front);
        flipper.appendChild(back);
        flipContainer.appendChild(flipper);
        fragment.appendChild(flipContainer);
        flipContainer.addEventListener('click', () => {
            if (this.id !== flipContainer.id) {
                if (flipContainer.classList.contains('on')) {
                    flipContainer.classList.remove('on');
                } else {
                    flipContainer.classList.add('on');
                    this.callback(true, imageSrc, flipContainer.id);
                    setTimeout(() => {
                        flipContainer.classList.remove('on');
                        this.callback(false);
                        this.id = "";
                    }, APP_CONFIG.cardFlipTime);
                }
                this.id = flipContainer.id;
            }
        });
        back.innerHTML = `<img src='${imageSrc}' alt='alt'>`;
        this.target.appendChild(fragment);
    }
}

class Cards {
    constructor(target) {
        this.target = target;
        this.render();
        this.count = 0;
        this.total = 0;
        this.firstPicSrc = '';
        this.firstId = '';
    }
    countInc(bool, src, id) {
        if (bool) {
            this.count++;
            if (this.firstPicSrc === src && this.firstId !== id) {
                const firstCard = document.getElementById(id);
                const secondCard = document.getElementById(this.firstId);
                setTimeout(() => {
                    firstCard.classList.add('hidden');
                    secondCard.classList.add('hidden');
                    this.total += 2;
                    if(this.total >= BLOCKS_AMOUNT) {
                        this.total = 0;
                        alert(APP_CONFIG.winningText);
                    }
                }, APP_CONFIG.cardDeleteTime);
                this.firstPicSrc = '';
                this.firstId = '';
                return false;
            }
            this.firstPicSrc = src;
            this.firstId = id;
        } else {
            this.count--;
        }
    }

    render() {
        this.loader = document.createElement('div');
        this.btn = document.createElement('button');
        this.btn.innerHTML = "START NEW GAME";
        this.btn.className = "btn";
        this.target.appendChild(this.btn);
        this.output = document.createElement('div');
        this.output.className = "output";
        this.btn.addEventListener('click', () => {
            this.output.innerHTML = "";
            this.output.appendChild(this.loader);
            this.loader.innerHTML = '<img src="https://vitaminvp.github.io/WA/client/assets/images/ajax-loader.gif">';
            this.target.appendChild(this.output);
            this.renderItems();
        });
    }

    renderItems() {
        this.output.innerHTML = "";
        const docFragment = document.createDocumentFragment();
        const arrOfImg = APP_CONFIG.arrImgSrc.slice(0, APP_CONFIG.width);
        const totalBlocksAmount = shuffle(arrOfImg.reduce((acc, cur, i, arr) => [...acc, ...arr], []));
        for (let i = 0; i < BLOCKS_AMOUNT; i++) {
            new Card(docFragment, (...args) => this.countInc(...args), totalBlocksAmount[i]);
        }
        this.output.appendChild(docFragment);
    }
}

const app = document.querySelector("#app");
new Cards(app);