const RANDOM_FRIENDS_API_URL = "https://randomuser.me/api/?results=60&nat=us";
const section = document.querySelector(".all-friends");
const createFriend = friend => {
  let friendInfo = document.createElement("figure");
  let caption = document.createElement("figcaption");
  let image = document.createElement("img");
  let name = document.createElement("h2");
  let ageEmailPhoneStateCity = document.createElement("p");
  let gender = document.createElement("h3");
  name.textContent = `${friend.name.first} ${friend.name.last}`;
  ageEmailPhoneStateCity.innerHTML = `I have ${friend.dob.age} years old <br> ${
    friend.email
  } <br> ${friend.phone} <br> State: <span>${
    friend.location.state
  } </span><br> City: <span>${friend.location.city}</span><hr>`;
  gender.textContent = friend.gender;
  friend.gender === "male"
    ? name.classList.add("man")
    : name.classList.add("woman");
  image.src = friend.picture.large;
  caption.append(ageEmailPhoneStateCity, gender);
  friendInfo.append(name, image, caption);
  section.appendChild(friendInfo);
};

const renderFriends = arrayFriends => {
  arrayFriends.forEach(createFriend);
  //arrayFriends.forEach(friend => createFriend(friend));
  let data = {
    gender: "",
    ageOrName: "",
    searchField: ""
  };
  document
    .querySelector(".search-by-input")
    .addEventListener("input", event => {
      data.searchField = event.target.value;
      sortFriends(data, arrayFriends);
    });
  document.querySelector("[type=reset]").addEventListener("click", event => {
    data = {
      gender: "",
      ageOrName: "",
      searchField: ""
    };
    sortFriends(data, arrayFriends);
  });

  document.querySelector(".search").addEventListener("change", event => {
    if (event.target.name === "gender") data.gender = event.target.value;

    if (event.target.name === "sort") data.ageOrName = event.target.value;

    sortFriends(data, arrayFriends);
  });
};

const sortFriends = (data, arrayFriends) => {
  let arraySortFriends = [...arrayFriends];

  section.innerHTML = "";

  if (data.gender === "male")
    arraySortFriends = arraySortFriends.filter(
      friend => friend.gender === "male"
    );
  else if (data.gender === "female")
    arraySortFriends = arraySortFriends.filter(
      friend => friend.gender === "female"
    );

  switch (data.ageOrName) {
    case "ageAsc":
      arraySortFriends.sort((b, a) => (b.dob.age < a.dob.age ? -1 : 1));
      break;
    case "ageDesc":
      arraySortFriends.sort((a, b) => (b.dob.age < a.dob.age ? -1 : 1));
      break;
    case "nameAsc":
      arraySortFriends.sort((b, a) => (b.name.first < a.name.first ? -1 : 1));
      break;
    case "nameDesc":
      arraySortFriends.sort((a, b) => (b.name.first < a.name.first ? -1 : 1));
  }

  if (data.searchField)
    arraySortFriends = arraySortFriends.filter(
      friend =>
        friend.name.first.includes(data.searchField) ||
        friend.name.last.includes(data.searchField) ||
        friend.location.state.includes(data.searchField) ||
        friend.location.city.includes(data.searchField)
    );

  arraySortFriends.forEach(friend => createFriend(friend));
};

fetch(RANDOM_FRIENDS_API_URL)
  .then(resp => resp.json())
  .then(data => {
    renderFriends(data.results);
  });
