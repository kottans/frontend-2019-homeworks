document.addEventListener('DOMContentLoaded', function() {
  var allUsers;
  const CAT = document.getElementById('waiting-car');
  const MALE_INPUT = document.getElementById('male');
  const FEMALE_INPUT = document.getElementById('female');
  const NAME_AZ_INPUT = document.getElementById('nameAz');
  const NAME_ZA_INPUT = document.getElementById('nameZa');
  const AGE_UP_INPUT = document.getElementById('ageUp');
  const AGE_DOWN_INPUT = document.getElementById('ageDown');
  const SEARCH = document.getElementById('search');

  var usersContainer = document.createElement('div');
  usersContainer.classList.add('users-list');
  usersContainer.setAttribute('id', 'users-container');

  fetch('https://randomuser.me/api/?results=120&inc=gender,name,email,picture,location,dob&noinfo')
    .then(function(response) {
      return response.json();
    })
    .then(function(users) {
      allUsers = users.results;
      unloackButtons();
      appendUsers(allUsers);
    });

  MALE_INPUT.addEventListener('change', function() {
    sortingUsers();
  });

  FEMALE_INPUT.addEventListener('change', function() {
    sortingUsers();
  });

  NAME_AZ_INPUT.addEventListener('change', function() {
    sortingUsers();
  });

  NAME_ZA_INPUT.addEventListener('change', function() {
    sortingUsers();
  });

  AGE_DOWN_INPUT.addEventListener('change', function() {
    sortingUsers();
  });

  AGE_UP_INPUT.addEventListener('change', function() {
    sortingUsers();
  });

  SEARCH.addEventListener('focus', function() {
    document.addEventListener('keyup', function() {
      sortingUsers();
    });
  });

  function unloackButtons() {
    CAT.remove();
    let inputs = [MALE_INPUT, FEMALE_INPUT, NAME_AZ_INPUT, NAME_ZA_INPUT, AGE_UP_INPUT, AGE_DOWN_INPUT, SEARCH];
    inputs.forEach(function(item) {
      item.removeAttribute('disabled');
    });
  };

  function sortingUsers() {
    let sortedUsers = allUsers;
    if (MALE_INPUT.checked) {
      sortedUsers = allUsers.filter(function(item) {
        return item.gender === 'male';
      });
    }
    if (FEMALE_INPUT.checked) {
      sortedUsers = allUsers.filter(function(item) {
        return item.gender === 'female';
      });
    }
    if (NAME_AZ_INPUT.checked) {
      sortedUsers.sort(function(a, b) {
        let fullNameFirst = a.name.first + a.name.last;
        let fullNameLast = b.name.first + b.name.last;
        return fullNameFirst.localeCompare(fullNameLast);
      });
    }
    if (NAME_ZA_INPUT.checked) {
      sortedUsers.sort(function(a, b) {
        let fullNameFirst = a.name.first + a.name.last;
        let fullNameLast = b.name.first + b.name.last;
        return fullNameLast.localeCompare(fullNameFirst);
      });
    }

    if (AGE_UP_INPUT.checked) {
      sortedUsers.sort(function(a, b) {
        return b.dob.age - a.dob.age;
      });
    }

    if (AGE_DOWN_INPUT.checked) {
      sortedUsers.sort(function(a, b) {
        return a.dob.age - b.dob.age;
      });
    }

    sortedUsers = sortedUsers.filter(function(item) {
      let searchWord = SEARCH.value;
      let searchWithoutSpaces = searchWord.replace(/\s+/g, '');
      let fullName = item.name.first + item.name.last;
      fullName = fullName.toLowerCase();
      searchWithoutSpaces = searchWithoutSpaces.toLowerCase();
      return fullName.includes(searchWithoutSpaces);
    });
    appendUsers(sortedUsers);
  };

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

      [photo, name, location, age, email].forEach(function(item) {
        container.appendChild(item);
      })
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
});
