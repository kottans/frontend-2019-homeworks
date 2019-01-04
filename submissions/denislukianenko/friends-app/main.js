let config = {
  apiUrl:
    "https://randomuser.me/api/?results=300&inc=gender,name,dob,picture&seed=00f84547aa823971",
  mainEl: document.getElementById("main"),
  colElements: [],
  nameInputElement: document.getElementById("name-filter"),
  ageInputElement: document.getElementById("age-filter"),
  ageToggleElement: document.getElementById("age-toggle"),
  abcToggleElement: document.getElementById("abc-toggle"),
  paginator: 35,
  paginatorIncrement: 10,
  minAge: 100,
  maxAge: 0,
  filtered: []
};

document.create;

let users = [];

fetch(config.apiUrl)
  .then(handleErrors)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    users = json.results;
    findAgeExtrema(users);
  })
  .catch(error => console.log(error));

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

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
  let personsHTML = colArr
    .map(function(user) {
      return createPersonCard(user);
    })
    .join("");
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

function wrapWithSpan(letters) {
  let result = "";
  letters.forEach(function(letter) {
    result += `<span>${letter}</span>`;
  });
  return result;
}
function capitalizeLetters(firstName, lastName) {
  const names = `${firstName} ${lastName}`.split(" ");
  const spans = names
    .map(name => {
      const [firstLetter, ...tail] = name.split("");
      return [
        `<span class='uppercase'>${firstLetter}</span>`,
        ...wrapWithSpan(tail)
      ].join("");
    })
    .join("<span> </span>");
  console.log(spans);
  return spans;
}

function createPersonCard(person) {
  let nameHTML = capitalizeLetters(person.name.first, person.name.last);
  return `
    <div class="person">
      <div class=badge>
        <span>
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
  createAllColumns(
    config.paginator + 1,
    config.paginator + config.paginatorIncrement,
    toLoad
  );
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
  let nameToFilter = config.nameInputElement.value.toLowerCase();
  let ageToFilter = config.ageInputElement.value;
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
    config.paginator = ageToFilter * 1 + 10;
    console.log(config.paginator);
    config.filtered = config.filtered.filter(function(el) {
      return el.dob.age >= ageToFilter;
    });
  }
  truncate();
  findAgeExtrema(config.filtered);
}

function truncate() {
  config.mainEl.innerHTML = "";
  removeNoAnimation();
}

config.nameInputElement.addEventListener("change", function(evt) {
  filterUsers(evt.target);
});
config.ageInputElement.addEventListener("change", function(evt) {
  filterUsers(evt.target);
});
config.ageToggleElement.addEventListener("click", function(evt) {
  toggleAges(evt.target);
});
config.abcToggleElement.addEventListener("click", function(evt) {
  toggleAlphabeticOrder(evt.target);
});
