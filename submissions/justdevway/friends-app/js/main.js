(async () => {
  const MAIN_URL = "https://randomuser.me/api/?results=100";
  const ITEMS_QUANTITY = 20;
  let runningRebuild = 0;

  const getData = url => {
    const requestUrl = url;

    return fetch(requestUrl)
      .then(res => res.json())
      .then(res => {
        console.dir(res.results);
        return res.results;
      })
      .catch(e => {
        console.error(e);
      });
  };

  const findDate = str => {
    const workArr = str.slice(0, 10).split("-");
    const [years, month, days] = [...workArr];

    const result = {
      days,
      month,
      years,
      str: workArr.reverse().join("-")
    };

    return result;
  };

  const makeCard = cardObj => {
    const card = document.createElement("div");
    const allDate = cardObj.dob.date;
    const regDate = cardObj.registered.date;
    const gender = cardObj.gender;
    const name = cardObj.name.first;
    const date = findDate(allDate);
    const registration = findDate(regDate);
    const mail = cardObj.email;
    const location = cardObj.location.city;

    card.classList.add("card", "js-card");
    card.tabIndex = 0;
    card.setAttribute("data-gender", gender);
    card.setAttribute("data-name", name);
    card.setAttribute("data-mail", mail);
    card.setAttribute("data-location", location);

    card.innerHTML = `
    <img src="${cardObj.picture.large}" alt="${cardObj.name.title} ${
      cardObj.name.first
    } ${cardObj.name.last}" class="card__img">
    <div class="card__name">
        <span class="card__first_name">${cardObj.name.first}</span>
        <span class="card__second_name">${cardObj.name.last}</span>
    </div>
    <div class="card__age">${cardObj.dob.age}</div>
    <div class="card__location">${location}</div>
    <time>${date.str}</time>
    <a class="card__email" href="mailto:${mail}">${mail}</a>
    <div class="card__phone">${cardObj.cell}</div>
    <time class="card__registration">${registration.str}</time>
    `;
    return card;
  };

  const pageCounter = (count, itemsOnPage) => {
    if (count >= itemsOnPage) {
      return 1;
    } else {
      return 0;
    }
  };

  const makePagination = (paginationCollection, paginationContainers) => {
    const container = document.querySelector(paginationContainers);
    let mainQuantity = 0;
    const items = document.querySelectorAll(paginationCollection);
    let count = 0;
    let page = 0;
    const list = document.createElement("ul");
    list.classList.add("pagination__list", "js-pagination__list");

    container.innerHTML = "";

    items.forEach(el => {
      if (!el.classList.contains("is_hide") && count < ITEMS_QUANTITY) {
        count += 1;
      } else if (!el.classList.contains("is_hide") && count >= ITEMS_QUANTITY) {
        page += pageCounter(count, ITEMS_QUANTITY);
        count = 0;
      } else {
        el.classList.add("is_hide");
      }
      if (page) {
        el.classList.add("pagination_hide");
      }
    });

    if (page <= 1) {
      return;
    }

    while (mainQuantity <= page) {
      const item = document.createElement("li");
      item.classList.add("pagination__item", "js-pagination__item");
      if (mainQuantity == 0) {
        item.classList.add("is_active");
      }
      item.innerText = mainQuantity + 1;
      item.setAttribute("data-page", mainQuantity + 1);
      mainQuantity += 1;
      list.appendChild(item);
    }
    container.appendChild(list);
  };

  const removePagination = paginationCollection => {
    const items = document.querySelectorAll(paginationCollection);
    items.forEach(el => {
      el.classList.remove("pagination_hide");
    });
  };

  const makeCards = cards => {
    const cardsArr = cards;
    const container = document.querySelector(".js-cards__main_content");
    const list = document.createElement("ul");
    container.innerHTML = "";
    list.classList.add("cards__list", "js-card__list");
    cardsArr.forEach(card => {
      const item = document.createElement("li");
      item.classList.add("cards__item", "js-cards__item");
      item.append(makeCard(card));
      list.appendChild(item);
    });
    container.appendChild(list);

    makePagination(".js-cards__item", ".js-pagination__main_content");
  };

  const findElemInDom = ({ target }, element, criticalElement) => {
    if (target) {
      let checkWhatNeed;
      let checkWhenStop;
      while (!checkWhatNeed) {
        checkWhenStop = target.classList.contains(criticalElement);
        if (checkWhenStop) {
          return null;
        }
        target = target.parentElement;
        checkWhatNeed = target.classList.contains(element);
      }
      return target;
    } else {
      if (event.classList.contains(element)) {
        target = event;
        return target;
      } else {
        return null;
      }
    }
  };

  const asc = (a, b) => (a > b ? 1 : -1);

  const desc = (a, b) => (a > b ? -1 : 1);

  const rebuildArr = (arr, parameters) => {
    if (!Object.keys(parameters).length) {
      console.error("Can't find parameters of element");
      return null;
    }
    const name = parameters.name;
    const index = parameters.index;
    let result;

    const sortByAge = (a, b) => {
      const ageA = a.dob.age;
      const ageB = b.dob.age;
      if (index == 2) {
        return desc(ageA, ageB);
      } else {
        return asc(ageA, ageB);
      }
    };

    const sortByDate = (a, b) => {
        const dateObjA = findDate(a.registered.date);
        const dateObjB = findDate(b.registered.date);
        const dateA = new Date(dateObjA.years, dateObjA.month, dateObjA.days);
        const dateB = new Date(dateObjB.years, dateObjB.month, dateObjB.days);
        if (index == 2) {
            return asc(dateA, dateB);
        } else {
            return desc(dateA, dateB);
        }
    };

    const sortByLetter = (a, b) => {
        const nameA = a.name.first.toUpperCase();
        const nameB = b.name.first.toUpperCase();
        if (index == 2) {
            return asc(nameA, nameB);
        } else {
            return desc(nameA, nameB);
        }
    };

    switch (name) {
      case "age": {
        result = arr.sort(sortByAge);
        break;
      }
      case "date": {
        result = arr.sort(sortByDate);
      }
      case "abc": {
        result = arr.sort(sortByLetter);
        break;
      }

      default: {
        console.error("Get some problems with name or index");
        result = null;
      }
    }

    return result;
  };

  const showGender = index => {
    const currentElements = document.querySelectorAll(".js-cards__item");
    currentElements.forEach(el => {
      const card = el.querySelector(".js-card");
      const attr = card.getAttribute("data-gender");
      if (index == 2) {
        if (attr !== "male") {
          el.classList.add("is_hide");
        } else {
          el.classList.remove("is_hide");
        }
      } else if (index == 1) {
        if (attr !== "female") {
          el.classList.add("is_hide");
        } else {
          el.classList.remove("is_hide");
        }
      } else {
        el.classList.remove("is_hide");
      }
    });
    removePagination(".js-cards__item");
    makePagination(".js-cards__item", ".js-pagination__main_content");
  };

  const liveSearch = (text, parameter) => {
    const workElements = document.querySelectorAll(".js-cards__item");
    const str = `^${text}`;
    const reg = new RegExp(str);
    const data = parameter;
    let count = 0;

    workElements.forEach(el => {
      const element = el.querySelector(".js-card");
      const elemData = element.getAttribute(data);
      if (reg.test(elemData)) {
        el.classList.remove("pagination_hide");
        el.classList.remove("is_hide");
        count += 1;
      } else {
        el.classList.add("is_hide");
      }
    });
    makePagination(".js-cards__item", ".js-pagination__main_content");
  };

  const selectFilter = element => {
    const sameElements = element.parentElement.querySelectorAll(
      ".js-controller__label"
    );
    sameElements.forEach(el => {
      el.classList.remove("is_active");
    });
    element.classList.add("is_active");
  };

  const rebuildCards = (arr, event, ms) => {
    if (runningRebuild) {
      return;
    }

    const classes = event.currentTarget.classList;
    const limit = classes[1];
    if (!limit) {
      runningRebuild = 0;
      console.error("Element's classList doesn't contains class for js");
      return;
    }

    const element = findElemInDom(event, "js-controller__label", limit);
    if (!element) {
      runningRebuild = 0;
      console.error("Can't find element");
      return;
    }

    selectFilter(element);

    const input = element.querySelector(".js-controller__input");
    if (!input) {
      runningRebuild = 0;
      console.error("Can't find input");
      return;
    }
    input.classList.add("is_active");
    input.checked = "true";

    const parameters = {
      name: input.name,
      index: input.value
    };

    runningRebuild = 1;

    // don't rebuild html tree, just hide
    if (parameters.name === "gender") {
      showGender(parameters.index);
    } else {
      tempCards = rebuildArr(arr, parameters);

      if (!tempCards) {
        console.error("Can't get tempArray");
        runningRebuild = 0;
        return;
      }
      makeCards(tempCards, ITEMS_QUANTITY);
    }

    setTimeout(() => (runningRebuild = 0), ms);
  };

  let tempCards = await getData(MAIN_URL);

  const oldCards = tempCards.slice();

  const resetAll = () => {
    console.log(oldCards);
    makeCards(oldCards, ITEMS_QUANTITY);
    tempCards = oldCards.slice();
    const filters = document.querySelectorAll(".js-controller__label");
    filters.forEach(el => {
      el.classList.remove("is_active");
    });
  };

  const startGame = () => {
    makeCards(tempCards, ITEMS_QUANTITY);
    const modal = document.querySelector(".js-modal");
    modal.classList.add("is_hide");
  };

  const showPage = (index, quantityOnPage, elements) => {
    const mainIndex = Number(index);
    const before = (mainIndex - 1) * quantityOnPage;
    const after = mainIndex * quantityOnPage;
    let counter = 0;
    elements.forEach((el, index) => {
      if (!el.classList.contains("is_hide")) {
        counter += 1;
        if (counter > before && counter <= after) {
          el.classList.remove("pagination_hide");
        } else {
          el.classList.add("pagination_hide");
        }
      }
    });
  };

  const controllers = document.querySelector(".js-controllers");
  const nameSearchInput = document.querySelector(".js-name_search");
  const mailSearchInput = document.querySelector(".js-mail_search");
  const locationSearchInput = document.querySelector(".js-location_search");
  const resetButton = document.querySelector(".js-controller__button");
  const pagination = document.querySelector(".js-pagination__main_content");

  startGame();

  controllers.addEventListener("click", event => {
    rebuildCards(tempCards, event, 500);
  });

  resetButton.addEventListener("click", () => {
    resetAll();
  });

  nameSearchInput.addEventListener("keyup", event => {
    let text = event.target.value;
    liveSearch(text, "data-name");
  });

  mailSearchInput.addEventListener("keyup", event => {
    let text = event.target.value;
    liveSearch(text, "data-mail");
  });

  locationSearchInput.addEventListener("keyup", event => {
    let text = event.target.value;
    liveSearch(text, "data-location");
  });

  pagination.addEventListener("click", function(e) {
    const target = e.target;
    let element;
    if (!target.classList.contains("js-pagination__item")) {
      element = findElemInDom(event, "js-pagination__item", e.target);
    } else {
      element = target;
    }
    const elements = document.querySelectorAll(".js-pagination__item");
    const cards = document.querySelectorAll(".js-cards__item");
    elements.forEach(el => {
      el.classList.remove("is_active");
    });
    element.classList.add("is_active");
    const index = element.getAttribute("data-page");
    if (!cards) {
      return;
    }
    showPage(index, ITEMS_QUANTITY, cards);
  });
})();
