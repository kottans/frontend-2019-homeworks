// Haven't found any other way to load local JSON file
// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
var data = function loadJSON() {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/data.json', false);
    return xobj.onreadystatechange = function () {
        xobj.send(null);
        if (xobj.readyState == 4 && xobj.status == "200") {
            return JSON.parse(xobj.responseText)
        }
    }();
}();

var headingsHolder = document.querySelector('.action-menu__list'),
    contentHolder = document.querySelector('.action-menu__content');

for (var key in data) {
    createFragments(key, data[key]);
}

function createFragments(key, array) {
    var fragment = document.createDocumentFragment();
    var elements = document.createElement('ul');
    elements.classList.add(key);

    array.forEach(function (el) {
        elements.insertAdjacentHTML('beforeend', el);
    });

    fragment.appendChild(elements);

    if (key === 'action-menu__list-items') {
        headingsHolder.appendChild(fragment);
    } else if (key === 'action-menu__content-items') {
        contentHolder.appendChild(fragment);
    }
};

/////// handling events

var listItems = document.querySelectorAll('.action-menu__list-item'),
    contentItems = document.querySelectorAll('.action-menu__content-item');
    activeListItem = '.action-menu__list-item_state_active';
    activeContentItem = '.action-menu__content-item_state_active';

listItems.forEach(function (el, index) {
    el.addEventListener('click', function () {
        deactivePrevItem(activeListItem);
        deactivePrevItem(activeContentItem);
        activateItem(this, index);
    });
});

function deactivePrevItem(item) {
    var itemToRemove = document.querySelector(item);
    itemToRemove.classList.remove(item.slice(1));
}

function activateItem(listItem, index) {
    listItem.classList.add(activeListItem.slice(1));
    contentItems[index].classList.add(activeContentItem.slice(1));
}

