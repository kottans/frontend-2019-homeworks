class FriendApp {
    constructor() {
        this.sortBox = document.querySelector('.sortbox');
        this.peoples = document.querySelector('.peoples');
        this.resetBtn = document.querySelector('.sortbox__resetBtn');
        this.sortInput = document.querySelector('.sortbox__sortedInput');
        this.sortIconMale = document.querySelector('.fa-male');
        this.sortIconFemale = document.querySelector('.fa-female');
        this.friends = [];
        this.startData = [];

        this.init();

        this.resetPeople = this.resetPeople.bind(this);
        this.sort = this.sort.bind(this);
        this.renderSortedByInput = this.renderSortedByInput.bind(this);
        this.addEventsListeners();
    }

    init() {
        this.getResFromServer();
    }
    getResFromServer(){
        fetch('https://randomuser.me/api/?results=100', {
            method: "GET"
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.startData = res.results;
                this.friends = res.results;
                this.generatePeoples(this.friends);
            })
            .catch(err => {
                console.log(err);
            })
    }
    generatePeoples(data) {
        data.forEach(onePeople => {
            this.addCardToPeoples(this.generateOnePeopleCard(onePeople));
        })
    }

    makeFirstLetterUpper(str) {
        return str[0].toUpperCase() + str.slice(1);
    }


    resetPeople() {
        this.sortIconFemale.classList.remove('disabled');
        this.sortIconFemale.classList.remove('nonActive');
        this.sortIconMale.classList.remove('disabled');
        this.sortIconMale.classList.remove('nonActive');
        this.sortInput.value = '';
        this.clearPeoplesForm();
        this.friends = this.startData;
        this.generatePeoples(this.friends);
    }

    generateOnePeopleCard(obj) {
        let onePeople = document.createElement('div');
        onePeople.classList.add('onePeople');

        let avatar = document.createElement(('div'));
        avatar.classList.add('onePeople__avatar');

        let avatarImg = document.createElement('img');
        avatarImg.classList.add('onePeople__avatarImage');
        avatarImg.setAttribute('src', obj.picture.large);
        avatar.appendChild(avatarImg);

        let fullName = document.createElement('div');
        fullName.classList.add('onePeople__fullName');
        fullName.classList.add('onePeople__description');
        fullName.textContent = `${this.makeFirstLetterUpper(obj.name.first)} ${this.makeFirstLetterUpper(obj.name.last)}`;

        let location = document.createElement('div');
        location.classList.add('onePeople__description');
        location.classList.add('onePeople__location');
        location.textContent = this.makeFirstLetterUpper(obj.location.city);

        let number = document.createElement('div');
        number.classList.add('onePeople__number');
        number.classList.add('onePeople__description');
        number.textContent = `Моб: ${(obj.cell)}`;

        let age = document.createElement('div');
        age.classList.add('onePeople__description');
        age.classList.add('onePeople__age');
        age.textContent = `Возраст: ${(obj.dob.age)}`;


        onePeople.append(avatar,fullName,location,age,number);



        return onePeople;
    }

    addCardToPeoples(card) {
        this.peoples.appendChild(card);
    }

    clearPeoplesForm() {
        this.peoples.innerHTML = '';
    }

    sort(e) {
        if (e.target.classList.contains('fas')) {
            switch (e.target.dataset.type) {
                case "ageUp":
                    this.filterByAgeUp();
                    break;
                case "ageDown":
                    this.filterByAgeDown();
                    break;
                case "nameDown":
                    this.filterByNameDown();
                    break;
                case "nameUp":
                        this.filterByNameUp();
                    break;
                case "male":
                       this.filterByGender('male');

                    break;
                case "female":
                   this.filterByGender('female');
            }
        }
    }
    filterByAgeUp(){
        this.clearPeoplesForm();
         let res;
        if(this.sortInput.value){
            res =  this.filterByInputAll();
        }
        res = this.friends.sort((a,b)=> a.dob.age - b.dob.age);
        this.generatePeoples(res);

    }
    filterByAgeDown(){
        let res;
        if(this.sortInput.value){
            res =  this.filterByInputAll();
        }
        res = this.friends.sort((a,b)=>b.dob.age - a.dob.age);
        this.clearPeoplesForm();
        this.generatePeoples(res);



    }
    filterByNameDown(){
        let res;
        if(this.sortInput.value){
            res =  this.filterByInputAll();
        }
        res = this.friends.sort(function (a, b) {
            if (a.name.first < b.name.first) {
                return -1;
            }
            if (a.name.first > b.name.first) {
                return 1;
            }
            return 0;
        });
        this.clearPeoplesForm();
        this.generatePeoples(res);

    }
    filterByNameUp(){
        let res;
        this.clearPeoplesForm();
        if(this.sortInput.value){
            res = this.filterByInputAll();
        }
        res = this.friends.sort(function (a, b) {
            if (a.name.first < b.name.first) {
                return 1;
            }
            if (a.name.first > b.name.first) {
                return -1;
            }
            return 0;
        });
        this.clearPeoplesForm();
        this.generatePeoples(res);


    }

    filterByGender(gender){
        if (gender === 'male'){
            this.sortIconFemale.classList.add('disabled');
            this.sortIconMale.classList.add('nonActive');
            if(this.sortInput.value){
                this.friends = this.filterByInputAll('male');
            }else{
                this.friends = this.startData;
            }

            this.friends = this.friends.filter(people => people.gender === 'male');
        }else if (gender ==='female'){
            this.sortIconMale.classList.add('disabled');
            this.sortIconFemale.classList.add('nonActive');
            if(this.sortInput.value){
                this.friends = this.filterByInputAll();
            }else{
                this.friends = this.startData;
            }

            if(this.sortInput.value){
                this.friends = this.filterByInputAll('female');
            }

            this.friends = this.friends.filter(people => people.gender === 'female');
        }else {
            console.log('Please, specify gender in function filterByGender(gender)');
        }
        this.clearPeoplesForm();
        this.generatePeoples(this.friends);
    }




    filterByInputAll(gender){
        let result;

            result = this.friends.filter(function (people) {

                return people.name.first.includes(this.sortInput.value) == true || people.name.last.indexOf(this.sortInput.value) == true;
            }.bind(this));

            return result;




        return result;
    }

    renderSortedByInput() {
        if (!this.sortInput.value) {
            this.friends  = this.startData;
            this.clearPeoplesForm();
            this.generatePeoples(this.friends);
        } else {
            this.clearPeoplesForm();
            this.friends = this.filterByInputAll();
            this.generatePeoples(this.friends);

        }
    }

    addEventsListeners() {
        this.sortInput.addEventListener('input', this.renderSortedByInput);
        this.sortBox.addEventListener('click', this.sort);
        this.resetBtn.addEventListener('click', this.resetPeople);

    };
}

new FriendApp();
