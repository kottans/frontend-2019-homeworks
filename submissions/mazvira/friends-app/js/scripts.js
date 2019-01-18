const FRIENDS_API = "https://randomuser.me/api/?results=42";
const getUsers = fetch(FRIENDS_API)
    .then(response => response.json())
    .then(data => {
        createListOfUsers(data.results);
        addFilteringAndSearchingListeners(data.results);
    })
    .catch(error => console.log('Error!!!'));
;

const createProfileOfUser = function (user) {
    const userProfile = document.createElement("figure");
    const image = document.createElement("img");
    image.setAttribute("src", user.picture.large);
    const caption = document.createElement("figcaption");
    let name = document.createElement("p");
    name.innerHTML = `${user.name.first} ${user.name.last}`;
    let age = document.createElement("p");
    age.innerHTML = `${user.dob.age}`;
    let email = document.createElement("a");
    email.innerHTML = `${user.email}`;
    caption.append(name, age, email);
    userProfile.append(image, caption);
    return userProfile;
};

const createListOfUsers = function (usersList) {
    const users = document.getElementById("users");
    users.innerHTML = "";
    usersList.forEach(user => {
        users.append(createProfileOfUser(user));
    });
};

const addFilteringAndSearchingListeners = function (userList) {
    let filterState = {
        byGender: null,
        byAgeOrName: null,
        bySearch: null
    };

    document.getElementById("filterPanel").addEventListener("click", ({target}) => {
        if (target.dataset.byGender || target.dataset.byGender === "all") {
            filterState.byGender = target.dataset.byGender;
        }
        if (target.dataset.byAgeOrName) {
            filterState.byAgeOrName = target.dataset.byAgeOrName;
        }

        createListOfUsers(filterUsers(userList, filterState));
    });

    const inputSearch = document.getElementById("search");
    inputSearch.addEventListener("input", event => {
        filterState.bySearch = event.target.value;
        createListOfUsers(filterUsers(userList, filterState));
    });

    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
        resetInput();
        resetFilteringButtons(filterState);
        createListOfUsers(userList);
    });
};

const filterUsers = (users, filterState) => {
    let filteredUsers = users.slice();

    if (filterState.bySearch) {
        filteredUsers = filteredUsers.filter(({name, email}) =>
            [name.first, name.last, email].join(" ").includes(filterState.bySearch)
        );
    }

    if (filterState.byGender) {
        filteredUsers = filteredUsers.filter(({gender}) => gender === filterState.byGender);
    }

    if (filterState.byAgeOrName) {
        filteredUsers = sortByNameOrAge(filterState.byAgeOrName, filteredUsers);
    }
    return filteredUsers;
};

const sortByNameOrAge = function (state, users) {
    switch (state) {
        case 'nameAsc' :
            return users.sort((a, b) => {
                if (a.name.first < b.name.first) return -1; else return 1;
            });
        case 'nameDesc' :
            return users.sort((a, b) => {
                if (a.name.first < b.name.first) return 1; else return -1
            });
        case 'ageAsc' :
            return users.sort((a, b) => {
                if (a.dob.age < b.dob.age) return -1; else return 1;
            });
        case 'ageDesc' :
            return users.sort((a, b) => {
                if (a.dob.age < b.dob.age) return 1; else return -1;
            });
    }
};

const resetFilteringButtons = function (filterState) {
    for (i in filterState) {
        filterState[i] = null;
    }

    document
        .querySelectorAll("input[type=radio]")
        .forEach(radio => (radio.checked = false));
    document.getElementById("all").checked = true;
};

const resetInput = function () {
    document.getElementById("search").value = "";
};

getUsers();

