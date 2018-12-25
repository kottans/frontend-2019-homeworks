const settings = {
    friendsCount: 50,
}

const DOM = {
    friendHolder: 'b-friends-list',
    friendCard: 'b-friends-list__friend-item',
    inputNameSearchId: 'js-name-search-input',
    radioBtns: '.b-layout__radio-box',
    filtersBlock: '.b-layout__filter',
    friendHolderSelector: document.querySelector('.b-friends-list')
}

let friendsList = [];

class Friend {
    constructor(props) {
        this.photo = props.photo;
        this.name = props.name;
        this.lastName = props.lastName;
        this.fullName = props.name + props.lastName;
        this.age = props.age;
        this.cell = props.cell;
        this.gender = props.gender;
        this.id = props.id;
        this.isPresentInList = true;
    }

    showInList() {
        document.getElementById(this.id).classList.remove('hidden');
        this.isPresentInList = true;
    }

    removeFromList() {
        document.getElementById(this.id).classList.add('hidden');
        this.isPresentInList = false;
    }
}

function buildFriendsList() {
    fetch(`https://randomuser.me/api/?results=${settings.friendsCount}`, { method: "GET" })
        .then(data => data.json())
        .then((json) => {
            json.results.forEach((friend, i) => {
                friendsList.push(new Friend({ photo: friend.picture.large, name: friend.name.first, lastName: friend.name.last, gender: friend.gender, cell: friend.cell, age: friend.dob.age, id: i + 100 }));
            });
        })
        .then(() => {
            renderHTMLFriendsCards(friendsList);
        });
};

let ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1); // UpperCase For first letter

function renderHTMLFriendsCards(friendsArray) {
    let friendsHTMLCards = [];
    for (let i = 0; i < friendsArray.length; i++) {
        friendsHTMLCards.push(`<li class="${DOM.friendCard} ${!friendsArray[i].isPresentInList ? 'hidden' : ''}" id="${friendsArray[i].id}"><div class="b-friends-list__friend-item-wrapper"><div class="b-friends-list__img-wrapper"><img class="b-friends-list__image" src="${friendsArray[i].photo}" alt="test"></div><div class="b-friends-list__info-wrapper"><div class="b-friends-list__friend-name b-friends-list__info-row"><span>${ucFirst(friendsArray[i].name)} ${ucFirst(friendsArray[i].lastName)}</span></div><div class="b-friends-list__friend-age b-friends-list__info-row"><span>Age: ${friendsArray[i].age}</span></div><div class="b-friends-list__friend-age b-friends-list__info-row"><span>Gender: ${friendsArray[i].gender}</span></div><div class="b-friends-list__friend-phone b-friends-list__info-row"><span>Phone: ${friendsArray[i].cell}</span></div></div></div></li>`);
    }

    DOM.friendHolderSelector.innerHTML = friendsHTMLCards.join('');
}

function filteringByName() {
    friendsList.forEach((friend) => ~friend.fullName.indexOf(this.value.toLowerCase()) ? friend.showInList() : friend.removeFromList());
}

function sortingOptions(e) {
    let clickTarget = e.target.closest(DOM.radioBtns);
    if (clickTarget) {
        switch (clickTarget.value) {
            case 'all':
                friendsList.forEach((friend) => friend.showInList());
                break;
            case 'male':
                friendsList.forEach((friend) => friend.gender === 'male' ? friend.showInList() : friend.removeFromList());
                break;
            case 'female':
                friendsList.forEach((friend) => friend.gender === 'female' ? friend.showInList() : friend.removeFromList());
                break;
            case 'nameAsc':
                renderHTMLFriendsCards(friendsList.sort((b, a) => b.name < a.name ? -1 : 1));
                break;
            case 'nameDesc':
                renderHTMLFriendsCards(friendsList.sort((a, b) => b.name < a.name ? -1 : 1));
                break;
            case 'ageAsc':
                renderHTMLFriendsCards(friendsList.sort((a, b) => a.age - b.age));
                break;
            case 'ageDesc':
                renderHTMLFriendsCards(friendsList.sort((b, a) => a.age - b.age));
                break;
        }
    }
}

document.getElementById(DOM.inputNameSearchId).addEventListener("keyup", filteringByName);
document.querySelector(DOM.filtersBlock).addEventListener('click', sortingOptions);

buildFriendsList();