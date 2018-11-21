let renderPage = () => {

    /* selecting DOM elements */

    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.main-sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuWrap = document.querySelector('.menu-content');
    const catTitle = document.querySelector('.article-content__title');
    const catTextInfo = document.querySelector('.article-content__text');
    const catImage = document.querySelector('.article-content__image');

    /* storing cats data in objects  */

    const cats = [

        {
            id: '0',
            catSrc: 'images/cat1.jpeg',
            catName: 'Цезар',
            catDescription: 'Віднедавна ця порода котів набула чималої популярності в Україні. Якщо раніше на вершині популярності були персидські коти, то зараз саме британський короткошерстий кіт став фаворитом. Це пояснюється як з практичної точки зору, так і з естетичної. Навіть просто переглядаючи фото британських короткошерстих котів можна побачити і першу і другу.'
        },
        {
            id: '1',
            catSrc: 'images/cat2.jpeg',
            catName: 'Пушок',
            catDescription: 'Коти породи Мейн-кун є воістину аборигенними тваринами Північної Америки, штату Мен. Через суворі умови тамтешньої зими Мейн-куни володіють густою шерстю та довгим пухнастим хвостом, які зігрівають цих котів навіть в найлютіші морози. А через дикі умови і великі снігові насипи взимку ці коти отримали міцні широкуваті лапи з пучками шерсті поміж пальцями, які роблять їх чудовими «снігоходами».'
        },
        {
            id: '2',
            catSrc: 'images/cat3.jpeg',
            catName: 'Кузя',
            catDescription: 'Тойгер виведений селекційним шляхом, в основу породи покладено Бенгальських котів. Завдяки спробам схрещування останніх з різними іншими породами, в результаті вдалося вивести кошенят із забарвлення тигра. Хоча основною ціллю було створення кота схожого більше на мультяшного героя, а не на великих диких тигрів, своїм смугастим забарвленням він все ж більше нагадує останніх.'
        },
        {
            id: '3',
            catSrc: 'images/cat4.jpeg',
            catName: 'Марсик',
            catDescription: 'Дорослі коти породи Турецький ван важать 6-9 кілограм, кішки трохи легші – від 4.5 до 6 кілограм. Довжина представників породи включно з хвостом може сягати від 90 до 120 сантиметрів, а висота – від 35 до 40 сантиметрів. Коти і кішки, а також улюбленці різного віку мають деякі розпізнавальні ознаки. Серед них – більш потужний кістяк, яким володіють коти, кішки ж більш «жіночні».'
        },
        {
            id: '4',
            catSrc: 'images/cat5.jpeg',
            catName: 'Іриска',
            catDescription: 'Колір шерсті сорель, як і дикий, є природним забарвлення для сомалійської породи котів. Сорель – це коли забарвлення сомалійського кота чи кішки мідно-червоного кольору, кінчики вух і хвіст – карі, а подушечки лап та носик – рожеві. Забарвлення шерсті фавн – це матово-кремовий колір, а срібне – срібно-голубий колір. Всі перераховані кольори шерсті визнані стандартом WCF.'
        },

    ];

    /* method for changing content of some cat */

    let renderCat = (cat) => {

        catImage.src = cat.catSrc;
        catTitle.textContent = cat.catName;
        catTextInfo.textContent = cat.catDescription;

    };

    /* creating sidebar menu */

    for (let i = 0, len = cats.length; i < len; i++) {

        let item = cats[i];

        /* creating and adding new nodes to menu wrap */

        let menuItem = document.createElement('li');
        menuItem.classList.add('menu-content__item');
        let linkMenuItem = document.createElement('a');
        linkMenuItem.classList.add('menu-content__link');
        linkMenuItem.setAttribute("href", "");
        linkMenuItem.setAttribute("role", "button");
        linkMenuItem.dataset.id = item.id;
        linkMenuItem.textContent = item.catName;
        menuItem.insertBefore(linkMenuItem, null);
        menuWrap.insertBefore(menuItem, null);

    }

    /* setting information for the first cat */
    renderCat(cats[0]);

    /* setup click event listener for handling menu items clicks */

    let clickHandler = (event) => {

        if (event.target.classList.contains('menu-content__link')) {

            event.preventDefault();
            let currentTarget = event.target;
            let currentTargetDataId = currentTarget.dataset.id;

            /* finding match of cat with the same id as in clicked link */

            cats.find((cat) => {

                if (cat.id === currentTargetDataId) {
                    return renderCat(cat);
                }

            });
        }

    };

    menuWrap.addEventListener('click', clickHandler);

    /* setup click event listener for triggering menu and content states */

    let menuIconHandler = () => {
        menuIcon.classList.toggle('open');

        if (menuIcon.classList.contains('open')) {
            sidebar.classList.add('open');
            mainContent.classList.add('opened-sidebar');
        }
        else {
            sidebar.classList.remove('open');
            mainContent.classList.remove('opened-sidebar');
        }

    };

    menuIcon.addEventListener('click', menuIconHandler);
    
};

document.addEventListener('DOMContentLoaded', renderPage);