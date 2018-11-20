"use strict"
const handleMenuClick = event => {
  /*check if click was on mobile nav panel*/
  if (event.target.id === "mobile") {
    const navPanel = document.querySelector("nav");
    navPanel.classList.toggle("open");
  } else if (event.target.tagName === "LI") {
    /*check if click was on li element*/
    const navPanel = document.querySelector("nav");
    navPanel.classList.remove("open");
    const activeNav = document.getElementsByClassName("active")[0];
    activeNav.className = "inactive";
    event.target.className = "active";
    const namePage = event.target.id;
    const page = pages.find(page => {
      return page[namePage];
    });

    const content = document.querySelector("main");
    /*delete contentadd content to main */

    content.removeChild(content.firstChild);
    content.insertAdjacentHTML("afterBegin", page[namePage]);
  }
};
/*add listneres to navs panel(mobile and desktop)*/
const navs = document.getElementsByTagName("nav");
for (let i = 0; i < navs.length; i++) {
  navs[i].addEventListener("click", handleMenuClick);
}
/* add content if load first time*/
const main = document.querySelector("main");
if (main.innerHTML === "") {
  main.insertAdjacentHTML("afterBegin", pages[0].about);
}
