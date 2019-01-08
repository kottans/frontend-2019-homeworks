/*
 * Helper functions
 */

 function getId(id){return document.getElementById(id)}
 function arrayShuffle(arr){return arr.sort(() => 0.5 - Math.random())};

/*
 * Events
 */

const board = getId('board'),
modal = getId('modal'),
movesBestElem = getId('moves-best'),
movesCurrentElem = getId('moves-current'),
winMsg = getId('win-msg');

board.addEventListener('click', function(event){
	const elem = event.target.closest('.tile');
	if(!elem) return;

	checkForMatch(elem);
});
getId('btn-restart').addEventListener('click', function(){
	modal.classList.add('hidden');
	startGame();
});

/*
 * Main part
 */

const images = ['1', '2', '5', '10', '25', '50'],
boardWidth = 4, boardHeight = 3,
flipDuration = 500, delayAfterFlip = 500,
flipped = [];
let matched = 0,
movesBest = movesCurrent = 0;

function startGame(){
	matched = movesCurrent = 0;

	const frag = document.createDocumentFragment();
	let arr = arrayShuffle(formArray());
	arr.forEach(img => {
		frag.appendChild(makeTile(img));
	});
	board.innerHTML = '';
	board.appendChild(frag);
}

function formArray(){
	// Assuming the board is 12 tiles
	return images.concat(images);
}

function makeElem(className, tagName = 'div'){
	const elem = document.createElement(tagName);
	elem.className = className;
	return elem;
}
function makeTile(img){
	const tile = makeElem('tile');
	const flipper = makeElem('flipper');
	const front = makeElem('front');
	const back = makeElem('back');
	const tileImg = makeElem('tile-img', 'img');
	tileImg.src = `img/${img}.png`;
	tileImg.alt = img;

	tile.appendChild(flipper);
	flipper.appendChild(front);
	flipper.appendChild(back);
	back.appendChild(tileImg);

	return tile;
}

function getImg(tile){
	return tile.querySelector('.tile-img').src;
}

function checkForMatch(elem){
	if((flipped.length >= 2) || (flipped[0] == elem) || elem.classList.contains('matched')) return;
	flipped.push(elem);
	elem.classList.add('flipped');

	if(flipped.length == 2){
		movesCurrentElem.textContent = ++movesCurrent;

		if(getImg(flipped[0]) == getImg(flipped[1])){
			flipped.forEach(elem => {
				console.log(elem);
				elem.classList.add('matched');
			});
			flipped.length = 0;

			matched++;
			checkForWin();
		}
		else {
			setTimeout(() => {
				flipped.forEach(elem => {
					elem.classList.remove('flipped');
				});
				flipped.length = 0;
			}, flipDuration + delayAfterFlip)
		}
	}
}
function checkForWin(){
	if(matched * 2 === boardWidth * boardHeight){
		modal.classList.remove('hidden');

		if(!movesBest || movesCurrent < movesBest){
			movesBest = movesCurrent;
			winMsg.textContent = 'New best!';
		}
		else winMsg.textContent = 'You win!';
		movesBestElem.textContent = movesBest;
	}
}

/*
 * Initialization
 */

startGame();
