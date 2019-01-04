window.onload = () => {
    const link = "https://randomuser.me/api/?";
    let initData = [];
    let data = [];
    let defaultSearch = 'results=70&inc=gender,name,picture,location,dob,phone';

    const cardContainer = document.querySelector(".container");
    function request(reqString){
        fetch(link+reqString)
            .then(function(response) {
                response.json()
                    .then(users => {
                        initData = Array.from(users.results);
                        data = initData.slice();
                        console.log(initData);
                        insert(initData);
                    });
            });
    }


    function insert(data){
        console.log(data);
        cardContainer.innerHTML = "";
        let fragment = document.createDocumentFragment();
        data.forEach(profile => {
            let user = document.createElement("div");
            user.classList.add('flip-container', 'all', profile.gender);
            let gender = document.querySelector("input[name='gender-sort']:checked");
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
                <div class="back"><h3 >${profile.name.first+" "+profile.name.last}</h3>
                    <h5 class="age">${profile.dob.age}</h5>
                    <h5>${profile.location.city}</h5>
                    <h5>${profile.phone}</h5>
                </div>
              </div>`;
            fragment.appendChild(user);
        });
        cardContainer.appendChild(fragment);
    }

    document.getElementById("reset").addEventListener("click", function(){
        const forms = document.querySelectorAll('form');
        forms.forEach(function (item) {
            item.reset();
        });
        document.querySelector('main h1').classList.remove('show');
        insert(initData);
    });

    function noResults(){
        const flips = document.querySelectorAll('.flip-container');
        const flips_hidden = document.querySelectorAll('.flip-container.hidden');
        let no_result = document.querySelector('main h1');
        if (flips.length === flips_hidden.length){
            no_result.classList.add('show');
            // console.log('That\'s all folks! Nothing found...');
        } else {
            no_result.classList.remove('show');
        }
    }

    function showSearchResults(search){
        search = search.toLowerCase();
        const flips = document.querySelectorAll('.flip-container');
        flips.forEach(function (item) {
            let name = item.querySelector('.back h3').textContent;
            if (name.search(search) === -1){
                item.classList.add('hidden')
            } else {
                item.classList.remove('hidden'); //in case it was previously hidden
            }
            noResults();
        });
    }
    function searchName(){
        document.getElementById("form-search").addEventListener("submit", function(event){
            event.preventDefault();
            let searchValue = document.getElementById("name-search").value;
            showSearchResults(searchValue);
        });
    }
    function filters_init() {
        let genders = document.querySelectorAll("input[name='gender-sort']");
        genders.forEach(function (gender) {
            gender.addEventListener("change", function(){
                let flips = document.querySelectorAll('.flip-container');
                flips.forEach(function (item) {
                    // let name = item.querySelector('.back h3').textContent;
                    if (!item.classList.contains(gender.value)){
                        item.classList.add('hidden');
                        document.querySelector('main h1').classList.remove('show');
                    } else {
                        item.classList.remove('hidden'); //in case it was previously hidden
                        document.querySelector('main h1').classList.remove('show');
                    }
                    noResults();
                });
            });
        });

        let ages = document.querySelectorAll("input[name='age-sort']");
        ages.forEach(function (age) {
            age.addEventListener("change", function(){
                dataSort(age.value, 'age');
                document.querySelector('main h1').classList.remove('show');
            });
        });

        let names = document.querySelectorAll("input[name='name-sort']");
        names.forEach(function (name) {
            name.addEventListener("change", function(){
                dataSort(name.value, 'last');
                document.querySelector('main h1').classList.remove('show');
            });
        });

        function dataSort(sortOrder, param){
            console.log('data '+data);
            switch (param) {
                case 'last':
                    data.sort(sortByLastName);
                    break;
                case 'age':
                    data.sort(sortByAge);
                    break;
                    //some other params here
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

            insert(data);
        }
    }

    request(defaultSearch);
    console.log(initData);
    console.log(data);
    searchName();
    filters_init();

};
