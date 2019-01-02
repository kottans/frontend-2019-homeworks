let config = {
  apiUrl:
    "https://randomuser.me/api/?results=300&inc=gender,name,dob,picture&seed=00f84547aa823971",
  mainEl: document.getElementById("main"),
  colElements: [],
  nameInpEl: document.getElementById("name-filter"),
  ageInpEl: document.getElementById("age-filter"),
  paginator: 35,
  minAge: 100,
  maxAge: 0,
  filtered: []
};

let users = [];
fetch(config.apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    users = json.results;
    findAgeExtrema(users);
  })
  .catch(alert);

function findAgeExtrema(users) {
  users.forEach(function(user) {
    if (user.dob.age < config.minAge) config.minAge = user.dob.age;
    if (user.dob.age > config.maxAge) config.maxAge = user.dob.age;
  });
  createAllColumns(config.minAge, config.paginator, users);
}

function createAllColumns(min, max, users) {
  for (let i = min; i <= max; i++) {
    createColumn(i, users);
  }
  config.colElements = Array.from(document.getElementsByClassName("column"));
}

function compareNames(a, b) {
  if (a.name.first < b.name.first) return -1;
  if (a.name.first > b.name.first) return 1;
  return 0;
}

function createColumn(year, users) {
  let colArr = users.filter(user => user.dob.age === year);
  if (colArr.length == 0) return;
  colArr.sort(compareNames);
  let personsHTML = "";
  colArr.forEach(function(user) {
    personsHTML += createPersonCard(user);
  });
  let addition = year == config.minAge ? "year" : "";

  config.mainEl.innerHTML += `
    <div class="column">
      <h2>${year} ${addition}</h2>
      <div class="persons-list">${personsHTML}</div>
    </div>
  `;
}

function splitIntoChars(name) {
  let markup = "";
  name.split("").forEach(function(el, index) {
    markup += `
      <span class="char${index + 1}">${el}</span>
    `;
  });
  return markup;
}

function createPersonCard(person) {
  let name = person.name.first + " " + person.name.last;
  name = name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  let nameHTML = splitIntoChars(name);
  return `
    <div class="person">
      <div class=badge>
        <span class="char0">
          <span class="gender-symbol ${person.gender}"></span>
        </span>
        ${nameHTML}
      </div>
      <img src="${person.picture.large}" alt="">
    </div>
  `;
}

config.mainEl.addEventListener(
  "scroll",
  throttle(function() {
    if (getVisibleAges()) addContent();
  })
);

function throttle(action) {
  let isRunning = false;
  return function() {
    if (isRunning) return;
    isRunning = true;
    window.requestAnimationFrame(() => {
      action();
      isRunning = false;
    });
  };
}

function getVisibleAges() {
  return !(
    config.mainEl.scrollWidth -
    (config.mainEl.scrollLeft + config.mainEl.offsetWidth)
  );
}

function removeNoAnimation() {
  config.mainEl.classList.remove("no-animation");
}

function addContent() {
  config.mainEl.classList.add("no-animation");
  let toLoad = config.filtered.length ? config.filtered : users;
  createAllColumns(config.paginator + 1, config.paginator + 10, toLoad);
  config.paginator += 10;
}

function toggleAges(el) {
  el.classList.toggle("button-active");
  config.mainEl.classList.toggle("main-reverse");
  config.mainEl.scrollLeft = 0;
}

function toggleAlphabeticOrder(el) {
  el.classList.toggle("button-active");
  config.colElements.forEach(function(el) {
    el.classList.toggle("column-reverse");
    el.querySelector(".persons-list").scrollTop = 0;
  });
}

function filterUsers(el) {
  let nameToFilter = config.nameInpEl.value.toLowerCase();
  let ageToFilter = config.ageInpEl.value;
  config.filtered = users;
  if (!nameToFilter && !ageToFilter) {
    truncate();
    findAgeExtrema(users);
    return;
  }

  if (nameToFilter) {
    config.filtered = users.filter(function(el) {
      return (
        el.name.first.includes(nameToFilter) ||
        el.name.last.includes(nameToFilter)
      );
    });
  }
  if (ageToFilter) {
    config.filtered = config.filtered.filter(function(el) {
      return el.dob.age - ageToFilter;
    });
  }
  truncate();
  findAgeExtrema(config.filtered);
}

function truncate() {
  config.mainEl.innerHTML = "";
  removeNoAnimation();
}

config.nameInpEl.addEventListener("change", function(evt) {
  filterUsers(evt.target);
});
config.ageInpEl.addEventListener("change", function(evt) {
  filterUsers(evt.target);
});
