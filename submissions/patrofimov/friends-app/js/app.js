const GENDER_ALL = "all", GENDER_MALE = "male", GENDER_FEMALE = "female";
const SORT_TYPE = {NAMEUP: 'nameUp', NAMEDOWN: 'nameDown', AGEUP: 'ageUp', AGEDOWN: 'ageDown'};

class FriendApp {
  constructor() {
    this.persons = document.querySelector(".persons");
    this.searchInput = document.querySelector("#search");
    this.sortGender = document.querySelector("#sort-gender");
    this.sortAge = document.querySelector("#sort-age");
    this.sortName = document.querySelector("#sort-name");
    this.resetBtn = document.querySelector(".reset");
    this.friends = [];
    this.initialFriends = [];
    this.init();
    this.reset = this.reset.bind(this);
    this.sort = this.sort.bind(this);
    this.filterPersonsByText = this.filterPersonsByText.bind(this);
    this.addEventsListeners();
    this.selectedSort = "";
    this.selectedGender = GENDER_ALL;
  }

  init() {
    this.getPersonsFromApi();
  }
  getPersonsFromApi() {
    fetch("https://randomuser.me/api/?results=100", {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.initialFriends = res.results;
        this.friends = res.results;
        this.showPersons(this.friends);
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
    this.hidePersons();
    this.friends = this.initialFriends;
    this.showPersons(this.friends);
    this.selectedSort = "";
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
		this.selectedSort = e.target.value;
        this.sortByAge();
        break;
      case SORT_TYPE.AGEDOWN:
		this.selectedSort = e.target.value;
        this.sortByAge(false);
        break;
      case SORT_TYPE.NAMEDOWN:
		this.selectedSort = e.target.value;
        this.sortByName(false);
        break;
      case SORT_TYPE.NAMEUP:
		this.selectedSort = e.target.value;
        this.sortByName();
        break;
      case GENDER_MALE:
	  case GENDER_FEMALE:
	  case GENDER_ALL:
		this.selectedGender = e.target.value;
        this.filterByGender();
       }
  }
  sortByAge(asc = true) {
    this.hidePersons();
    this.friends = this.initialFriends;
    if (this.searchInput.value) {
      this.friends = this.getPersonsByText();
    }
    this.friends = this.getPersonsByGender();
    this.showPersons(this.getPersonsByAge(asc));
  }

  sortByName(asc = true) {
    this.hidePersons();
    this.friends = this.initialFriends;
    if (this.searchInput.value) {
      this.friends = this.getPersonsByText();
    }
    this.friends = this.getPersonsByGender();
    this.showPersons(this.getPersonsByName(asc));
  }

  getPersonsByName(asc) {
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

  getPersonsByAge(asc) {
    const result = asc
      ? this.friends.sort((a, b) => a.dob.age - b.dob.age)
      : this.friends.sort((a, b) => b.dob.age - a.dob.age);
    return result;
  }

  filterByGender() {
    this.friends = this.initialFriends;
    if (this.searchInput.value) {
      this.friends = this.getPersonsByText();
    }
    this.friends = this.getPersonsByGender();
    this.sortPersons();
    this.hidePersons();
    this.showPersons(this.friends);
  }

  sortPersons() {
    switch (this.selectedSort) {
      case SORT_TYPE.AGEUP:
        this.friends = this.getPersonsByAge();
        break;
      case SORT_TYPE.AGEDOWN:
        this.friends = this.getPersonsByAge(false);
        break;
      case SORT_TYPE.NAMEDOWN:
        this.friends = this.getPersonsByName(false);
        break;
      case SORT_TYPE.NAMEUP:
        this.friends = this.getPersonsByName();
    }
  }

  getPersonsByGender() {
    const result = this.friends.filter(
      function(person) {
        return (
          this.selectedGender === GENDER_ALL || person.gender === this.selectedGender 
        );
      }.bind(this)
    );
    return result;
  }

  getPersonsByText() {
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

  filterPersonsByText() {
    this.hidePersons();
    this.friends = this.initialFriends;
    if (this.searchInput.value) {
      this.friends = this.getPersonsByText();
    }
    this.friends = this.getPersonsByGender();
    this.sortPersons();
    this.showPersons(this.friends);
  }

  addEventsListeners() {
    this.searchInput.addEventListener("keyup", this.filterPersonsByText);
    this.sortGender.addEventListener("change", this.sort);
    this.sortAge.addEventListener("change", this.sort);
    this.sortName.addEventListener("change", this.sort);
    this.resetBtn.addEventListener("click", this.reset);
  }
}

new FriendApp();
