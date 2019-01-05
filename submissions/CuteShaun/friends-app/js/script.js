(function() {
  const URL = "https://randomuser.me/api/?results=32";
  const main = document.getElementById("main");
  const sortNameBtn = document.getElementById("sort-name");
  const sortAgeBtn = document.getElementById("sort-age");
  const filterAgeBtn = document.getElementById("filter-age");
  const filterNameBtn = document.getElementById("filter-name");
  const ageInput = document.getElementById("age-input");
  const nameInput = document.getElementById("name-input");
  const resetBtn = document.getElementById("reset");
  let DATA = [];
  let html;
  let count = 0;

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

  function sortAge(data) {
    let sortArr = [...data];
    count++;

    if (count % 2 !== 0) {
      sortArr.sort((a, b) => {
        if (a.dob.age < b.dob.age) return -1;
        else if (a.dob.age > b.dob.age) return 1;
        return 0;
      });
      appendData(sortArr);
    } else {
      sortArr.sort((a, b) => {
        if (a.dob.age < b.dob.age) return 1;
        else if (a.dob.age > b.dob.age) return -1;
        return 0;
      });
      appendData(sortArr);
    }
  }

  function sortName(data) {
    let sortArr = [...data];
    sortArr.sort((a, b) => {
      let nA = a.name.first.toLowerCase();
      let nB = b.name.first.toLowerCase();

      if (nA < nB) return -1;
      else if (nA > nB) return 1;
      return 0;
    });
    appendData(sortArr);
  }

  function filterAge(data) {
    let inputVal = ageInput.value;
    let filterArr = [...data];

    filterArr = filterArr.filter(
      item => String(item.dob.age).indexOf(inputVal) === 0
    );
    appendData(filterArr);
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

    sortNameBtn.addEventListener("click", () => sortName(data));
    sortAgeBtn.addEventListener("click", () => sortAge(data));
    filterAgeBtn.addEventListener("click", () => filterAge(data));
    filterNameBtn.addEventListener("click", () => filterName(data));
    resetBtn.addEventListener("click", () => reset(data));
  }
})();
