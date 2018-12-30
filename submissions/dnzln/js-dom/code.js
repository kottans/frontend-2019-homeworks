const content = [
    {
        heading: 'Джованни Ривера - Bambino d’Oro',
        image: 'img/rivera.jpg',
        text: 'Выдающийся итальянский футболист, атакующий полузащитник. Легендарный игрок «Милан» и сборной Италии. Обладатель «Золотого мяча» как лучший футболист Европы 1969 года. Лучший бомбардир чемпионата Италии 1973 года. По версии МФФИИС занимает 20 место среди лучших игроков мира, 12 место среди лучших игроков Европы XX века. По той же версии Ривера — <b>лучший футболист Италии XX века</b>. Ривера входит в ФИФА 100.' 
    },
    {
        heading: 'Франко Барези',
        image: 'img/baresi.jpg',
        text: 'Итальянский футболист и футбольный тренер. Всю свою карьеру в качестве игрока провёл в итальянском клубе «Милан». Является младшим братом другого выдающегося футболиста - Джузеппе Барези, который большую часть своей карьеры выступал за соперника «Милана» в миланском дерби «Интернационале». Франко Барези — один из семи футболистов — обладателей полного комплекта наград чемпионатов мира (золото в 1982, бронза в 1990 и серебро в 1994 годах).',
    },
    {
        heading: 'Паоло Мальдини - Il Capitano',
        image: 'img/maldini.jpg',
        text: 'Один из лучших защитников мирового футбола за всю его историю, многолетний капитан сборной Италии и «Милана». Играл на позиции центрального и левого защитника. Всю свою футбольную карьеру провёл в «Милане», за который сыграл 902 официальных матча. Номер 3 в «Милане» закреплён за Мальдини и по окончании им карьеры был изъят из оборота.'
    },
    {
        heading: 'Андрей Шевченко - Sheva',
        image: 'img/sheva.jpg',
        text: 'Украинский нападающий, лучший бомбардир в истории сборной Украины (48 голов). Обладатель «Золотого мяча» 2004 года. Дважды становился лучшим бомбардиром Лиги чемпионов, дважды — чемпионата Италии. Второй бомбардир в истории «Милана», лучший бомбардир в истории миланского дерби. Шесть раз признавался лучшим футболистом Украины.'
    },
    {
        heading: 'Фабио Борини - Alien',
        image: 'img/borini.jpg',
        text: 'Легендарный игрок Милана. Первый игрок в истории, который в течении сезона играл на всех позициях на поле. Самый ловкий спортсмен в истории MilanLab. Был награжден званием Мистер Футбол, но из-за подозрений относительно его внеземного происхождения данная награда было отменена. Прозвище - инопланетянин, так как никогда не знаешь чего от него ожидать.'
    }
];


var container = document.createElement('section');
var mainCont = document.getElementById('main-content');
mainCont.appendChild(container);

var heading = document.createElement('h2');
var img = document.createElement('img');
var text = document.createElement('p');
container.appendChild(heading);
container.appendChild(img);
container.appendChild(text);

function changeContent(n) {
    --n;
    heading.innerHTML = content[n].heading;
    img.setAttribute('src', content[n].image);
    img.setAttribute('width', '100%');
    text.innerHTML = content[n].text;
}

changeContent(4);

document.querySelector('li:nth-child(1)').addEventListener('click', function () {changeContent(1)});
document.querySelector('li:nth-child(2)').addEventListener('click', function () {changeContent(2)});
document.querySelector('li:nth-child(3)').addEventListener('click', function () {changeContent(3)});
document.querySelector('li:nth-child(4)').addEventListener('click', function () {changeContent(4)});
document.querySelector('li:nth-child(5)').addEventListener('click', function () {changeContent(5)});