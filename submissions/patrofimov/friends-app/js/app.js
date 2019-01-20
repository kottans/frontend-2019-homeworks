class FriendApp {
  constructor() {
    this.persons = document.querySelector(".persons");
    this.filterInput = document.querySelector("#search");
    this.sortGender = document.querySelector("#sort-gender");
    this.sortAge = document.querySelector("#sort-age");
    this.sortName = document.querySelector("#sort-name");
    this.resetBtn = document.querySelector(".reset");
    this.friends = [];
    this.initialFriends = [];
    this.init();
    this.reset = this.reset.bind(this);
    this.sort = this.sort.bind(this);
    this.filterPersonsByInput = this.filterPersonsByInput.bind(this);
    this.addEventsListeners();
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
      this.addCardTopersons(this.createPersonCard(person));
    });
  }

  firstLetterToUpper(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  reset() {
    this.filterInput.value = "";
    this.hidePersons();
    this.friends = this.initialFriends;
    this.showPersons(this.friends);
  }

  createPersonCard(element) {
    let person = document.createElement("div");
    person.classList.add("person");

    let photo = document.createElement("div");
    photo.classList.add("person__photo");

    let photoImg = document.createElement("img");
    photoImg.classList.add("person__photo");
    photoImg.setAttribute("src", element.picture.large);
    photo.appendChild(photoImg);

    let fullName = document.createElement("div");
    fullName.classList.add("person__description");
    fullName.textContent = `${this.firstLetterToUpper(
      element.name.first
    )} ${this.firstLetterToUpper(element.name.last)}`;

    let location = document.createElement("div");
    location.classList.add("person__description");
    location.classList.add("person__location");
    location.textContent = this.firstLetterToUpper(element.location.city);

    let number = document.createElement("div");
    number.classList.add("person__number");
    number.classList.add("person__description");
    number.textContent = `Моб: ${element.cell}`;

    let age = document.createElement("div");
    age.classList.add("person__description");
    age.classList.add("person__age");
    age.textContent = `Возраст: ${element.dob.age}`;
    person.append(photo, fullName, location, age, number);
    return person;
  }

  addCardTopersons(card) {
    this.persons.appendChild(card);
  }

  hidePersons() {
    this.persons.innerHTML = "";
  }

  sort(e) {
    switch (e.target.value) {
      case "ageUp":
        this.filterByAge();
        break;
      case "ageDown":
        this.filterByAge(false);
        break;
      case "nameDown":
        this.filterByName(false);
        break;
      case "nameUp":
        this.filterByName();
        break;
      case "male":
        this.filterByGender("male");

        break;
      case "female":
        this.filterByGender("female");
    }
  }
  filterByAge(asc = true) {
    this.hidePersons();
    let friendsTemp;
    if (this.filterInput.value) {
      friendsTemp = this.getPersonsByInput();
    }
    friendsTemp = asc
      ? this.friends.sort((a, b) => a.dob.age - b.dob.age)
      : this.friends.sort((a, b) => b.dob.age - a.dob.age);
    this.showPersons(friendsTemp);
  }

  filterByName(asc = true) {
    let friendsTemp;
    if (this.filterInput.value) {
      friendsTemp = this.getPersonsByInput();
    }

    friendsTemp = asc
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
    this.hidePersons();
    this.showPersons(friendsTemp);
  }

  filterByGender(gender) {
    if (gender === "male") {
      if (this.filterInput.value) {
        this.friends = this.getPersonsByInput("male");
      } else {
        this.friends = this.initialFriends;
      }
      this.friends = this.friends.filter(person => person.gender === "male");
    } else if (gender === "female") {
      if (this.filterInput.value) {
        this.friends = this.getPersonsByInput();
      } else {
        this.friends = this.initialFriends;
      }
      if (this.filterInput.value) {
        this.friends = this.getPersonsByInput("female");
      }
      this.friends = this.friends.filter(person => person.gender === "female");
    } else {
      console.log("Polygender is not supported!");
    }
    this.hidePersons();
    this.showPersons(this.friends);
  }

  getPersonsByInput(gender) {
    let result = this.friends.filter(
      function(person) {
        return (
          person.name.first.includes(this.filterInput.value) == true ||
          person.name.last.indexOf(this.filterInput.value) == true
        );
      }.bind(this)
    );
    return result;
  }

  filterPersonsByInput() {
    if (!this.filterInput.value) {
      this.friends = this.initialFriends;
      this.hidePersons();
      this.showPersons(this.friends);
    } else {
      this.hidePersons();
      this.friends = this.getPersonsByInput();
      this.showPersons(this.friends);
    }
  }

  addEventsListeners() {
    this.filterInput.addEventListener("keyup", this.filterPersonsByInput);
    this.sortGender.addEventListener("change", this.sort);
    this.sortAge.addEventListener("change", this.sort);
    this.sortName.addEventListener("change", this.sort);
    this.resetBtn.addEventListener("click", this.reset);
  }
}

new FriendApp();
