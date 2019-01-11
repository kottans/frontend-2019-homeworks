const FORM_FILTER = document.getElementById('form-filter');
const INPUTS_FORM = FORM_FILTER.querySelectorAll('input');
const USER_LIST = document.querySelector('.user-list');
const BTN_SEARCH_BY_NAME = document.querySelector('.search-name-btn');
const INPUT_NAME = document.querySelector('.search-by-name');
const BTN_SEARCH_BY_AGE = document.querySelector('.search-age-btn');
const INPUT_AGE = document.querySelector('.search-by-age');
const RESET = document.querySelector('.btn-reset');

const ENDPOINT = 'https://randomuser.me/api/?';
const RES = 'results=20';
const apiUrl = `${ENDPOINT}${RES}`;

//get users from API
const fetchUsers = () =>
	fetch(apiUrl)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error (
				'error while fetching: ' + response.statusText
			)
		})
		.then(data => data.results)
    .catch(error => console.log('error'));
    
//prepare data for using template
const source = document
.querySelector('#user-card')
.textContent
.trim();
  
//compile data using template
const compiled = _.template(source);

//render users
const renderUsers = (items, template, parent) => {
  let htmlString = '';
  items.forEach(item => {
    htmlString += template(item);
  });
  parent.innerHTML = htmlString;
};

const users = fetchUsers();

users.then(data => { 
  const users = data.map(user => ({
      gender: user.gender,
      name: `${user.name.first} ${user.name.last}`,
      img: user.picture.thumbnail,
      age: user.dob.age,
      location: user.location.state,
      email: user.email,
      })
  );


  FORM_FILTER.addEventListener('click', function(e) {
    const target = e.target;
    const inputChecked = target.checked;
    let isSortedUsers;
    switch (target === 'INPUT' !== null && inputChecked) {
      case target.value === 'up-age':
        isSortedUsers = users.sort((a, b) => a.age - b.age);
        renderUsers(isSortedUsers, compiled, USER_LIST);
        break;
      case target.value === 'down-age':
        isSortedUsers = users.sort((a, b) => b.age - a.age);
        renderUsers(isSortedUsers, compiled, USER_LIST);
        break;
      case target.value === 'up-name': 
        isSortedUsers = users.sort((a, b) => ((a.name > b.name) - (a.name < b.name)));
        renderUsers(isSortedUsers, compiled, USER_LIST);
        break;
      case target.value === 'down-name':
        isSortedUsers = users.sort((a, b) => ((a.name < b.name) - (a.name > b.name)));
        renderUsers(isSortedUsers, compiled, USER_LIST);
        break;
      case target.value === 'male' || target.value === 'female':
        const isFilteredUsers = users.filter(item => item.gender === target.value);
        renderUsers(isFilteredUsers, compiled, USER_LIST);
        break;
    }
  });

  BTN_SEARCH_BY_NAME.addEventListener('click', function(e) {
    e.preventDefault();
    let inputNameVal = INPUT_NAME.value;
    const isFilteredUsers = users.filter(item => (
      item.name.toLowerCase().includes(inputNameVal))
    );
    renderUsers(isFilteredUsers, compiled, USER_LIST);
  });

  BTN_SEARCH_BY_AGE.addEventListener('click', function(e) {
    e.preventDefault();
    let inputAgeVal = INPUT_AGE.value;
    const isFilteredUsers = users.filter(item => (
      String(item.age) === inputAgeVal)
    );
    renderUsers(isFilteredUsers, compiled, USER_LIST);
  });


  RESET.addEventListener('click', function() {
    renderUsers(users, compiled, USER_LIST);
    INPUT_NAME.value = '';
    INPUT_AGE.value = '';
    [...INPUTS_FORM].forEach((item) => {
      item.checked = false;
    });
  });

  renderUsers(users, compiled, USER_LIST);
});
