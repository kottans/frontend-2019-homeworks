let getDOMElement = () => {

    /* accesing to classes of elements */

    const DOMStrings = {
        menuIcon: 'menu-icon',
        sidebar: 'main-sidebar',
        mainContent: 'main-content',
        menuWrap: 'menu-content',
        catTitle: 'article-content__title',
        catTexInfo: 'article-content__text',
        catImage: 'article-content__image'
    };

    return {
        menuIcon: document.getElementsByClassName(DOMStrings.menuIcon)[0],
        sidebar: document.getElementsByClassName(DOMStrings.sidebar)[0],
        mainContent: document.getElementsByClassName(DOMStrings.mainContent)[0],
        menuWrap: document.getElementsByClassName(DOMStrings.menuWrap)[0],
        catTitle: document.getElementsByClassName(DOMStrings.catTitle)[0],
        catTextInfo: document.getElementsByClassName(DOMStrings.catTexInfo)[0],
        catImage: document.getElementsByClassName(DOMStrings.catImage)[0]
    }

};

let catsInformation = () => {

    /* data with information about cats */

    const cats = [

        {
            catSrc: 'images/cat1.jpeg',
            catName: 'Цезар',
            catDescription: 'Віднедавна ця порода котів набула чималої популярності в Україні. Якщо раніше на вершині популярності були персидські коти, то зараз саме британський короткошерстий кіт став фаворитом. Це пояснюється як з практичної точки зору, так і з естетичної. Навіть просто переглядаючи фото британських короткошерстих котів можна побачити і першу і другу.'
        },
        {
            catSrc: 'images/cat2.jpeg',
            catName: 'Пушок',
            catDescription: 'Коти породи Мейн-кун є воістину аборигенними тваринами Північної Америки, штату Мен. Через суворі умови тамтешньої зими Мейн-куни володіють густою шерстю та довгим пухнастим хвостом, які зігрівають цих котів навіть в найлютіші морози. А через дикі умови і великі снігові насипи взимку ці коти отримали міцні широкуваті лапи з пучками шерсті поміж пальцями, які роблять їх чудовими «снігоходами».'
        },
        {
            catSrc: 'images/cat3.jpeg',
            catName: 'Кузя',
            catDescription: 'Тойгер виведений селекційним шляхом, в основу породи покладено Бенгальських котів. Завдяки спробам схрещування останніх з різними іншими породами, в результаті вдалося вивести кошенят із забарвлення тигра. Хоча основною ціллю було створення кота схожого більше на мультяшного героя, а не на великих диких тигрів, своїм смугастим забарвленням він все ж більше нагадує останніх.'
        },
        {
            catSrc: 'images/cat4.jpeg',
            catName: 'Марсик',
            catDescription: 'Дорослі коти породи Турецький ван важать 6-9 кілограм, кішки трохи легші – від 4.5 до 6 кілограм. Довжина представників породи включно з хвостом може сягати від 90 до 120 сантиметрів, а висота – від 35 до 40 сантиметрів. Коти і кішки, а також улюбленці різного віку мають деякі розпізнавальні ознаки. Серед них – більш потужний кістяк, яким володіють коти, кішки ж більш «жіночні».'
        },
        {
            catSrc: 'images/cat5.jpeg',
            catName: 'Іриска',
            catDescription: 'Колір шерсті сорель, як і дикий, є природним забарвлення для сомалійської породи котів. Сорель – це коли забарвлення сомалійського кота чи кішки мідно-червоного кольору, кінчики вух і хвіст – карі, а подушечки лап та носик – рожеві. Забарвлення шерсті фавн – це матово-кремовий колір, а срібне – срібно-голубий колір. Всі перераховані кольори шерсті визнані стандартом WCF.'
        },

    ];

    return cats;

};

let renderPage = () => {

    const catTitle = getDOMElement().catTitle;
    const catImage = getDOMElement().catImage;
    const catTextInfo = getDOMElement().catTextInfo;
    const menuWrap = getDOMElement().menuWrap;
    const cats = catsInformation();
    const menuIcon = getDOMElement().menuIcon;
    const sidebar = getDOMElement().sidebar;
    const mainContent = getDOMElement().mainContent;

    /* creating sidebar menu */

    for (let i = 0, len = cats.length; i < len; i++) {

        let item = cats[i];

        /* setting information for the first cat */

        if (i === 0) {
            catImage.src = cats[0].catSrc;
            catTitle.textContent = cats[0].catName;
            catTextInfo.textContent = cats[0].catDescription;
        }

        /* creating and adding new nodes to menu wrap */

        let menuItem = document.createElement('li');
        menuItem.classList.add('menu-content__item');
        let linkMenuItem = document.createElement('a');
        linkMenuItem.classList.add('menu-content__link');
        linkMenuItem.setAttribute("href", "");
        linkMenuItem.setAttribute("role", "button");
        linkMenuItem.textContent = item.catName;
        /* setting cat object to node in order to have access to necessary data */
        linkMenuItem.itemData = item;
        menuItem.insertBefore(linkMenuItem, null);
        menuWrap.insertBefore(menuItem, null);

    }

    /* setup click event listener for handling menu items clicks */

    menuWrap.addEventListener('click', clickHandler);

    /* setup click event listener for triggering menu and content states */

    menuIcon.addEventListener('click', (event) => {

        menuIcon.classList.toggle('open');

        if (menuIcon.classList.contains('open')) {
            sidebar.classList.add('open');
            mainContent.classList.add('opened-sidebar');
        }
        else {
            sidebar.classList.remove('open');
            mainContent.classList.remove('opened-sidebar');
        }

    });


};

let clickHandler = (event) => {

    const catTitle = getDOMElement().catTitle;
    const catImage = getDOMElement().catImage;
    const catTextInfo = getDOMElement().catTextInfo;

    if (event.target.classList.contains('menu-content__link')) {

        event.preventDefault();
        let currentTarget = event.target;
        /* getting data from current target node object 'itemData' and changing content of necessary node */
        let currentTargetData = currentTarget.itemData;
        catTitle.textContent = currentTargetData.catName;
        catImage.src = currentTargetData.catSrc;
        catTextInfo.textContent = currentTargetData.catDescription;

    }

};

document.addEventListener('DOMContentLoaded', renderPage);