window.onload = () => {
  let data = [];
  let sort = { order: null, gender: null, text: null };
  let sortedData = data;
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
        sortedData = data;
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });

  const render = data => {
    cardContainer.innerHTML = "";
    let fragment = document.createDocumentFragment();
    data.forEach(user => {
      let card = document.createElement("div");
      card.classList.add(`card`, `${user.gender}`);
      card.innerHTML = `
      <img class="gravatar" src=${user.picture.large} alt=${user.gender}>
      <h3 >${user.name.first}</h3><h3>${user.name.last}</h3>
      <h5 class="age">${user.dob.age}</h5>
      <p class="cell">${user.cell}</p>
      <p class="email">${user.email}</p>`;
      fragment.appendChild(card);
    });
    cardContainer.appendChild(fragment);
  };

  const ascending = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
  const descending = (a, b) => (b > a ? 1 : b < a ? -1 : 0);

  const orderingData = order => {
    switch (order) {
      case "ascendingAge":
        sortedData = sortedData.sort((a, b) => ascending(a.dob.age, b.dob.age));
        break;
      case "descendingAge":
        sortedData = sortedData.sort((a, b) =>
          descending(a.dob.age, b.dob.age)
        );
        break;
      case "ascendingFirstName":
        sortedData = sortedData.sort((a, b) =>
          ascending(a.name.first, b.name.first)
        );
        break;
      case "descendingFirstName":
        sortedData = sortedData.sort((a, b) =>
          descending(a.name.first, b.name.first)
        );
        break;
    }
  };

  const filteringData = () => {
    let filteredData = sortedData;
    if (sort.text) {
      filteredData = sortedData.filter(user =>
        `${user.name.first}${user.name.last}${user.dob.age}${user.cell}${user.email}`.includes(sort.text)
      );
    }
    if (sort.gender) {
      filteredData = sortedData.filter(user => {
        return user.gender === sort.gender;
      });
    }
    render(filteredData);
  };

  document.getElementById("nav").addEventListener("change", evt => {
    orderingData(evt.target.name === "order by" ? evt.target.value : ``);
    if (evt.target.name === "gender") {
      sort.gender = evt.target.value ==="all" ? null: evt.target.value;
    }
    filteringData();
  });

  document.getElementById("myInput").addEventListener("keyup", evt => {
    sort.text = evt.target.value;
    filteringData();
  });
};
