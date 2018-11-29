var data;
var index = 0;
var prevIndex = 0;
var animationTo = "";
var animationFrom = "";

//Request for JSON
var request = new XMLHttpRequest();
request.open("GET", "data.json", true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    data = JSON.parse(request.responseText);
    makeMenu(data);
    fillInMain(0);
  } else {
    console.log(" We reached our target server, but it returned an error");
  }
};
request.onerror = function() {
  console.log(" There was a connection error of some sort");
};
request.send();

//Forming menu from JSON
function makeMenu(data) {
  var menuEl = document.querySelector("#menu");
  for (var i in data) {
    var link = document.createElement("a");
    link.href = i;
    link.text = data[i].header;
    menuEl.appendChild(link);
    link.addEventListener("click", reactOnClick);
  }
}

//Event handler for menu click
function reactOnClick(event) {
  event.preventDefault();
  var indexes = event.target.href.split("/");
  var index = indexes[indexes.length - 1];
  if (index != prevIndex) {
    fillInMain(index);
  }
}

//Filling main with content and its partials...
function fillInMain(index) {
  var main = document.querySelector("#main");

  defineAnimationClasses(prevIndex, index);
  main.classList.add(animationTo);
  setMenuCurrent(index);
  setTimeout(changeContent, 200, main, index);
}

function changeContent(main, index) {
  main.innerHTML = "";
  var h1 = document.createElement("h1");
  var content = document.createElement("div");
  h1.innerText = data[index].header;
  content.innerHTML = data[index].content;
  content.className = "content";
  main.appendChild(h1);
  main.appendChild(content);
  main.classList.remove(animationTo);
  main.classList.add(animationFrom);

  prevIndex = index;

  setTimeout(showContent, 1, main);
}

function showContent(main) {
  main.classList.remove(animationFrom);
}

function setMenuCurrent(index) {
  var arr = document.querySelectorAll("nav > a");
  for (var i in arr) {
    if (arr[i].classList) {
      arr[i].classList.remove("current");
    }
  }
  arr[index].classList.add("current");
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
