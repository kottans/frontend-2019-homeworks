'use strict';

class FriendsController {
  constructor() {
    this.controlledObjects = {};
  }

  register(role, obj){
    this.controlledObjects[role] = obj;
  }

  getControlled(role){
    return this.controlledObjects[role];
  }

  showError(error){
    let errorElement = document.getElementById('modal-error');
    errorElement.innerHTML = `<div>
                                <p class="modal__text">
                                  Error: ${error}
                                  <br>
                                  click to close
                                </p>
                              </div>`;
    errorElement.classList.remove('visually-hidden');
    errorElement.addEventListener('click', (event) => event.currentTarget.classList.add('visually-hidden'));
  }
}

class FriendsData {
  constructor(friendsNum, controlerObj) {
    this.controler = controlerObj;
    this.controler.register('friends_data', this);
    this.friendsNum = friendsNum;
    this.friendsDataArr = [];
  }

  getData() {
    return new Promise((resolve, reject) => {
      fetch(`https://randomuser.me/api/?results=${this.friendsNum}&inc=phone,name,picture,dob&nat=us,dk,fr,gb&noinfo`, {
        method: 'GET',
      })
        .then((response) => {
          if (response.status !== 200) {
            reject(response.statusText);
          }
          return response.json();
        })
        .then((responseJson) => {
          this.friendsDataArr = responseJson.results;
          resolve(responseJson.results);
        })
        .catch((error) => {
          this.showError(error);
        });
    });
  }

  getSortFriends(param, isIncreasing) {
    const friendsArr = this.friendsDataArr.slice();
    switch (param) {
      case 'name':
        if (isIncreasing) {
          return friendsArr.sort(FriendsData.sortFriendsNamesByIncrease);
        }else{
          return friendsArr.sort(FriendsData.sortFriendsNamesByDecrease);
        }
        break;
      case 'age':
        if (isIncreasing) {
          return friendsArr.sort(FriendsData.sortFriendsAgeByIncrease);
        }else{
          return friendsArr.sort(FriendsData.sortFriendsAgeByDecrease);
        }
        break;  
      default:
        return null;
        break;
    }
  }

  getFiltredFriends(param, value) {
    const friendsArr = this.friendsDataArr.slice();
    return friendsArr.filter((friend) => {
      switch (param) {
        case 'name':
          return !(`${friend.name.first} ${friend.name.last}`.indexOf(value) == -1);
          break;
        case 'age':
          return friend.dob.age == value;
          break;
        default:
          return null;
          break;
      }
    });
  }
}

FriendsData.sortFriendsNamesByIncrease = (friend1, friend2) => {
  return `${friend1.name.first} ${friend1.name.last}` > `${friend2.name.first} ${friend2.name.last}` ? 1 : -1;
};

FriendsData.sortFriendsNamesByDecrease = (friend1, friend2) => {
  return `${friend1.name.first} ${friend1.name.last}` < `${friend2.name.first} ${friend2.name.last}` ? 1 : -1;
};

FriendsData.sortFriendsAgeByIncrease = (friend1, friend2) => {
  return +friend1.dob.age > +friend2.dob.age ? 1 : -1;
};

FriendsData.sortFriendsAgeByDecrease = (friend1, friend2) => {
  return +friend1.dob.age < +friend2.dob.age ? 1 : -1;
};

class FriendsBlockElement {
  constructor(blockElement, controllerObj) {
    this.blockElement = blockElement;
    this.controler = controllerObj;
    this.controler.register('friends_block', this);
  }

  fillBlock(friendArray) {
    let cardsHTML = '';
    friendArray.forEach((friend) => {
      const friendCard = new FriendCard(friend);
      cardsHTML += friendCard.getFriendCardHTML();
    });
    this.blockElement.innerHTML = cardsHTML;
  }
}

class FriendCard {
  constructor(obj) {
    this.friendObj = obj;
  }

  getFriendCardHTML() {
    return `
    <div class="card">
      <div class="card__name-text">
        ${this.friendObj.name.first} ${this.friendObj.name.last}
      </div>
      <div>
        <img src="${this.friendObj.picture.large}" class="card__image">
        <div>
          ${this.friendObj.dob.age} years old
        </div>
        <div class="card__phone-text">
          ${this.friendObj.phone}
        </div>
      </div>
    </div>`;
  }
}

class FriendsConfig {
  constructor(controlerObj) {
    this.configObj = {};
    this.controler = controlerObj;
    this.controler.register('config', this);
  }

  getElementByType(type){
    return this.configObj[type];
  }

  registerElementAs(type, elementID){
    const element = document.getElementById(elementID);
    const friendsBlock = this.controler.getControlled('friends_block');
    const friendsData = this.controler.getControlled('friends_data');
    this.configObj[type] = element;

    switch (type) {
      case 'age_sort_increase':
        element.addEventListener('click', () => {
          friendsBlock.fillBlock(friendsData.getSortFriends('age', true));
        });
        break;
      case 'age_sort_decrease':
        element.addEventListener('click', () => {
            friendsBlock.fillBlock(friendsData.getSortFriends('age', false));
          });
        break;
      case 'name_sort_increase':
        element.addEventListener('click', () => {
          friendsBlock.fillBlock(friendsData.getSortFriends('name', true));
        });
        break;
      case 'name_sort_decrease':
       element.addEventListener('click', () => {
         friendsBlock.fillBlock(friendsData.getSortFriends('name', false));
       });
        break;
      case 'age_filter':
        element.addEventListener('click', () => {
          friendsBlock.fillBlock(friendsData.getFiltredFriends('age', this.getElementByType('age_input').value));
       });
        break;
      case 'name_filter':
       element.addEventListener('click', (event) => {
          friendsBlock.fillBlock(friendsData.getFiltredFriends('name', this.getElementByType('name_input').value));
        });
        break;
      case 'reset':
        element.addEventListener('click', (event) => {
          friendsBlock.fillBlock(friendsData.friendsDataArr);
        });
        break;
    }
    return this;
  }
}

const controller = new FriendsController();
const friendsData = new FriendsData(20, controller);
const friendsBlock = new FriendsBlockElement(document.getElementById('users'), controller);
const friendsConfig = new FriendsConfig(controller);

friendsConfig.registerElementAs('age_sort_increase', 'age-sort-increase').registerElementAs('age_sort_decrease', 'age-sort-degrease').
              registerElementAs('name_sort_increase', 'name-sort-increase').registerElementAs('name_sort_decrease', 'name-sort-decrease').
              registerElementAs('age_filter', 'age-filter').registerElementAs('name_filter', 'name-filter').
              registerElementAs('reset', 'reset-button').registerElementAs('age_input', 'age-input').registerElementAs('name_input', 'name-input');

friendsData.getData().then(
  response => friendsBlock.fillBlock(response),
  error => controller.showError(error),
);
