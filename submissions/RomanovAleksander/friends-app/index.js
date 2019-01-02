const API_URL = "https://randomuser.me/api/?results=48";
const CONTENT = document.querySelector(".content");
let usersList = [];

function getUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then((data) => {
            usersList = data.results;
            displayUsersList(usersList);
            console.log(usersList)
        });
}

getUsers();

function createUserCard(user) {
    const card = document.createElement("div");
    const name = document.createElement("div");
    const photo = document.createElement("img");
    const info = document.createElement("div");
    const gender = document.createElement("div");
    const phone = document.createElement("div");

    card.classList = "content__user-card";
    photo.classList = "content__user-img";
    info.classList = "content__user-info";

    name.innerHTML = `${user.name.first} ${user.name.last}`;
    card.id = `${user.login.username}`;
    photo.src = user.picture.large;
    info.innerHTML = "Age: " + user.dob.age;
    gender.innerHTML = user.gender;
    phone.innerHTML = user.phone;

    if (user.gender === "female") {
        name.classList = "content__user-name female";
        gender.classList = "content__user-gender female";
    } else {
        name.classList = "content__user-name male";
        gender.classList = "content__user-gender male";
    }

    card.append(photo, name, info, phone, gender);
    return card
}

function displayUsersList(list) {
    list.forEach((user) => {
        document.querySelector('.content').append(createUserCard(user))
    });
}

function remove(item) {
    document.getElementById(item.login.username).classList.add('hidden');
}

function show(item) {
    document.getElementById(item.login.username).classList.remove('hidden');
    document.getElementById(item.login.username).classList.add('displayed');
}

function checkGender() {
    if (document.querySelector('input[value=male]').checked) {
        usersList.forEach((user) => user.gender === 'male' ? show(user) : remove(user))
    } else if (document.querySelector('input[value=female]').checked) {
        usersList.forEach((user) => user.gender === 'female' ? show(user) : remove(user))
    }
}

function filteringByName() {
    usersList.forEach((user) => {
        user.name.first.search(this.value) != -1 ? show(user) : remove(user) || user.name.last.toLowerCase().search(this.value) != -1 ? show(user) : remove(user)
    });
}

function sort() {
    document.querySelector('.filter').addEventListener('click', (event) => {
        if (event.target.value === "all") {
            usersList.forEach((user) => show(user))
        }
        else if (event.target.value === "male") {
            usersList.forEach((user) => {
                user.gender === 'male' ? show(user) : remove(user)
            })
        }
        else if (event.target.value === "female") {
            usersList.forEach((user) => {
                user.gender === 'female' ? show(user) : remove(user)
            })
        }
        else if (event.target.value === "nameAsc") {
            CONTENT.innerHTML = "";
            usersList.sort((b, a) => {
                if (b.name.first < a.name.first) {
                    return -1} else {
                    return 1
                }
            });
            displayUsersList(usersList);
            checkGender()
        }
        else if (event.target.value === "nameDesc") {
            CONTENT.innerHTML = "";
            usersList.sort((a, b) => {
                if (b.name.first < a.name.first) {
                    return -1
                } else {
                    return 1
                }
            });
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
document.getElementById('name-search').addEventListener("keyup", filteringByName);
