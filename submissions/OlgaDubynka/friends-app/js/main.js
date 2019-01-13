const FORM_FILTER = document.getElementById('form-filter');
const INPUTS_FORM = FORM_FILTER.querySelectorAll('input');
const USER_LIST = document.querySelector('.user-list');
const INPUT_NAME = document.querySelector('.search-by-name');
const INPUT_AGE = document.querySelector('.search-by-age');
const RESET = document.querySelector('.btn-reset');
const INPUT_UP = document.querySelector('#up-name');
const INPUT_DOWN = document.querySelector('#down-name');
const INPUT_MALE = document.querySelector('#male');
const INPUT_FEMALE = document.querySelector('#female');

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
    

//render users
const renderUsers = (data, parent) => {
  const htmlString = data.map(user => {
    return `<div class="user-list__item">
              <div class="user-card">
                <div class="user-card__img-wrap">
                  <img  class="user-card__img" src="${user.img}" alt="user-photo">
                </div>
                <div class="user-card__name">${user.name}</div>
                <div class="user-card__btns">
                  <button class="search-btn btn-flw btn-card">follow</button>
                  <button class="search-btn btn-msg btn-card">message</button>
                </div>
                <div class="user-info">
                  <p class="user-info__age">Age: ${user.age}</p>
                  <p class="user-info__gender">Gender: ${user.gender}</p>
                  <p class="user-info__location">City: ${user.location}</p>	
              </div>
              </div>
            </div>`
  }).join(" ");
  parent.innerHTML = htmlString;
};

let users;

fetchUsers().then(data => { 
  users = data.map(user => ({
      gender: user.gender,
      name: `${user.name.first} ${user.name.last}`,
      img: user.picture.thumbnail,
      age: user.dob.age,
      location: user.location.state,
      email: user.email,
      })
  );

  renderUsers(users, USER_LIST);
  
});

const makeSearch = ({ target }) => {
  const inputChecked = target.checked;
  let getUsers = users;
  let inputVal;
  switch ((target !== null && inputChecked) || (target.classList.contains('search-btn'))) {
    case target.value === 'male' || target.value === 'female':
      getUsers = users.filter(item => item.gender === target.value);
      break;
    case target.value === 'up-age':
      getUsers = users.sort((a, b) => a.age - b.age);
      break;
    case target.value === 'down-age':
      getUsers = users.sort((a, b) => b.age - a.age);
      break;
    case target.value === 'up-name': 
      getUsers = users.sort((a, b) => ((a.name > b.name) - (a.name < b.name)));
      break;
    case target.value === 'down-name':
      getUsers = users.sort((a, b) => ((a.name < b.name) - (a.name > b.name)));
      break;
    case target.classList.contains('search-name-btn'):
      inputVal = INPUT_NAME.value;
      getUsers = users.filter(item => item.name.toLowerCase().includes(inputVal));
      break;
    case target.classList.contains('search-age-btn'):
      inputVal = INPUT_AGE.value;
      getUsers = users.filter(item => String(item.age) === inputVal);
      break;
    case target.classList.contains('btn-reset'):
      INPUT_NAME.value = '';
      INPUT_AGE.value = '';
      [...INPUTS_FORM].forEach((item) => {
        item.checked = false;
      });
      break;
  }

  renderUsers(getUsers, USER_LIST);
};

FORM_FILTER.addEventListener('click', makeSearch);
