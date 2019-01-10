window.onload = () => {
    const link = "https://randomuser.me/api/?";
    let usersInitData = [];
    let usersData = [];
    const defaultSearch = 'results=70&inc=gender,name,picture,location,dob,phone';

    const cardContainer = document.querySelector(".container");
    const gender = document.querySelector("input[name='gender-sort']:checked");

    function request(reqString){
        fetch(link+reqString)
            .then(function(response) {
                response.json()
                    .then(users => {
                        usersInitData = users.results;
                        usersData = usersInitData.slice();
                        insert(usersInitData);
                    });
            }).catch(function (){
                console.log("Oops! Looks like there is a problem");
        });
    }
    function createUserCard(profile){
        let fragment = document.createDocumentFragment();
        let user = document.createElement("div");
        user.classList.add('flip-container', 'all', profile.gender);
        if (gender !== null){
            if (gender.value !== profile.gender){
                user.classList.add('hidden');
            } else {
                user.classList.remove('hidden');
            }
        }
        user.innerHTML = `
              <div class="flipper">
                <div class="front">
                    <img class="avatar" src=${profile.picture.large} alt=${profile.gender}>
                </div>
                <div class="back"><h3 >${profile.name.first} ${profile.name.last}</h3>
                    <h5 class="age">${profile.dob.age}</h5>
                    <h5>${profile.location.city}</h5>
                    <h5>${profile.phone}</h5>
                </div>
              </div>`;
        fragment.appendChild(user);
        cardContainer.appendChild(fragment);
    }

    function insert(data){
        cardContainer.innerHTML = "";
        data.forEach(createUserCard);
    }

    document.getElementById("reset").addEventListener("click", function(){
        document.querySelectorAll('form').forEach(function (item) {
            item.reset();
        });
        document.querySelector('main h1').classList.remove('show');
        insert(usersInitData);
    });

    function noResults(){
        const flips = document.querySelectorAll('.flip-container');
        const flips_hidden = document.querySelectorAll('.flip-container.hidden');
        let no_result = document.querySelector('main h1');
        if (flips.length === flips_hidden.length){
            no_result.classList.add('show');
        } else {
            no_result.classList.remove('show');
        }
    }

    function showSearchResults(search){
        search = search.toLowerCase();
        document.querySelectorAll('.flip-container').forEach(function (item) {
            const name = item.querySelector('.back h3').textContent;
            if (name.includes(search)){
                item.classList.remove('hidden')
            } else {
                item.classList.add('hidden');
            }
            noResults();
        });
    }
    function searchName(){
        document.getElementById("form-search").addEventListener("submit", function(event){
            event.preventDefault();
            let searchValue = event.target.elements[0].value;
            showSearchResults(searchValue);
        });
    }
    function filtersInit() {
        document.querySelectorAll("input[name='gender-sort']").forEach(function (gender) {
            gender.addEventListener("change", function(){
                document.querySelectorAll('.flip-container').forEach(function (item) {
                    if (!item.classList.contains(gender.value)){
                        item.classList.add('hidden');
                        document.querySelector('main h1').classList.remove('show');
                    } else {
                        item.classList.remove('hidden');
                    }
                document.querySelector('main h1').classList.remove('show');
                    noResults();
                });
            });
        });

        document.querySelectorAll("input[name='age-sort']").forEach(function (age) {
            age.addEventListener("change", function(){
                dataSort(age.value, 'age');
                document.querySelector('main h1').classList.remove('show');
            });
        });

        document.querySelectorAll("input[name='name-sort']").forEach(function (name) {
            name.addEventListener("change", function(){
                dataSort(name.value, 'last');
                document.querySelector('main h1').classList.remove('show');
            });
        });

        function dataSort(sortOrder, param){
            switch (param) {
                case 'last':
                    usersData.sort(sortByLastName);
                    break;
                case 'age':
                    usersData.sort(sortByAge);
                    break;
            }

            function sortByLastName(a, b) {
                if (a.name.last === b.name.last) {
                    return 0;
                }
                else {
                    if (sortOrder === 'az'){
                        return (a.name.last < b.name.last) ? -1 : 1;
                    } else {
                        return (a.name.last > b.name.last) ? -1 : 1;
                    }
                }
            }
            function sortByAge(a, b) {
                if (a.dob.age === b.dob.age) {
                    return 0;
                }
                else {
                    if (sortOrder === 'az'){
                        return a.dob.age - b.dob.age;
                    } else {
                        return b.dob.age - a.dob.age;
                    }
                }
            }

            insert(usersData);
        }
    }

    request(defaultSearch);
    searchName();
    filtersInit();

};
