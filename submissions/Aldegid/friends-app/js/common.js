const content = document.querySelector('.users');
const searchField = document.querySelector('.search__input');
const genderNode = document.querySelector('.filter__gender');
const ageNode = document.querySelector('.filter__age');
const nameNode = document.querySelector('.filter__name');
const checkAll = document.querySelector('.all');
const filterAsc = document.querySelector('.age-asc');
const filterDesc = document.querySelector('.age-desc');
const filterAz = document.querySelector('.name-asc');
const filterZa = document.querySelector('.name-desc');
const resetBtn = document.querySelector('.filter__reset');
const scrollBtn = document.querySelector('.button__scroll');
const filterForm = document.querySelector('.filter__form');
const radioButtons = document.querySelectorAll('input[type = radio]');
const scrollHeight = 300;
let originData = [];

fetch('https://randomuser.me/api/?results=30')
  .then((res) => res.json())
  .then(data => {
    originData = data.results;
    totalData = originData.slice();
    renderUsers(originData);
  })
  .catch(function (err) {
    console.error(err);
  });

function asc(a, b) {
  if (a < b) {
    return -1;
  } else {
    return 1
  }
}
function desc(a, b) {
  if (a < b) {
    return 1;
  } else {
    return -1
  }
}

const createUsers = user => {
  let fragment = document.createDocumentFragment();
  let div = document.createElement('div');
  div.classList.add('user');
  let userContent = ` <p class = "user__gender"> ${user.gender}  |  ${user.dob.age} y.o.</p>
                      <img src="${user.picture.large}" alt="${user.name.first}">
                      <p class = "user__name">${user.name.first} ${user.name.last}</p>
                      <p class = "user__phone"><i class="fa fa-phone"></i>${user.phone}</p>
                      <p class = "user__email"><i class="fa fa-envelope"></i>${user.email}</p>`
  div.innerHTML = userContent;
  fragment.append(div);
  return fragment;
}
function renderUsers(data) {
  content.innerHTML = '';
  let users = data.map(createUsers);
  content.append(...users);
}
const searchFilter = (input, data) => {
  content.innerHTML = '';
  const inpValue = input.value;
  let newData = data.filter(user => {
    const fullName = user.name.first + user.name.last;
    return fullName.includes(inpValue);
  })
  return newData;
}
const filterByMale = data => {
  let newData = data.filter(user => user.gender === 'male');
  return newData;
}
const filterByFemale = data => {
  let newData = data.filter(user => user.gender === 'female');
  return newData;
}
const showAll = data => {
  let newData = data;
  return newData;
}
const sortByNameDesc = data => {
  let newData = data.sort((a, b) => desc(a.name.first, b.name.first));
  return newData;
}
const sortByNameAsc = data => {
  let newData = data.sort((a, b) => asc(a.name.first, b.name.first));
  return newData;
}
const sortByAgeDesc = (data) => {
  let newData = data.sort((a, b) => desc(a.dob.age, b.dob.age));
  return newData;
}
const sortByAgeAsc = (data) => {
  let newData = data.sort((a, b) => asc(a.dob.age, b.dob.age));
  return newData;
}

const handleChange = ({ target }) => {
  let friendsToProcess = originData.slice();
  const form = target.closest('form');
  const getCheckedInput = elem => Array.from(form.elements[elem]).find(input => input.checked);
  const inputAge = getCheckedInput('age-sort');
  const inputName = getCheckedInput('name-sort');
  const inputGender = getCheckedInput('gender');
  const inputSearch = form.elements['search'];

  let sortByAge;
  let sortByName;
  let filterByGender;

  if (inputSearch === target) {
    friendsToProcess = searchFilter(target, friendsToProcess);
  }
  if (inputAge === target) {
    sortByAge = inputAge.value === 'age-asc'
      ? sortByAgeAsc
      : sortByAgeDesc;
    friendsToProcess = sortByAge(friendsToProcess);
  }
  if (inputName === target) {
    sortByName = inputName.value === 'name-asc'
      ? sortByNameAsc
      : sortByNameDesc;
    friendsToProcess = sortByName(friendsToProcess);
  }
  if (inputGender) {
    if (inputGender.value === 'male') {
      filterByGender = filterByMale;
    }
    if (inputGender.value === 'female') {
      filterByGender = filterByFemale;
    }
    if (inputGender.value === 'all') {
      filterByGender = showAll;
    }
    friendsToProcess = filterByGender(friendsToProcess);
  }
  renderUsers(friendsToProcess);
}
searchField.addEventListener('input', handleChange);
filterForm.addEventListener('change', handleChange);

resetBtn.addEventListener('click', () => {
  content.innerHTML = '';
  searchField.value = '';
  radioButtons.forEach(item => {
    item.checked = !item.checked;
  })
  renderUsers(originData);
});

function scroll() {
  const bodyScrollTop = document.body.scrollTop;
  const elemScrollTop = document.documentElement.scrollTop
  if (bodyScrollTop > scrollHeight || elemScrollTop > scrollHeight) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
}
window.addEventListener('scroll', function () {
  scroll()
});
scrollBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})
