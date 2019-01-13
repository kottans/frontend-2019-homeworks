'use strict';

const API_URL = 'https://randomuser.me/api/?results=200',
      ASC = 'asc',
      DESC = 'desc',
      FEMALE = 'female',
      MALE = 'male',
      ALL_GENDERS = 'all',
      container = document.getElementById('users-table'),
      searchInput = document.getElementById('search'),
      filterAgeFromInput = document.getElementById('filter-user-age-from'),
      filterAgeToInput = document.getElementById('filter-user-age-to');

let usersArr = [],
    currentUserArr = [],
    userModal = document.getElementById('user-info-modal'),
    modalOverflow = document.querySelector('.modal-overflow'),
    sortBtn = document.getElementById('sorting').getElementsByClassName('btn'),
    sortUsersByNameAscBtn = document.getElementById('sort-users-asc'),
    sortUsersByNameDescBtn = document.getElementById('sort-users-desc'),
    sortUsersByAgeAscBtn = document.getElementById('sort-users-age-asc'),
    sortUsersByAgeDescBtn = document.getElementById('sort-users-age-desc'),
    filterUsersByGenderMan = document.getElementById('filter-gender-man'),
    filterUsersByGenderWoman = document.getElementById('filter-gender-woman'),
    genderFilterParam = ALL_GENDERS,
    ageFilterParam = {from: 0, to: 150},
    nameSortParam = false,
    ageSortParam = false,
    searchKey = '';

function getUserList() {
  fetch(API_URL)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
     })
    .then(function(users) {
      document.getElementById('users-table').classList.remove('loading');
      users.results.forEach((user, i) => {
        let userElem = new User(user, i);
        userElem.generateElement();
        usersArr.push(userElem);
      });
      generateUserTable(usersArr);
      currentUserArr = usersArr;
    })
    .catch(function(error) {
        console.log(error);
    });
}

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
  user.classList.add('user', `user--${this.info.gender}`);
  user.setAttribute('id', this.id);
  userImage.classList.add('user__image');
  userInfo.classList.add('user__info');
  userName.classList.add('user__name');
  userAge.classList.add('user__age');
  userImage.style.backgroundImage = `url(${this.info.picture.large})`;
  userName.innerHTML = this.fullName;
  userAge.innerHTML = this.info.dob.age;
  userInfo.append(userName, userAge);
  user.append(userImage, userInfo);
  this.htmlElement = user;
}

function generateUserTable(users) {
  container.innerHTML = '';
  let userWrapperElement = document.createElement('div');
  userWrapperElement.classList.add('wrapper');
  users.forEach((user) => {
    userWrapperElement.appendChild(user.htmlElement);
  });
  container.appendChild(userWrapperElement);
  container.addEventListener('click', function(event) {
    let target = event.target.closest('.user');
    if(target) {
      userModal.classList.add('open');
      generateModalInfo(target.id, userModal);
    }
  });
}

function generateModalInfo(userId, modal) {
  let user = usersArr.find((userObj) => {
    return userObj.id == userId;
  }).info;
  setInfoToModal(user, modal);
  generateModalInfoRows(user);
}

function setInfoToModal(user, modal) {
  modal.querySelector('.modal__header').innerHTML = `${user.name.first} ${user.name.last}`;
  modal.querySelector('.modal__image').style.backgroundImage = `url(${user.picture.large})`;
  modal.querySelector('.modal__action--location').href =
    `https://maps.google.com/?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`;
  modal.querySelector('.modal__action--email').href = `mailto:${user.email}`;
  modal.querySelector('.modal__action--phone').href = `tel:${user.phone}`;
}

function generateModalInfoRows(user) {
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
    title.innerHTML = Object.entries(userInfo)[0][0];
    value.innerHTML = Object.entries(userInfo)[0][1];
    row.append(title, value);
    infoWrapper.appendChild(row);
  });
  modalBodyElement.innerHTML = '';
  modalBodyElement.appendChild(infoWrapper);
}

modalOverflow.addEventListener('click', ({target}) => {
  target.closest('.modal-wrapper').classList.remove('open');
});

function searchUser(userList, keyword) {
  return userList.filter((user) => {
    return user.info.name.first.toLowerCase().match(keyword.toLowerCase())
    || user.info.name.last.toLowerCase().match(keyword.toLowerCase());
  })
}

function filterUsersByGender(usersList, genderFilterParam) {
  if (genderFilterParam != ALL_GENDERS) {
    return usersList.filter((user) => {
      return user.info.gender == genderFilterParam;
    });
  }
  else {
    return usersList;
  }
}

