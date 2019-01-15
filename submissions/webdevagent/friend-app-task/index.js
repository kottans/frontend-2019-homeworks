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
let dataContainer;
let arrayOfAddFriends = [];
let saveArray = Array(40).fill(0);
let reserArray;
const nameSearch = document.querySelector('.myInput');
const FRIENDS_API_URL = "https://randomuser.me/api/?results=40";
const getFriendsData = fetch(FRIENDS_API_URL);
let allFriendsCards;

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
    allFriendsCards = document.querySelectorAll('.flip-box');
  })
}

getFriendsData.then(response => response.json())
  .then(data => {
    dataContainer = data.results;
    fillUsers(data.results);
    reserArray = Users.slice();
  });

friendsContainer.addEventListener('click', flipCard);
nameSearch.addEventListener('keyup', inputSearch);

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
}

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
}

letterSortBlock.addEventListener('click',sortListDir);

function sortListDir({target}) {
  var list, i, switching, b, shouldSwitch;
  list = friendsContainer;
  switching = true;
  while (switching) {
    switching = false;
    b = friendsContainer.getElementsByClassName("flip-box");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].personName.toLowerCase() > b[i + 1].personName.toLowerCase()&&target.className=='a-z') {
        shouldSwitch = true;
        break;
      }
      if (b[i].personName.toLowerCase() < b[i + 1].personName.toLowerCase()&&target.className=='z-a') {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      ('hello');
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

ageSortBlock.addEventListener('click', (el) => {
  if (el.target.className == 'full-age') Users.sort(ageSortMG);
  else {
    Users.sort(ageSortGM);
  }
  renderNewFlist(Users);
});

function ageSortMG(a, b) {
  return a.personAge - b.personAge;
}

function ageSortGM(a, b) {
  return b.personAge - a.personAge;
}
//genderSorting
genderSortBlock.addEventListener('click', ({target}) => {
  let sortedArray;
  if (target.className == 'male') sortedArray = Users.filter(num => num.gender == 'male');
  else if (target.className == 'female') sortedArray = Users.filter(num => num.gender == 'female');
  else sortedArray = Users;
  renderNewFlist(sortedArray);
})

reset.addEventListener('click', ({target}) => {
  if (target.tagName != 'div')
  renderNewFlist(reserArray);
})

hideButton.addEventListener('click', ({target}) => {
  openButton.classList.remove('remove-card');
  document.querySelector('.navigation').classList.add('remove-card');
  openButton.classList.add('forOpen');
});
openButton.addEventListener('click', ({target}) => {
  openButton.classList.add('remove-card');
  navigation.classList.remove('remove-card');
  openButton.classList.remove('forOpen');
});

navBar.addEventListener('click', ({target}) => {
  if (target.className == 'request') {
    renderNewFlist(arrayOfAddFriends);
    document.querySelector('.home-information').classList.remove('show-block');
    document.querySelector('.home-information').classList.add('remove-card');
  }
  if (target.className == 'people') {
    renderNewFlist(reserArray);
    document.querySelector('.home-information').classList.remove('show-block');
    document.querySelector('.home-information').classList.add('remove-card');
  }
  if (target.className == 'home') {
    renderNewFlist();
    document.querySelector('.home-information').classList.add('show-block');
  }
})

function renderNewFlist(pushArray){
  while (friendsContainer.firstChild) {
    friendsContainer.removeChild(friendsContainer.firstChild);
  }
  if(pushArray!=undefined)pushArray.forEach(num => friendsContainer.appendChild(num));
}
