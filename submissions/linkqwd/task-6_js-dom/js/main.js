function appInit() {
    const cssClasses = {
        cakeTitle: "action-menu__list-item",
        cakeDescription: 'action-menu__content-item',
        cakeImage: 'action-menu__item-img',
        cakeTitleActive: 'action-menu__list-item_state_active',
        cakeDescriptionActive: 'action-menu__content-item_state_active'
    }

    let selectors = {};
    const setupSelectors = () => {
        selectors = {
            navListHolder: document.querySelector('.action-menu__list'),
            contentHolder: document.querySelector('.action-menu__content'),
            navListNodes: document.querySelectorAll(`.${cssClasses.cakeTitle}`),
            contentNodes: document.querySelectorAll(`.${cssClasses.cakeDescription}`)
        }
    }

    const getData = (() => {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'js/data.json', false);
        return xobj.onreadystatechange = function () {
            xobj.send(null);
            if (xobj.readyState == 4 && xobj.status == "200") {
                return JSON.parse(xobj.responseText)
            }
        }();
    })();

    const buildHTMLfromData = ((getData) => {

        const titlefragment = document.createDocumentFragment();
        const descriptionfragment = document.createDocumentFragment();

        getData.data.forEach(dataItem => {
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

    })(getData);

    const displayDataOnPage = function (nodes) {
        setupSelectors();
        selectors.navListHolder.appendChild(nodes.titles);
        selectors.contentHolder.appendChild(nodes.content);
    }(buildHTMLfromData);

    const switchActiveItems = ((initialItem = 0) => {
        setupSelectors(); // adding new selectors into global sapce
        selectors.navListNodes[initialItem].classList.add(cssClasses.cakeTitleActive);
        selectors.contentNodes[initialItem].classList.add(cssClasses.cakeDescriptionActive);

        selectors.navListNodes.forEach((navListNode, index) => {
            navListNode.addEventListener('click', function () {
                switchActive(this, index);
            });
        });

        function switchActive(node, index) {
            let currentActiveTitle = document.querySelector(`.${cssClasses.cakeTitleActive}`);
            let currentActiveContent = document.querySelector(`.${cssClasses.cakeDescriptionActive}`);
            currentActiveTitle.classList.remove(cssClasses.cakeTitleActive);
            currentActiveContent.classList.remove(cssClasses.cakeDescriptionActive);

            node.classList.add(cssClasses.cakeTitleActive);
            selectors.contentNodes[index].classList.add(cssClasses.cakeDescriptionActive);
        }
    })(2);
}

appInit();