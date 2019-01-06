var click = [];
const DELAY_TIME = 900;
var arayImages = [1,2,3,4,5,6,1,2,3,4,5,6];
arayImages = arayImages.sort(function() { return 0.5 - Math.random() });

let wrapper = document.createElement('div');
wrapper.classList.add('playground');
wrapper.id = 'game';

arayImages.forEach(
    function(elem, index) {
        let gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        
        let upperPicture = document.createElement('img');
        upperPicture.classList.add('cover-img');
        upperPicture.setAttribute('src', 'img/0.png');
        
        let underPicture = document.createElement('img');
        underPicture.classList.add('under-img');
        underPicture.setAttribute('src', `img/${elem}.png`);
        
        let conatinerFront = document.createElement('div');
        conatinerFront.classList.add('front');
        conatinerFront.appendChild(upperPicture);
        
        let conatinerBack = document.createElement('div');
        conatinerBack.classList.add('back');
        conatinerBack.appendChild(underPicture);

        gameCard.appendChild(conatinerFront);
        gameCard.appendChild(conatinerBack);
        wrapper.appendChild(gameCard);
        gameCard.id = index;
    }
);

document.querySelector('.main-wrapper').appendChild(wrapper);

wrapper.addEventListener('click', function () {
    let target = event.target.parentNode;
        target = target.parentNode;
    if(isNumeric(target.id)) main(target.id);
    }
);

function main(id) {
    click.push(id);
    openImg(id);
    if(click.length == 1) return;
    if(click.length == 2) {
        if(arayImages[click[0]] == arayImages[click[1]] && click[0] != click[1]) destroy(click[1], click[0]);
    } else if(click.length == 3) {
        if(arayImages[click[2]] == arayImages[click[1]] && click[2] != click[1]) {
            destroy(click[1], click[2]);
            closeImg(click[0]);
            click = [];
        } else {
            closeImg(click[0]);
            closeImg(click[1]);
            click = [click[2]];
        }
    }
}

function openImg(id) {
    document.getElementById(id).classList.add('game-card-click');
}

function closeImg(id) {
    document.getElementById(id).classList.remove('game-card-click');
}

function destroy(id1, id2) {
    setTimeout( function() {
        document.getElementById(id1).classList.add('hidden');
        document.getElementById(id2).classList.add('hidden');
        document.getElementById(id1).innerHTML = ""; 
        document.getElementById(id2).innerHTML = "";
        }, DELAY_TIME );
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

