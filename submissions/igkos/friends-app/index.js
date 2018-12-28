window.onload = () => {
  let data = [];
  let sort = { text: ``, gender: `` };
  const cardContainer = document.querySelector(".container");
  fetch("https://randomuser.me/api/?results=50")
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(users => {
        data = Array.from(users.results);
        //console.log(data);
        render(data);
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
  const render = data => {
    cardContainer.innerHTML = "";
    let fragment = document.createDocumentFragment();
    data.forEach(arr => {
      let card = document.createElement("div");
      card.classList.add(`card`, `${arr.gender}`);
      card.innerHTML = `
      <img class="gravatar" src=${arr.picture.large} alt=${arr.gender}>
      <h3 >${arr.name.first}</h3><h3>${arr.name.last}</h3>
      <h5 class="age">${arr.dob.age}</h5>
      <p class="cell">${arr.cell}</p>
      <p class="email">${arr.email}</p>`;
      fragment.appendChild(card);
    });
    cardContainer.appendChild(fragment);
  };

  const ascending = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
  const descending = (a, b) => (b > a ? 1 : b < a ? -1 : 0);

  const sortData = sortType => {
    let sortedData = data;
    switch (sortType) {
      case "ascendingAge":
        render(sortedData.sort((a, b) => ascending(a.dob.age, b.dob.age)));
        break;
      case "descendingAge":
        render(sortedData.sort((a, b) => descending(a.dob.age, b.dob.age)));
        break;
      case "ascendingFirstName":
        render(
          sortedData.sort((a, b) => ascending(a.name.first, b.name.first))
        );
        break;
      case "descendingFirstName":
        render(
          sortedData.sort((a, b) => descending(a.name.first, b.name.first))
        );
        break;
      default:
        render(data);
        break;
    }
  };

  document.getElementById("nav").addEventListener("change", evt => {
    if (evt.target.name === "order by") {
      sortData(evt.target.value);
    }
    if (evt.target.name === "gender") {
      sort.gender = evt.target.value;
    }
    dynamicSearch(sort);
  });

  document.getElementById("myInput").addEventListener("keyup", evt => {
    sort.text = evt.target.value;
    dynamicSearch(sort);
  });

  const dynamicSearch = sort => {
    let filter = sort.text.toUpperCase();
    let hideGender = (sort.gender === `male`)? `female`:(sort.gender === `female`)? `male` : null;
    let cards = document.querySelectorAll(`.card`);
    cards.forEach(card => {
      card.textContent.toUpperCase().indexOf(filter) > -1 && !card.classList.contains(hideGender)
        ? (card.style.display = "")
        : (card.style.display = "none");
    });
  };
};
