const MAIN_CONTAINER = document.getElementById('main-content');
const MAIL_INPUT = document.querySelector('input[value=male]');
const FEMAIL_INPUT = document.querySelector('input[value=female]');
const FILTERS = document.querySelector('.filters');
const SEARCH_FIELD = document.getElementById('search-field');
const LABELS_IMG = document.getElementsByClassName('radio-img');
const RESET = document.querySelector('.reset-button');
var nameFlag = 0;
var ageFlag = 0;
var usersArray = [];

fetch('https://randomuser.me/api/?results=48')
    .then( response => response.json())
    .then( data => {
        usersArray = data.results
        printingUsers(usersArray)
    })

function printingUsers(usersArray) {
    let fragment = document.createDocumentFragment();
    usersArray.forEach(
        function(user) {
            let block = document.createElement('div');
            block.classList.add('blocks');
            fragment.appendChild(block);

            let card = document.createElement('div');
            card.classList.add('user-card');
            block.appendChild(card);
            
            let userImage = document.createElement('img');
            userImage.classList.add('user-pic');
            userImage.setAttribute('src', user.picture.large);
            card.appendChild(userImage);
            
            let userName = document.createElement('p');
            userName.classList.add('user-name');
            userName.innerHTML = `${user.name.first} ${user.name.last}`;
            card.appendChild(userName);

            let userData = document.createElement('p');
            userData.classList.add('user-data');
            userData.innerHTML = `<strong>${user.dob.age}</strong>, from ${user.location.city}`;
            card.appendChild(userData);
            
            let userPhone = document.createElement('p');
            userPhone.classList.add('user-phone');
            userPhone.innerHTML = user.phone;
            card.appendChild(userPhone);
        }
    );
    MAIN_CONTAINER.appendChild(fragment);
}

FILTERS.addEventListener('click', function () {
    switch(event.target.value) {
        case 'all':
        case 'male':
        case 'female': sortAndSearch(usersArray); break;
        case 'age-down':
            if(!ageFlag || ageFlag === 1) {
                usersArray.sort(function(a, b){return a.dob.age-b.dob.age})
                sortAndSearch(usersArray.reverse());
                nameFlag = 0;
                ageFlag = 2;
            }
            break;
        case 'age-up':
            if(!ageFlag || ageFlag === 2) {
                usersArray.sort(function(a, b){return a.dob.age-b.dob.age})
                sortAndSearch(usersArray);
                nameFlag = 0;
                ageFlag = 1;
            }
            break;
        case 'name-down':
            if(!nameFlag || nameFlag === 1) {
                usersArray = sortName(usersArray);
                sortAndSearch(usersArray);
                ageFlag = 0;
                nameFlag = 2;
            }
            break;
        case 'name-up':
            if(!nameFlag || nameFlag === 2) {
                usersArray = sortName(usersArray);
                sortAndSearch(usersArray.reverse());
                ageFlag = 0;
                nameFlag = 1;
            }
            break;
    }
    }
);

SEARCH_FIELD.addEventListener('input', function() {
    sortAndSearch(usersArray);            
});

RESET.addEventListener('click', function() {
    let inputs = document.querySelectorAll('.radio-button');
    inputs.forEach(
        function(elem) {
            elem.checked = false;
        }
    );
    SEARCH_FIELD.value = '';
    MAIN_CONTAINER.innerHTML = '';
    printingUsers(usersArray);          
});

function sortName(usersArray) {
    usersArray.sort(function(a, b){
        let nameA = a.name.first.toLowerCase(), nameB = b.name.first.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return usersArray;
}

function sortAndSearch(usersArray) {
    let userArrayLocal = [];
    usersArray.forEach(
        function(user) {
            if(FEMAIL_INPUT.checked) if(user.gender == 'female') return;
            if(MAIL_INPUT.checked) if(user.gender == 'male') return;
            if(!`${user.name.first} ${user.name.last}`.includes(SEARCH_FIELD.value.toLowerCase())) return;
            userArrayLocal.push(user);
        });
    
    MAIN_CONTAINER.innerHTML = '';

    if(SEARCH_FIELD.value) {
        let searchInfo = document.createElement('p');
        searchInfo.classList.add('search-info');
        if(userArrayLocal.length == 0) {
            searchInfo.innerHTML = `No matches found :(`;
        } else {
            searchInfo.innerHTML = `${userArrayLocal.length} was found:`;
        }
        MAIN_CONTAINER.appendChild(searchInfo);
    }
    printingUsers(userArrayLocal);
}

