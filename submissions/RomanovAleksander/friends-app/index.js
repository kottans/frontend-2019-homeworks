const API_URL = "https://randomuser.me/api/?results=48";
const CONTENT = document.querySelector('.content');
let usersList = [];
let sortAsc = (a,b) => b.name.first < a.name.first ? 1 : -1;
let sortDesc = (a,b) => b.name.first < a.name.first ? -1 : 1;

function getUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then((data) => {
            usersList = data.results;
            displayUsersList(usersList);
        });
}

getUsers();
function createUserCard(user) {
    const card = document.createElement('div');
    const name = document.createElement('div');
    const photo = document.createElement('img');
    const info = document.createElement('div');
    const gender = document.createElement('div');
    const phone = document.createElement('div');

    card.classList.add('content__user-card');
    photo.classList.add('content__user-img');
    info.classList.add('content__user-info');

    name.innerHTML = `${user.name.first} ${user.name.last}`;
    card.id = `${user.login.username}`;
    photo.src = user.picture.large;
    info.innerHTML = "Age: " + user.dob.age;
    gender.innerHTML = user.gender;
    phone.innerHTML = user.phone;

    if (user.gender === "female") {
        name.classList.add('content__user-name');
        name.classList.add('female');
        gender.classList.add('content__user-gender');
        gender.classList.add('female');
    } else {
        name.classList.add('content__user-name');
        name.classList.add('male');
        gender.classList.add('content__user-gender');
        gender.classList.add('male');
    }

    card.append(photo, name, info, phone, gender);
    return card
}

function displayUsersList(users) {
    const documentFragment = document.createDocumentFragment();
    users.forEach((user) => {
        documentFragment.append(createUserCard(user))
    });
    CONTENT.append(documentFragment);
}

function hide(item) {
    document.getElementById(item.login.username).classList.add('hidden');
    document.getElementById(item.login.username).classList.remove('displayed');
}

function show(item) {
    document.getElementById(item.login.username).classList.remove('hidden');
    document.getElementById(item.login.username).classList.add('displayed');
}

function checkGender() {
    if (document.querySelector('input[value=male]').checked) {
        usersList.forEach((user) => user.gender === 'male' ? show(user) : hide(user))
    } else if (document.querySelector('input[value=female]').checked) {
        usersList.forEach((user) => user.gender === 'female' ? show(user) : hide(user))
    }
}

function filteringByName() {
    usersList.forEach((user) => {
        `${user.name.first} ${user.name.last}}`.includes(this.value) ? show(user) : hide(user)
    });
}

function sort() {
    document.querySelector('.filter').addEventListener('click', (event) => {
        if (event.target.value === "all") {
            usersList.forEach((user) => show(user))
        }
        else if (event.target.value === "male") {
            usersList.forEach((user) => {
                user.gender === 'male' ? show(user) : hide(user)
            })
        }
        else if (event.target.value === "female") {
            usersList.forEach((user) => {
                user.gender === 'female' ? show(user) : hide(user)
            })
        }
        else if (event.target.value === "nameAsc") {
            CONTENT.innerHTML = "";
            usersList.sort(sortAsc);
            displayUsersList(usersList);
            checkGender()
        }
        else if (event.target.value === "nameDesc") {
            CONTENT.innerHTML = "";
            usersList.sort(sortDesc);
            displayUsersList(usersList);
            checkGender()
        }
        else if (event.target.value === "ageAsc") {
            CONTENT.innerHTML = "";
            displayUsersList(usersList.sort((a, b) => a.dob.age - b.dob.age ));
            checkGender()
        }
        else if (event.target.value === "ageDesc") {
            CONTENT.innerHTML = "";
            displayUsersList(usersList.sort((b, a) => a.dob.age - b.dob.age ));
            checkGender()
        }
    });
}

sort();
document.getElementById('name-search').addEventListener('input', filteringByName);
