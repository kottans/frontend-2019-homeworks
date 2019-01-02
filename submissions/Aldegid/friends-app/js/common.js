const content = document.querySelector('.users');
const searchField = document.querySelector('.search__input');
const genderNode = document.querySelector('.filter__gender');
const ageNode = document.querySelector('.filter__age');
const nameNode = document.querySelector('.filter__name');
const checkAll = document.querySelector('.all');
const filterAsc = document.querySelector('.asc');
const filterDesc = document.querySelector('.desc');
const filterAz = document.querySelector('.az');
const filterZa = document.querySelector('.za');
const resetBtn = document.querySelector('.filter__reset');
const scrollBtn = document.querySelector('.button__scroll');
const scrollHeight = 300;

function createElem(elem) {
  return document.createElement(elem);
}
function append(parent, element) {
  return parent.appendChild(element);
}
function asc(a, b){
  if(a < b) {
    return -1;
  } else {
    return 1
  }
}
function desc(a, b){
  if(a < b) {
    return 1;
  } else {
    return -1
  }
}

const createUsers = user => {
  let div = createElem('div');
  div.classList.add('user');
  let userContent = ` <p class = "user__gender"> ${user.gender}  |  ${user.dob.age} y.o.</p>
                          <img src="${user.picture.large}" alt="${user.name.first}">
                          <p class = "user__name">${user.name.first} ${user.name.last}</p>
                          <p class = "user__phone"><i class="fa fa-phone"></i>${user.phone}</p>
                          <p class = "user__email"><i class="fa fa-envelope"></i>${user.email}</p>`
  div.innerHTML = userContent;
  append(content, div);
}

function renderUsers(data) {
  data.forEach(createUsers);
  searchField.addEventListener('input', e => searchFilter(e.target.value, data));
  genderNode.addEventListener('change', e => filterByGender(e.target.value, data));
  ageNode.addEventListener('change', e => filterByAgeName(e.target.value, data));
  nameNode.addEventListener('change', e => filterByAgeName(e.target.value, data));
  resetBtn.addEventListener('click', e => reset(data));
}

function searchFilter(input, data) {
  content.innerHTML = '';
  let result = [];
  data.forEach(user => {
    let fullName = user.name.first + user.name.last;
    if (fullName.indexOf(input) != -1){
      result.push(user);
    }
  })
  result.forEach(createUsers);
}

function filterByGender(val, data) {
  content.innerHTML = '';
  let result = [];
  data.filter(user => {
    if(val !== 'all'){
      if(user.gender === val){
        result.push(user);
      }
    } else if(val === 'all') {
      result.push(user);
    }
  })
  result.forEach(createUsers);
}

function filterByAgeName(val, data){
   content.innerHTML = '';
    if(val === 'asc'){
      data.sort((a, b) => asc(a.dob.age, b.dob.age));
      data.forEach(createUsers);
    }
    else if(val === 'desc'){
      data.sort((a, b) => desc(a.dob.age, b.dob.age));
      data.forEach(createUsers);
    }
    else if(val === 'az'){
      data.sort((a, b) => asc(a.name.first, b.name.first));
      data.forEach(createUsers);
    }
    else if(val === 'za'){
      data.sort((a, b) => desc(a.name.first, b.name.first));
      data.forEach(createUsers);
    }
}

function reset(data){
  searchField.value = '';
  checkAll.checked = true;
  filterAsc.checked = false;
  filterDesc.checked = false;
  filterAz.checked = false;
  filterZa.checked = false;
  content.innerHTML = '';
  data.forEach(createUsers);
}

function scroll(){
  if (document.body.scrollTop > scrollHeight || document.documentElement.scrollTop > scrollHeight) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
}
window.onscroll = function() {scroll()};
scrollBtn.addEventListener('click', function(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
});
})

fetch('https://randomuser.me/api/?results=30')
  .then((res) => res.json())
  .then(data => {
    renderUsers(data.results)
  })
  .then(function (err) {
    console.log("error:" + err);
  });
