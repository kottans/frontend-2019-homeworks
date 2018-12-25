const SCORE_COEF = 5;
const PAIR_REMOVED_CARDS = 2;

class App{
	constructor(){
		this.firstCard = null;
        this.maxGameScore = 100;
        this.removeElemCount = 0;
	}   
	
	init(list) {
		const allImgList = [...list, ...list];
        this.allImagesCount = allImgList.length;
		allImgList.sort(() => 0.5 - Math.random());
		this.renderInitialContainer();
		this.renderCards(allImgList);
	}

	renderInitialContainer() {
		const $root = document.getElementById('root');

		const $gameTitle = document.createElement('h2');
		$gameTitle.textContent = "Memory – Pair Game";
		$root.appendChild($gameTitle);

		const $cardsWrapper = document.createElement('div');
		$cardsWrapper.setAttribute('class', 'cards-wrapper');
		$cardsWrapper.addEventListener('mousedown', this.onMouseDown.bind(this));
		$root.appendChild($cardsWrapper);
	}

	
	renderCards(allImgList) {
		const $cardsWrapper = document.querySelector('.cards-wrapper');
		allImgList.forEach(img => {
			const $card = document.createElement('div');
			$card.setAttribute('class', 'card');
			$card.setAttribute('data-name', img.name); 
			
			const $img = document.createElement('img');
			$img.setAttribute('class', 'card__img');
			$img.setAttribute('src', img.src); 
		
			$card.appendChild($img);
			$cardsWrapper.appendChild($card);
		});
	}

	onMouseDown(event) {
		const {classList} = event.target;
        const isTwoCardsActicve = document.querySelectorAll('.card--active').length > 1;

		if (!classList.contains('card') || isTwoCardsActicve || classList.contains('card--active')){
			return;
        }
		classList.add('card--active');

		if(!this.firstCard) {
			this.firstCard = event.target;
			return;
		}

        const secondCard = event.target;
        
		if (this.firstCard.getAttribute('data-name') !== secondCard.getAttribute('data-name')) {
			return setTimeout(() => {
                this.maxGameScore -= SCORE_COEF;
				this.firstCard.classList.remove('card--active')
				this.firstCard = null;
				secondCard.classList.remove('card--active')
            }, 1000);
        }

            setTimeout(() => {
                this.firstCard.classList.remove('card--active')
                this.firstCard.classList.add('card--removed')
                this.firstCard = null;
                secondCard.classList.remove('card--active')
                secondCard.classList.add('card--removed')   
            }, 500);
            this.removeElemCount += PAIR_REMOVED_CARDS;

		if(this.removeElemCount === this.allImagesCount){
			alert(`Your score is: ${this.maxGameScore}, max result is : 100`);
			location.reload();
        }
	}
}

const app = new App();
app.init([
	{
		src: 'img/HTML5.svg',
		name: 'html',
	},
	{
		src: 'img/sass.png',
		name: 'sass',
	},
	{
		src: 'img/git.png',
		name: 'git',
	},
	{
		src: 'img/vue.png',
		name: 'vue',
	},
	{
		src: 'img/js.png',
		name: 'js',
	},
	{
		src: 'img/react.png',
		name: 'react',
	}
]);

