let makeElement = (tagName, className, textInfo, srcInfo) => {
  let element = document.createElement(tagName);
  element.classList.add(className);
  if (textInfo) {
    element.textContent = textInfo;
  }
  if (srcInfo) {
    element.src = srcInfo;
  }
  return element;
};
let createContent = item => {
  let content = makeElement("div", "flip-box");

  let flipper = makeElement("div", "flipper");

  let flipper_front = makeElement("div", "flip-box__front");
  let flipper_back = makeElement("div", "flip-box__back");

  let image = makeElement("img", "flip-box__img", "", item);

  flipper_back.appendChild(image);

  flipper.appendChild(flipper_front);
  flipper.appendChild(flipper_back);
  content.appendChild(flipper);

  return content;
};

class Game {
  constructor() {
    this.main = document.getElementById("parent");
    this.cards = [
      "img/head001.png",
      "img/head002.png",
      "img/head003.png",
      "img/head004.png",
      "img/head005.png",
      "img/head006.png",
      "img/head001.png",
      "img/head002.png",
      "img/head003.png",
      "img/head004.png",
      "img/head005.png",
      "img/head006.png"
    ];
  }

  addListeners() {
    this.main.addEventListener("click", event => {
      this.toggleCard(event.target);
      this.disableCards();
    });
  }

  sortCards() {
    this.cards.sort(() => {
      return 0.5 - Math.random();
    });
  }

  showCards() {
    let fragment = document.createDocumentFragment();

    this.cards.forEach(item => {
      fragment.appendChild(createContent(item));
    });
    this.main.appendChild(fragment);
  }

  toggleCard(element) {
    let activeCards = [...document.querySelectorAll(".active")];

    if (activeCards.length > 1) {
      activeCards.forEach(item => {
        item.classList.remove("active");
      });
    }

    if (element.classList.contains("flip-box")) {
      element.classList.toggle("active");
    }
  }

  disableCards() {
    if (this.sameCards()) {
      let activeElements = document.querySelectorAll(".active");
      [...activeElements].forEach(item => {
        item.classList.add("hidden");
      });
    }
  }

  sameCards() {
    let activeImageElements = document.querySelectorAll(
      ".active .flip-box__img"
    );
    let images = [...activeImageElements];
    return images.length === 2 && images[0].src === images[1].src;
  }

  init() {
    this.sortCards();
    this.showCards();
    this.addListeners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.init();
});
