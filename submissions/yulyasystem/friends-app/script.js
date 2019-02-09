const API_URL = 'https://randomuser.me/api/?results=25';
let users = [];
let container = document.querySelector('.container');
let sortSpan = document.querySelector('.sort');
let filter = document.querySelector('.filter');
let grid = document.querySelector('.grid');
let search = document.querySelector('.search');
let arrowDown = document.querySelector('.arrow-down');
let arrowUp = document.querySelector('.arrow-up');

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
fetch(API_URL)
    .then(handleErrors)
    .then(response => {
        return response.json();
    })
    .then(function (json) {
        console.log("ok!");
        users = json.results;
        render(users);
    })
    .catch(error => console.log(error));

function createCards(users) {
    users.forEach((item) => {
        grid.innerHTML += `<div class="user-card">
                <img src="${item.picture.large}" class="thumbnail">
                <div class="profile">
                    <p class="name">${item.name.first}  ${item.name.last}</p>
                    <p class = "text"><b>Gender:</b> ${item.gender} age: ${item.dob.age}</p>
                    <p class = "text"><b>Email:</b> ${item.email} </p>
                    <p class = "text"><b>Phone:</b> ${item.phone}</p>
                </div>

            </div>`;
    });
    container.appendChild(grid);
}

function sortByAgeUp(users) {
    let sortedByAge = users.sort((a, b) => a.dob.age - b.dob.age).slice();
    grid.innerHTML = "";
    createCards(sortedByAge);

}

function sortByAgeDown(users) {
    let sortedByAgeDown = users.sort((a, b) => b.dob.age - a.dob.age).slice();
    grid.innerHTML = "";
    createCards(sortedByAgeDown);


}

function sortByName(users) {
    let sortedByName = users.sort((a, b) => {
        if (a.name.first < b.name.first) return -1;
        if (a.name.first > b.name.first) return 1;
        return 0;
    }).slice();
    grid.innerHTML = "";
    createCards(sortedByName);
}

function searchByName(input, users) {
    let searchArray = [];
    users.map((item, index) => {
        if (item.name.first.includes(input) ||
            item.name.last.includes(input)) {
            searchArray.push(item);
        }
    });
    grid.innerHTML = "";
    if (searchArray.length) {
        createCards(searchArray);
    } else {
        grid.innerHTML = " No friend with this name, Sorry...";
    }
}

function render(users) {
    createCards(users);
    arrowDown.addEventListener('click', () => sortByAgeDown(users));
    arrowUp.addEventListener('click',()=>sortByAgeUp(users));
    filter.addEventListener('click', () => sortByName(users));
    search.addEventListener('input', (event) => searchByName(event.target.value, users));
}
