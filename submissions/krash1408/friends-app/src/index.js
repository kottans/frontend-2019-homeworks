const url = 'https://randomuser.me/api/?results=50&inc=gender,name,email,registered,dob,phone,id,picture&nas=us';
const field = document.querySelector('.main-field');
const fieldWrapper = document.createElement('div');
fieldWrapper.classList.add('main-field__wrapper');
fieldWrapper.innerHTML = '';
let usersCurrentArr = [];
let usersSortedArr = [];

function getUsersList() {
  fetch(url)
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
        createCard(element);
        usersCurrentArr.push(element);
        usersSortedArr.push(element);
      })
    })
    .then(function () {
      createFiled( usersCurrentArr );
    })
    .catch(error => console.error(error));
}
//добавляет в массив к каждому обьекту ключ element со значением DOM елемента card
function createCard ( value ) {
  card = document.createElement('div');
  card.classList.add('card');
  cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card__wrapper');

  cardFront = document.createElement('div');
  cardFront.classList.add('card__front');
  cardBack = document.createElement('div');
  cardBack.classList.add('card__back');

  cardPhoto = document.createElement('img');
  cardPhoto.classList.add('card__photo');
  cardPhoto.setAttribute('src', `${value.picture.large}`);
  cardName = document.createElement('p');
  cardName.classList.add('card__name');
  cardName.innerHTML = `Name: ${value.name.first} ${value.name.last}`;
  cardAge = document.createElement('p');
  cardAge.classList.add('card__age');
  cardAge.innerHTML = `Age: ${value.dob.age}`;

  cardBirthDay = document.createElement('p');
  cardBirthDay.classList.add('card__birthday');
  cardBirthDay.innerHTML = `Date of birth:<br>${value.dob.date}`;
  cardEmail = document.createElement('p');
  cardEmail.classList.add('card__email');
  cardEmail.innerHTML = `Email:<br>${value.email}`;
  cardID = document.createElement('p');
  cardID.classList.add('card__id');
  cardID.innerHTML = `Accaunt ID:<br>${value.id.value}`;
  cardPhone = document.createElement('p');
  cardPhone.classList.add('card__phont');
  cardPhone.innerHTML = `Phone number:<br>${value.phone}`;

  card.appendChild(cardWrapper);

  cardWrapper.appendChild(cardFront);
  cardWrapper.appendChild(cardBack);

  cardFront.appendChild(cardPhoto);
  cardFront.appendChild(cardName);
  cardFront.appendChild(cardAge);

  cardBack.appendChild(cardBirthDay);
  cardBack.appendChild(cardEmail);
  cardBack.appendChild(cardID);
  cardBack.appendChild(cardPhone);

  value.element = card;
}

function createFiled ( array ) {
  array.forEach(value => fieldWrapper.appendChild(value.element))
  field.appendChild(fieldWrapper);
}
// сортировщики
let sortByAge = function( a, b ) {
    if ( a.dob.age < b.dob.age ) return -1;
    if ( a.dob.age > b.dob.age) return 1;
    return 0;
}
const sortByName = function ( a, b ) {
  let nameA = a.name.first.toLowerCase(), 
      nameB = b.name.first.toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}
const sortByGenderMale = function  ( array ) {
  let card = document.querySelectorAll('.card');
  array.forEach((value, i) => {
    if ( value.gender !== 'male') {card[i].style.display = 'none'}
    else {card[i].style.display = ''}
  })
}
const sortByGenderFemale = function  ( array ) {
  let card = document.querySelectorAll('.card');
  array.forEach((value, i) => {
    if ( value.gender !== 'female') {card[i].style.display = 'none'}
    else {card[i].style.display = ''}
  })
}

// поиск по имени
function search(  ) {
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
//сортировка по имени и возрасту
document.querySelector('.main-navigation').addEventListener('click', () => {
  const inputNodeList = document.querySelectorAll('.hidden'); 
  const male = document.querySelector('.male');
  const female = document.querySelector('.female');
  const nameAZ = document.querySelector('.name-az');
  const nameZA = document.querySelector('.name-za');
  const ageAZ = document.querySelector('.age-az');
  const ageZA = document.querySelector('.age-za');
  const reset = document.querySelector('#reset');

  switch (event.target) {
    case nameAZ :
      usersCurrentArr.sort(sortByName);
      createFiled( usersCurrentArr );
      break;
    case nameZA :
    usersCurrentArr.sort(sortByName).reverse();
      createFiled( usersCurrentArr );
      break;
    case ageZA :
      usersCurrentArr.sort(sortByAge);
      createFiled( usersCurrentArr );
      break;
    case ageAZ :
      usersCurrentArr.sort(sortByAge).reverse();
      createFiled( usersCurrentArr );
      break;
    case male :
      sortByGenderMale( usersCurrentArr );
      break;
    case female :
        sortByGenderFemale( usersCurrentArr );
        break;
    case reset :
      inputNodeList.forEach(val => val.checked = false);
      document.getElementById('search').value = '';
      document.querySelectorAll('.card').forEach( val => val.style.display = "")
      field.removeChild(fieldWrapper);
      createFiled( usersSortedArr );
      break;
  }
})
document.querySelector('#search').addEventListener('input', () => {
  search( usersCurrentArr );
})

document.querySelectorAll('.card__front').forEach( val => {
  val.addEventListener('click', () => {
    console.log(target);
    console.log(click)
    val.classList.toggle('rotate');
  })
}) 

getUsersList();
