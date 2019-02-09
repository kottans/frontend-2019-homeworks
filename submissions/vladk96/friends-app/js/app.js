const URL = 'https://randomuser.me/api/?results=30&inc=name,dob,gender,location,phone,picture';
let usersArray = [],
    sortedArray = [];

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

fetch(URL)
    .then(handleErrors)
    .then(res => res.json())
    .then(users => render(users.results))
    .catch(error => console.log(error));

const createCards = (prof) => {
    let main = document.querySelector('.main'),
        cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    
    prof.forEach((item) => {
        let card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="image">
                <img src="${item.picture.large}" alt="photo">
            </div>
            <div class="content">
                <a href="#" class="name">${item.name.first} ${item.name.last}</a>
                <p class="age">Age: ${item.dob.age}</p>
                <p class="gender">Gender: ${item.gender}</p>
                <p class="tel">Tel: ${item.phone}</p>
                <p class="city">City: ${item.location.city}</p>
            </div>`;
        cardContainer.appendChild(card);
    });
    main.innerHTML = '';
    main.appendChild(cardContainer);
}

const searchName = (e, users) => {
    const word = e.target.value.toLowerCase();

    usersArray = users.filter( (user) => {
        const fullName = user.name.first + ' ' + user.name.last;
        return fullName.includes(word);
    });

    createCards(usersArray);
}

const filterGender = (users) => {
    const gender = document.getElementById('sort-gender').value;

    if (gender === 'all') {
        sortedArray = users;
        createCards(users);
    } else {
        sortedArray = users.filter( (user) => user.gender === gender);
        createCards(sortedArray);
    }
}

const sortAge = (users) => {
    const value = document.getElementById('sort-age').value;

    if (value === 'increase') {
        createCards(users.sort( (a, b) => a.dob.age - b.dob.age));
    } else if (value === 'descrease') {
        createCards(users.sort( (a, b) => b.dob.age - a.dob.age));
    }
}

const sortName = (users) => {
    const value = document.getElementById('sort-name').value;

    if (value === 'increase') {
        createCards(users.sort( (a, b) => (a.name.first < b.name.first) ?  -1 : 1 ));
    } else if (value === 'descrease') {
        createCards(users.sort( (a, b) => (a.name.first > b.name.first) ?  -1 : 1 ));
    }
}

const reset = () => {
    document.querySelector('.form').reset();
}

const resetGender = () => document.getElementById('sort-gender').value = 'all';

const resetSortName = () => document.getElementById('sort-name').value = 'by name';

const resetAge = () => document.getElementById('sort-age').value = 'by age';

const render = (users) => {
    createCards(users);
    usersArray = users.slice();
    sortedArray = users.slice();

    document.getElementById('search').addEventListener('keyup', (e) => {
        searchName(e, users);
        filterGender(usersArray);
        sortAge(sortedArray);
        sortName(sortedArray);
    });
    document.getElementById('sort-gender').addEventListener('change', () => {
        filterGender(usersArray);
        sortAge(sortedArray);
        sortName(sortedArray);
    });
    document.getElementById('sort-age').addEventListener('change', () => {
        sortAge(sortedArray);
        resetSortName();
    });
    document.getElementById('sort-name').addEventListener('change', () => {
        sortName(sortedArray);
        resetAge();
    });
    document.querySelector('.reset').addEventListener('click', reset);
}
