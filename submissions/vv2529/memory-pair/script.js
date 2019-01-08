const arrayShuffle = arr => arr.sort(() => 0.5 - Math.random());

const board = document.getElementById('board'),
	modal = document.getElementById('modal'),
	movesBestElem = document.getElementById('moves-best'),
	movesCurrentElem = document.getElementById('moves-current'),
	winMsg = document.getElementById('win-msg');

board.addEventListener('click', function(event) {
	const elem = event.target.closest('.tile');
	if (!elem) return;

	checkForMatch(elem);
});
document.getElementById('btn-restart').addEventListener('click', function() {
	modal.classList.add('hidden');
	startGame();
});

const images = ['1', '2', '5', '10', '25', '50'],
	boardWidth = 4,
	boardHeight = 3,
	flipDuration = 500,
	delayAfterFlip = 500,
	flipped = [];
let matched = 0,
	movesBest = 0,
	movesCurrent = 0;

function startGame() {
	matched = movesCurrent = 0;

	let shuffled = arrayShuffle(formArray());
	board.innerHTML = '';
	board.append(...shuffled.map(img => makeTile(img)));
}

function formArray() {
	// Assuming the board is 12 tiles
	return images.concat(images);
}

function makeElem(className, tagName = 'div') {
	const elem = document.createElement(tagName);
	elem.className = className;
	return elem;
}
function makeTile(img) {
	const tile = makeElem('tile');
	const flipper = makeElem('flipper');
	const front = makeElem('front');
	const back = makeElem('back');
	const tileImg = makeElem('tile-img', 'img');
	tileImg.src = `img/${img}.png`;
	tileImg.alt = img;

	tile.appendChild(flipper);
	flipper.append(front, back);
	back.appendChild(tileImg);

	return tile;
}

function getImg(tile) {
	return tile.querySelector('.tile-img').src;
}

function checkForMatch(elem) {
	if (
		flipped.length >= 2 ||
		flipped[0] == elem ||
		elem.classList.contains('matched')
	)
		return;
	flipped.push(elem);
	elem.classList.add('flipped');

	if (flipped.length == 2) {
		movesCurrentElem.textContent = ++movesCurrent;

		if (getImg(flipped[0]) == getImg(flipped[1])) {
			flipped.forEach(elem => {
				elem.classList.add('matched');
			});
			flipped.length = 0;

			matched++;
			checkForWin();
		} else {
			setTimeout(() => {
				flipped.forEach(elem => {
					elem.classList.remove('flipped');
				});
				flipped.length = 0;
			}, flipDuration + delayAfterFlip);
		}
	}
}
function checkForWin() {
	if (matched * 2 === boardWidth * boardHeight) {
		modal.classList.remove('hidden');

		let msg = '';
		if (!movesBest || movesCurrent < movesBest) {
			movesBest = movesCurrent;
			msg = 'New best!';
		} else msg = 'You win!';
		winMsg.textContent = msg;
		movesBestElem.textContent = movesBest;
	}
}

startGame();
