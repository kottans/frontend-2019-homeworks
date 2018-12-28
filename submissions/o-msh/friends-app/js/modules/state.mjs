import { searchHandler, sortHandler, controller } from "./filter.mjs"; 
import { fetchData, generateCards } from "./user.mjs";
import f from "./functions.mjs";

export const state = {
    url: "https://randomuser.me/api/?results=72",
    dom: {
        main: null,
        loading: null,
        search: null,
        filter: null,
        radio: null,
        top: null
    },
    friends: [],
    filters: []
};

export const initFriends = async () => {
    try {
        f.showLoader();
        state.friends = await fetchData(state.url);
        f.hideLoader();
        f.render(generateCards(controller()));
    } catch (e) {
        f.hideLoader();
        f.render(f.generateErrorMessage(e));
    }
};

const initDomElements = () => {
    state.dom.main = document.querySelector(".main");
    state.dom.loading = document.querySelector(".loader");
    state.dom.search = document.querySelector(".search");
    state.dom.filter = document.querySelector(".filter");
    state.dom.top = document.querySelector(".top");
    state.dom.radio = Array.from(document.querySelectorAll("input[type=radio]"));
};

const initEventListener = () => {
    state.dom.search.addEventListener('input', searchHandler);
    state.dom.filter.addEventListener('click', sortHandler);
    state.dom.top.addEventListener('click', f.scrollToTop);
    window.onscroll = f.scrollWindowHandler;
};

export const init = () => {
    initDomElements();
    initEventListener();
    initFriends();
};
