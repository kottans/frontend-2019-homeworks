let mainArray = [];
let sortArray = [];
let sortElementsArray = [];
const FRIENDS_AMOUNT = 30;
const GET_FRIENDS_LIST = `https://randomuser.me/api/?results=${FRIENDS_AMOUNT}&nat=us`;
const NOT_FOUND = 'Friends not found';
let wrapperBlock = document.createElement('div');
wrapperBlock.classList.add("friends");

let dropFilters = (filterArr) => {
    filterBlock.setAttribute("data-gender", "all");
    document.querySelectorAll('[type=radio]').forEach(radio => radio.checked = false);
    inputName.value = '';
    sortArray = filterArr.slice();
    filterRender(filterArr);
}
let search = (target, filterArr) => {
    sortArray = filterArr.filter(el => el.name.first.includes(target.toLowerCase()) || el.name.last.includes(target.toLowerCase()))
    filterRender(sortArray);
}
let sortGender = (target, filterArr) => filterBlock.setAttribute("data-gender", target);
let sortAge = (target, filterArr) => {
    filterArr.sort((a, b) => {
        if(target === 'inc'){
            return a.dob.age - b.dob.age;
        } else if (target === 'dec') {
            return b.dob.age - a.dob.age;
        } else if (target === 'abc') {
            if(a.name.first < b.name.first) { return -1; }
            if(a.name.first > b.name.first) { return 1; }
            return 0;
        } else {
            if(a.name.first < b.name.first) { return 1; }
            if(a.name.first > b.name.first) { return -1; }
            return 0;
        }
    });
    filterRender(filterArr);
}
let filterRender = (filterArr) => {
    containerBlock(filterArr);
}
let errorsHandler = (text) => {
    infoBlock.innerHTML = text;
    infoBlock.classList.add("show");
}
let randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}
let renderItem = (el) => {
    let element = document.createElement('div');
    element.classList.add("item");
    element.setAttribute("data-gender", el.gender);
    let content = `
        <div class="image">
            <img class="image-item" src=${el.picture.large} alt=${el.name.last}>
        </div>
        <div class="info">
            <p class="title">${el.name.first} ${el.name.last}</p>
            <p class="gender">${el.gender}, ${el.dob.age}</p>
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
            <div class="social">
                <div>
                    <i class="fa fa-camera" aria-hidden="true"></i>
                    ${randomInteger(100, 200)}
                </div>
                <div>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    ${randomInteger(10, 300)}
                </div>
                <div>
                    <i class="fa fa-user" aria-hidden="true"></i>
                    ${randomInteger(150, 600)}
                </div>
            </div>
        </div>
        <p class="follow">follow</p>`;
    element.innerHTML = content;
    sortElementsArray.push(element);
}
let containerBlock = (itemsArray) => {
    sortElementsArray = [];
    if(itemsArray.length){
        infoBlock.classList.remove("show");
        itemsArray.map(item => {
            renderItem(item);
        });
    } else {
        errorsHandler(NOT_FOUND);
    }
    wrapperBlock.innerHTML = '';
    sortElementsArray.map((item) => {
        wrapperBlock.appendChild(item);
    })
    main.insertBefore(wrapperBlock, infoBlock);
}
let inferenceMainBlock = friendsList => {
    friendsList.map((item) => mainArray.push(item));
    sortArray = mainArray.slice();
    elementDrop.addEventListener('click', ({target}) => dropFilters(mainArray));
    inputName.addEventListener('input', ({target}) => window.setTimeout(() => search(target.value, mainArray)));
    radioGender.addEventListener('change', ({target}) => sortGender(target.value, sortArray));
    radioAge.addEventListener('change', ({target}) => sortAge(target.value, sortArray));
    menuButton.addEventListener('click', ({target}) => menuButton.classList.toggle('open'));
    containerBlock(sortArray);
};

fetch(GET_FRIENDS_LIST)
.then(response => {
    if (!response.ok){
        throw Error(response.statusText);
        errorsHandler(response.statusText)
    }
    return response;
})
.then(response => response.json())
.then(response => inferenceMainBlock(response.results))
.catch(error => errorsHandler(error));
