const USER = new URL('https://randomuser.me/api/?results=10');
const CONTAINER_FILTERS = document.getElementById('container-filters');
const CONTAINER_CARDS = document.getElementById('container-cards');
const SORT_AGE_UP = document.getElementById('sort-age-up');
const SORT_AGE_DOWN = document.getElementById('sort-age-down');
const SORT_NAME_UP = document.getElementById('sort-name-up');
const SORT_NAME_DOWN = document.getElementById('sort-name-down');
const GENDER_ALL = document.getElementById('gender-all');
const GENDER_MALE = document.getElementById('gender-male');
const GENDER_FEMALE = document.getElementById('gender-female');
const RESET_BUTTON = document.getElementById('reset-button');
const SEARCH = document.getElementById('search');

let listUsers = [];
let tempListUser = [];
let lockSort = false;

const loadUserDataInArray = async () => {
    let response = await fetch(USER);
    let json = await response.json();
    json.results.forEach(element => {
        listUsers.push(element);
        tempListUser = listUsers.slice();
    });
    createCards();
}

let createCards = () => {
    let cards = '';
    listUsers.forEach(element => {
        card = `<div class="card">
                    <div class="card-name">${element.name.first.charAt(0).toUpperCase() + element.name.first.slice(1)} 
                            ${element.name.last.charAt(0).toUpperCase() + element.name.last.slice(1)}</div>
                            <div><img class="card-photo" src="${element.picture.large}"></div>
                            <div class="card-info">
                            ${element.dob.age} years<br> 
                            ${element.email}<br>
                            ${element.phone}
                            </div>
                            <div class="gender">${element.gender}</div>
                </div>`;
        cards += card;
    });

    CONTAINER_CARDS.innerHTML = cards;
}

let sort = elem => {
    switch (elem.id) {
        case 'sort-age-up':
            compare = (a, b) => a.dob.age - b.dob.age;
            break;
        case 'sort-age-down':
            compare = (a, b) => b.dob.age - a.dob.age;
            break;
        case 'sort-name-up':
            compare = (a, b) => a.name.first.localeCompare(b.name.first);
            break;
        case 'sort-name-down':
            compare = (a, b) => b.name.first.localeCompare(a.name.first);
            break;
    }

    listUsers.sort(compare);
    removeUsers();
    createCards();
}

let sortGender = elem => {
    if (!lockSort) {
        let array = [];
        switch (elem.id) {
            case 'gender-male':
                listUsers.forEach(element => {
                    if (element.gender !== 'male') element.delete;
                    else array.push(element);
                });
                lockSort = true;
                break;
            case 'gender-female':
                listUsers.forEach(element => {
                    if (element.gender !== 'female') element.delete;
                    else array.push(element);
                });
                lockSort = true;
                break;
        }
        listUsers = array;
    }

    removeUsers();
    createCards();
}

let resetInfo = () => {
    listUsers = tempListUser.slice();
    lockSort = false;
    removeUsers();
    createCards();
}

let findInfo = elem => {
    let search = elem.target.value;
    let arr = CONTAINER_CARDS.childNodes;

    arr.forEach(element => {
        if (element.textContent.indexOf(search) === -1) {
            element.classList.add('hide-card');
        } else {
            element.classList.remove('hide-card');
        }
    });
}

let removeUsers = () => {
    while (CONTAINER_CARDS.firstChild) CONTAINER_CARDS.removeChild(CONTAINER_CARDS.firstChild);
}

let addEventListeners = () => {
    CONTAINER_FILTERS.onclick = function(event) {
        let target = event.target;
        if (target === SORT_AGE_DOWN || target === SORT_AGE_UP || 
            target === SORT_NAME_UP || target === SORT_NAME_DOWN) {
            sort(target);
        } else if (target === GENDER_ALL || target === RESET_BUTTON) {
            resetInfo();
        } else if (target === GENDER_MALE || target === GENDER_FEMALE) {
            sortGender(target);
        }
    }
    SEARCH.addEventListener('input', findInfo);
}

loadUserDataInArray();
addEventListeners();
