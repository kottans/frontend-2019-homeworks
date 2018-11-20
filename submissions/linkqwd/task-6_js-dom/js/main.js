let dataFromJson,
    dataToDispay;

const cssClasses = {
    cakeTitle: "action-menu__list-item",
    cakeDescription: 'action-menu__content-item',
    cakeImage: 'action-menu__item-img',
    cakeTitleActive: 'action-menu__list-item_state_active',
    cakeDescriptionActive: 'action-menu__content-item_state_active'
};

const selectors = {
    navListHolder: document.querySelector('.action-menu__list'),
    contentHolder: document.querySelector('.action-menu__content')
}

function getDataFromJSON() {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/data.json', false);
    return xobj.onreadystatechange = function () {
        xobj.send(null);
        if (xobj.readyState == 4 && xobj.status == "200") {
            return JSON.parse(xobj.responseText)
        }
    }();
};

function buildHTMLfromJSON(dataJSON) {
    const titlefragment = document.createDocumentFragment();
    const descriptionfragment = document.createDocumentFragment();

    dataJSON.data.forEach(dataItem => {
        // Build titles
        let titleItem = document.createElement('li');
        titleItem.classList.add(cssClasses.cakeTitle);

        let titleHeader = document.createElement('h2');
        titleHeader.innerText = dataItem.cakeTitle;

        titleItem.appendChild(titleHeader);
        titlefragment.appendChild(titleItem);

        // Build Descriptions
        let contentItem = document.createElement('li');
        contentItem.classList.add(cssClasses.cakeDescription);

        let paragrap = document.createElement('p');
        paragrap.innerText = dataItem.cakeDescription;

        let img = document.createElement('img');
        img.classList.add(cssClasses.cakeImage);
        img.setAttribute('src', dataItem.cakeImageSrc);

        contentItem.appendChild(img);
        contentItem.appendChild(paragrap);
        descriptionfragment.appendChild(contentItem);
    });

    return { titles: titlefragment, content: descriptionfragment }
};

function displayDataOnPage(nodes) {
    selectors.navListHolder.appendChild(nodes.titles);
    selectors.contentHolder.appendChild(nodes.content);
    // adding new selectors
    selectors.titleItems = document.querySelectorAll(`.${cssClasses.cakeTitle}`);
    selectors.contentItems = document.querySelectorAll(`.${cssClasses.cakeDescription}`);
};

function switchActiveItems(initialItem = 0) {
    selectors.titleItems[initialItem].classList.add(cssClasses.cakeTitleActive);
    selectors.contentItems[initialItem].classList.add(cssClasses.cakeDescriptionActive);

    selectors.navListHolder.addEventListener('click', switchActive);

    function switchActive(event) {
        let titleNode = event.target.closest(`.${cssClasses.cakeTitle}`);

        if (titleNode) {
            document.querySelector(`.${cssClasses.cakeTitleActive}`).classList.remove(cssClasses.cakeTitleActive);
            document.querySelector(`.${cssClasses.cakeDescriptionActive}`).classList.remove(cssClasses.cakeDescriptionActive);

            let index = -1;
            for (; (titleNode = titleNode.previousSibling); index++); // on each iteration, titleNode which was clicked become it's nearest sibling, when there are no more siblings, titleNode become "null" and loop ends;

            selectors.titleItems[index].classList.add(cssClasses.cakeTitleActive);
            selectors.contentItems[index].classList.add(cssClasses.cakeDescriptionActive);
        }
    }
};

dataFromJson = getDataFromJSON();
dataToDispay = buildHTMLfromJSON(dataFromJson);
displayDataOnPage(dataToDispay);
switchActiveItems(2);