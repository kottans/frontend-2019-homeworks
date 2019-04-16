const form = document.getElementById("search__form");
const rootElem = document.getElementById("search-result");
let DATA;

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let searchValue = event.target.elements[0].value;
  search(searchValue);
});

function search(searchValue) {
  let requestStr = `https://api.duckduckgo.com/?q=${searchValue}&format=json`;
  fetch(requestStr)
    .then(searchResult => searchResult.json())
    .then(searchResult => {
      DATA = searchResult;
      showSearchItems(DATA);
    });
}

function showSearchItems(response) {
  let title = response.Heading;
  let text = response.Abstract;
  let url = response.AbstractURL;
  let image = response.Image;

  let div = document.createElement("div");
  div.classList.add("search-result__wrapper");
  div.innerHTML = `<h2 class="search-result__title">${title}</h2> <img class="search-result__img" alt="${title}" src="${image}"/> <p class="search-result__text">${text}</p> <a class="search-result__link" href="${url}">Ccылка на источник</a>`;

  rootElem.prepend(div);
}
