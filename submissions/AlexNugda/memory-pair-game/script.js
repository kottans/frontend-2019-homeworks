let gameContainer = document.getElementById("game-container");
let gameContainerImages = document.querySelectorAll("#game-container .back");
let cardsSrc = ["img/watermelon.png", "img/banana.png", "img/cherry.png", "img/pumpkin.png", "img/coconut.png", "img/grapes.png"];
let cardList = cardsSrc.concat(cardsSrc);
let cardsForComparison = [];
let cardOpen = 0;
let disableCardCount = 0;

const showCards = () => {
	cardList.sort(() => { return 0.5 - Math.random() });
	if(gameContainer.querySelectorAll("img").length == 0){
		for(let i=0; i<cardList.length; i++){
			let img = document.createElement("img");
			img.src = cardList[i];
			img.setAttribute("id", ""+i);
			gameContainerImages[i].appendChild(img);
		}
	}
	else{
		let disableImages = document.querySelectorAll(".disable");
		for(let i=0; i<cardList.length; i++){
			disableImages[i].classList.remove("disable");
			gameContainerImages[i].querySelector("img").src = cardList[i];
		}
	}
}

window.onload = showCards();
const gameRestart = () => {
	alert("You Won!");
	disableCardCount = 0;
	showCards();
}

const compareCards = () => {
	console.log(cardsForComparison[0]["src"]+" !!! "+cardsForComparison[1]["src"])
	return cardsForComparison[0]["src"] == cardsForComparison[1]["src"];
}

const closeSelectedCardPair = (isIdenticalCards) => {
	let selectedCardPair = document.querySelectorAll(".selected-card");
	for(let i=0; i<selectedCardPair.length; i++){
		if(isIdenticalCards){
			selectedCardPair[i].querySelector(".front").classList.add("disable");
			disableCardCount++;
		}
		selectedCardPair[i].classList.remove("selected-card");
	}
	cardOpen = 0;
	cardsForComparison = [];
	if(disableCardCount == cardList.length){
		setTimeout(()=>{
			gameRestart();
		},1000);
	}
}

gameContainer.addEventListener("click", (e) => {
	let currCardId = e.target.closest(".flipper").querySelector("img").id;	
	let isCardInComparisonArray = cardsForComparison.findIndex(function(e){return e.id==currCardId});
	if(isCardInComparisonArray == -1 && cardsForComparison.length < 2){
		cardsForComparison.push({"id": currCardId, "src":e.target.closest(".flipper").querySelector("img").src});
		e.target.closest(".flipper").classList.add("selected-card");
		cardOpen = cardsForComparison.length;
		
		if(cardOpen==2){
		setTimeout(()=>{
			closeSelectedCardPair(compareCards());
		},1000);
	}
		
	}
	
	
});
