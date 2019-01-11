'use strict';

const searchInput = document.getElementById('search'),
      filterAgeFromInput = document.getElementById('filter-user-age-from'),
      filterAgeToInput = document.getElementById('filter-user-age-to');
let usersArr = [],
    currentUserArr = [],
    userModal = document.getElementById('user-info-modal'),
    modalOverflow = document.querySelector('.modal-overflow'),
    sortBtn = document.getElementById('sorting').getElementsByClassName('btn'),
    sortUsersAscBtn = document.getElementById('sort-users-asc'),
    sortUsersDescBtn = document.getElementById('sort-users-desc'),
    sortUsersAgeAscBtn = document.getElementById('sort-users-age-asc'),
    sortUsersAgeDescBtn = document.getElementById('sort-users-age-desc'),
    filterUsersByGenderMan = document.getElementById('filter-gender-man'),
    filterUsersByGenderWoman = document.getElementById('filter-gender-woman');


// GET USER LIST FUNCTION
function getUserList() {
  fetch('https://randomuser.me/api/?results=200')
    .then(function(response) {
      return response.json();
     })
    .then(function(users) {
      document.getElementById('users-table').classList.remove('loading');
      users.results.forEach((user, i) => {
        let userElem = new User(user, i);
        userElem.generateElement();
        usersArr.push(userElem);
      });
      generateUserTable(usersArr, '#users-table');
      currentUserArr = usersArr;
    })
    .catch(console.log);
}


// USER CLASS
let User = function(user, i) {
  this.id = i;
  this.fullName = `${user.name.first} ${user.name.last}`;
  this.info = user;
}

User.prototype.generateElement = function() {
  let user = document.createElement('div'),
      userImage = document.createElement('div'),
      userInfo = document.createElement('div'),
      userName = document.createElement('div'),
      userAge = document.createElement('div');

  user.classList.add('user');
  user.classList.add(`user--${this.info.gender}`);
  user.setAttribute('id', this.id);
  userImage.classList.add('user__image');
  userInfo.classList.add('user__info');
  userName.classList.add('user__name');
  userAge.classList.add('user__age');

  userImage.style.backgroundImage = `url(${this.info.picture.large})`;
  userName.innerHTML = capitalizeFirstLetter(this.info.name.first) 
                       + ' ' 
                       + capitalizeFirstLetter(this.info.name.last);
  userAge.innerHTML = this.info.dob.age;
  userInfo.appendChild(userName);
  userInfo.appendChild(userAge);
  user.appendChild(userImage);
  user.appendChild(userInfo);
  this.htmlElement = user;
}


// GENERATING HTML CONTENT FUNCTIONS
function generateUserTable(users, parentElementSelector) {
  const wrapperElement = document.querySelector(parentElementSelector);
  wrapperElement.innerHTML = '';
  let userWrapperElement = document.createElement('div');
  userWrapperElement.classList.add('wrapper');
  users.forEach((user) => {
    userWrapperElement.appendChild(user.htmlElement);
  });
  wrapperElement.appendChild(userWrapperElement);
  wrapperElement.addEventListener('click', function(event) {
    let target = checkParentTarget(this, event.target, '.user');
    if(target) {
      userModal.classList.add('open');
      generateModalInfo(target.id, userModal);
    }
  });
}

function generateModalInfo(userId, modal) {
  let user = usersArr.filter((userObj) => {
    return userObj.id == userId;
  })[0].info;
  modal.querySelector('.modal__header').innerHTML = `${user.name.first} ${user.name.last}`;
  modal.querySelector('.modal__image').style.backgroundImage = `url(${user.picture.large})`;
  modal.querySelector('.modal__action--location').href =
    `https://maps.google.com/?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`;
  modal.querySelector('.modal__action--email').href = `mailto:${user.email}`;
  modal.querySelector('.modal__action--phone').href = `tel:${user.phone}`;
  let modalBodyElement = document.querySelector('.modal__body'),
      infoWrapper = document.createElement('div');
  infoWrapper.classList.add('info');
  [
    {email: user.email},
    {birthday: user.dob.date},
    {gender: user.gender},
    {city: user.location.city},
    {street: user.location.street}
  ].forEach((userInfo) => {
    let row = document.createElement('div'),
        title = document.createElement('div'),
        value = document.createElement('div');
    row.classList.add('info-row');
    title.classList.add('info-row__title');
    value.classList.add('info-row__value');
    title.innerHTML = Object.keys(userInfo)[0];
    value.innerHTML = userInfo[Object.keys(userInfo)[0]];
    row.appendChild(title);
    row.appendChild(value);
    infoWrapper.appendChild(row);
  });
  modalBodyElement.innerHTML = '';
  modalBodyElement.appendChild(infoWrapper);
}


// MODAL
modalOverflow.addEventListener('click', (event) => {
  event.target.parentNode.classList.remove('open');
});


