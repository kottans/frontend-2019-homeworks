(async () => {
    const MAIN_URL = 'https://randomuser.me/api/?results';
    const QUANTITY = 100;
    const ITEMS_QUANTITY = 25;
    let eventController = 0;

    const getData = (url, quantity) => {

        const requestUrl = `${url}=${quantity}`;

        return fetch(requestUrl)
            .then(res => res.json())
            .then(res => {
                console.dir(res.results);
                return res.results
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const findDate = (str) => {
        const workArr = str.slice(0, 10).split('-');
        const days = workArr[2];
        const month = workArr[1];
        const years = workArr[0];

        const result = {
            days,
            month,
            years,
            str: workArr.reverse().join('-')
        };

        return result;
    };

    const makeCard = (obj) => {
        const card = document.createElement('div');
        const allDate = obj.dob.date;
        const gender = obj.gender;
        const name = obj.name.first;
        const date = findDate(allDate);
        const mail = obj.email;
        const location = obj.location.city;

        card.classList.add('card', 'js-card');
        card.tabIndex = 0;
        card.setAttribute('data-gender', gender);
        card.setAttribute('data-name', name);
        card.setAttribute('data-mail', mail);
        card.setAttribute('data-location', location);

        card.innerHTML = `
    <img src="${obj.picture.large}" alt="${obj.name.title} ${obj.name.first} ${obj.name.last}" class="card__img">
    <div class="card__name">
        <span class="card__first_name">${obj.name.first}</span>
        <span class="card__second_name">${obj.name.last}</span>
    </div>
    <div class="card__age">${obj.dob.age}</div>
    <div class="card__location">${location}</div>
    <time>${date.str}</time>
    <!--<div class="card__gender">gender</div>-->
    <a class="card__email" href="mailto:${mail}">${mail}</a>
    <div class="card__phone">${obj.cell}</div>
    `;
        return card;
    };

    const makePagination = (paginationItems, paginationContainers) => {
        const container = document.querySelector(paginationContainers);
        container.innerHTML = '';
        let mainQuantity = 0;

        const items = document.querySelectorAll(paginationItems);
        let count = 0;
        let page = 0;
        items.forEach((el) => {
           if(!el.classList.contains('is_hide')) {
               count += 1;
               if(count > ITEMS_QUANTITY) {
                   page += 1;
                   count = 1;
               }
               if(page) {
                   el.classList.add('pagination_hide');
               }
           } else {
               el.classList.add('is_hide');
           }

        });

        if (page <= 1) {
            return;
        }

        while (mainQuantity <= page) {
            const item = document.createElement('li');
            item.classList.add('pagination__item', 'js-pagination__item');
            if (mainQuantity == 0) {
                item.classList.add('is_active');
            }
            item.innerText = mainQuantity + 1;
            item.setAttribute('data-page', mainQuantity + 1);
            mainQuantity += 1;
            container.appendChild(item);
        }
    };

    const makeCards = (cards, itemsOnPage) => {
        const cardsArr = cards;
        const container = document.querySelector('.js-card__list');
        container.innerHTML = '';
        cardsArr.forEach((card) => {
            const item = document.createElement('li');
            item.classList.add('cards__item', 'js-cards__item');
            item.append(makeCard(card));
            container.appendChild(item);
        });

        makePagination( '.js-cards__item', '.js-pagination__list');
    };

    const upperTree = (event, whatNeed, whenStop) => {
        let target;
        if (event.target) {
            target = event.target;
            let checkWhatNeed;
            let checkWhenStop;
            while (!checkWhatNeed) {
                checkWhenStop = target.classList.contains(whenStop);
                if (checkWhenStop) {
                    return null;
                }
                target = target.parentElement;
                checkWhatNeed = target.classList.contains(whatNeed);
            }
            return target;
        } else {
            if (event.classList.contains((whatNeed))) {
                target = event;
                return target;
            } else {
                return null;
            }
        }
    };

    const rebuildArr = (arr, parameters) => {

        if (!parameters || JSON.stringify(parameters) == '{}') {
            console.error('Can\'t find parameters of element');
            return null;
        }
        const name = parameters.name;
        const index = parameters.index;
        let result;

        switch (name) {
            case 'age': {
                result = arr.sort((a, b) => {
                    const ageA = a.dob.age;
                    const ageB = b.dob.age;
                    if (index == 2) {
                        if (ageA > ageB) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        if (ageA > ageB) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                });
                break;
            }
            case 'date': {
                result = arr.sort((a, b) => {
                    const dateObjA = findDate(a.dob.date);
                    const dateObjB = findDate(b.dob.date);
                    const dateA = new Date(dateObjA.years, dateObjA.month, dateObjA.days);
                    const dateB = new Date(dateObjB.years, dateObjB.month, dateObjB.days);
                    if (index == 2) {
                        if (dateA > dateB) {
                            return 1;
                        } else {
                            return -1;
                        }
                    } else {
                        if (dateA > dateB) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
            }
            case 'abc': {
                result = arr.sort((a, b) => {
                    const nameA = a.name.first.toUpperCase();
                    const nameB = b.name.first.toUpperCase()
                    if (index == 2) {
                        if (nameA > nameB) {
                            return 1
                        } else {
                            return -1;
                        }
                    } else {
                        if (nameA > nameB) {
                            return -1
                        } else {
                            return 1;
                        }
                    }
                });
                break;
            }

            default: {
                console.error('Get some problems with name or index');
                result = null;
            }
        }

        return result;
    };

    const showGender = (index) => {
        const currentElements = document.querySelectorAll('.js-cards__item');
        currentElements.forEach(el => {
            const card = el.querySelector('.js-card');
            const attr = card.getAttribute('data-gender');
            let count = 0;
            if (index > 0) {
                if (index == 2) {
                    if (attr !== 'male') {
                        el.classList.add('is_hide');
                    } else {
                        el.classList.remove('is_hide');
                        count += 1;
                    }
                } else {
                    if (attr !== 'female') {
                        el.classList.add('is_hide');
                    } else {
                        el.classList.remove('is_hide');
                        count += 1;
                    }
                }
            } else {
                el.classList.remove('is_hide');
            }
        });
        makePagination( '.js-cards__item', '.js-pagination__list');
    };

    const liveSearch = (text, parameter) => {
        const workElements = document.querySelectorAll('.js-cards__item');
        const str = `^${text}`;
        const reg = new RegExp(str);
        const data = parameter;
        let count = 0;

        workElements.forEach(el => {
            const element = el.querySelector(('.js-card'));
            const elemData = element.getAttribute(data);
            if (reg.test(elemData)) {
                el.classList.remove('pagination_hide');
                el.classList.remove('is_hide');
                count += 1;
            } else {
                el.classList.add('is_hide')
            }
        });
        makePagination('.js-cards__item', '.js-pagination__list');
    };

    const rebuildCards = (arr, event, ms) => {
        if (eventController) {
            return;
        }

        const classes = event.currentTarget.classList;
        const limit = classes[1];
        if (!limit) {
            eventController = 0;
            console.error('Element\'s classList doesn\'t contains class for js');
            return;
        }

        const element = upperTree(event, 'js-controller__label', limit);
        if (!element) {
            eventController = 0;
            console.error('Can\'t find element');
            return;
        }

        const sameElements = element.parentElement.querySelectorAll('.js-controller__label');
        sameElements.forEach(el => {
            el.classList.remove('is_active');
        });
        element.classList.add('is_active');


        const input = element.querySelector('.js-controller__input');
        if (!input) {
            eventController = 0;
            console.error('Can\'t find input');
            return;
        }
        input.classList.add('is_active');
        input.checked = 'true';

        const parameters = {
            name: input.name,
            index: input.value
        };

        eventController = 1;

        // don't rebuild html tree, just hide
        if (parameters.name === 'gender') {
            showGender(parameters.index);
        } else {
            tempCards = rebuildArr(arr, parameters);
            console.dir(tempCards);

            if (!tempCards) {
                console.error('Can\'t get tempArray');
                eventController = 0;
                return;
            }
            makeCards(tempCards, ITEMS_QUANTITY);
        }

        setTimeout(() => eventController = 0, ms);
    };

    let tempCards = await getData(MAIN_URL, QUANTITY);

    const oldCards = tempCards.slice();

    const resetAll = () => {
        console.log(oldCards);
        makeCards(oldCards, ITEMS_QUANTITY);
        tempCards = oldCards.slice();
        const filters = document.querySelectorAll('.js-controller__label');
        filters.forEach(el => {
            el.classList.remove('is_active');
        });

    };

    const startGame = () => {
        makeCards(tempCards, ITEMS_QUANTITY);
        const modal = document.querySelector('.js-modal');
        modal.classList.add('is_hide');
    };

    const showPage = (index, quantityOnPage, elements) => {
        const mainIndex = Number(index);
        const before = (mainIndex - 1) * quantityOnPage;
        const after = mainIndex * quantityOnPage;
        let counter = 0;
        elements.forEach((el, index) => {
            if(!el.classList.contains('is_hide')) {
                counter += 1;
                if(counter > before && counter < after) {
                    el.classList.remove('pagination_hide');
                } else {
                    el.classList.add('pagination_hide');
                }
            };
        });
    };

    const controllers = document.querySelector('.js-controllers');
    const nameSearchInput = document.querySelector('.js-name_search');
    const mailSearchInput = document.querySelector('.js-mail_search');
    const locationSearchInput = document.querySelector('.js-location_search');
    const resetButton = document.querySelector('.js-controller__button');
    const pagination = document.querySelector('.js-pagination__list');

    startGame();

    controllers.addEventListener('click', (event) => {
        rebuildCards(tempCards, event, 500);
    });

    resetButton.addEventListener('click', (event) => {
        resetAll();
    });

    nameSearchInput.addEventListener('keyup', (event) => {
        let text = event.target.value;
        liveSearch(text, 'data-name');
    });

    mailSearchInput.addEventListener('keyup', (event) => {
        let text = event.target.value;
        liveSearch(text, 'data-mail');
    });

    locationSearchInput.addEventListener('keyup', (event) => {
        let text = event.target.value;
        liveSearch(text, 'data-location');
    });

    pagination.addEventListener('click', function (e) {
        const target = e.target;
        let element;
        if (!target.classList.contains('js-pagination__item')) {
            element = upperTree(event, 'js-pagination__item', e.target);
        } else {
            element = target;
        }
        const elements = document.querySelectorAll('.js-pagination__item');
        const cards = document.querySelectorAll('.js-cards__item');
        elements.forEach(el => {
            el.classList.remove('is_active');
        });
        element.classList.add('is_active');
        const index = element.getAttribute('data-page');
        if (!cards) {
            return;
        }
        showPage(index, ITEMS_QUANTITY, cards);
    });
})();