const URL_FRIENDS_API = "https://randomuser.me/api/?results=40";
const getFriends = fetch(URL_FRIENDS_API);

const createCardOfFreind = friend => {
  const friendProfile = document.createElement("figure");
  const image = document.createElement("img");
  image.setAttribute("src", friend.picture.large);
  const caption = document.createElement("figcaption");
  //prettier-ignore
  let name  = document.createElement("p")
  name.textContent = `${friend.name.first} ${friend.name.last}`;
  let age = document.createElement("p");
  age.textContent = `age ${friend.dob.age}`;
  let email = document.createElement("a");
  let br = document.createElement("br");
  email.textContent = `${friend.email}`;
  caption.append(name, age, email);
  friendProfile.append(image, caption);
  return friendProfile;
};

const renderListOfFriends = arrayOfFreinds => {
  const content = document.getElementById("content");
  content.innerHTML = "";
  arrayOfFreinds.forEach(friend => {
    content.append(createCardOfFreind(friend));
  });
};

const desc = (a, b) => {
  if (a < b) {
    return 1;
  } else {
    return -1;
  }
};

const asc = (a, b) => {
  if (a < b) {
    return -1;
  } else {
    return 1;
  }
};

/*const filterByString = (workList, string) => {
  return workList.filter(friend =>
    `${friend.name.first} ${friend.name.last} ${friend.email}`.includes(string)
  );
};*/

const resetSortButtons = () => {
  document
    .querySelectorAll("input[type=radio]")
    .forEach(radio => (radio.checked = false));
  document.getElementById("both-sexes").checked = true;
};

const resetSearchInput = () => {
  document.getElementById("search-by-name").value = "";
};

const renderPageWithListeners = originList => {
  renderListOfFriends(originList);
  let dataState = {
    sortBy: null,
    sexFilter: null,
    searchFilter: null
  };

  document.getElementById("sortPanel").addEventListener("change", event => {
    switch (event.target.id) {
      case "sort-by-name-asc":
        dataState.sortBy = "nameAsc";
        break;
      case "sort-by-name-desc":
        dataState.sortBy = "nameDesc";
        break;
      case "sort-by-age-asc":
        dataState.sortBy = "ageAsc";
        break;
      case "sort-by-age-desc":
        dataState.sortBy = "ageDesc";
        break;
      case "sort-by-male":
        dataState.sexFilter = "male";
        break;
      case "sort-by-female":
        dataState.sexFilter = "female";
        break;
      case "both-sexes":
        dataState.sexFilter = null;
        break;
    }
    renderListOfFriends(prepareDataToRender(originList, dataState));
  });

  const inputSearchByName = document.getElementById("search-by-name");
  inputSearchByName.addEventListener("input", event => {
    dataState.searchFilter = event.target.value;
    renderListOfFriends(prepareDataToRender(originList, dataState));
  });
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    resetSearchInput();
    resetSortButtons();
    for (k in dataState) {
      dataState[k] = null;
    }
    renderListOfFriends(originList);
  });
};

getFriends
  .then(response => response.json())
  .then(data => {
    renderPageWithListeners(data.results);
  });

const prepareDataToRender = (data, dataState) => {
  let outData = data.slice();
  if (dataState.searchFilter) {
    outData = outData.filter(({ name, email }) =>
      [name.first, name.last, email].join(" ").includes(dataState.searchFilter)
    );
  }
  if (dataState.sexFilter) {
    outData = outData.filter(({ gender }) => gender === dataState.sexFilter);
  }
  return dataState.sortBy ? sorter[dataState.sortBy](outData) : outData;
};

const sorter = {
  nameAsc: friendsArray => {
    return friendsArray.sort((a, b) => asc(a.name.first, b.name.first));
  },
  nameDesc: friendsArray => {
    return friendsArray.sort((a, b) => desc(a.name.first, b.name.first));
  },
  ageAsc: friendsArray => {
    return friendsArray.sort((a, b) => asc(a.dob.age, b.dob.age));
  },
  ageDesc: friendsArray => {
    return friendsArray.sort((a, b) => desc(a.dob.age, b.dob.age));
  }
};
