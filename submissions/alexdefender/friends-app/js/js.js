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
let backUpListUser = [];
let switchSort = false;

const loadUserDataInArray = async () => {
    try {
        let response = await fetch(USER);
        let json = await response.json();
        json.results.forEach(element => {
            listUsers.push(element);
            backUpListUser = listUsers.slice();
        });
    } catch (e) {
        console.log(e);
    }
    createCards();
}

const createCards = () => {
    let cards = '';
    listUsers.forEach(element => {
        card = `<div class="card">
                    <div class="card-name">${element.name.first} ${element.name.last}</div>
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

const sort = elem => {
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

const sortGender = elem => {
    listUsers = backUpListUser.slice();
    let array = [];
    switch (elem.id) {
        case 'gender-male':
            array = listUsers.filter(user => user.gender == 'male');
            break;
        case 'gender-female':
            array = listUsers.filter(user => user.gender == 'female');
            break;
    }

    listUsers = array.slice();
    removeUsers();
    createCards();
}

const resetInfo = () => {
    listUsers = backUpListUser.slice();
    removeUsers();
    createCards();
}

const findInfo = ({target}) => {
    let search = target.value;
    let arrayCards = CONTAINER_CARDS.childNodes;
    arrayCards.forEach((element, index) => {
        let surName = element.querySelector('.card-name').textContent;
        if (surName.includes(search)) {
            element.classList.remove('hide-card');
        } else {
            element.classList.add('hide-card');
        }
    });
}

const removeUsers = () => {
    while (CONTAINER_CARDS.firstChild) {
        CONTAINER_CARDS.removeChild(CONTAINER_CARDS.firstChild);
    }
}

CONTAINER_FILTERS.addEventListener('click', event => {
    let target = event.target;
    if (target === SORT_AGE_DOWN || target === SORT_AGE_UP ||
        target === SORT_NAME_UP || target === SORT_NAME_DOWN) {
        sort(target);
    } else if (target === GENDER_ALL || target === RESET_BUTTON) {
        resetInfo();
    } else if (target === GENDER_MALE || target === GENDER_FEMALE) {
        sortGender(target);
    } else if (target.id === 'search') {
       SEARCH.addEventListener('input', findInfo);
    }
});


loadUserDataInArray();
