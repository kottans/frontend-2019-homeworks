import data from './data.mjs';

const navigationElement = document.querySelector(".navigation");
const mobileIconElement = document.querySelector(".mobile_icon");
const contentElement = document.querySelector(".content");

const generateMenu = data => {
    let defaultFlag = false,
        menu = document.createElement("ul");
    data.forEach(el => {
        let li = document.createElement("li");
        if (el.default && !defaultFlag) {
            defaultFlag = !defaultFlag;
            li.classList.add("menu_item", "active");
            contentElement.innerHTML = el.content;
            window.location.hash = el.link;
        } else {
            li.classList.add("menu_item");
        }
        let a = document.createElement("a");
        a.addEventListener("click", menuHandlerClick);
        a.href = el.link;
        a.innerHTML += `${el.title}${el.icon}`;
        li.appendChild(a);
        menu.appendChild(li);
    })
    return menu;
}

const menuHandlerClick = e => {
    e.preventDefault();
    let current = e.target;
    document.querySelector(".menu_item.active").classList.remove("active");
    getParentNode(current, "LI").classList.add("active");
    if (current.tagName !== "A") {
        current = getParentNode(current, "A");
    }
    contentElement.innerHTML = getContent(current.getAttribute("href"));
    window.location.hash = current.getAttribute("href");
    let btnGetData = document.querySelector(".btn_get_data");
    btnGetData ? btnGetData.addEventListener("click", btnHandlerClick) : null;
    navigationElement.classList.toggle("active");
    mobileIconElement.classList.toggle("change");
}

const btnHandlerClick = e => {
    e.preventDefault();
    let type = e.target.dataset.type;
    clearContainers();
    switch (type) {
        case "random_user":
            fetchData("https://randomuser.me/api/?results=5")
                .then(data => makeRandomUserContent(data));
            break;
        case "currency":
            fetchData("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
                .then(data => makeCurrencyContent(data));
            break;
        default:
            break;
    }
}

const clearContainers = () => {
    let userDiv = document.querySelector(".user_div"),
        currencyDiv = document.querySelector(".currency_div");
    userDiv ? userDiv.innerHTML = "" : currencyDiv ? currencyDiv.innerHTML = "" : false;
}

const fetchData = url => {
    let loading_div = document.querySelector(".loading_div");
    loading_div.classList.add("show");
    return fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    }).then(data => {
        loading_div.classList.remove("show");
        return data;
    })
    .catch(e => {
        loading_div.classList.remove("show");
        console.log('There has been a problem with your fetch operation: ' + e.message);
    });
}

const makeRandomUserContent = users => {
    if (window.location.hash === "#random_user" && users) {
        let div = document.querySelector("div.user_div");
        if (!div) {
            div = document.createElement("div");
        } else {
            div.innerHTML = "";
        }
        div.classList.add("user_div");
        users.results.forEach(el => {
            let userCard = document.createElement("div");
            userCard.classList.add("user_card");
            let img = document.createElement("img");
            img.src = el.picture.large;
            userCard.appendChild(img);
            let userInfo = document.createElement("div");
            userInfo.classList.add("user_info");
            userInfo.insertAdjacentHTML("beforeend", `<ul>
                    <li>${el.name.first.charAt(0).toUpperCase() + el.name.first.slice(1)} ${el.name.last.charAt(0).toUpperCase() + el.name.last.slice(1)}, ${el.dob.age}</li>
                    <li>${el.email}</li>
                    <li>${el.cell}</li>
                </ul>`);
            userCard.appendChild(userInfo);
            div.appendChild(userCard);
        });
        document.querySelector(".loading_div").classList.remove("show");
        contentElement.appendChild(div);
    }
}

const makeCurrencyContent = currencies => {
    if (window.location.hash === "#currency" && currencies) {
        let div = document.querySelector("div.currency_div");
        if (!div) {
            div = document.createElement("div");
        } else {
            div.innerHTML = "";
        }
        div.classList.add("currency_div");
        currencies.forEach(el => {
            let currencyCard = document.createElement("div");
            currencyCard.classList.add("currency_card");
            currencyCard.insertAdjacentHTML("beforeend", `<ul>
                    <li>${el.txt}</li>
                    <li>${el.cc}</li>
                    <li>${el.rate}</li>
                </ul>`);
            div.appendChild(currencyCard);
        });
        document.querySelector(".loading_div").classList.remove("show");
        contentElement.appendChild(div);
    }
}

const getContent = link => { return data.filter(el => el.link === link)[0].content }

const getParentNode = (node, parentTag) => {
    if (node.parentNode.tagName === parentTag) {
        return node.parentNode;
    } else {
        return getParentNode(node.parentNode, parentTag);
    }
}

const init = () => {
    const isValidData = data.every(menuItem => Object.values(menuItem).every(value => value));
    if (isValidData) {
        navigationElement.appendChild(generateMenu(data, contentElement));
        mobileIconElement.addEventListener("click", function() {
            this.classList.toggle("change");
            navigationElement.classList.toggle("active");
        })
    }
}

export default {
    init
};