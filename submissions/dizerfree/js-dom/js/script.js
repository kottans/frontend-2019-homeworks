const productsData = [
    {
        id: "oval",
        heading: "Oval",
        text: `Зрозуміло, що це окуляри з овальними лінзами, вважаються класичними. Ця оправа давно вже стала
        синонімом гарного смаку і чудового стилю,  користується неймовірною популярністю багато десятирічь. Зараз
        багато дизайнерів розробляють нові моделі окулярів, які поєднують в собі властивості декількох видів
        оправ, і це правильно, адже всі ми хочемо різноманітності. І така варіативність дає можливість вибрати модель навіть з тих, які не є класично Вашими за рекомендаціями.`,
        imgUrl: "img/glasses_1.jpg"
    },
    {
        id: "round",
        heading: "Round",
        text: `З назви зрозуміло, що це окуляри з круглою формою скла. Відомими на весь світ вони стали
        завдяки Джону Леннону, який носив круглі окуляри в нікельованій оправі. Такі моделі ще називають «Леноннами», тішейдами, а також «Оззі», завдяки скандальному музиканту  Осборну, який також виявився прихильником  круглих окулярів. Зараз
        багато дизайнерів розробляють нові моделі окулярів, які поєднують в собі властивості декількох видів
        оправ, і це правильно, адже всі ми хочемо різноманітності. І така варіативність дає можливість вибрати модель навіть з тих, які не є класично Вашими за рекомендаціями.`,
        imgUrl: "img/glasses_2.jpg"
    },
    {
        id: "oversized",
        heading: "Oversized",
        text: `Окуляри завищенного габариту, мають взбільшені лінзи і зазвичай пластикову оправу. Ця модель
        захищає власника не так від сонця, як від сторонніх поглядів. Зараз
        багато дизайнерів розробляють нові моделі окулярів, які поєднують в собі властивості декількох видів
        оправ, і це правильно, адже всі ми хочемо різноманітності. І така варіативність дає можливість вибрати модель навіть з тих, які не є класично Вашими за рекомендаціями.`,
        imgUrl: "img/glasses_3.jpg"
    },
    {
        id: 'rectangular',
        heading: "Rectangular",
        text: `Нейтральна, стримана, класична форма окулярів. Найчастіше використовується тонка металева
        оправа. Підходять людям з круглим, овальним, трикутним або серцеподібною типом обличчя. Зараз
        багато дизайнерів розробляють нові моделі окулярів, які поєднують в собі властивості декількох видів
        оправ, і це правильно, адже всі ми хочемо різноманітності. І така варіативність дає можливість вибрати модель навіть з тих, які не є класично Вашими за рекомендаціями.`,
        imgUrl: "img/glasses_4.jpg"
    }
];
var makeElement = function (tagName, className, textInfo) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (textInfo) {
        element.textContent = textInfo;
    }
    return element;
};
var createCard = function (product) {
    var listItem = makeElement("section", "main_item");
    listItem.setAttribute("id", product.id);
    var allText = makeElement("div", "info");
    listItem.appendChild(allText);
    var cardTitle = makeElement("h2", "title", product.heading);
    allText.appendChild(cardTitle);
    var cardDescription = makeElement("p", "description", product.text);
    allText.appendChild(cardDescription);
    var cardPictureP = makeElement("p", "picture");
    listItem.appendChild(cardPictureP);
    var cardPicture = makeElement ("img");
    cardPicture.src = product.imgUrl;
    cardPicture.alt = product.heading;
    cardPictureP.appendChild(cardPicture);
    return listItem;
};
var fragment = document.createDocumentFragment();
var cardList = document.querySelector("main");
productsData.forEach(function (product) {
    var cardItem = createCard(product);
    fragment.appendChild(cardItem);
});
cardList.appendChild(fragment);
var menuButtons = document.querySelectorAll('#menu button');
var products = document.querySelectorAll('section');
function deactivateAllMenuButtons () {
    menuButtons.forEach(function (menuButton) {
        menuButton.classList.remove('active-class');
    });
}
function deactivateAllProducts () {
    products.forEach(function (product) {
        product.classList.remove('active-class');
    });
}
function activateMenuButton (menuButton) {
    deactivateAllMenuButtons();
    deactivateAllProducts();
    var target = menuButton.getAttribute('data-target');
    var productToActivate = document.querySelector(target);
    menuButton.classList.add('active-class');
    productToActivate.classList.add('active-class');
}
menuButtons.forEach(function (menuButton) {
    menuButton.addEventListener('click', function () {
        activateMenuButton(menuButton);
    });
});
activateMenuButton(menuButtons[0]);
/*
* Open the drawer when the menu icon is clicked.
*/
var hamburgerMenu = document.querySelector('#hamburger_menu');
var main = document.querySelector('main');
var drawer = document.querySelector('nav');
hamburgerMenu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
});
main.addEventListener('click', function() {
    drawer.classList.remove('open');
});
