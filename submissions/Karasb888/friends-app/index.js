//Get random users
var allUsers;
var currentUsers;
var genderCurrentUsers;
var searchUsers;
fetch('https://randomuser.me/api/?results=250&inc=gender,name,email,picture,location,dob&noinfo')
  .then(function(response) {
    console.log(response.status); // 200

    return response.json();
  })
  .then(function(users) {
    allUsers = Object.assign(users.results);
    currentUsers = Object.assign(users.results);
    genderCurrentUsers = Object.assign(users.results);
    searchUsers = Object.assign(users.results);
    if(document.readyState === 'complete'){
      appendUsers(allUsers);
    }
  });

//Create container which i will replace (with sorted nodes)
var usersContainer = document.createElement('div');
usersContainer.classList.add('users-list');
usersContainer.setAttribute('id', 'users-container');

//function that create container with new nodes
function appendUsers(users) {
  const CONTAINER = document.getElementById('users');
  let domFragment = document.createDocumentFragment();

  users.forEach(function(item, except) {
    let container = document.createElement('div');
    container.classList.add('users_user', 'user', item.gender);
    let photo = document.createElement('img');
    photo.src = item.picture.large;
    photo.classList.add('user__photo');
    let name = document.createElement('div');
    name.classList.add('user__name');
    name.innerHTML = item.name.first + ' ' + item.name.last;
    let location = document.createElement('div');
    location.classList.add('user__location');
    location.innerHTML = item.location.city;
    let age = document.createElement('div');
    age.classList.add('user__age');
    age.innerHTML = item.dob.age + ' years old';
    let email = document.createElement('div');
    email.classList.add('user__email');
    email.innerHTML = item.email;
    container.appendChild(photo);
    container.appendChild(name);
    container.appendChild(location);
    container.appendChild(age);
    container.appendChild(email);
    domFragment.appendChild(container);
  });

if (usersContainer.innerHTML === '') {
    usersContainer.appendChild(domFragment);
    CONTAINER.appendChild(usersContainer);
} else {
    usersContainer.innerHTML = '';
    usersContainer.appendChild(domFragment);
    let oldUsersContainer = document.getElementById('users-container');
    CONTAINER.replaceChild(usersContainer, oldUsersContainer);
  }
};

document.addEventListener('DOMContentLoaded', function(){
  const MALE_INPUT = document.getElementById('male');
  const FEMALE_INPUT = document.getElementById('female');
  const NAME_AZ_INPUT = document.getElementById('nameAz');
  const NAME_ZA_INPUT = document.getElementById('nameZa');
  const AGE_UP_INPUT = document.getElementById('ageUp');
  const AGE_DOWN_INPUT = document.getElementById('ageDown');
  const SEARCH = document.getElementById('search');
  var inputs = [MALE_INPUT, FEMALE_INPUT, NAME_AZ_INPUT, NAME_ZA_INPUT, AGE_UP_INPUT, AGE_DOWN_INPUT];

  MALE_INPUT.addEventListener('change', function() {
    MALE_INPUT.setAttribute('check', 'check');
    if (FEMALE_INPUT.getAttribute('check') !== null) {
      FEMALE_INPUT.removeAttribute('check');
      genderCurrentUsers = Object.assign(currentUsers);
    }
    genderCurrentUsers = genderCurrentUsers.filter(function(item) {
      return item.gender === 'male';
    });

    appendUsers(genderCurrentUsers);
    SEARCH.value = '';
  });

  FEMALE_INPUT.addEventListener('change', function() {
    FEMALE_INPUT.setAttribute('check', 'check');
    if (MALE_INPUT.getAttribute('check') !== null) {
      MALE_INPUT.removeAttribute('check');
      genderCurrentUsers = Object.assign(currentUsers);
    }
    genderCurrentUsers = genderCurrentUsers.filter(function(item) {
      return item.gender === 'female';
    });
    appendUsers(genderCurrentUsers);
    SEARCH.value = '';
  });

  NAME_AZ_INPUT.addEventListener('change', function() {
    genderCurrentUsers = genderCurrentUsers.sort(function(a, b) {
      let fullNameFirst = a.name.first + a.name.last;
      let fullNameLast = b.name.first + b.name.last;
      return fullNameFirst.localeCompare(fullNameLast);
    });
    appendUsers(genderCurrentUsers);
    SEARCH.value = '';

  });

  NAME_ZA_INPUT.addEventListener('change', function() {
    genderCurrentUsers = genderCurrentUsers.sort(function(a, b) {
      let fullNameFirst = a.name.first + a.name.last;
      let fullNameLast = b.name.first + b.name.last;
      return fullNameLast.localeCompare(fullNameFirst);
    });
    appendUsers(genderCurrentUsers);
    SEARCH.value = '';

  });

  AGE_UP_INPUT.addEventListener('change', function() {
    genderCurrentUsers = genderCurrentUsers.sort(function(a, b) {
      return a.dob.age - b.dob.age;
    });
    appendUsers(genderCurrentUsers);
    SEARCH.value = '';
  });

  AGE_DOWN_INPUT.addEventListener('change', function() {
    genderCurrentUsers = genderCurrentUsers.sort(function(a, b) {
      return b.dob.age - a.dob.age;
    });
    appendUsers(genderCurrentUsers);
    SEARCH.value = '';
  });

  SEARCH.addEventListener('focus', function() {
    document.addEventListener('keyup', function() {
      searchUsers = Object.assign(genderCurrentUsers);
      searchUsers = searchUsers.filter(function(item) {

        let searchWord = SEARCH.value;
        let serachWithoutSpaces = searchWord.replace(/\s+/g, '');
        let fullName = item.name.first + item.name.last;
        return comparingStrings(serachWithoutSpaces, fullName);
      });
      appendUsers(searchUsers);

    });
  });
});
function comparingStrings(substring, string) {
  let sub = substring;
  if (sub === '') {
    return true;
  }
  let lenghtSub = sub.length;
  let stringCompare = string.substr(0, lenghtSub);
  if (sub.toLowerCase() === stringCompare.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};
