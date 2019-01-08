(function() {
  const URL = "https://randomuser.me/api/?results=100";
  const main = document.getElementById("card-container");
  const sortNameBtn = document.getElementById("sort-name");
  const sortAgeBtn = document.getElementById("sort-age");
  const filterAgeBtn = document.getElementById("filter-age");
  const filterNameBtn = document.getElementById("filter-name");
  const ageInput = document.getElementById("age-input");
  const nameInput = document.getElementById("name-input");
  const resetBtn = document.getElementById("reset");
  let DATA = [];
  let html;
  let sortBy = "asc";

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  fetch(URL)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      DATA = data.results;
      render(DATA);
    });

  function appendData(data) {
    html = data
      .map(item => {
        return `<div class="card">
        <img class="card__img" src="${
          item.picture.large
        }" alt="person list item" />
        <h2 class="card__name green">${item.name.first} ${item.name.last}</h2>

        <div class="card__text">
            <p class="card__age"><span class="green">Age: </span>${
              item.dob.age
            }</p>
            <p class="card__email"><span class="green">Email: </span>${
              item.email
            }</p>
            <p class="card__phone"><span class="green">Phone: </span>${
              item.phone
            }</p> 
        </div>
      </div>`;
      })
      .join(" ");

    main.innerHTML = html;
  }

  function sort(data, switcher) {
    let sortArr = [...data];
    let currentValA;
    let currentValB;

    sortArr.sort((a, b) => {
      if (switcher !== "name") {
        currentValA = a.dob.age;
        currentValB = b.dob.age;
      } else {
        currentValA = a.name.first.toLowerCase();
        currentValB = b.name.first.toLowerCase();
      }

      if (currentValA < currentValB) return -1;
      else if (currentValA > currentValB) return 1;
      return 0;
    });

    sortBy === "desc" ? appendData(sortArr.reverse()) : appendData(sortArr);
    if (sortBy === "asc") {
      sortBy = "desc";
    } else {
      sortBy = "asc";
    }
  }

  function filterAge(data) {
    let inputVal = ageInput.value;
    let filterArr = [...data];

    filterArr = filterArr.filter(item => String(item.dob.age) === inputVal);

    inputVal === "" ? "" : appendData(filterArr);
  }

  function filterName(data) {
    let inputVal = nameInput.value.toLowerCase();
    let filterArr = [...data];
    filterArr = filterArr.filter(
      item => item.name.first.toLowerCase().indexOf(inputVal) === 0
    );
    appendData(filterArr);
  }

  function reset(data) {
    appendData(data);
  }

  function render(data) {
    appendData(data);

    sortNameBtn.addEventListener("click", () => sort(data, "name"));
    sortAgeBtn.addEventListener("click", () => sort(data, "age"));
    filterAgeBtn.addEventListener("click", () => filterAge(data));
    filterNameBtn.addEventListener("click", () => filterName(data));
    resetBtn.addEventListener("click", () => reset(data));
  }
})();
