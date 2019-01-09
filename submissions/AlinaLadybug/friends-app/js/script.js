
const URL = 'https://randomuser.me/api/?results=50';
let personCards;
let usersData = [];
let filteredData = [];
let radios;

document.addEventListener("DOMContentLoaded", () => getData(URL));

function getData(URL) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL);

    xhr.onload = function () {
        if (xhr.status === 200) {
            parseData(xhr.responseText);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
    addListeners();
}


function parseData(response) {
    let data = JSON.parse(response);
    usersData = data.results;
    createContent(data.results, setInfo);
}


function addListeners() {
    let search = document.querySelector('.form-inline');
    search.addEventListener('input', searchFunc);

    let navArrows = document.querySelectorAll('.navbar-nav img');
    navArrows.forEach(navArrow => {
        navArrow.addEventListener('click', sort);
    })

    radios = document.querySelectorAll('.radio-inline input');
    radios.forEach(radio => {
        radio.addEventListener('click', sortByGender);
    })

    let reset = document.querySelector('button.reset');
    reset.addEventListener('click', resetFilters);

}


function resetFilters({ target }) {
    deactivateImg();
    radios.forEach(radio => {
        radio.checked = false;
    });
    clearContent();
    createContent(usersData, setInfo);
}

function deactivateImg() {
    let arrows = document.querySelectorAll('.nav-item img')
    arrows.forEach(arrow => {
        arrow.classList.remove('active-arrow');
    });
}

function sort({ target }) {
    let order = target.dataset.order;
    deactivateImg();
    target.classList.add('active-arrow');
    filteredData = usersData;
    clearContent();
    switch (order) {
        case 'age-asc':
            filteredData = usersData.sort(function (a, b) {
                return a['dob']['age'] - b['dob']['age'];
            })
            break;
        case 'age-desc':
            filteredData = usersData.sort(function (a, b) {
                return b['dob']['age'] - a['dob']['age'];
            })
            break;
        case 'name-asc':
            filteredData = usersData.sort(function (a, b) {
                if (a['name']['first'] < b['name']['first'])
                    return -1;
            })
            break;
        case 'name-desc':
            filteredData = usersData.sort(function (a, b) {
                if (a['name']['first'] > b['name']['first'])
                    return -1;
            })
            break;
    }

    createContent(filteredData, setInfo);
}

function sortByGender({ target }) {
    let sortParam = target.parentNode.innerText;
    clearContent();
    filteredData = usersData;
    switch (sortParam) {
        case 'M':
            filteredData = usersData.filter(user => {
                return user['gender'] == 'male';
            });
            break;
        case 'F':
            filteredData = usersData.filter(user => {
                return user['gender'] == 'female';
            });
            break;
    }
    createContent(filteredData, setInfo);

}


function clearContent() {
    let row = document.querySelector('.row');
    row.innerHTML = '';
}


function searchFunc({ target }) {
    let input = target.value.toUpperCase();
    personCards.forEach(card => {
        let text = (card.innerHTML || card.innerText).toUpperCase();
        let cardColumn = card.parentNode.parentNode;
        if (text.indexOf(input) > -1) {
            cardColumn.classList.remove('non-active');
        }
        else {
            cardColumn.classList.add('non-active');
        }

    })
}


function createContent(results, setInfo) {
    let container = document.querySelector('.container .row');

    results.forEach(result => {
        let card = createCard(result);
        container.appendChild(card);
    });
    setInfo();
}


function createCard(info) {
    let col = document.createElement('div');
    col.classList.add('col-xs-12');
    col.classList.add('col-sm-6');
    col.classList.add('col-md-3');

    let card = document.createElement('div');
    card.classList.add('card');
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let gender = createGender(info);
    let infoBlock = createInfoBlock(info);
    let thumb = createThumb(info);

    cardBody.appendChild(gender);
    cardBody.appendChild(infoBlock);
    card.appendChild(thumb);
    card.appendChild(cardBody);
    col.appendChild(card);
    return col;
}


function createGender(info) {
    let gender = document.createElement('span');
    gender.classList.add('gender');
    gender.innerHTML = `${info['gender']}`;
    return gender;
}

function createInfoBlock(info) {
    let name = info['name'];
    let paragraph = document.createElement('p');
    paragraph.classList.add('info-block');
    let spanName = document.createElement('span');
    spanName.classList.add('fullname');
    let spanAge = document.createElement('span');
    spanAge.classList.add('age');
    let fullName = `${name['first']} ${name['last']}`;
    let formatName = fullName.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
        return letter.toUpperCase();
    });
    let age = `${info['dob']['age']} years old`;
    spanName.innerHTML = formatName;
    spanAge.innerHTML = age;
    let br = document.createElement('br');
    paragraph.appendChild(spanName);
    paragraph.appendChild(br);
    paragraph.appendChild(spanAge);
    return paragraph;
}

function createThumb(info) {
    let thumb = document.createElement('div');
    thumb.classList.add('thumb');
    let picture = info['picture'];
    thumb.style.backgroundImage = `url(${picture['large']})`;
    return thumb;
}

function setInfo() {
    personCards = document.querySelectorAll('.card-body');
}