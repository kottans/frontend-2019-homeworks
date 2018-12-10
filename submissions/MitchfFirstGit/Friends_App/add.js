const RANDOM_FRIENDS_API_URL = "https://randomuser.me/api/?results=60&nat=us";
const section = document.querySelector(".allFriends");
const createFriend = friend => {
  let friendInfo = document.createElement("figure");
  let caption = document.createElement("figcaption");
  let image = document.createElement("img");
  let name = document.createElement("h2");
  let ageEmailPhoneStateCity = document.createElement("p");
  let gender = document.createElement("h3");
  name.textContent = `${firstLetterToUpperCase(
    friend.name.first
  )} ${firstLetterToUpperCase(friend.name.last)}`;
  ageEmailPhoneStateCity.innerHTML = `I have ${friend.dob.age} years old <br> ${
    friend.email
  } <br> ${friend.phone} <br> State: ${firstLetterToUpperCase(
    friend.location.state
  )}<br> City: ${firstLetterToUpperCase(friend.location.city)}<hr>`;
  gender.textContent = friend.gender.toUpperCase();
  friend.gender === "male"
    ? name.classList.add("man")
    : name.classList.add("woman");
  image.src = friend.picture.large;
  caption.appendChild(ageEmailPhoneStateCity);
  caption.appendChild(gender);
  friendInfo.appendChild(name);
  friendInfo.appendChild(image);
  friendInfo.appendChild(caption);
  section.appendChild(friendInfo);
};

const renderFriends = arrayFriends => {
  arrayFriends.forEach(friend => createFriend(friend));
  let data = {
    gender: "",
    ageOrName: "",
    searchField: ""
  };
  document.querySelector(".searchName").addEventListener("input", event => {
    data.searchField = event.target.value;
    sortFriends(data, arrayFriends);
  });
  document.querySelector("[type=reset]").addEventListener("click", event => {
    section.innerHTML = "";
    data = {
      gender: "",
      ageOrName: "",
      searchField: ""
    };
    arrayFriends.forEach(friend => createFriend(friend));
  });

  document.querySelector(".search").addEventListener("change", event => {
    if (event.target.name == "gender") data.gender = event.target.value;

    if (event.target.name == "sort") data.ageOrName = event.target.value;

    sortFriends(data, arrayFriends);
  });
};

const sortFriends = (data, arrayFriends) => {
  let arraySortFriends = [...arrayFriends];

  section.innerHTML = "";

  if (data.gender == "genderMale")
    arraySortFriends = arraySortFriends.filter(
      friend => friend.gender === "male"
    );
  else if (data.gender == "genderFemale")
    arraySortFriends = arraySortFriends.filter(
      friend => friend.gender === "female"
    );

  if (data.ageOrName === "ageAsc")
    arraySortFriends.sort((b, a) => (b.dob.age < a.dob.age ? -1 : 1));
  else if (data.ageOrName === "ageDesc")
    arraySortFriends.sort((a, b) => (b.dob.age < a.dob.age ? -1 : 1));
  else if (data.ageOrName === "nameAsc")
    arraySortFriends.sort((b, a) => (b.name.first < a.name.first ? -1 : 1));
  else if (data.ageOrName === "nameDesc")
    arraySortFriends.sort((a, b) => (b.name.first < a.name.first ? -1 : 1));

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

const firstLetterToUpperCase = word => {
  let newWord = "";
  for (let i = 0; i < word.length; i++) {
    newWord += word[i - 1] == " " || i === 0 ? word[i].toUpperCase() : word[i];
  }
  return newWord;
};