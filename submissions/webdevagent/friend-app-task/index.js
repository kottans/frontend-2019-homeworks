const friendsContainer = document.querySelector('.friends');
const hideButton = document.querySelector('.hide');
const openButton = document.querySelector('.open');
const letterSortBlock = document.querySelector('.abc');
const genderSortBlock = document.querySelector('.gender');
const navigation = document.querySelector('.navigation')
const ageSortBlock = document.querySelector('.age');
const reset = document.querySelector('.reset');
const navBar = document.querySelector('.nav-bar');
const Users = Array(40).fill(0);
let arrayOfAddFriends = [];
let resetArray;
const nameSearch = document.querySelector('.myInput');
const FRIENDS_API_URL = "https://randomuser.me/api/?results=40";
const getFriendsData = fetch(FRIENDS_API_URL);

getFriendsData.then(response => response.json())
  .then(data => {
    fillUsers(data.results);
    resetArray = Users.slice();
  });

  friendsContainer.addEventListener('click', flipCard);
  nameSearch.addEventListener('keyup', inputSearch);
  letterSortBlock.addEventListener('click',sortListDir);
  ageSortBlock.addEventListener('click', ({target}) => {
    if (target.className == 'full-age') Users.sort(ageSortMG);
    else {
      Users.sort(ageSortGM);
    }
    renderNewFlist(Users);
  });
  genderSortBlock.addEventListener('click', ({target}) => {
    let sortedArray;
    if (target.className == 'male') sortedArray = Users.filter(num => num.gender == 'male');
    else if (target.className == 'female') sortedArray = Users.filter(num => num.gender == 'female');
    else sortedArray = Users;
    renderNewFlist(sortedArray);
  });

  reset.addEventListener('click', ({target}) => {
    if (target.tagName != 'div')
    renderNewFlist(resetArray);
  });

  hideButton.addEventListener('click', ({target}) => {
    openButton.classList.remove('remove-card');
    navigation.classList.add('remove-card');
    openButton.classList.add('forOpen');
  });
  openButton.addEventListener('click', ({target}) => {
    openButton.classList.add('remove-card');
    navigation.classList.remove('remove-card');
    openButton.classList.remove('forOpen');
  });

  navBar.addEventListener('click', ({target}) => {
    function classChanger(friends){
      document.querySelector('.home-information').classList.remove('show-block');
      if(friends=='home')document.querySelector('.home-information').classList.add('show-block');
      else document.querySelector('.home-information').classList.add('remove-block');
    }
    if (target.className == 'request') {
      renderNewFlist(arrayOfAddFriends);
      classChanger();
    }
    if (target.className == 'people') {
      renderNewFlist(resetArray);
      classChanger();
    }
    if (target.className == 'home') {
      renderNewFlist();
      classChanger('home');
    }
  });

function createCard(element, className, parrent) {
  let card = document.createElement(element);
  if (className != '') card.classList.add(className);
  parrent.appendChild(card);
  return card;
};

function makeProfileCard(person) {
  let flipBox = createCard('div', 'flip-box', friendsContainer);
  let flipBoxInner = createCard('div', 'flip-box-inner', flipBox);
  let flipBoxFront = createCard('div', 'flip-box-front', flipBoxInner);
  let flipBoxBack = createCard('div', 'flip-box-back', flipBoxInner);
  let picture = createCard('img', '', flipBoxFront);
  let nameFront = createCard('p', 'name', flipBoxFront);
  let addFriend = createCard('p', 'add-friend', flipBoxFront);
  let nameBack = createCard('p', '', flipBoxBack);
  let age = createCard('p', '', flipBoxBack);
  let email = createCard('p', '', flipBoxBack);
  addFriend.textContent = 'connect';
  picture.src = person.picture.large;
  flipBox.personName = `${person.name.first}`;
  flipBox.personAge = +`${person.dob.age}`;
  nameFront.textContent = `${person.name.first} ${person.name.last}`;
  nameBack.textContent = `Name: ${person.name.first} ${person.name.last}`;
  age.textContent = `Age: ${person.dob.age}`;
  email.textContent = `Email: ${person.email}`;
  flipBox.gender = person.gender;
  return flipBox;
};

function fillUsers(userData) {
  Users.forEach((num, i) => {
    Users[i] = makeProfileCard(userData[i]);
    Users[i].dataset.order = i;
    ['.flip-box-inner','.flip-box-front','.flip-box-back','img'].forEach(num=>Users[i].querySelector(num).dataset.order = i);
    Users[i].querySelectorAll('p').forEach(num => num.dataset.order = i);
  })
};

function flipCard({target}) {
  let innerCard=friendsContainer.querySelector(`.flip-box-inner[data-order='${target.dataset.order}']`);
  let boxCard=friendsContainer.querySelector(`.flip-box[data-order='${target.dataset.order}']`);
  if (target.className != 'friends' && target.className != 'add-friend') {
    innerCard.classList.toggle('clicked');
  }
  if (target.className == 'add-friend' && target.textContent != 'sent') {
    ('sent');
    arrayOfAddFriends.push(boxCard);
    target.textContent = 'sent';
  }
};

function inputSearch({target}) {
  let value = target.value.toUpperCase();
  let names = friendsContainer.querySelectorAll('.name');
  names.forEach(num => {
    if (num.textContent.toUpperCase().indexOf(value) > -1) {
      friendsContainer.querySelector(`.flip-box[data-order='${num.dataset.order}']`).classList.remove('remove-card');
    } else {
      friendsContainer.querySelector(`.flip-box[data-order='${num.dataset.order}']`).classList.add('remove-card');
    }
  })
};

function sortListDir({target}) {
  let list, count, switching, mainCard, shouldSwitch;
  list = friendsContainer;
  switching = true;
  while (switching) {
    switching = false;
    mainCard = friendsContainer.getElementsByClassName("flip-box");
    for (count = 0; count < (mainCard.length - 1); count++) {
      shouldSwitch = false;
      if (mainCard[count].personName.toLowerCase() > mainCard[count + 1].personName.toLowerCase()&&target.className=='a-z') {
        shouldSwitch = true;
        break;
      }
      if (mainCard[count].personName.toLowerCase() < mainCard[count + 1].personName.toLowerCase()&&target.className=='z-a') {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      ('hello');
      mainCard[count].parentNode.insertBefore(mainCard[count + 1], mainCard[count]);
      switching = true;
    }
  }
};

function ageSortMG(a, b) {
  return a.personAge - b.personAge;
};

function ageSortGM(a, b) {
  return b.personAge - a.personAge;
};

function renderNewFlist(pushArray){
  while (friendsContainer.firstChild) {
    friendsContainer.removeChild(friendsContainer.firstChild);
  }
  if(pushArray!=undefined)pushArray.forEach(num => friendsContainer.appendChild(num));
};
