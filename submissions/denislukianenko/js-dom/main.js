let data;

let index = 0;
let prevIndex = 0;

let animationTo = "";
let animationFrom = "";
let timeForHiddenAnimation = 20;

//Request for JSON
fetch("/data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    data = json;
    makeMenu(data);
    fillInMain(0);
  })
  .catch(alert);

//Forming menu from JSON
function makeMenu(data) {
  let menuEl = document.querySelector("#menu");
  for (let i in data) {
    let link = document.createElement("a");
    link.href = i;
    link.text = data[i].header;
    menuEl.appendChild(link);
    link.addEventListener("click", reactOnClick);
  }
}

//Event handler for menu click
function reactOnClick(event) {
  event.preventDefault();
  let indexes = event.target.href.split("/");
  let index = indexes[indexes.length - 1];
  if (index != prevIndex) {
    fillInMain(index);
  }
}

//Filling main with content and its partials...
function fillInMain(index) {
  let main = document.querySelector("#main");

  defineAnimationClasses(prevIndex, index);
  main.classList.add(animationTo);
  setMenuCurrent(index);
  setTimeout(changeContent, 200, main, index);
}

function changeContent(main, index) {
  main.innerHTML = "";
  let h1 = document.createElement("h1");
  let content = document.createElement("div");
  h1.innerText = data[index].header;
  content.innerHTML = data[index].content;
  content.className = "content";
  main.appendChild(h1);
  main.appendChild(content);
  main.classList.remove(animationTo);
  main.classList.add(animationFrom);

  prevIndex = index;

  setTimeout(showContent, timeForHiddenAnimation, main);
}

function showContent(main) {
  main.classList.remove(animationFrom);
}

function setMenuCurrent(index) {
  Array.from(document.querySelectorAll("nav > a.current")).forEach(elem =>
    elem.classList.remove("current")
  );
  document.querySelectorAll("nav > a")[index].classList.add("current");
}

function defineAnimationClasses(prevIndex, index) {
  if (prevIndex >= index) {
    animationTo = "hide-down-to";
    animationFrom = "hide-up-from";
  } else {
    animationTo = "hide-up-to";
    animationFrom = "hide-down-from";
  }
}
