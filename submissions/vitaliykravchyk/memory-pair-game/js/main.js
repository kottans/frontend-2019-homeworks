(function(){
    const data = ['img/sticker1.png', 'img/sticker2.png', 'img/sticker3.png', 'img/sticker4.png', 'img/sticker5.png', 'img/sticker6.png',
                'img/sticker1.png', 'img/sticker2.png', 'img/sticker3.png', 'img/sticker4.png', 'img/sticker5.png', 'img/sticker6.png'];
    const dataLength = data.length;
    function startingGame(){//create board and fill it items
        data.sort(function() {return 0.5 - Math.random()});
        const fragment = document.createDocumentFragment();
        const board = document.createElement('div');
        board.classList.add('board');

        for(let i = 0; i < dataLength; i++){
            const item = document.createElement('div');
            item.classList.add('item');
            item.classList.add('animation');
            item.dataset.item = i;
            fragment.appendChild(item);
        }
        
        board.appendChild(fragment);
        document.querySelector('main .container').appendChild(board);
        document.querySelector('.board').addEventListener('click', workWithItems);
    }
    
    function workWithItems(){
        if(event.target.hasAttribute('data-item')){
            //this checkings are blocking click on 3rd card
            if(document.querySelectorAll('img').length <= 1){
                createImg(event);
                    const images = document.querySelectorAll('img');
                    if(images.length === 2){
                        checkItems(images);
                    }
            }
        setTimeout(function(){//when all items have class 'matchedItem' game is over
            if(document.querySelectorAll('.matchedItem').length === dataLength){
                setEndGameScreen();
            }
        }, 1000);
    }
    }

    function createImg(event){ //create image in element
        event.target.classList.toggle('animation');
        const img = document.createElement('img');
        img.src = data[event.target.dataset.item];
        setTimeout(function(){
            img.style.opacity = 1;
        }, 200)
        event.target.appendChild(img);
        
    }
    function checkItems(images){
        const items = document.querySelectorAll('.item');
        for(let i = 0; i < items.length; i++){
            if(items[i].hasChildNodes()){
                if(images[0].src === images[1].src){
                    //for matched cards
                    setTimeout(function(){
                        items[i].classList.add('matchedItem');//remove card from screen
                        items[i].removeAttribute('data-item');// next time click on this card isn't working
                        items[i].removeChild(items[i].childNodes[0]);//remove img from div
                    }, 1000);
                } else { //for dismatched cards
                    setTimeout(function(){ 
                        items[i].removeChild(items[i].childNodes[0]);
                    }, 1100);
                    setTimeout(function(){
                        items[i].classList.toggle('animation');
                    }, 1000);
                }
            }
        }
    }
    function setEndGameScreen(){
            document.querySelector('.board').remove();
            const itemsContainer = document.querySelector('main .container');
            
            const winnerString = document.createElement('p');
            winnerString.classList.add('winnerText');
            winnerString.innerHTML = "Good job, You are winner!";

            const restartButton = document.createElement('button');
            restartButton.type = 'button';
            restartButton.innerHTML = 'Restart';

            itemsContainer.appendChild(winnerString);
            itemsContainer.appendChild(restartButton);

            document.querySelector('button').addEventListener('click', function(){
                startingGame();
                event.target.parentNode.removeChild(winnerString);
                event.target.parentNode.removeChild(restartButton);
            });
    }
    startingGame();
}());