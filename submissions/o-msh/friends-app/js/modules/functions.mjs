import { state } from "./state.mjs";

let scrollTimeout;

const cleanMain = () => {
    state.dom.main.innerHTML = "";
};

const render = data => {
    cleanMain();
    state.dom.main.append(data);
};

const showLoader = () => state.dom.loading.classList.remove("hide");

const hideLoader = () => state.dom.loading.classList.add("hide");

const generateErrorMessage = e => {
    let errorBlock = document.createElement("div");
    errorBlock.classList.add("error");
    errorBlock.innerHTML = `Oops... ${e.message}`;
    return errorBlock;
};

const scrollToTop = () => {
    if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
        window.scrollBy(0,-50);
        scrollTimeout = setTimeout(scrollToTop, 10);
    } else {
        clearTimeout(scrollTimeout);
    }
};

const scrollWindowHandler = () => {
    document.body.scrollToTop > 30 || document.documentElement.scrollTop > 30 
        ? state.dom.top.classList.add("enable")
        : state.dom.top.classList.remove("enable"); 
};

export default {
    cleanMain,
    render,
    showLoader,
    hideLoader,
    generateErrorMessage,
    scrollToTop,
    scrollWindowHandler
};
