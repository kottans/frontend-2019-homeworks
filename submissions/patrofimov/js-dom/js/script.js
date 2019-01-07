'use strict';
const menu = document.querySelector('#menu');
const main = document.querySelector('main');
const drawer = document.querySelector('.nav');
const data = [{
        'header': 'Гомер Симпсон',
        'content': 'Гоме́р Джей Си́мпсон (англ. Homer Jay Simpson) — главный герой мультсериала «Симпсоны» и отец в одноимённой семье.Комичность личности Гомера заключается в его частых приступах глупости и лени, а также его взрывного гнева. Гомер имеет низкий уровень интеллекта.',
        'image': 'img\\gomer.png'
    },
    {
        'header': 'Барт Симпсон',
        'content': 'Бартоломью Джо-Джо «Барт» Симпсон (англ. Bartholomew Jo-Jo «Bart» Simpson) — герой мультипликационного сериала «Симпсоны». Наряду с Гомером, один из наиболее известных персонажей шоу. По характеру непоседлив, циничен, эгоистичен, в то же время наивен; иногда проявляет и хорошие стороны своей личности, как доброта, сочувствие. Барт — левша. Его интересы: катание на скейте, просмотр шоу клоуна Красти (особенно любит мультфильм «Щекотка и Царапка»), комиксы (особенно «Радиоактивный человек»), видеоигры, хулиганские выходки (главная жертва — директор Скиннер).',
        'image': 'img\\bart.png'
    },
    {
        'header': 'Мардж Симпсон',
        'content': 'Марджори Жаклин «Мардж» Симпсон (в девичестве Бувье) (англ. Marjorie Jacqueline «Marge» Simpson) — постоянный персонаж мультипликационного сериала «Симпсоны».Мардж — очень здравомыслящий человек. Она очень добрая и пытается научить людей (включая свою семью) нравственности, но её попытки зачастую бывают тщетны. Она хочет, чтобы люди жили правильно и не грешили. Однако в некоторых сериях она нарушает свой образ жизни и предаётся азарту. Определённо страдает игроманией.',
        'image': 'img\\marge.png'
    },
    {
        'header': 'Лиза Симпсон',
        'content': 'Ли́за Мари́ Си́мпсон (англ. Lisa Marie Simpson) — героиня мультипликационного сериала «Симпсоны». Средний ребёнок в семье, восьмилетняя девочка, выделяющаяся среди остальных Симпсонов прежде всего своим умом и рассудительностью.',
        'image': 'img\\liza.jpg'
    },
];
let makeElement = function(tagName, className, textInfo) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    if (textInfo) {
        element.textContent = textInfo;
    }
    return element;
};
let createContent = function(rowdata) {
    let content = makeElement("section", "content");
    let article = makeElement("article", "description");
    content.appendChild(article);
    let header = makeElement("h2", "title", rowdata.header);
    article.appendChild(header);
    let image = makeElement("img");
    image.src = rowdata.image;
    image.alt = rowdata.header;
    article.appendChild(image);
    let description = makeElement("p", "description", rowdata.content);
    article.appendChild(description);
    return content;
};
let fragment = document.createDocumentFragment();
let item = createContent(data[0]);
fragment.appendChild(item);
main.appendChild(fragment);
drawer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.attributes['data-order'] == undefined) return;
    const rowdata = data[Number(target.attributes['data-order'].value) - 1];
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    let item = createContent(rowdata);
    fragment.appendChild(item);
    main.appendChild(fragment);
    drawer.classList.remove('open');
});
menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
});
