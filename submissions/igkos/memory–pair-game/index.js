window.onload = strartGame;
function strartGame(){
  let imgs = [
    "img/blueberries.png",
    "img/cherries.png",
    "img/grapes.png",
    "img/orange.png",
    "img/raspberry.png",
    "img/strawberry.png"
  ];

  const shuffledDoubleImgs = imgs.concat(imgs).sort(function() {
    return 0.5 - Math.random();
  });

  const content = document.querySelector(".container-thingy");
  const board = document.createElement("section");
  content.innerHTML = "";


  board.classList.add("flip-container");
  shuffledDoubleImgs.forEach(img => {
    const flipper = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");
    const image = document.createElement("img");

    flipper.classList.add("flipper");
    flipper.classList.toggle("flip");
    front.classList.add("front");
    back.classList.add("back");

    image.src = img;
    front.appendChild(image);

    flipper.appendChild(front);
    flipper.appendChild(back);
    board.appendChild(flipper);
  });
  content.appendChild(board);

  let fliped = [];

  board.addEventListener("click", evt => {
    if (evt.target.classList.contains("flipper")) {
      if (fliped.length < 2) {
        let target = evt.target;
        target.classList.toggle("flip");
        let src = target.querySelector("img").src;
        fliped.push({ target, src });
        compareTargets();
      } else {
        fliped.forEach(({ target }) => target.classList.toggle("flip"));
        fliped = [];
      }
    }
  });
  const compareTargets = () => {
    if (fliped.length === 2) {
      let [first,second] = fliped;
      if (first.src === second.src) {
        fliped.forEach(({ target }) => target.classList.add("hidden"));
        fliped = [];
        const matched = document.querySelectorAll(".hidden");
        if (matched.length === shuffledDoubleImgs.length) {
          alert("You won!");
          strartGame();
        }
      }
    }
  };
};