// FILTERING AND SORTING FUNCTIONS
function searchUser(userList, keyword) {
  return userList.filter((user) => {
    return user.info.name.first.toLowerCase().match(keyword.toLowerCase())
    || user.info.name.last.toLowerCase().match(keyword.toLowerCase());
  })
}

function filterUserList(userList, key, value){
  return userList.filter((user) => {
    return getObjectValueFromPath(user, key) == value;
  });
}

function filterUsersByAge(userList, fromAge, toAge){
  return userList.filter((user) => {
    return user.info.dob.age >= fromAge && user.info.dob.age <= toAge;
  })
}

function sortUserList(userList, key, orderDirection){
  return userList.sort((user1, user2) => {
    if (getObjectValueFromPath(user1, key) > getObjectValueFromPath(user2, key)) {
      return (orderDirection == 'asc') ? 1 : -1;
    }
    if (getObjectValueFromPath(user1, key) < getObjectValueFromPath(user2, key)) {
      return (orderDirection == 'asc') ? -1 : 1;
    }
  });
}

function genderFilter() {
  if(filterUsersByGenderMan.checked && filterUsersByGenderWoman.checked
     || !filterUsersByGenderMan.checked && !filterUsersByGenderWoman.checked) {
    currentUserArr = usersArr;
    generateUserTable(currentUserArr, '#users-table');
  }
  else if(filterUsersByGenderMan.checked && !filterUsersByGenderWoman.checked) {
    currentUserArr = filterUserList(usersArr, 'info.gender', 'male');
    generateUserTable(currentUserArr, '#users-table');
  }
  else if(!filterUsersByGenderMan.checked && filterUsersByGenderWoman.checked) {
    currentUserArr = filterUserList(usersArr, 'info.gender', 'female');
    generateUserTable(currentUserArr, '#users-table');
  }
}

// ADD EVENT LISTENERS FOR BTNS
sortUsersAscBtn.addEventListener('click', (event) => {
  removeBtnActiveStates(sortBtn);
  sortUsersAscBtn.classList.add('active');
  let sortedUserTable = sortUserList(currentUserArr, 'fullName', 'asc');
  generateUserTable(sortedUserTable, '#users-table');
});

sortUsersDescBtn.addEventListener('click', (event) => {
  removeBtnActiveStates(sortBtn);
  sortUsersDescBtn.classList.add('active');
  let sortedUserTable = sortUserList(currentUserArr, 'fullName', 'desc');
  generateUserTable(sortedUserTable, '#users-table');
});

sortUsersAgeAscBtn.addEventListener('click', (event) => {
  removeBtnActiveStates(sortBtn);
  sortUsersAgeAscBtn.classList.add('active');
  let sortedUserTable = sortUserList(currentUserArr, 'info.dob.age', 'asc');
  generateUserTable(sortedUserTable, '#users-table');
});

sortUsersAgeDescBtn.addEventListener('click', (event) => {
  removeBtnActiveStates(sortBtn);
  sortUsersAgeDescBtn.classList.add('active');
  let sortedUserTable = sortUserList(currentUserArr, 'info.dob.age', 'desc');
  generateUserTable(sortedUserTable, '#users-table');
});

searchInput.addEventListener('keyup', (event) => {
  removeBtnActiveStates(sortBtn);
  currentUserArr = searchUser(usersArr, event.target.value);
  generateUserTable(currentUserArr, '#users-table')
});

filterAgeFromInput.addEventListener('input', (event) => {
  removeBtnActiveStates(sortBtn);
  let filteredArr = filterUsersByAge(usersArr, filterAgeFromInput.value, filterAgeToInput.value);
  generateUserTable(filteredArr, '#users-table');
});

filterAgeToInput.addEventListener('input', (event) => {
    removeBtnActiveStates(sortBtn);
    let filteredArr = filterUsersByAge(usersArr, filterAgeFromInput.value, filterAgeToInput.value);
    generateUserTable(filteredArr, '#users-table')
});

filterUsersByGenderMan.addEventListener('input', (event) => {
  genderFilter();
});
filterUsersByGenderWoman.addEventListener('input', (event) => {
  genderFilter();
});


// HELPERS
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getObjectValueFromPath(object, pathString) {
  let path = pathString.split('.'),
      value = object;
  for (let i = 0; i < path.length; i++){
    value = value[path[i]];
  };
  return value;
}

function checkParentTarget(parentElement, eventTarget, elementClass) {
  let target = eventTarget;
  while(target != parentElement) {
    if(target.matches(elementClass)) {
      return target;
    }
    target = target.parentNode;
  }
}

function removeBtnActiveStates(btnsArr) {
 Array.from(btnsArr).forEach((btn) => {
  btn.classList.remove('active');
 })
}


// INIT
getUserList();
