const styles = {
    locationName: 'nav-item',
    locationInfo: 'info-item',
    locationNameActive: 'nav-item_active',
    locationInfoActive: 'info-item_active',
    emblemcontainer: 'img',
    emblem: 'emblem'
};
//here will be our selector-container
const selectors = {};
//Request for JSON
var request = new XMLHttpRequest();
request.overrideMimeType("application/json");
request.open("GET", "js/data.json");
request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        var jsondata = JSON.parse(request.responseText);
        var data;
        data = buildHTML(jsondata);
        showData(data);
        //add selectors of new items into selector-container
        selectors.navitems = document.querySelectorAll("." + styles.locationName);
        selectors.infoItems = document.querySelectorAll("." + styles.locationInfo);
        addIDs();
        makeActiveOrInactive(0);
        addeventListener();
    } else {
        console.log("We reached our target server, but it returned an error");
    }
};
request.onerror = function() {
    console.log("Connection error!");
};
request.send();

function buildHTML(jsondata) {
    const navFragment = document.createDocumentFragment();
    const contentFragment = document.createDocumentFragment();
    jsondata.data.forEach(function(dataelem) {
        // nav
        let navElem = document.createElement('li');
        navElem.classList.add(styles.locationName);
        let navHeader = document.createElement('h2');
        navHeader.innerText = dataelem.locationName;
        navElem.appendChild(navHeader);
        navFragment.appendChild(navElem);
        //content
        let contentElem = document.createElement('li');
        contentElem.classList.add(styles.locationInfo);
        let contentInfo = document.createElement('p');
        contentInfo.innerText = dataelem.locationInfo;
        let emblemContainer = document.createElement('div');
        emblemContainer.classList.add(styles.emblemcontainer);
        let emblemImg = document.createElement('img');
        emblemImg.classList.add(styles.emblem);
        emblemImg.setAttribute('src', dataelem.emblemSrc);
        emblemContainer.appendChild(emblemImg);
        contentElem.appendChild(emblemContainer);
        contentElem.appendChild(contentInfo);
        contentFragment.appendChild(contentElem);
    });
    return {
        nav: navFragment,
        content: contentFragment
    }
};

function showData(node) {
    selectors.navigation = document.querySelector('.nav');
    selectors.info = document.querySelector('.info');
    selectors.navigation.appendChild(node.nav);
    selectors.info.appendChild(node.content);
};

function addIDs() {
    let elements = document.querySelectorAll('.nav .nav-item')
    let navArray = Array.from(elements);
    console.log(navArray);
    navArray.forEach(function(element, i) {
        element.setAttribute("id", 'item' + (i + 1));
        console.log(element);
    })
};

function makeActiveOrInactive(i) {
    var j = 0;
    while (j < 4) {
        selectors.navitems[j].classList.remove(styles.locationNameActive);
        selectors.infoItems[j].classList.add(styles.locationInfo);
        j++;
    }
    selectors.infoItems[i].classList.add(styles.locationInfoActive);
    selectors.infoItems[i].classList.remove(styles.locationInfo);
    selectors.navitems[i].classList.add(styles.locationNameActive);
};

function addeventListener() {
    let nav = document.getElementsByClassName('nav');
    nav[0].addEventListener("click", changeActive);
};

function changeActive(event) {
    console.log(event);
    var clicked = event.target;
    console.log(clicked);
    if (clicked.id === 'item1') {
        makeActiveOrInactive(0);
    } else if (clicked.id === 'item2') {
        makeActiveOrInactive(1);
    } else if (clicked.id === 'item3') {
        makeActiveOrInactive(2);
    } else if (clicked.id === 'item4') {
        makeActiveOrInactive(3);
    } else {
        console.log('Error!')
    }
};