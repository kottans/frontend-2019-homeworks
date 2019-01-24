const config = {
  main: document.querySelector('main'),
  sortBtn: document.getElementById('sort_btn'),
  header: document.querySelector('header'),
  searchField: document.getElementById('search'),
  select: document.getElementById('input-sort'),
  filterBtns: document.querySelectorAll('.btn_filter'),
  filtersContainer: document.querySelector('.wrapper.filter_collection')
};

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

fetch('https://randomuser.me/api/?results=60&nat=us')
    .then(handleErrors)
    .then(response => response.json())
    .then(response => controller(response.results))
    .catch(error => console.log(error));

function controller(srcArr) {

  let list = srcArr;
  let inputStr = "";

  function searchByName() {
    inputStr = config.searchField.value.toLowerCase();
    list = srcArr.filter(e => e.name.last.includes(inputStr) || e.name.first.includes(inputStr));
    renderHTML(list);
  }

  function filterByGender(ev) {
    makeActive(ev.target, config.filterBtns);
    switch (ev.target.value) {
      case 'male':
        list = srcArr.filter(e => e.gender === 'male');
        break;
      case 'female':
        list = srcArr.filter(e => e.gender === 'female');
        break;
      case 'all':
        list = srcArr.filter(e => e.gender);
    }
    renderHTML(list);
  }

  function makeActive(target, elements) {
    elements.forEach(elem => elem.classList.remove('active'));
    target.classList.add('active');
  }

  function sortByAgeDesc() {
    list.sort((a, b) => b.dob.age - a.dob.age);
    renderHTML(list);
  }

  function sortByAgeAsc() {
    list.sort((a, b) =>  a.dob.age - b.dob.age);
    renderHTML(list);
  }

  function sortByNameAz() {
    list.sort((a, b) => {
      return a.name.first > b.name.first ? 1 : -1;
    })
    renderHTML(list);
  }

  function sortByNameZa() {
    list.sort((a, b) => {
      return a.name.first < b.name.first ? 1 : -1;
    })
    renderHTML(list);
  }

  config.filtersContainer.addEventListener('click', filterByGender);

  config.searchField.addEventListener('input', searchByName);

  config.select.addEventListener('change', ({target}) => {
    switch (target.value) {
      case 'ASC':
        sortByAgeAsc();
        break;
      case 'DESC':
        sortByAgeDesc();
        break;
      case 'ZA':
        sortByNameZa();
        break;
      case 'AZ':
        sortByNameAz();
    }
  });

  renderHTML(list);
};

function renderHTML(usersArray) {
  config.main.innerHTML = '';

  usersArray.forEach(user => {
    config.main.insertAdjacentHTML('beforeend',
    `
    <div class="usr_card">
      <img class="user_img" src="${user.picture.large}">
      <p class="usr_name">${user.name.first} ${user.name.last}</p>
      <span class="label">Age: ${user.dob.age}</span>
      <span class="location">
        <i class="fa fa-home"></i> ${user.location.state}: ${user.location.city}
      </span>
    </div>
    `);
  })
};

config.sortBtn.addEventListener('click', () => config.header.classList.toggle('open'));
