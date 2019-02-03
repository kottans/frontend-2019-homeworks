const DINOSAURS_ARRAY = [
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145271.svg',
        'name': 'dinosaur1',
    },
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145283.svg',
        'name': 'dinosaur2',
    },
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145276.svg',
        'name': 'dinosaur3',
    },
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145294.svg',
        'name': 'dinosaur4',
    },
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145287.svg',
        'name': 'dinosaur5',
    },
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145274.svg',
        'name': 'dinosaur6',
    },
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145281.svg',
        'name': 'dinosaur7',
    },
    {
        'image': 'https://image.flaticon.com/icons/svg/145/145290.svg',
        'name': 'dinosaur8',
    }
]

const handleFirstClick = (block) => {
    document.querySelectorAll(".gameBlock > div:not(.success)").forEach(item => item.classList.add("hide"));
    block.classList.remove("hide");
    count = 1;
};

const handleSecondClick = (block, elementFirst, elementSecond) => {
    if(elementSecond === elementFirst){
        setTimeout(()=> document.getElementsByName(elementFirst).forEach(handleSuccessClick), 250)
    }
    block.classList.remove("hide");
};

const handleSuccessClick = (item) => {
    item.classList.remove("item")
    item.classList.add("success");
}

const drawElement = (element) => {
    let elementImage = document.createElement('img');
    let elementBlock = document.createElement('div');
    elementImage.src = element.image;
    elementImage.alt = element.name;
    elementBlock.appendChild(elementImage);
    elementBlock.setAttribute("name", element.name);
    elementBlock.classList.add("hide", "item");
    gameBlock.appendChild(elementBlock);
}

const handleClick = (target) => {
    let name = target.getAttribute("name");
    let hideLength = document.querySelectorAll(".hide").length;
    count++;
    let elementSecond = elementFirst;
        elementFirst = name;
    count === 3 ? handleFirstClick(target) : handleSecondClick(target, elementFirst, elementSecond);
}

let elementFirst;
let count = 0;

document.getElementById("gameBlock").addEventListener("click", ({ target }) => handleClick(target));

const newArray = DINOSAURS_ARRAY.concat(DINOSAURS_ARRAY).sort(() => 0.2 - Math.random());
newArray.forEach(element => {
    drawElement(element)
});
