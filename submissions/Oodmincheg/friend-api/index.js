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

const filterByString = (workList, string) => {
  return workList.filter(friend =>
    `${friend.name.first} ${friend.name.last} ${friend.email}`.includes(string)
  );
};

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
  let workList = [...originList];
  renderListOfFriends(originList);
  const buttonSortByNameDesc = document.getElementById("sort-by-name-desc");
  buttonSortByNameDesc.addEventListener("change", () =>
    //prettier-ignore
    renderListOfFriends(workList.sort((a, b) => desc(a.name.first, b.name.first)))
  );
  const buttonSortByNameAsc = document.getElementById("sort-by-name-asc");
  buttonSortByNameAsc.addEventListener("change", () =>
    renderListOfFriends(
      workList.sort((a, b) => asc(a.name.first, b.name.first))
    )
  );
  const buttonSortByAgeDesc = document.getElementById("sort-by-age-desc");
  buttonSortByAgeDesc.addEventListener("change", () =>
    renderListOfFriends(workList.sort((a, b) => desc(a.dob.age, b.dob.age)))
  );
  const buttonSortByAgeAsc = document.getElementById("sort-by-age-asc");
  buttonSortByAgeAsc.addEventListener("change", () =>
    renderListOfFriends(workList.sort((a, b) => asc(a.dob.age, b.dob.age)))
  );
  const buttonSortByMale = document.getElementById("sort-by-male");
  buttonSortByMale.addEventListener("change", () => {
    renderListOfFriends(originList.filter(friend => friend.gender === "male"));
  });
  const buttonSortByFemale = document.getElementById("sort-by-female");
  buttonSortByFemale.addEventListener("change", () => {
    renderListOfFriends(
      originList.filter(friend => friend.gender === "female")
    );
  });
  const buttonBothSexes = document.getElementById("both-sexes");
  buttonBothSexes.addEventListener("change", () => {
    renderListOfFriends(originList);
  });

  const inputSearchByName = document.getElementById("search-by-name");
  inputSearchByName.addEventListener("input", event => {
    resetSortButtons();
    workList = filterByString(originList, event.target.value);
    renderListOfFriends(workList);
  });
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    resetSearchInput();
    resetSortButtons();
    workList = [...originList];
    renderListOfFriends(originList);
  });
};

getFriends
  .then(response => response.json())
  .then(data => {
    renderPageWithListeners(data.results);
  });
