window.onload = function() {
  const initialArraySort = 0;

  const ul = document.createElement("ul");

  const menu = document.querySelector("#menu");
  const main = document.querySelector("main");
  const drawer = document.querySelector(".nav");
  const pageImg = document.querySelector(".content__img");
  const prosCons = document.querySelector(".content__prosCons");
  const pageContent = document.querySelector(".content__function");
  const sortingName = document.querySelector(".content__sortingName");
  const menuContainer = document.getElementById("drawer");

  const selectSort = sortName => {
    const selectedSort = arraySorts.find(
      arraySort => arraySort.name === sortName
    );
    pageImg.innerHTML = `<img src="${selectedSort.img}"  alt="${
      selectedSort.name
    }">`;
    prosCons.innerText = selectedSort.prosConsSorting;
    pageContent.innerHTML = selectedSort.content;
    sortingName.innerHTML = selectedSort.name;

    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  };

  ul.classList.add("nav__list");
  arraySorts.forEach(arr => {
    const li = document.createElement("li");
    li.innerHTML = `${arr.name}`;

    li.classList.add("nav__item");
    ul.appendChild(li);
  });
  menuContainer.appendChild(ul);

  ul.addEventListener("click", evt => {
    if (evt.target && evt.target.nodeName.toLowerCase() === "li") {
      console.log(evt.target.textContent);
      selectSort(evt.target.textContent);
    }
  });

  menu.addEventListener("click", function(e) {
    drawer.classList.toggle("open");
    e.stopPropagation();
  });
  main.addEventListener("click", function() {
    drawer.classList.remove("open");
  });

  selectSort(arraySorts[initialArraySort].name);
};