function filterUsersByAge(usersList, ageFilterParam) {
  return usersList.filter((user) => {
    return user.info.dob.age >= ageFilterParam.from && 
           user.info.dob.age <= ageFilterParam.to;
  })
}

function sortUsersByName(usersList, nameSortParam) {
  return usersList.sort((user1, user2) => {
    if (user1.fullName > user2.fullName) {
      return (nameSortParam == ASC) ? 1 : -1;
    }
    if (user1.fullName < user2.fullName) {
      return (nameSortParam == ASC) ? -1 : 1;
    }
  });
}

function sortUsersByAge(usersList, ageSortParam) {
  return usersList.sort((user1, user2) => {
    if (user1.info.dob.age > user2.info.dob.age) {
      return (ageSortParam == ASC) ? 1 : -1;
    }
    if (user1.info.dob.age < user2.info.dob.age) {
      return (ageSortParam == ASC) ? -1 : 1;
    }
  });
}

sortUsersByNameAscBtn.addEventListener('click', () => {
  if (nameSortParam == ASC) {
    removeBtnActiveStates(sortBtn);
    nameSortParam = false;
  }
  else {
    nameSortParam = ASC;
    removeBtnActiveStates(sortBtn);
    sortUsersByNameAscBtn.classList.add('active');
  }
  allFilters();
});

sortUsersByNameDescBtn.addEventListener('click', () => {
  if (nameSortParam == DESC) {
    removeBtnActiveStates(sortBtn);
    nameSortParam = false;
  }
  else {
    nameSortParam = DESC;
    removeBtnActiveStates(sortBtn);
    sortUsersByNameDescBtn.classList.add('active');
  }
  allFilters();
});

sortUsersByAgeAscBtn.addEventListener('click', () => {
  if (ageSortParam == ASC) {
    removeBtnActiveStates(sortBtn);
    ageSortParam = false;
  }
  else {
    ageSortParam = ASC;
    removeBtnActiveStates(sortBtn);
    sortUsersByAgeAscBtn.classList.add('active');
  }
  allFilters();
});

sortUsersByAgeDescBtn.addEventListener('click', () => {
  if (ageSortParam == DESC) {
    removeBtnActiveStates(sortBtn);
    ageSortParam = false;
  }
  else {
    ageSortParam = DESC;
    removeBtnActiveStates(sortBtn);
    sortUsersByAgeDescBtn.classList.add('active');
  }
  allFilters();
});

searchInput.addEventListener('keyup', ({target}) => {
  searchKey = target.value;
  allFilters();
});

filterAgeFromInput.addEventListener('input', ({target}) => {
  ageFilterParam.from = +target.value;
  allFilters();
});

filterAgeToInput.addEventListener('input', ({target}) => {
  ageFilterParam.to = +target.value;
  allFilters();
});

filterUsersByGenderMan.addEventListener('input', () => {
  const womanCheckboxChecked = filterUsersByGenderWoman.checked;
  if (genderFilterParam == FEMALE) {
    genderFilterParam = ALL_GENDERS;
  }
  else if (genderFilterParam == ALL_GENDERS && !womanCheckboxChecked) {
    genderFilterParam = MALE;
  }
  else if (womanCheckboxChecked) {
    genderFilterParam = FEMALE;
  }
  else {
    genderFilterParam = ALL_GENDERS;
  }
  allFilters();
});

filterUsersByGenderWoman.addEventListener('input', (event) => {
  const manCheckboxChecked = filterUsersByGenderMan.checked;
  if (genderFilterParam == MALE) {
    genderFilterParam = ALL_GENDERS;
  }
  else if (genderFilterParam == ALL_GENDERS && !manCheckboxChecked) {
    genderFilterParam = FEMALE;
  }
  else if (manCheckboxChecked) {
    genderFilterParam = MALE;
  }
  else {
    genderFilterParam = ALL_GENDERS;
  }
  allFilters();
});

function removeBtnActiveStates(btnsArr) {
 Array.from(btnsArr).forEach((btn) => {
  btn.classList.remove('active');
 });
}

function allFilters() {
  let currentUserArr = usersArr;
  currentUserArr = filterUsersByGender(currentUserArr, genderFilterParam);
  currentUserArr = filterUsersByAge(currentUserArr, ageFilterParam);
  if (nameSortParam) {
    currentUserArr = sortUsersByName(currentUserArr, nameSortParam);
  }
  if (ageSortParam) {
    currentUserArr = sortUsersByAge(currentUserArr, ageSortParam);
  }
  if(searchKey) {
    currentUserArr = searchUser(currentUserArr, searchKey);
  }
  generateUserTable(currentUserArr);
}

// INIT
getUserList();
