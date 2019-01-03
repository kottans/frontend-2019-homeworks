const FRIENDS_NUMBER = 15,
      FRIENDS_API_URL = `https://randomuser.me/api/?results=${FRIENDS_NUMBER}&nat=us`,
      SOCIAL = ['instagram', 'facebook', 'linkedin', 'twitter', 'dribbble'];
let initialArray = [],
    newArray = [],
    social = SOCIAL.map((item)=> {
        return `<a target="_blank" href="https://www.${item}.com"><i class="fa fa-${item}"></i></a>`
    })

let createItem = item => {
    initialArray.push(item);
    newArray = initialArray;
}
let renderFriendsBlock = friendsArray => {
    friendsArray.map(createItem)
    ageFilter.addEventListener('change', ({target}) => filterAge(target.value, newArray));
    genderFilter.addEventListener('change', ({target}) => filterGender(target.value, newArray));
    nameFilterInput.addEventListener('keyup', ({target}) => filterName(target.value, initialArray));
    resetFilter.addEventListener('click', ({target}) => filterReset(initialArray));
    new FriendsContainer(friends, newArray);
};

let filterRender = (array) => {
    friends.innerHTML = '';
    new FriendsContainer(friends, array);
}

let filterAge = (value, array) => {
    array.sort((a, b) => {
        if(value === 'increase'){
            return a.dob.age - b.dob.age;
        } else if (value === 'decrease') {
            return b.dob.age - a.dob.age;
        } else if (value === 'abc') {
            return a.name.first > b.name.first;
        } else {
            return a.name.first < b.name.first;
        }
    });
    filterRender(array);
}
let filterName = (value, array) => {
    newArray = array.filter(item => item.name.first.indexOf(value) + 1 || item.name.last.indexOf(value) + 1);
    filterRender(newArray);
}

let filterGender = (value, array) => {
    filter.setAttribute("gender", value);
}

let filterReset = (array) => {
    filter.setAttribute("gender", "all");
    document.querySelectorAll('[type=radio]').forEach(radio => radio.checked = false);
    nameFilterInput.value = '';
    newArray = array;
    filterRender(array);
}

let error = () => {
    result.innerHTML = 'I don`t have friends according to chosen this filters';
    result.style.display = 'block';
}

class FriendsContainer {
    constructor(renderBlock, itemsArray) {
        this.renderBlock = renderBlock;
        this.itemsArray = itemsArray;
        this.renderList();
    }
    renderList() {
        if(this.itemsArray.length){
            result.style.display = 'none';
            this.itemsArray.map(item => {
                new FriendItem(item);
            });
        } else {
            error();
        }
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
        friends.appendChild(block);
    }
}

fetch(FRIENDS_API_URL)
.then(response => response.json())
.then(data => {
    renderFriendsBlock(data.results);
})
.catch(error => {
    result.innerHTML = error;
    result.style.display = 'block';
});
