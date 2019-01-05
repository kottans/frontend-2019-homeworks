document.addEventListener("DOMContentLoaded", () =>{
    const app = new FriendApp();
    app.getUsers();
});
function FriendApp() {
    this.searchBar = document.getElementById('nameSearch');
    this.locationBar = document.getElementById('locationSearch');
    this.userContainer = document.getElementById('users');
    this.sortMenu = document.getElementById('sort-menu');
    this.filterMenu = document.getElementById('filter-menu');
    this.data = [];
    this.filteredData=[];
    this.addListeners();
}
FriendApp.prototype = {
    getUsers: function(){
        const API_URL = "https://randomuser.me/api/?results=10";
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                this.data = data.results;
                this.filteredData = this.data;
                this.render(data.results);
            });
    },
    addListeners: function(){
        this.sortMenu.addEventListener('click', this.sort.bind(this));
        this.filterMenu.addEventListener('change', this.filter.bind(this));
        this.searchBar.addEventListener('input', this.filter.bind(this));
        this.locationBar.addEventListener('input', this.filter.bind(this));
    },
    createCard: function(user, fragment) {
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
        cardText.appendChild(cardName);
        cardText.appendChild(cardAge);
        cardText.appendChild(cardCity);

        const cardContact = document.createElement('div');
        const cardEmail = document.createElement('p');
        cardEmail.textContent = user.email;
        cardEmail.classList.add('card-text-small');

        const cardPhone = document.createElement('p');
        cardPhone.textContent = user.phone;
        cardPhone.classList.add('card-text-small');

        cardContact.classList.add('card-contact-wrapper');
        cardContact.appendChild(cardEmail);
        cardContact.appendChild(cardPhone);

        card.appendChild(cardPhoto);
        card.appendChild(cardText);
        card.appendChild(cardContact);

        fragment.appendChild(card);
    },
    update: function(newData){
        this.render(newData);
    },
    render: function(users){
        const frag = document.createDocumentFragment();
        this.userContainer.innerHTML = '';
        users.forEach( user => this.createCard(user, frag));
        this.userContainer.appendChild(frag);
    },
    sort: function(e){
        switch (e.target.getAttribute('name')) {
            case "nameDesc":
                this.filteredData.sort((a, b) => (b.name.first > a.name.first ? 1 : -1));
                break;
            case "nameAsc":
                this.filteredData.sort((a, b) => (b.name.first < a.name.first ? 1 : -1));
                break;
            case "ageDesc":
                this.filteredData.sort((a, b) => (b.dob.age > a.dob.age ? 1 : -1));
                break;
            case "ageAsc":
                this.filteredData.sort((a, b) => (b.dob.age < a.dob.age ? 1 : -1));
                break;
        }
        this.update(this.filteredData);
    },
    filter: function (e) {
        switch (e.target.id) {
            case "minAge":
            case "maxAge":
            case "sort-menu":
                let min, max;
                min = document.getElementById('minAge').value;
                max = document.getElementById('maxAge').value;
                this.filteredData = this.data.filter(a => a.dob.age >= min && a.dob.age <= max);
                break;
            case "male":
            case "female":
                this.filteredData = this.data.filter(a => a.gender === e.target.value);
                break;
            case "nameSearch":
                this.filteredData = this.data.filter(a =>
                    e.target.value? a.name.first.indexOf(e.target.value)!==-1 || a.name.last.indexOf(e.target.value)!==-1:true);
                break;
            case "locationSearch":
                this.filteredData = this.data.filter(a =>
                    e.target.value? a.location.city.indexOf(e.target.value)!==-1:true);
                break;
        }
        this.update(this.filteredData);
    }
};