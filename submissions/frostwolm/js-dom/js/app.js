const articles = [
  {title: `Title1`,
    id: 1,
    imgSrc: `img\\art1.png`,
    textContent: `Lorem ipsum TITLE1 dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  {title: `Title2`,
    id: 22,
    imgSrc: `img\\art2.png`,
    textContent: `Lorem ipsum TITLE2 dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  {title: `Title3`,
    id: 3,
    imgSrc: `img\\art3.png`,
    textContent: `Lorem ipsum TITLE3 dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  {title: `Title4`,
    id: 4,
    imgSrc: `img\\art4.png`,
    textContent: `Lorem ipsum TITLE4 dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  }
];

document.addEventListener(`DOMContentLoaded`, function () {
  contentController.init(document.querySelector(`nav.menu`), document.querySelector(`article.text`));
});

const contentController = {
  init(navElem, contentElem, articlesArr = articles) {
    if (!navElem || !articlesArr || !contentElem) {
      console.error(`Не определен элемент навигации или элемент контента`);
      return null;
    }
    this.articles = articlesArr;
    navElem.innerHTML = ``;
    let ulElem = document.createElement(`ul`);
    ulElem.classList.add(`menu__list`);
    for (let i = 0; i < articlesArr.length; i++) {
      let liElem = document.createElement(`li`);
      ulElem.appendChild(liElem);
      let navItem = document.createElement(`button`);
      navItem.classList.add(`menu__item`);
      navItem.textContent = this.articles[i].title;
      navItem.setAttribute(`id`, `art#${articles[i].id}`);
      liElem.appendChild(navItem);
    }
    navElem.appendChild(ulElem);
    navElem.addEventListener(`click`, function (evt) {
      if (!(evt.target.tagName === `BUTTON`)) {
        return;
      }
      document.querySelectorAll(`.menu__item`).forEach((item) => {
        item.classList.remove(`active`);
      });
      evt.target.classList.add(`active`);
      contentController.showContent(contentElem, +evt.target.id.split(`#`)[1]);
    });
    let event = new Event(`click`, {bubbles: true, cancelable: true});
    document.querySelector(`.menu__item`).dispatchEvent(event);
    return navElem;
  },
  showContent(contentElem, articleIndex) {
    if (!contentElem || articleIndex === undefined) {
      console.error(`Не определен элемент контента или индекс статьи в массиве`);
      return null;
    }
    let article = this.articles.find((val) => {
      return val.id === +articleIndex;
    });
    contentElem.innerHTML = ``;
    let h2Elem = document.createElement(`h2`);
    h2Elem.textContent = article.title;
    h2Elem.classList.add(`text__title`);
    let imgElem = document.createElement(`img`);
    imgElem.setAttribute(`src`, article.imgSrc);
    imgElem.setAttribute(`alt`, article.title);
    imgElem.classList.add(`text__img`);
    let textContentElem = document.createElement(`div`);
    textContentElem.textContent = article.textContent;
    textContentElem.classList.add(`text__content`);
    let clearFixElem = document.createElement(`div`);
    clearFixElem.classList.add(`clear`);
    contentElem.appendChild(h2Elem);
    contentElem.appendChild(imgElem);
    contentElem.appendChild(textContentElem);
    contentElem.appendChild(clearFixElem);
    return contentElem;
  }
};

document.contentController = contentController;
