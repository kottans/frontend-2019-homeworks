import Slider from './range-slider.js'
document.addEventListener("DOMContentLoaded", () =>{
    const slider = new Slider();
    slider.handleInput();
    const app = new FriendApp();
    app.getUsers();
    app.addListeners();
});
class FriendApp {
    constructor(){
        this.searchBar = document.getElementById('searchBar');
        this.locationBar = document.getElementById('locationBar');
        this.userContainer = document.getElementById('users');
        this.sortMenu = document.getElementById('sort-menu');
        this.filterMenu = document.getElementById('filter-menu');
        this.data = [];
        this.filteredData=[];
        this.activeFilters = [];
    }
    getUsers(){
        const API_URL = "https://randomuser.me/api/?results=30";
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                this.data = data.results;
                this.filteredData = this.data;
                this.render(data.results);
            });
    }
    addListeners(){
        this.sortMenu.addEventListener('click', (e) => this.sortItems(e));
        this.filterMenu.addEventListener('change', (e) => this.filterItems(e));
        this.searchBar.addEventListener('input', (e) => this.filterItems(e));
        this.locationBar.addEventListener('input', (e) => this.filterItems(e));
    }
    createCard(user){
        const card = document.createElement('div');
        card.classList.add('card');

        const cardPhoto = document.createElement('img');
        cardPhoto.setAttribute('src', user.picture.medium);
        cardPhoto.classList.add('card-photo');

        const cardText = document.createElement('div');

        const cardName = document.createElement('p');
        cardName.textContent = `${user.name.first} ${user.name.last}`;
        cardName.classList.add('card-text-big');

        const cardAge = document.createElement('p');
        cardAge.textContent = `Age: ${user.dob.age}`;
        cardAge.classList.add('card-text-medium');

        const cardCity = document.createElement('p');
        cardCity.textContent = `City: ${user.location.city}`;
        cardCity.classList.add('card-text-medium');

        cardText.classList.add('card-text-wrapper');

        cardText.append(cardName, cardAge, cardCity);

        const cardContact = document.createElement('div');
        const cardEmail = document.createElement('p');
        cardEmail.textContent = user.email;
        cardEmail.classList.add('card-text-small');

        const cardPhone = document.createElement('p');
        cardPhone.textContent = user.phone;
        cardPhone.classList.add('card-text-small');

        cardContact.classList.add('card-contact-wrapper');
        cardContact.append(cardEmail, cardPhone);

        card.append(cardPhoto, cardText, cardContact);
        return card;
    }
    render(users){
        this.userContainer.innerHTML = '';
        const usersHtml = users.map(this.createCard);
        this.userContainer.append(...usersHtml);
    }
    sortItems(e){
        this.filteredData.sort(FriendApp.sorts[e.target.name]);
        this.render(this.filteredData);
    }
    filterItems(e){
        if(!this.activeFilters.includes(FriendApp.filters[e.target.name])){
            this.activeFilters.push(FriendApp.filters[e.target.name]);
        }
        this.filteredData = this.data.filter(d => this.activeFilters.every(c => c(d)));
        this.render(this.filteredData);
    }
}
FriendApp.filters = {
    age(a){
        let min, max;
        min = document.getElementById('minAge').value;
        max = document.getElementById('maxAge').value;
        return a.dob.age >= min && a.dob.age <= max;
    },
    gender(a){
        const radioChecked = document.querySelector('[name=gender]:checked');
        return a.gender === radioChecked.value;
    },
    nameSearch(a){
        const nameInput = document.querySelector('[name=nameSearch]');
        return nameInput.value? a.name.first.includes(nameInput.value) || a.name.last.includes(nameInput.value):true;
    },
    locationSearch(a){
        const locationInput = document.querySelector('[name=locationSearch]');
        return locationInput.value? a.location.city.includes(locationInput.value):true;
    }
};
FriendApp.sorts = {
    nameDesc(a, b){
        return b.name.first >= a.name.first ? 1 : -1;
    },
    nameAsc(a, b){
        return b.name.first <= a.name.first ? 1 : -1;
    },
    ageDesc(a, b){
        return b.dob.age >= a.dob.age ? 1 : -1;
    },
    ageAsc(a, b){
        return b.dob.age <= a.dob.age ? 1 : -1;
    }
};