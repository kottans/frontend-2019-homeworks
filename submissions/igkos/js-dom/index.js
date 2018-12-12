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
      const selectedSort = arraySorts.find(
        arraySort => arraySort.name === evt.target.textContent
      );
      pageImg.innerHTML = `<img src="${selectedSort.img}"  alt="${
        selectedSort.name
      }">`;
      prosCons.innerText = selectedSort.prosConsSorting;
      pageContent.innerHTML = selectedSort.content;
      sortingName.innerHTML = selectedSort.name;
      
      hljs.initHighlighting.called = false;
      hljs.initHighlighting();
    }
  });

  menu.addEventListener("click", function(e) {
    drawer.classList.toggle("open");
    e.stopPropagation();
  });
  main.addEventListener("click", function() {
    drawer.classList.remove("open");
  });

  pageImg.innerHTML = `<img src="${arraySorts[initialArraySort].img}"  alt="${
    arraySorts[initialArraySort].name
  }">`;
  prosCons.innerText = arraySorts[initialArraySort].prosConsSorting;
  pageContent.innerHTML = arraySorts[initialArraySort].content;
  sortingName.innerHTML = arraySorts[initialArraySort].name;

  hljs.initHighlighting.called = false;
  hljs.initHighlighting();
};
