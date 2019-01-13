let users = [];
let content = document.querySelector(".content");
let sexFilter = document.querySelector(".sex-filter");
let ageFilter = document.querySelector(".age-filter");
let nameFilter = document.querySelector(".name-filter");
let searchFilter = document.querySelector(".search-filter");
let resetFilters = document.querySelector(".reset-button");

function drawUser(users) {
    var usersContent = document.createElement("div");
    usersContent.classList.add("users-content");
    users.forEach((u) => {
        let user = document.createElement("div");
        user.classList.add("user");
        user.appendChild(getImage(u));
        user.appendChild(getName(u));
        user.appendChild(getAge(u));
        user.appendChild(getGender(u));
        user.appendChild(getPhone(u));
        user.appendChild(getEmail(u));
        usersContent.appendChild(user);    
    });        
    content.appendChild(usersContent);

}

function getImage(user) {
    let img = document.createElement("img");
    img.classList.add("user-img");
    img.setAttribute("src", user.picture.large);
    return img;
}

function getName(user) {
    let name = document.createElement("p");
    name.classList.add("user-name");
    name.innerHTML = `${user.name.first} ${user.name.last}`;
    return name;
}

function getAge(user) {
    let age = document.createElement("p");
    age.classList.add("user-age");
    age.innerHTML = user.dob.age;
    return age;
}

function getGender(user) {
    let gender = document.createElement("p");
    gender.classList.add("user-gender");
    gender.innerHTML = user.gender;
    return gender;
}

function getPhone(user) {
    let phone = document.createElement("p");
    phone.classList.add("user-phone");
    phone.innerHTML = user.phone;
    return phone;
}

function getEmail(user) {
    let email = document.createElement("p");
    email.classList.add("user-email");
    email.innerHTML = user.email;
    return email;
}

function sexSorting(e, users) {
    let sortUser = users;
    switch(e.target.value) {
        case "male":
            sortUser = users.filter((u) => u.gender === "male");
            break;
        case "female":
            sortUser = users.filter((u) => u.gender === "female");
            break;
    }
    clearUsers();
    drawUser(sortUser);
}

function ageSorting(e, users) {
    let sortUser = users;
    switch(e.target.value) {
        case "age-up":
            sortUser = users.sort((f, s) => f.dob.age - s.dob.age);
            break;
        case "age-down":
            sortUser = users.sort((f, s) => s.dob.age - f.dob.age);
            break;
    }
    clearUsers();
    drawUser(sortUser);
}

function nameSorting(e, users) {
    let sortUser = users.sort((f, s) => {
        if (f.name.first < s.name.first) { return -1};
        if (f.name.first > s.name.first) { return 1};
        return 0;
    });
    clearUsers();
    e.target.value === "name-down" ? drawUser(sortUser) : drawUser(sortUser.reverse());
}

function searchSorting(e, users) {
    let searchArray = users.filter( u => {
        u.name.first.includes(e.target.value)
    });
    clearUsers();
    drawUser(searchArray);
}

function resetSorting() {
    clearUsers();
    drawUser(users);
    searchFilter.value = "";
    document.querySelectorAll(".buttons").forEach(b => {b.checked = false;});
}

function clearUsers() {
    document.querySelectorAll(".users-content").forEach(u => {u.innerHTML = "";});   
}

function addEventListeners() {
    sexFilter.addEventListener("click", (e) => sexSorting(e ,users));
    ageFilter.addEventListener("click",(e)=> ageSorting(e, users));
    nameFilter.addEventListener("click", (e) => nameSorting(e, users));
    searchFilter.addEventListener("input", (e) => searchSorting(e, users));
    resetFilters.addEventListener("click", resetSorting);
}

function initUser() {
    addEventListeners();
    drawUser(users);
}

fetch("https://randomuser.me/api/?results=25")
    .then(response => { return response.json(); })
    .then(results =>{
        users = results.results;
        initUser();
    })

