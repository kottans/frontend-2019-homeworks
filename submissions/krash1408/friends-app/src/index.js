const URL = 'https://randomuser.me/api/?results=50&inc=gender,name,email,registered,dob,phone,id,picture&nas=us',
      FIELD = document.querySelector('.main-field');
let FIELDWRAPPER = document.createElement('div');
FIELDWRAPPER.classList.add('main-field__wrapper');
FIELDWRAPPER.innerHTML = '';
let usersCurrentArr = [],
    usersSortedArr = [],
    genderSortedArray = [];
const restoreSortedArray = function () {
  usersSortedArr = [];
  usersCurrentArr.forEach( val => {
    usersSortedArr.push(val);
  })
  
}
const request = function() {
  fetch(URL)
    .then(function ifError(response) {
      if (response.ok) {
        return response.json();
      }
      else {
        throw Error(response.statusText);
      }
    })
    .then(function (data) {
      data.results.forEach(element => {
        let card = new createCard(element);
        usersCurrentArr.push(card);
        usersSortedArr.push(card);
      })
    })
    .then(function () {
      createField( usersCurrentArr );
    })
}
class createCard {
  constructor(value) {
    this.value = value;
    const card = document.createElement('div');
    card.classList.add('card');
    card.appendChild(this.Wrapper());
    this.element = card;
  }
  Wrapper() {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card__wrapper');

    cardWrapper.appendChild(this.Front());
    cardWrapper.appendChild(this.Back());

    return cardWrapper;
  }
  Front() {
    const cardFront = document.createElement('div');
    cardFront.classList.add('card__front');
    const cardPhoto = document.createElement('img');
    cardPhoto.classList.add('card__photo');
    cardPhoto.setAttribute('src', `${this.value.picture.large}`);
    const cardName = document.createElement('p');
    cardName.classList.add('card__name');
    cardName.innerHTML = `Name: ${this.value.name.first} ${this.value.name.last}`;
    const cardAge = document.createElement('p');
    cardAge.classList.add('card__age');
    cardAge.innerHTML = `Age: ${this.value.dob.age}`;
    cardFront.append(cardPhoto, cardName, cardAge);

    return cardFront;
  }
  Back() {
    const cardBack = document.createElement('div');
    cardBack.classList.add('card__back');
    const cardBirthDay = document.createElement('p');
    cardBirthDay.classList.add('card__birthday');
    cardBirthDay.innerHTML = `Date of birth:<br>${this.value.dob.date}`;
    const cardEmail = document.createElement('p');
    cardEmail.classList.add('card__email');
    cardEmail.innerHTML = `Email:<br>${this.value.email}`;
    const cardID = document.createElement('p');
    cardID.classList.add('card__id');
    cardID.innerHTML = `Accaunt ID:<br>${this.value.id.value}`;
    const cardPhone = document.createElement('p');
    cardPhone.classList.add('card__phont');
    cardPhone.innerHTML = `Phone number:<br>${this.value.phone}`;
    cardBack.append(cardBirthDay, cardEmail, cardID, cardPhone);

    return cardBack;
  }
}
const createField = function( array ) {
  const removeField = function(  ) {
    document.querySelectorAll('.card').forEach(() => FIELDWRAPPER.removeChild(FIELDWRAPPER.firstElementChild))
}
  removeField();
  array.forEach(value => FIELDWRAPPER.append(value.element))
  FIELD.append(FIELDWRAPPER);
}
const sortByAge = function( a, b ) {
    if ( a.value.dob.age < b.value.dob.age ) return -1;
    if ( a.value.dob.age > b.value.dob.age) return 1;
    return 0;
}
const sortByName = function ( a, b ) {
  let nameA = a.value.name.first.toLowerCase(), 
      nameB = b.value.name.first.toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}
const sortByGender = function(gender) {
  usersSortedArr = [];
  usersCurrentArr.forEach(val => {
    if (val.value.gender == gender) {usersSortedArr.push(val)}
  })
}
const search = function() {
  let names = document.getElementsByClassName('card__name');
  const search = document.querySelector('#search');
  const filter = search.value.toUpperCase();

  for (i = 0; i < names.length; i++) {
    txtValue = names[i].textContent || names[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      document.querySelectorAll('.card')[i].style.display = "";
    } else {
      document.querySelectorAll('.card')[i].style.display = "none";
    }
  }

}
document.querySelector('.main-navigation').addEventListener('click', () => {
  const inputNodeList = document.querySelectorAll('.hidden'); 
  const male = document.querySelector('.male'),
        female = document.querySelector('.female'),
        nameAZ = document.querySelector('.name-az'),
        nameZA = document.querySelector('.name-za'),
        ageAZ = document.querySelector('.age-az'),
        ageZA = document.querySelector('.age-za'),
        reset = document.querySelector('#reset');
  switch (event.target) {
    case nameAZ :
      createField( usersSortedArr.sort(sortByName) );
      break;
    case nameZA :
      createField( usersSortedArr.sort(sortByName).reverse() );
      break;
    case ageZA :
      createField( usersSortedArr.sort(sortByAge) );
      break;
    case ageAZ :
      createField( usersSortedArr.sort(sortByAge).reverse() );
      break;
    case male :
      sortByGender('male');
      createField( usersSortedArr );
      break;
    case female :
      sortByGender('female');
      createField( usersSortedArr );
      break;
    case reset :
      inputNodeList.forEach(val => val.checked = false);
      document.getElementById('search').value = '';
      document.querySelectorAll('.card').forEach( val => val.style.display = "")
      FIELD.removeChild(FIELDWRAPPER);
      createField( usersCurrentArr );
      restoreSortedArray();
      break;
  }
})
document.querySelector('#search').addEventListener('input', () => {
  search( usersCurrentArr );
})
request();
