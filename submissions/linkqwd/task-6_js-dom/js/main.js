function appInit() {
    let selectors = {},
        dataFromJson,
        dataToDispay;

    const setupSelectors = () => {
        selectors = {
            navListHolder: document.querySelector('.action-menu__list'),
            contentHolder: document.querySelector('.action-menu__content'),
            navListNodes: document.querySelectorAll(`.${cssClasses.cakeTitle}`),
            contentNodes: document.querySelectorAll(`.${cssClasses.cakeDescription}`)
        }
    };

    const cssClasses = {
        cakeTitle: "action-menu__list-item",
        cakeDescription: 'action-menu__content-item',
        cakeImage: 'action-menu__item-img',
        cakeTitleActive: 'action-menu__list-item_state_active',
        cakeDescriptionActive: 'action-menu__content-item_state_active'
    };

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
        setupSelectors();
        selectors.navListHolder.appendChild(nodes.titles);
        selectors.contentHolder.appendChild(nodes.content);
    };

    function switchActiveItems(initialItem = 0) {
        setupSelectors();
        selectors.navListNodes[initialItem].classList.add(cssClasses.cakeTitleActive);
        selectors.contentNodes[initialItem].classList.add(cssClasses.cakeDescriptionActive);

        selectors.navListNodes.forEach((navListNode, index) => {
            navListNode.addEventListener('click', function () {
                switchActive(index);
            });
        });

        function switchActive(index) {
            let currentActiveTitle = document.querySelector(`.${cssClasses.cakeTitleActive}`);
            let currentActiveContent = document.querySelector(`.${cssClasses.cakeDescriptionActive}`);
            currentActiveTitle.classList.remove(cssClasses.cakeTitleActive);
            currentActiveContent.classList.remove(cssClasses.cakeDescriptionActive);

            selectors.navListNodes[index].classList.add(cssClasses.cakeTitleActive);
            selectors.contentNodes[index].classList.add(cssClasses.cakeDescriptionActive);
        }
    };

    dataFromJson = getDataFromJSON(),
    dataToDispay = buildHTMLfromJSON(dataFromJson);
    displayDataOnPage(dataToDispay);
    switchActiveItems(2);
}

appInit();