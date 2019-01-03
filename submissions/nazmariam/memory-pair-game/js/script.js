document.addEventListener("DOMContentLoaded", function() {
    const cardsImg = [1,2,3,4,5,6];
    const main = document.querySelector('.main');

    let randomImg = [];
    function createCards() {
        let images = cardsImg;
        let cardContainer = document.createDocumentFragment();
        images = images.concat(images);
        randomImg = images.sort(() => 0.5 - Math.random());
        randomImg.forEach(function (item) {
            let card = document.createElement('div');
            card.classList.add('flip-container');
            card.dataset.item = item;
            // console.log(card.dataset);
            card.innerHTML = `<div class="flipper"><div class="front"></div>
                      <div class="back"></div></div>`;
            cardContainer.append(card);
        });
        return cardContainer;
    }
    function insertImg(){
        const back = document.querySelectorAll('.back');

        for (let i=0; i<randomImg.length; i++){
            back[i].innerHTML = '<img src="images/' + randomImg[i] + '.png">';
        }
    }
    function doActive({target}){
        let activeCards = document.querySelectorAll('.flip-container.active');

        if(isAction(activeCards)){
            activeCards.forEach(function (card) {
                card.classList.remove('active');

            })
        }
        target.closest('.flip-container').classList.add('active');
    }
    function isAction(activeCards){
        let action = false;
        if(activeCards.length===2){
            action = true;
        }
        return action;
    }
    function compare(){
        let activeCards = document.querySelectorAll('.flip-container.active');
        if(isAction(activeCards)){
            let etalon = '', same = false;
            activeCards.forEach(function (card) {
                if (etalon === card.dataset.item){
                    same = true;
                }
                etalon = card.dataset.item;
            });
            if (same){

                activeCards.forEach(function (card) {
                    card.classList.add('hidden');
                })
            }
        }
    }
    function showWinner(){
        let hiddenCards = document.querySelectorAll('.hidden');
        if(hiddenCards.length===randomImg.length){
            let win = document.querySelector('h1');
            win.classList.add('winner');
        }
    }
    main.appendChild(createCards());
    insertImg();
    main.addEventListener('click', ({ target }) => {
        doActive({target});
        compare();
        showWinner();
    });
});