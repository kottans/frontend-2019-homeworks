(function () {
    const cards = [
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

    const main = document.getElementById("parent");

    function SortCards() {
        cards.sort(function () {
            return 0.5 - Math.random();
        });
    }

    var makeElement = function (tagName, className, textInfo) {
        var element = document.createElement(tagName);
        element.classList.add(className);
        if (textInfo) {
            element.textContent = textInfo;
        }
        return element;
    };
    var createContent = function (item) {
        var content = makeElement("div", "flip-box");

        var flipper = makeElement("div", "flipper");

        var flipper_front = makeElement("div", "flip-box__front");
        var flipper_back = makeElement("div", "flip-box__back");

        var image = makeElement("img", "flip-box__img");
        image.src = item;
        image.alt = '';
        flipper_back.appendChild(image);

        flipper.appendChild(flipper_front);
        flipper.appendChild(flipper_back);
        content.appendChild(flipper);

        return content;
    };

    function ShowCards() {
        var fragment = document.createDocumentFragment();

        cards.forEach(item => {
            fragment.appendChild(createContent(item));
        });
        main.appendChild(fragment);
    }

    function ToggleCard(element) {
        let activeCards = [...document.querySelectorAll(".active")]

        if (activeCards.length > 1) activeCards.forEach(item => {
            item.classList.remove("active");
        });

        if (element.classList.contains("flip-box")) {
            element.classList.toggle("active");
        }
    }

    function DisableCards() {
        if (SameCards())[...document.querySelectorAll(".active")].forEach(item => {
            item.classList.add("hidden");
        });
    }

    function SameCards() {
        let images = [...document.querySelectorAll(".active .flip-box__img")];
        return images.length === 2 && images[0].src === images[1].src;
    }

    main.addEventListener("click", function (event) {
        ToggleCard(event.target);
        DisableCards();
    });

    SortCards();
    ShowCards();
})();
