const API_URL = 'https://randomuser.me/api/?results=25';
const DELAY = 5000;
let users = [];
let container = document.querySelector('.container');
let sortSpan = document.querySelector('.sort');
let filter = document.querySelector('.filter');
let div = document.createElement('div');
let search = document.querySelector('.search');
let isSorted = false;



fetch(API_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        users = json.results;
        render(users);
    })
    .catch(alert);

function createCards(data) {
    div.className = "grid";
    data.forEach((item) => {
        div.innerHTML += `<div class="user-card">
                <img src="${item.picture.large}" class="thumbnail">
                <div class="profile">
                    <p class="name">${item.name.first}  ${item.name.last}</p>
                    <p class = "text"><b>Gender:</b> ${item.gender} age: ${item.dob.age}</p>
                    <p class = "text"><b>Email:</b> ${item.email} </p>
                    <p class = "text"><b>Phone:</b> ${item.phone}</p>
                </div>

            </div>`;
    });
    container.appendChild(div);
}

function sortByAge(data) {


    let grid = document.querySelector('.grid');
    let sortedByAge = data.sort((a, b) => {
        return a.dob.age - b.dob.age;
    }).slice();
    let sortedByAgeDown = data.sort((a, b) => {
        return b.dob.age - a.dob.age;
    }).slice();

    if (isSorted) {
        console.log(isSorted);
        grid.innerHTML = "";
        createCards(sortedByAgeDown);
        isSorted = false;
    } else {
        console.log(isSorted, "else");
        grid.innerHTML = "";
        createCards(sortedByAge);
        isSorted = true;
    }


}

function sortByName(data) {
    let grid = document.querySelector('.grid');
    let sortedByName = data.sort((a, b) => {
        if (a.name.first < b.name.first) return -1;
        if (a.name.first > b.name.first) return 1;
        return 0;
    }).slice();
    grid.innerHTML = "";
    createCards(sortedByName);

}

function searchByName(input, data) {
    let grid = document.querySelector('.grid');
    let searchArray = [];
    data.forEach(item => {
        if (item.name.first === input) {
            console.log(item);
            searchArray.push(item);
        }
    });
    grid.innerHTML = "";
    if (searchArray.length !== 0) {
        createCards(searchArray);
    } else {
        setTimeout(()=>{
            grid.innerHTML = "";
            createCards(data);
            
        },DELAY)
        grid.innerHTML = " No friend with this name, Sorry...";
    }



}

function render(data) {
    createCards(data);

    sortSpan.addEventListener('click', () => sortByAge(data));
    filter.addEventListener('click', () => sortByName(data));
    search.addEventListener('input', (event) => searchByName(event.target.value, data));



}