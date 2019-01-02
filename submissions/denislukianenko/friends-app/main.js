let config = {
  apiUrl:
    "https://randomuser.me/api/?results=500&inc=gender,name,dob,picture&seed=00f84547aa823971",
  mainEl: document.getElementById("main"),
  colElements: [],
  nameInpEl: document.getElementById("name-filter"),
  ageInpEl: document.getElementById("age-filter")
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
  let min = 100;
  let max = 0;
  users.forEach(function(user) {
    if (user.dob.age < min) min = user.dob.age;
    if (user.dob.age > max) max = user.dob.age;
  });
  createAllColumns(min, 45, users);
}

function createAllColumns(min, max, users) {
  for (let i = min; i <= max; i++) {
    createColumn(i, users);
  }
  config.colElements = Array.from(document.getElementsByClassName("column"));
}

function createColumn(year, users) {
  let colArr = users.filter(function(user) {
    if (user.dob.age == year) return true;
  });
  if (colArr.length == 0) return;
  colArr.sort((a, b) =>
    a.name.first > b.name.first ? 1 : b.name.first > a.name.first ? -1 : 0
  );
  let personsHTML = "";
  colArr.forEach(function(user) {
    personsHTML += createPersonCard(user);
  });
  let addition = "";
  year == 21 ? (addition = "year") : null;

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

// ↓ I thought hiding columns outside of window would improve perfomence but it only became worse...

// config.mainEl.addEventListener(
//   "scroll",
//   throttle(function() {
//     let minAndMax = getVisibleAges();
//     let min = minAndMax[0];
//     let max = minAndMax[1];
//     setVisible(min, max);
//   })
// );

// function throttle(action) {
//   let isRunning = false;
//   return function() {
//     if (isRunning) return;
//     isRunning = true;
//     window.requestAnimationFrame(() => {
//       action();
//       isRunning = false;
//     });
//   };
// }

// function getVisibleAges() {
//   let min = Math.round((config.mainEl.scrollLeft + 50 - 120) / 120);
//   let max = Math.round(
//     (config.mainEl.scrollLeft + 50 + window.innerWidth) / 120
//   );
//   return [min, max];
// }

// function setVisible(min, max) {
//   config.colElements.forEach(function(el, index) {
//     if (index <= max && index >= min) {
//       el.classList.contains("column-hidden")
//         ? el.classList.remove("column-hidden")
//         : null;
//     } else {
//       !el.classList.contains("column-hidden")
//         ? el.classList.add("column-hidden")
//         : null;
//     }
//   });
// }

function toggleAges(el) {
  el.classList.toggle("button-active");
  config.mainEl.classList.toggle("main-reverse");
  config.mainEl.scrollLeft = 0;
}

function toggleAlphabeticOrder(el) {
  el.classList.toggle("button-active");
  config.colElements.forEach(function(el) {
    el.classList.toggle("column-reverse");
    el.getElementsByClassName("persons-list")[0].scrollTop = 0;
  });
}

function filterUsers(el) {
  let nameToFilter = config.nameInpEl.value.toLowerCase();
  let ageToFilter = config.ageInpEl.value;
  let filtered = users;
  if (!nameToFilter && !ageToFilter) {
    truncate();
    findAgeExtrema(users);
    return;
  }

  if (nameToFilter) {
    filtered = users.filter(function(el) {
      let result = false;
      if (
        el.name.first.includes(nameToFilter) ||
        el.name.last.includes(nameToFilter)
      )
        result = true;
      console.log(
        `Name ${el.name.first} ${
          el.name.last
        } includes ${nameToFilter}: ${result}`
      );
      return result;
    });
  }
  if (ageToFilter) {
    filtered = filtered.filter(function(el) {
      console.log(el);
      return el.dob.age >= ageToFilter;
    });
  }
  truncate();
  console.log(filtered);
  findAgeExtrema(filtered);
  console.log(nameToFilter, ageToFilter);
}

function truncate() {
  config.mainEl.innerHTML = "";
}
