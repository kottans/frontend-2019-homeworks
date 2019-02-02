const GENDER_ALL = 'all', GENDER_MALE = 'male', GENDER_FEMALE = 'female';
const SORT_TYPE = {NAMEUP: 'nameUp', NAMEDOWN: 'nameDown', AGEUP: 'ageUp', AGEDOWN: 'ageDown'};
const AGE_MIN = '0', AGE_MAX = '100';

class FriendApp {
  constructor() {
    this.persons = document.querySelector(".persons");
    this.searchInput = document.querySelector("#search");
    this.filterGender = document.querySelector("#filter-gender");
    this.sortType = document.querySelector("#sort-type");
  	this.filterAgeFrom = document.querySelector("#agefrom");
	this.filterAgeTo = document.querySelector("#ageto");
	this.resetBtn = document.querySelector(".reset");
    this.friends = [];
    this.initialFriends = [];
    this.init();
    this.reset = this.reset.bind(this);
    this.sort = this.sort.bind(this);
    this.filter = this.filter.bind(this);
    this.addEventsListeners();
    this.selectedSort = SORT_TYPE.NAMEUP;
    this.selectedGender = GENDER_ALL;
  }

  init() {
    fetch("https://randomuser.me/api/?results=100", {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.initialFriends = res.results;
		this.selectedSort = SORT_TYPE.NAMEUP;
		this.selectedGender = GENDER_ALL;
		this.filter();
        this.initialFriends = this.friends;
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  showPersons(data) {
    data.forEach(person => {
      this.addCardToPersons(this.createPersonCard(person));
    });
  }

  firstLetterToUpper(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  reset() {
    this.searchInput.value = "";
	this.filterAgeFrom.value = AGE_MIN;
	this.filterAgeTo.value = AGE_MAX;
 	this.hidePersons();
    this.friends = this.initialFriends;
    this.showPersons(this.friends);
    this.selectedSort = SORT_TYPE.NAMEUP;
    this.selectedGender = GENDER_ALL;
  }

  createPersonCard(element) {
    const person = document.createElement("div");
    person.classList.add("person");

    const photo = document.createElement("div");
    photo.classList.add("person__photo");

    const photoImg = document.createElement("img");
    photoImg.classList.add("person__photo");
    photoImg.setAttribute("src", element.picture.large);
    photo.appendChild(photoImg);

    const fullName = document.createElement("div");
    fullName.classList.add("person__description");
    fullName.textContent = `${this.firstLetterToUpper(
      element.name.first
    )} ${this.firstLetterToUpper(element.name.last)}`;

    const location = document.createElement("div");
    location.classList.add("person__description");
    location.classList.add("person__location");
    location.textContent = this.firstLetterToUpper(element.location.city);

    const number = document.createElement("div");
    number.classList.add("person__number");
    number.classList.add("person__description");
    number.textContent = `Моб: ${element.cell}`;

    const age = document.createElement("div");
    age.classList.add("person__description");
    age.classList.add("person__age");
    age.textContent = `Возраст: ${element.dob.age}`;
    person.append(photo, fullName, location, age, number);
    return person;
  }

  addCardToPersons(card) {
    this.persons.appendChild(card);
  }

  hidePersons() {
    this.persons.innerHTML = "";
  }

  sort(e) {
    switch (e.target.value) {
    case SORT_TYPE.AGEUP:
	case SORT_TYPE.AGEDOWN:
	case SORT_TYPE.NAMEDOWN:
	case SORT_TYPE.NAMEUP:
		this.selectedSort = e.target.value;
        this.filter();
        break;
      case GENDER_MALE:
	  case GENDER_FEMALE:
	  case GENDER_ALL:
		this.selectedGender = e.target.value;
        this.filter();
       }
  }
  
  sortedPersonsByName(asc=true) {
    const result = !asc
      ? this.friends.sort((a, b) => {
          if (a.name.first < b.name.first) {
            return 1;
          }
          if (a.name.first > b.name.first) {
            return -1;
          }
          return 0;
        })
      : this.friends.sort((a, b) => {
          if (a.name.first < b.name.first) {
            return -1;
          }
          if (a.name.first > b.name.first) {
            return 1;
          }
          return 0;
        });
    return result;
  }
    
  sortedPersonsByAge(asc=true) {
    const result = asc
      ? this.friends.sort((a, b) => a.dob.age - b.dob.age)
      : this.friends.sort((a, b) => b.dob.age - a.dob.age);
    return result;
  }

  sortedPersons() {
	let result = this.friends;
    switch (this.selectedSort) {
      case SORT_TYPE.AGEUP:
        result = this.sortedPersonsByAge();
        break;
      case SORT_TYPE.AGEDOWN:
        result = this.sortedPersonsByAge(false);
        break;
      case SORT_TYPE.NAMEDOWN:
        result = this.sortedPersonsByName(false);
        break;
      case SORT_TYPE.NAMEUP:
        result = this.sortedPersonsByName();
    }
	return result;
  }
    
  filteredPersonsByAge() {

	const result = this.friends.filter(
      function(person) {
        return (
          Number(this.filterAgeFrom.value) <= person.dob.age && person.dob.age <= Number(this.filterAgeTo.value) 
        );
      }.bind(this)
    );
		
    return result;
  }

  filteredPersonsByGender() {
    const result = this.friends.filter(
      function(person) {
        return (
          this.selectedGender === GENDER_ALL || person.gender === this.selectedGender 
        );
      }.bind(this)
    );
    return result;
  }

  filteredPersonsByText() {
    const result = this.friends.filter(
      function(person) {
        return (
          person.name.first
            .toLowerCase()
            .includes(this.searchInput.value.toLowerCase()) ||
          person.name.last
            .toLowerCase()
            .includes(this.searchInput.value.toLowerCase())
        );
      }.bind(this)
    );
    return result;
  }

  filter() {
    this.hidePersons();
    this.friends = this.initialFriends;
    if (this.searchInput.value) {
      this.friends = this.filteredPersonsByText();
    }
    this.friends = this.filteredPersonsByGender();
	this.friends = this.filteredPersonsByAge();
	this.showPersons(this.sortedPersons());
  }
  
  addEventsListeners() {
    this.searchInput.addEventListener("keyup", this.filter);
	this.filterGender.addEventListener("change", this.sort);
    this.sortType.addEventListener("change", this.sort);
	this.filterAgeFrom.addEventListener("change", this.filter);
    this.filterAgeTo.addEventListener("change", this.filter);
	this.resetBtn.addEventListener("click", this.reset);
  }
}

new FriendApp();
