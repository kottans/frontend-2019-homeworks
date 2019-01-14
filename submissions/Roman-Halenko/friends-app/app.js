const main = document.querySelector('main');

const sortBtn = document.getElementById('sort_btn');

const header = document.querySelector('header');

const searchField = document.getElementById('search');

const select = document.getElementById('input-sort');

const filterBtns = document.querySelectorAll('.btn_filter');

const filtersContainer = document.querySelector('.wrapper.filter_collection');

fetch('https://randomuser.me/api/?results=60&nat=us')
.then(response => response.json())
.then(response => controller(response.results))

function controller(srcArr) {

  let list = srcArr;
  let inputStr = "";

  function searchByName(e) {
    inputStr = searchField.value.toLowerCase();
    list = srcArr.filter(e => e.name.last.includes(inputStr) || e.name.first.includes(inputStr));
    renderHTML(list);
  }

  function filterByGender(ev) {
    makeActive(ev.target, filterBtns);
    if (ev.target.value === 'male') {
      list = srcArr.filter(e => e.gender === 'male');
    } else if (ev.target.value === 'female') {
      list = srcArr.filter(e => e.gender === 'female');
    } else if (ev.target.value === 'all') {
      list = srcArr.filter(e => e.gender);
    }
    renderHTML(list);
  }

  function makeActive(trg, elements) {
    elements.forEach(elem => elem.classList.remove('active'));
    trg.classList.add('active');
  }

  function sortByAgeDesc(a, b) {
    list.sort((a, b) => b.dob.age - a.dob.age);
    renderHTML(list);
  }

  function sortByAgeAsc(a, b) {
    list.sort((a, b) =>  a.dob.age - b.dob.age);
    renderHTML(list);
  }

  function sortByNameAz() {
    list.sort((a, b) => {
      let nameA = a.name.first;
      let nameB = b.name.first;
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    })
    renderHTML(list);
  }

  function sortByNameZa() {
    list.sort((a, b) => {
      let nameA = a.name.first;
      let nameB = b.name.first;
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    })
    renderHTML(list);
  }

  filtersContainer.addEventListener('click', filterByGender);

  searchField.addEventListener('input', searchByName);

  select.addEventListener('change', e => {
    if (e.target.value === 'ASC') {
      sortByAgeAsc();
    } else if (e.target.value === 'DESC') {
      sortByAgeDesc();
    } else if (e.target.value === 'ZA') {
      sortByNameZa();
    } else if (e.target.value === 'AZ') {
      sortByNameAz();
    }
  });

  renderHTML(list);
};

function renderHTML(arrOfObj) {
  main.innerHTML = '';

  arrOfObj.forEach(e => {
    main.insertAdjacentHTML('beforeend',
    `
    <div class="usr_card">
      <img class="user_img" src="${e.picture.large}">
      <p class="usr_name">${e.name.first} ${e.name.last}</p>
      <span class="label">Age: ${e.dob.age}</span>
      <span class="location">
        <i class="fa fa-home"></i> ${e.location.state}: ${e.location.city}
      </span>
    </div>
    `);
  })
};

// function compareNumbers(a, b) {
//   return a - b;
// }
sortBtn.addEventListener('click', () => header.classList.toggle('open'));
