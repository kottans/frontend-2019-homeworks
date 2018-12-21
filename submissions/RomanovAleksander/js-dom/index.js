const MENU_GENERAL_CLASS = 'item';
const MENU_BTN_CLASS = `${MENU_GENERAL_CLASS}__menu`;
const MENU_TEXT_CLASS = `${MENU_GENERAL_CLASS}__content`;
const MENU_ACTIVE_CLASS = `${MENU_GENERAL_CLASS}_active`;
const MENU_TEXT = `text`;
const MENU_IMG_CLASS = `${MENU_GENERAL_CLASS}__img`;

class Menu {
    constructor(targetElement, array) {
        this.targetEl = targetElement;
        this.array = array;
        this.itemArray = [];
        this.renderList();
        this.toggle();
    }

    render() {
        this.item = document.createElement('div');
        this.titleElement = document.createElement('button');
        this.listElement = document.createElement('div');
        this.text = document.createElement('p');
        this.img = document.createElement('img');
        this.fragment = document.createDocumentFragment();

        this.item.classList.add(MENU_GENERAL_CLASS);
        this.titleElement.classList.add(MENU_BTN_CLASS);
        this.listElement.classList.add(MENU_TEXT_CLASS);
        this.img.classList.add(MENU_IMG_CLASS);
        this.text.classList.add(MENU_TEXT);

        this.item.appendChild(this.titleElement);
        this.item.appendChild(this.listElement);
        this.listElement.appendChild(this.img);
        this.listElement.appendChild(this.text);

        this.itemArray.push(this.item);
    }

    renderList() {
        this.array.forEach(item => {
            this.render();
			this.targetEl.appendChild(this.item);
            this.titleElement.textContent = item.title;
            this.text.textContent = item.text;
            this.img.src = item.img;
        });
//        this.targetEl.appendChild(this.fragment);
    }

    off() {
        this.itemArray.forEach(item => {
                item.classList.remove('item_active');
            }
        )
    }

    add(event) {
        let target = event.target;
        while(target !== this ) {
            if (target.className === 'item') {
                target.classList.add(MENU_ACTIVE_CLASS);
                break;
            }
            target = target.parentNode;
        }
    }


    toggle() {
        document.querySelector('.content').addEventListener('click', () => {
                    this.off();
                    this.add(event);
                }
            )

    }
}

const menu = new Menu(document.querySelector('.content'), [
    {
        title: 'React',
        text: 'In computing, React (also known as React.js or ReactJS) is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.\n' +
        'React can be used as a base in the development of single-page or mobile applications. Complex React applications usually require the use of additional libraries for state management, routing, and interaction with an API.',
        img: './assets/react.png'
    },
    {
        title: 'Angular',
        text: 'AngularJS (also written as Angular.js) is a JavaScript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications. The JavaScript components complement Apache Cordova, a framework used for developing cross-platform mobile apps.',
        img: './assets/angular.svg'
    },
    {
        title: 'Vue',
        text: 'Vue.js is an open-source JavaScript framework for building user interfaces and single-page applications.' +
        'Vue.js features an incrementally adoptable architecture that focuses on declarative rendering and component composition. Advanced features required for complex applications such as routing, state management and build tooling are offered via officially maintained supporting libraries and packages.',
        img: 'assets/vue.svg'
    }
]);
