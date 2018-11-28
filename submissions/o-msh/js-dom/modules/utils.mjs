import data from './data.mjs';

const navigationElement = document.querySelector(".navigation");
const mobileIconElement = document.querySelector(".mobile_icon");
const contentElement = document.querySelector(".content");

const menuHandlerClick = e => {
    let current = e.target;
    let href = current.dataset.link;
    document.querySelector(".menu_item.active").classList.remove("active");
    current.classList.add("active");
    contentElement.innerHTML = getContent(href);
    window.location.hash = href;
    if (mobileIconElement.classList.contains("change")) {
        navigationElement.classList.toggle("active");
        mobileIconElement.classList.toggle("change");
    }
}

const contentHandleClick = e => {
    let current = e.target;
    if (current.matches("[data-type=random_user]") || current.matches("[data-type=currency]")) {
        clearContent();
        let type = e.target.dataset.type;
        switch (type) {
            case "random_user":
                fetchData("https://randomuser.me/api/?results=5")
                    .then(window.location.hash === "#random_user" && data ? makeRandomUserContent : false);
                break;
            case "currency":
                fetchData("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
                    .then(window.location.hash === "#currency" && data ? makeCurrencyContent : false);
                break;
            default:
                break;
        }
    }
}

const mobileMenuHandleClick = e => {
    mobileIconElement.classList.toggle("change");
    navigationElement.classList.toggle("active");
}

const clearContent = () => {
    let users = document.querySelector(".users"),
        currencies = document.querySelector(".currencies");
    users ? users.innerHTML = "" : currencies ? currencies.innerHTML = "" : false;
}

const showLoader = () => document.querySelector(".loader").classList.add("show");

const hideLoader = () => document.querySelector(".loader").classList.remove("show");

const fetchData = url => {
    showLoader();
    return fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    }).then(data => {
        hideLoader();
        return data;
    })
    .catch(e => {
        hideLoader();
        console.log('There has been a problem with your fetch operation: ' + e.message);
    });
}

const makeRandomUserContent = data => {
    let users = document.querySelector(".users");
    if (users) {
        users.innerHTML = "";
    } else {
        users = document.createElement("div");
        users.classList.add("users");
    }
    data.results.forEach(el => {
        let userCard = document.createElement("div");
        userCard.classList.add("user_card");
        let img = document.createElement("img");
        img.src = el.picture.large;
        userCard.appendChild(img);
        let userInfo = document.createElement("div");
        userInfo.classList.add("user_info");
        userInfo.insertAdjacentHTML("beforeend", `<ul>
                <li>${el.name.first} ${el.name.last}, ${el.dob.age}</li>
                <li>${el.email}</li>
                <li>${el.cell}</li>
            </ul>`);
        userCard.appendChild(userInfo);
        users.appendChild(userCard);
    });
    hideLoader();
    contentElement.appendChild(users);
}

const makeCurrencyContent = data => {
    let currencies = document.querySelector(".currencies");
    if (currencies) {
        currencies.innerHTML = "";
    } else {
        currencies = document.createElement("div");
        currencies.classList.add("currencies");
    }
    data.forEach(el => {
        let currencyCard = document.createElement("div");
        currencyCard.classList.add("currency_card");
        currencyCard.insertAdjacentHTML("beforeend", `<ul>
                <li>${el.txt}</li>
                <li>${el.cc}</li>
                <li>${el.rate}</li>
            </ul>`);
        currencies.appendChild(currencyCard);
    });
    hideLoader();
    contentElement.appendChild(currencies);
}

const getContent = link => data.find(el => el.link === link).content;

const loadActiveMenuContent = () => contentElement.innerHTML = getContent(document.querySelector(".menu_item.active").dataset.link);

const init = () => {
    loadActiveMenuContent();
    navigationElement.addEventListener("click", menuHandlerClick);
    contentElement.addEventListener("click", contentHandleClick);
    mobileIconElement.addEventListener("click", mobileMenuHandleClick);
}

export default {
    init
};