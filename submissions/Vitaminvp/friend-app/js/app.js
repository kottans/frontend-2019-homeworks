const APP_CONFIG = {
    card: 'card',
    inputText: document.querySelector('.input-text'),
    radioButtons: '.radio-box',
    radioButtonsList: document.querySelectorAll('.radio-box'),
    form: document.querySelector('.filters'),
    target: document.querySelector('.frame'),
    reset: document.querySelector('.filter .reset_button'),
    btnWrapper: document.querySelector('.btn-wrapper'),
    api_url: 'https://randomuser.me/api/?results=50'
};

const state = {
    CardsList: [],
    filteredList: [],
    sortedList: []
};

const SORT = {
    all:  () => renderCards(state.sortedList = [...state.filteredList]),
    male: () => renderCards(state.sortedList = [...state.filteredList].filter((card) => card.gender.toLowerCase() === 'male')),
    female: () => renderCards(state.sortedList = [...state.filteredList].filter((card) => card.gender.toLowerCase() === 'female')),
    nameAsc: () => renderCards([...state.sortedList].sort((b, a) => b.name.toLowerCase() < a.name.toLowerCase() ? -1 : 1)),
    nameDesc: () => renderCards([...state.sortedList].sort((a, b) => b.name.toLowerCase() < a.name.toLowerCase() ? -1 : 1)),
    ageAsc: () => renderCards([...state.sortedList].sort((a, b) => a.age - b.age)),
    ageDesc: () => renderCards([...state.sortedList].sort((b, a) => a.age - b.age))
};
const capitalize = str => str.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
const formatDate =  oldDate => {
    const date = new Date( Date.parse(oldDate) );
    return date.getFullYear() + '/' +
        ('00' + (date.getMonth()+1)).slice(-2) + '/' +
        ('00' + date.getDate()).slice(-2);
};

class Card {
    constructor(props) {
        this.photo = props.photo;
        this.name = props.name;
        this.date = props.date;
        this.age = props.age;
        this.cell = props.cell;
        this.mail = props.mail,
        this.gender = props.gender;
        this.id = props.id;
        this.password = props.password;
        this.location = props.location;
    }
    render() {
        const cardDiv = document.createElement('DIV');
        cardDiv.className = APP_CONFIG.card;
        cardDiv.id =  this.id;
        const template = `<div class="details">
                            <p class="user_title">${capitalize(this.name)}</p>
                            <div class="user_photo horizontal_center">
                                <img src="${this.photo}" alt="${this.fullName}">
                            </div>
                            <p class="user_value">${this.mail}</p>
                        </div>
                        <ul class="values_list horizontal_center">
                            <li data-title="Hi, My name is" data-value="${capitalize(this.name)}" data-label="name" class=""></li>
                            <li data-title="My email address is" data-value="${this.mail}" data-label="email" class="active"></li>
                            <li data-title="My birthday is" data-value="${formatDate(this.date)}" data-label="birthday" class=""></li>
                            <li data-title="My address is" data-value="${this.location}" data-label="location" class=""></li>
                            <li data-title="My phone number is" data-value="${this.cell}" data-label="phone" class=""></li>
                            <li data-title="My password is" data-value="${this.password}" data-label="pass" class=""></li>
                        </ul>`;
        cardDiv.innerHTML = template;
        const list = Array.from(cardDiv.getElementsByTagName("li"));
        list.forEach((e) => {
            e.addEventListener("mouseover", function() {
                list.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                cardDiv.querySelector('.user_title').innerHTML = this.getAttribute('data-title');
                cardDiv.querySelector('.user_value').innerHTML = this.getAttribute('data-value');
            })
        });
        return cardDiv;
    }
}

function buildCardsList() {
    fetch(APP_CONFIG.api_url)
        .then(data => data.json())
        .then(data => state.CardsList = data.results.map(buildCard))
        .then(() => state.filteredList = [...state.CardsList])
        .then(() => state.sortedList = [...state.CardsList])
        .then(() => renderCards(state.filteredList));

    function buildCard(friend) {
        return new Card({
            photo: friend.picture.large,
            name: friend.name.first +' '+ friend.name.last,
            gender: friend.gender,
            cell: friend.cell,
            mail: friend.email,
            date: friend.dob.date,
            age: friend.dob.age,
            id: friend.login.uuid,
            password: friend.login.password,
            location: friend.location.city +', '+ friend.location.street
        });
    };
};

const createBtn = (page, type) => `<button class="btn-inline results__btn--${ type }" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                                        <span>Page ${ type === 'prev' ? page - 1 : page + 1 }</span>
                                        <svg class="search__icon">
                                            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                                        </svg>
                                    </button>`;
const renderBtn = (page, sumResults, resPerPage) => {
    const pages = Math.ceil(sumResults/resPerPage);
    let btn;
    if(page === 1 && pages > 1){
        btn = createBtn(page, 'next');
    }else if (page === pages && pages > 1) {
        btn = createBtn(page, 'prev');
    }else if (page < pages){
        btn = `${createBtn(page, 'next')} ${createBtn(page, 'prev')}`;
    }else{
        btn = null;
    }
    if( sumResults > 0 ){
        if(APP_CONFIG.btnWrapper) {
            if(btn) APP_CONFIG.btnWrapper.insertAdjacentHTML('beforeend', btn);
        } else{
            const btnWrapper = document.createElement('DIV');
            btnWrapper.className = 'btn-wrapper';
            if(btn) btnWrapper.insertAdjacentHTML('beforeend', btn);
            APP_CONFIG.target.appendChild(btnWrapper);
        }
    }
};

const renderCards = (cardsArray, currentPage = 1, resPerPage = 12) => {
    const start = (currentPage - 1)*resPerPage;
    const end = currentPage*resPerPage;
    if(cardsArray && cardsArray.length !== 0){
        const fragment = document.createDocumentFragment();
        cardsArray.slice(start, end).forEach(item => fragment.appendChild(item.render()));
        APP_CONFIG.target.innerHTML = '';
        APP_CONFIG.target.appendChild(fragment);
    }
    renderBtn(currentPage, cardsArray.length, resPerPage)
};

function filteringByName() {
    renderCards(state.filteredList = [...state.CardsList.filter(card => card.name.search(new RegExp(this.value.toLowerCase())) !== -1)]);
}

const reset = () => {
    state.sortedList = [...state.CardsList];
    renderCards(state.filteredList = [...state.CardsList]);
};
const resetRadioButtons = () => {
    reset();
    Array.from(APP_CONFIG.radioButtonsList).forEach(button => button.checked = false);
    APP_CONFIG.radioButtonsList[0].checked = true;
};


const sortingOptions = (e) => {
    const target = e.target.closest(APP_CONFIG.radioButtons);
    state.sortedList.length >= 0 ? null : state.sortedList = [...state.filteredList];
    if (target) SORT[target.value]();
};

APP_CONFIG.inputText.addEventListener("keyup", filteringByName);
APP_CONFIG.inputText.addEventListener("focus", resetRadioButtons);

APP_CONFIG.form.addEventListener('click', function(e) {
    let filteredList = [...state.filteredList];
    sortingOptions(e, filteredList);
});

APP_CONFIG.reset.addEventListener('click', reset);

APP_CONFIG.target.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto);
        renderCards(state.sortedList, goToPage);
    }
});

buildCardsList();


