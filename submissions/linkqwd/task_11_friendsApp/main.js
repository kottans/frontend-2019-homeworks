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
    fetch(`https://randomuser.me/api/?results=50`)
        .then(data => data.json())
        .then((friendsData) => friendsList = friendsData.results.map(buildFriend))
        .then(() => renderHTMLFriendsCards(friendsList));

    function buildFriend(friend) {
        return new Friend({
            photo: friend.picture.large,
            name: friend.name.first,
            lastName: friend.name.last,
            gender: friend.gender,
            cell: friend.cell,
            age: friend.dob.age,
            id: friend.login.uuid,
        });
    };
};

let capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function renderHTMLFriendsCards(friendsArray) {
    let friendsHTMLCards = friendsArray.map(buildHTMLCard);

    function buildHTMLCard(friend) {
        return `
        <li class="${DOM.friendCard} ${!friend.isPresentInList ? 'hidden' : ''}" id="${friend.id}">
            <div class="b-friends-list__friend-item-wrapper">
                <div class="b-friends-list__img-wrapper">
                    <img class="b-friends-list__image" src="${friend.photo}" alt="test">
                </div>
                <div class="b-friends-list__info-wrapper">
                    <div class="b-friends-list__friend-name b-friends-list__info-row">
                        <span>${capitalizeFirstLetter(friend.name)} ${capitalizeFirstLetter(friend.lastName)}</span>
                    </div>
                    <div class="b-friends-list__friend-age b-friends-list__info-row">
                        <span>Age: ${friend.age}</span>
                    </div>
                    <div class="b-friends-list__friend-gender b-friends-list__info-row">
                        <span>Gender: ${friend.gender}</span>
                        </div>
                    <div class="b-friends-list__friend-phone b-friends-list__info-row">
                        <span>Phone: ${friend.cell}</span>
                    </div>
                </div>
            </div>
        </li>`;
    }

    DOM.friendHolderSelector.innerHTML = friendsHTMLCards.join('');
}

function filteringByName() {
    friendsList.forEach((friend) => friend.fullName.search(new RegExp(this.value.toLowerCase())) != -1 ? friend.showInList() : friend.removeFromList());
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