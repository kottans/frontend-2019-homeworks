const FRIENDS_NUMBER = 15,
    //   FRIENDS_API_URL = `https://rer.me/api/?results=${FRIENDS_NUMBER}&nat=us`,
      FRIENDS_API_URL = `https://randomuser.me/api/?results=${FRIENDS_NUMBER}&nat=us`,
      SOCIAL = ['instagram', 'facebook', 'linkedin', 'twitter', 'dribbble'],
      FRIENDS_ELEMENT = document.getElementById('friends'),
      FILTER_ELEMENT = document.getElementById('filter'),
      RESULT_ELEMENT = document.getElementById('result'),
      AGE_ELEMENT = document.getElementById('ageFilter'),
      GENDER_ELEMENT = document.getElementById('genderFilter'),
      NAME_ELEMENT = document.getElementById('nameFilterInput'),
      RESET_ELEMENT = document.getElementById('resetFilter'),
      NOT_FRIENDS = 'I don`t have friends according to chosen this filters';

let initialArray = [],
    newArray = [],
    wrapper = document.createElement('div'),
    social = SOCIAL.map((item)=> {
        return `<a target="_blank" href="https://www.${item}.com"><i class="fa fa-${item}"></i></a>`
    });
    wrapper.classList.add("wrapper");

let createItem = item => {
    initialArray.push(item);
}
let renderFriendsBlock = friendsArray => {
    friendsArray.map(createItem)
    newArray = initialArray.slice();
    AGE_ELEMENT.addEventListener('change', ({target}) => filterAge(target.value, newArray));
    GENDER_ELEMENT.addEventListener('change', ({target}) => filterGender(target.value, newArray));
    NAME_ELEMENT.addEventListener('keyup', ({target}) => filterName(target.value, initialArray));
    NAME_ELEMENT.addEventListener('paste', ({target}) => window.setTimeout(() => filterName(target.value, initialArray)));
    RESET_ELEMENT.addEventListener('click', ({target}) => filterReset(initialArray));
    new FriendsContainer(FRIENDS_ELEMENT, newArray);
};

let filterRender = (array) => {
    FRIENDS_ELEMENT.innerHTML = '';
    new FriendsContainer(FRIENDS_ELEMENT, array);
}

let filterAge = (value, array) => {
    array.sort((a, b) => {
        if(value === 'increase'){
            return a.dob.age - b.dob.age;
        } else if (value === 'decrease') {
            return b.dob.age - a.dob.age;
        } else {
            let result = value === 'abc' ? -1 : 1;
            return (a.name.first < b.name.first) ? result : -result;
            return 0;
        }
    });
    filterRender(array);
}

let filterName = (value, array) => {
    newArray = array.filter(item => item.name.first.includes(value.toLowerCase()) || item.name.last.includes(value.toLowerCase()));
    filterRender(newArray);
}

let filterGender = (value, array) => {
    FILTER_ELEMENT.setAttribute("gender", value);
}

let filterReset = (array) => {
    FILTER_ELEMENT.setAttribute("gender", "all");
    document.querySelectorAll('[type=radio]').forEach(radio => radio.checked = false);
    NAME_ELEMENT.value = '';
    newArray = array.slice();
    filterRender(array);
}

let handleErrors = (text) => {
    RESULT_ELEMENT.innerHTML = text;
    RESULT_ELEMENT.style.display = 'block';
}

let badRequest = (response) => {
    if (!response.ok){
        throw Error(response.statusText);
        handleErrors(response.statusText)
    }
    return response;
}

let unwrap = (wrapper) => {
    let fragment = document.createDocumentFragment();
    while (wrapper.firstChild) {
        let child = wrapper.removeChild(wrapper.firstChild);
        fragment.appendChild(child);
    }
    wrapper.parentNode.replaceChild(fragment, wrapper);
}

class FriendsContainer {
    constructor(renderBlock, itemsArray) {
        this.renderBlock = renderBlock;
        this.itemsArray = itemsArray;
        this.renderList();
    }
    renderList() {
        if(this.itemsArray.length){
            RESULT_ELEMENT.style.display = 'none';
            this.itemsArray.map(item => {
                new FriendItem(item);
            });
        } else {
            handleErrors(NOT_FRIENDS);
        }
        FRIENDS_ELEMENT.appendChild(wrapper);
        unwrap(document.querySelector('.wrapper'));
    }
}

class FriendItem {
    constructor(item) {
        this.item = item;
        this.renderItem();
    }
    renderItem() {
        let block = document.createElement('div');
        block.classList.add("friend-item");
        block.setAttribute("gender", this.item.gender);
        let content = `<div class="friend-img">
            <img src=${this.item.picture.large} alt=${this.item.name.last}>
        </div>
        <div class="friend-info">
            <p class="friend-name">${this.item.name.first} ${this.item.name.last}</p>
            <p><span class="friend-gender">${this.item.gender}, </span><span class="friend-age">${this.item.dob.age}</span></p>
            <div class="friend-social">${social.join('')}</div>
            <p class="friend-detail">
                I am special agent ${this.item.login.username}. I am from ${this.item.location.city}. My password is ${this.item.location.street} ${this.item.location.state} ${this.item.location.postcode} ${this.item.location.coordinates.longitude} ${this.item.location.coordinates.latitude}<br><br>
                My email ${this.item.email}.
            </p>
        </div>`;
        block.innerHTML = content;
        wrapper.appendChild(block);
    }
}

fetch(FRIENDS_API_URL)
.then(badRequest)
.then(response => response.json())
.then(response => renderFriendsBlock(response.results))
.catch(error => handleErrors(error));
