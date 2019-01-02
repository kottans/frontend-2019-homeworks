const RANDOM_NUMBER = 0.1;
const DELAY_TIME = 500;
const ITEMS = [
    {
        'name': 'cool',
        'img': 'img/cool.png',
    },
    {
        'name': 'love',
        'img': 'img/love.png',
    },
    {
        'name': 'sad',
        'img': 'img/sad.png',
    },
    {
        'name': 'sarcastic',
        'img': 'img/sarcastic.png',
    },
    {
        'name': 'scared',
        'img': 'img/scared.png',
    },
    {
        'name': 'strange',
        'img': 'img/strange.png',
    },
    {
        'name': 'suprised',
        'img': 'img/suprised.png',
    },
    {
        'name': 'sweet',
        'img': 'img/sweet.png',
    }
]

let clickFirstElement,
    count = 1,
    countClick = 1;

handlerFirstClick = (block) => {
    document.querySelectorAll(".game > div:not(.success)").forEach(item => {
        item.classList.add("secret");
    });
    block.classList.remove("secret");
    count = 2;
};
handleSecondClick = (block, clickFirstElement, clickSecondElement) => {
    if(clickSecondElement === clickFirstElement){
        block.classList.remove("secret");
        setTimeout(()=> {
            document.getElementsByName(clickFirstElement).forEach(item => {
                item.innerHTML = '';
                item.classList.remove("element")
                item.classList.add("success");
            });
        }, DELAY_TIME)
    } else {
        block.classList.remove("secret");
    }
};
handlerFinal = () => {
    setTimeout(()=> {
        alert('YOU WON!! YOUR RESULT - ' + --countClick);
        location.reload();
    }, DELAY_TIME * 2)
}

class Game {
    constructor(renderBlock, itemsArray) {
        this.renderBlock = renderBlock;
        this.itemsArray = itemsArray.concat(itemsArray);
        this.renderList();
        this.itemClick();
    }
    renderItem(element) {
        let block = document.createElement('div'),
            img = document.createElement('img');
        img.src = element.img;
        img.alt = element.name;
        block.appendChild(img);
        block.setAttribute("name", element.name);
        block.classList.add("secret", "element");
        game.appendChild(block);
    }
    renderList() {
        this.itemsArray.sort(() => RANDOM_NUMBER - Math.random());
        this.itemsArray.map(element => {
            this.renderItem(element)
        });
    }
    itemClick() {
        document.getElementById("game").addEventListener("click", (e) => {
            let block = e.target,
                name = block.getAttribute("name");
            count++;
            result.innerHTML = countClick++;
            let clickSecondElement = clickFirstElement;
                clickFirstElement = name;
            count === 4 ? handlerFirstClick(block) : handleSecondClick(block, clickFirstElement, clickSecondElement);
            if(document.querySelectorAll(".secret").length === 0) handlerFinal();
        });
    }
}

const gameBlock = new Game(game, ITEMS);
