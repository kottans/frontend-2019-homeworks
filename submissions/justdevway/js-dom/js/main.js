document.addEventListener("DOMContentLoaded", function (event) {
    var API_KEY = '95ca7e90ff0bb4cbff4bc6b45390f12d';
    var links = {
        genre: 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=ru-RU',
        popular: 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=ru-RU',
        forGenre: 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + '&language=ru-Ru&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='
    };

    function appendContent(link, cb) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', link);

        xhr.send();

        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.error(xhr.status + ': ' + xhr.statusText);
            } else {
                var res = JSON.parse(xhr.responseText);
                cb(res);
            }
        }
    }


    // TODO: write preloader

    function buildContent(data) {
        var data = data.results;
        var container = document.querySelector('.js-results');
        container.innerHTML = '';

        data.forEach(function (el) {
            let item = makeResultItem(el);
            container.append(item);
        });
        console.log('FINISH buildContent SCRIPT');

        changeImgs(function () {
            hideModal();
            initTitleButton();
        });
    }

    showModal();
    initModal();
    appendContent(links.genre, buildNav);
    appendContent(links.popular, buildContent);

    function makeResultItem(el) {
        var item = document.createElement('article');
        var content = document.createElement('section');
        var header = document.createElement('header');
        var footer = document.createElement('footer');
        var title = document.createElement('h2');
        var titleLink = document.createElement('a');
        var poster = document.createElement('img');
        var overview = document.createElement('div');
        var date = document.createElement('time');
        item.classList.add('result', 'js-result', 'js-result--first', 'isActive');
        header.classList.add('result__title');
        footer.classList.add('result__footer');
        titleLink.classList.add('result__title__link', 'js-result__title__link');
        titleLink.setAttribute('src', '#');
        titleLink.innerText = el.title;
        title.append(titleLink);
        content.classList.add('result__info', 'cf');
        poster.classList.add('result__img', 'js-result__img');
        poster.setAttribute('data-src', 'https://image.tmdb.org/t/p/w500' + el.poster_path);
        poster.setAttribute('src', './img/1.jpg');
        poster.setAttribute('alt', el.title);
        overview.classList.add('result__description');
        overview.append(document.createTextNode(el.overview));
        date.classList.add('result__data');
        date.append(document.createTextNode('Дата релиза: ' + el.release_date));
        date.dateTime = el.release_date;
        header.append(title);
        content.append(poster, overview);
        footer.append(date);
        item.append(header, content, footer, document.createElement('hr'));
        return item;
    }

    function buildNav(data) {
        var data = data.genres;
        var menuLimit = 8;
        var container = document.querySelector('.js-list');
        var showLess = makeShowLessButton();
        var showMore = makeShowMoreButton();


        data.slice(0, 10).forEach(function (el, index) {
            let item = makeNavItem(el, index);
            container.append(item);
        });

        container.append(showMore);

        data.slice(10).forEach(function (el, index) {
            let item = makeNavItem(el, index);
            container.append(item);
        });

        container.append(showLess);
        initBurger();
        initNavButton();
        initNavLinks();
    }

    function makeNavItem(el, index) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.classList.add('item__link', 'js-item__link');
        link.setAttribute('data-link', index);
        link.setAttribute('data-menu-id', el.id);
        link.append(document.createTextNode(el.name));
        item.append(link);
        item.classList.add('item');
        return item;
    }


    function makeShowMoreButton() {
        var showMore = document.createElement('li');
        var tempLink = document.createElement('a');
        showMore.classList.add('item');
        tempLink.classList.add('item__link', 'item__link--showMore', 'js-item__link--showMore');
        tempLink.append(document.createTextNode("смотреть другие жанры"));
        showMore.append(tempLink);
        return showMore;
    }

    function makeShowLessButton() {
        var showLess = document.createElement('li');
        var tempLink = document.createElement('a');
        showLess.classList.add('item');
        tempLink.classList.add('item__link', 'item__link--showLess', 'js-item__link--showLess');
        tempLink.append(document.createTextNode("скрыть"));
        showLess.append(tempLink);
        return showLess;
    }

    function changeImgs(cb) {
        var imgs = document.querySelectorAll('.js-result__img');

        imgs.forEach(function (el, i) {
            var src = el.getAttribute('data-src');
            el.setAttribute('src', src);
        });

        cb();
    }

    function initBurger() {
        var burger = document.querySelector('.js-toggle__burger');
        burger.addEventListener('click', function (e) {
            var nav = document.querySelector('.js-nav');
            if (this.classList.contains('isActive')) {
                this.classList.remove('isActive');
                nav.classList.remove('isActive');
            } else {
                this.classList.add('isActive');
                nav.classList.add('isActive');
            }
        })
    }

    function initNavButton() {
        console.log('START BUTTON SCRIPT');
        var showMoreButton = document.querySelector('.js-item__link--showMore');
        var showLessButton = document.querySelector('.js-item__link--showLess');

        if (showMoreButton) {
            showMoreButton.addEventListener('click', function (e) {
                e.preventDefault();
                var list = document.querySelector('.js-list');
                list.classList.add('showItems');
                this.parentElement.classList.add('isHide');
            });
        }

        if (showLessButton) {
            showLessButton.addEventListener('click', function (e) {
                e.preventDefault();
                var list = document.querySelector('.js-list');
                var showMoreButton = document.querySelector('.js-item__link--showMore');
                showMoreButton.parentElement.classList.remove('isHide');
                list.classList.remove('showItems');
            });
        }
    }

    function initTitleButton() {
        var list = document.querySelector('.js-results');
        list.addEventListener('click', function(e) {
            e.preventDefault();
            var modalWindow = document.querySelector('.js-modal');
            var target = e.target;
            console.log(target);
            if(target.classList.contains('js-result__title__link')) {
                modalWindow.classList.add('isActive');
                modalWindow.querySelector('.js-modal__text').classList.add('isActive');
                return;
            }
        });
    }

    function initModal() {
        var modalWindow = document.querySelector('.js-modal');
        modalWindow.addEventListener('click', function (e) {
            this.classList.remove('isActive');
            this.querySelector('.js-modal__text').classList.remove('isActive');
        });
    }

    function showModal() {
        var modalWindow = document.querySelector('.js-modal');
        modalWindow.style.display = 'block';
        modalWindow.querySelector('.js-modal__preloader').style.display = 'block';
    }

    // TODO: make fadeIn
    function hideModal() {
        var modalWindow = document.querySelector('.js-modal');
        modalWindow.style.display = '';
        modalWindow.querySelector('.js-modal__preloader').style.display = 'none';
    }

    function initNavLinks() {
        var navLinks = document.querySelectorAll('.js-item__link');
        navLinks.forEach(function (el, i) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                var link = links.forGenre + this.getAttribute('data-menu-id');
                appendContent(link, buildContent);
                showModal();
            })
        })
    }


});