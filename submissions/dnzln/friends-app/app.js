const MAIN_CONTAINER = document.getElementById('main-content');
const MAIL_INPUT = document.querySelector('input[value=male]');
const FEMAIL_INPUT = document.querySelector('input[value=female]');
const FILTERS = document.querySelector('.filters');
const SEARCH_FIELD = document.getElementById('search-field');
const LABELS_IMG = document.getElementsByClassName('radio-img');
var usersArray = [];

fetch('https://randomuser.me/api/?results=48')
    .then( response => {response.json()
    .then( data => {
        usersArray = data.results
        printingUsers(usersArray)
	})
    });

function printingUsers(usersArray) {
    isChecked(); 
    MAIN_CONTAINER.innerHTML = '';
    let fragment = document.createDocumentFragment();
    usersArray.forEach(
        function(user) {

            if(FEMAIL_INPUT.checked) if(user.gender == 'female') return;
            if(MAIL_INPUT.checked) if(user.gender == 'male') return;
            if(!`${user.name.first} ${user.name.last}`.includes(SEARCH_FIELD.value)) return;
            

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
        case 'female': printingUsers(usersArray); break;
        case 'age-down':
            usersArray.sort(function(a, b){return a.dob.age-b.dob.age})
            printingUsers(usersArray.reverse()); break;          
        case 'age-up':
            usersArray.sort(function(a, b){return a.dob.age-b.dob.age})
            printingUsers(usersArray); break;
        case 'name-down':
            usersArray = sortName(usersArray);
            printingUsers(usersArray); break;
        case 'name-up':
            usersArray = sortName(usersArray);
            printingUsers(usersArray.reverse()); break;
    }
    }
);

SEARCH_FIELD.addEventListener('input', function() {
    printingUsers(usersArray); 
});

function isChecked(){
    for(let i = 0; i < LABELS_IMG.length; i++) {
        if(LABELS_IMG[i].nextSibling.checked) {
            LABELS_IMG[i].classList.add('checked'); 
        } else {
            LABELS_IMG[i].classList.remove('checked');
        }
    }
}

function sortName(usersArray) {
    usersArray.sort(function(a, b){
        let nameA = a.name.first.toLowerCase(), nameB = b.name.first.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return usersArray;
}

