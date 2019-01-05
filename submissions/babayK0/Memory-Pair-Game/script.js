const IMAGES = ["img/card1.png","img/card2.png","img/card3.png","img/card4.png","img/card5.png","img/card6.png","img/card7.png","img/card8.png"	];
const BACK_FACE_SRC = "img/cardbg.png";
const TIME = 750;
let openedCards =[];


const BODY = document.querySelector("body");

function startGame(){

	const GAME_CONTAINER=document.createElement("div");
	GAME_CONTAINER.classList.add("game-container");

	let cards = IMAGES.concat(IMAGES);
	//shuffle trick from https://css-tricks.com/snippets/javascript/shuffle-array/
	cards.sort(() => 0.5 - Math.random())
	cards.forEach(function(cardSrc,i) {

		const CARD = document.createElement("div");
		CARD.classList.add("card");
		CARD.setAttribute("id",'card'+(i+1));

		const FRONT_FACE=document.createElement("img");
		FRONT_FACE.classList.add("front-face");
		FRONT_FACE.src=cardSrc;
		FRONT_FACE.setAttribute("id",'front'+(i+1));

		const BACK_FACE=document.createElement("img");
		BACK_FACE.classList.add("back-face");
		BACK_FACE.src=BACK_FACE_SRC;
		BACK_FACE.setAttribute("id",'back'+(i+1));

		CARD.append(FRONT_FACE,BACK_FACE);
		GAME_CONTAINER.append(CARD);
	})

	GAME_CONTAINER.addEventListener("click", function flipCard(event){
		let clicked = event.target;
		let card = event.target.parentElement;
		if(clicked.classList.value==="back-face" && openedCards.length<2){
			card.classList.toggle("flip");
			openedCards.push(card);
			console.log(openedCards);
		}
		if(openedCards.length === 2){
			let check;
			let firstCard =openedCards[0]; 
			let secondCard =openedCards[1];
				setTimeout(() => { 
					if (firstCard.firstChild.src===secondCard.firstChild.src&&firstCard.id!==secondCard.id) {
						openedCards.forEach(element=>{
							element.classList.toggle("block");
							if(document.getElementsByClassName("block").length === IMAGES.length*2){
								setTimeout(() => {alert("You win!");},TIME);
							} 
						});
					}else{
						openedCards.forEach(element => element.classList.toggle("flip"));
					}
					openedCards = [];
			}, TIME);
		}
	});
	BODY.append(GAME_CONTAINER);
}

startGame();
