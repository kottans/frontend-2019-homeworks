"use strict";
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
    activeNav.classList.add("inactive");
    activeNav.classList.remove("active");
    event.target.classList.add("active");
    const namePage = event.target.id;
    const content = document.querySelector("main");
    const visibleNow = content.querySelector("div:not(.hidden)");
    const clicked = content.getElementsByClassName(namePage)[0];
    if (visibleNow !== clicked) {
      visibleNow.classList.toggle("hidden");
      clicked.classList.toggle("hidden");
    }
  }
};
/*add listneres to navs panel(mobile and desktop)*/
const navs = document.getElementsByTagName("nav");
[...navs].forEach(nav => {
  nav.addEventListener("click", handleMenuClick);
});
/* add all content 'about' page is visible one */
const main = document.querySelector("main");
pages.forEach(page => {
  main.insertAdjacentHTML("afterBegin", page.content);
  if (page.title === "about") {
    const navAbout = document.getElementById("about");
    navAbout.classList.add("active");
  } else {
    main.firstChild.classList.add(page.title, "hidden");
  }
});
