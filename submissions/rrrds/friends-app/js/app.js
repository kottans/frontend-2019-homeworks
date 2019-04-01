class Component {
  constructor(selector, props) {
    this.element = document.querySelector(selector);
    this.props = props || {};
  }

  bindEvent(key, listener) {
    this.element.addEventListener(key, listener.bind(this));
  }

  setValue(state = {}) {
    if (!this.props.valueName) return;

    if (!Object.prototype.hasOwnProperty.call(state, this.props.valueName)) return;

    const newValue = state[this.props.valueName];

    if (newValue !== this.element.value) {
      this.element.value = newValue || '';
    }
  }
}

class InputControl extends Component {
  constructor(selector, props) {
    super(selector, props);

    this.eventKey = 'keyup';
    this.bindEvent(this.eventKey, this.eventHandler);
  }

  eventHandler(event) {
    this.props.setState({ [this.props.valueName]: event.target.value });
  }
}

class NumberControl extends Component {
  constructor(selector, props) {
    super(selector, props);

    this.eventKey = 'input';
    this.bindEvent(this.eventKey, this.eventHandler);
  }

  eventHandler(event) {
    const value = event.target.value || null;
    this.props.setState({ [this.props.valueName]: value });
  }
}

class SelectControl extends Component {
  constructor(selector, props) {
    super(selector, props);

    this.eventKey = 'change';
    this.bindEvent(this.eventKey, this.eventHandler);
  }

  eventHandler(event) {
    const value = event.target.value || null;
    this.props.setState({ [this.props.valueName]: value });
  }
}

class ButtonControl extends Component {
  constructor(selector, props) {
    super(selector, props);

    this.eventKey = 'click';
    this.bindEvent(this.eventKey, this.props.eventHandler);
  }
}

class FriendApp {
  constructor(api) {
    this.config = {
      apiUrl: api,
      defaultSort: 'name_asc',
      initialState: {
        searchbar: null,
        sort: 'name_asc',
        ageFrom: null,
        ageTo: null,
        gender: null
      }
    };

    this.components = [];

    this.container = document.querySelector('.users-container__body');
    this.totalCounter = document.querySelector('.users-container__total');
    this.usersData = [];

    this.config.apiUrl = api;
  }

  filterByName(data, filter) {
    return data.filter(item => item.name.first.indexOf(filter) >= 0);
  }

  filterFromAge(data, age) {
    return data.filter(item => item.dob.age > age);
  }

  filterToAge(data, age) {
    return data.filter(item => item.dob.age < age);
  }

  filterByGender(data, gender) {
    return data.filter(item => item.gender === gender);
  }

  sortByAge(data, direction) {
    return data.sort((a, b) =>
      direction === 'asc' ? a.dob.age - b.dob.age : b.dob.age - a.dob.age
    );
  }

  sortByName(data, direction) {
    return data.sort((a, b) => {
      let intResult = 0;

      if (a.name.first > b.name.first) {
        intResult = 1;
      }
      if (a.name.first < b.name.first) {
        intResult = -1;
      }

      return direction === 'asc' ? intResult : -intResult;
    });
  }

  applyFilters(data) {
    if (this.state.searchbar !== null) {
      data = this.filterByName(data, this.state.searchbar);
    }

    if (this.state.ageFrom !== null) {
      data = this.filterFromAge(data, this.state.ageFrom);
    }

    if (this.state.ageTo !== null) {
      data = this.filterToAge(data, this.state.ageTo);
    }

    if (this.state.gender !== null) {
      data = this.filterByGender(data, this.state.gender);
    }

    if (this.state.sort !== null) {
      const [prop, direction] = this.state.sort.split('_');

      switch (prop) {
        case 'name':
          data = this.sortByName(data, direction);
          break;
        case 'age':
          data = this.sortByAge(data, direction);
          break;
      }
    } else {
      this.state.sort = this.defaultSort;
    }

    return data;
  }

  renderUsers(data = []) {
    this.container.innerHTML = '';
    const userTemplates = [];

    data.forEach(element => {
      userTemplates.push(
        `<div class="card">
        <img src="${element.picture.large}" class="card__image">
        <div class="card__body">
          <h3 class="card__name">${element.name.first}, <span class="card__age">${
          element.dob.age
        } <i class="card__gender fas fa-${
          element.gender === 'male' ? 'mars' : 'venus'
        } "></i></span></h3>
          <p class="card__location"><i class="card__location-icon fas fa-map-marker-alt"></i> ${
            element.location.city
          },<br><span class="card__state">${element.location.state}</span></p>
          <p class="card__phone"><i class="card__phone-icon fas fa-phone"></i> ${element.phone}</p>
        </div>
      </div>`
      );
    });

    this.container.innerHTML = userTemplates.join('');
    this.totalCounter.innerHTML = `Total: ${data.length}`;
  }

  render() {
    this.renderUsers(this.applyFilters(this.usersData));
  }

  onResetHandler() {
    this.setState(this.config.initialState || {});

    this.components.forEach(c => {
      c.setValue(this.state);
    });
  }

  fetchData(apiUrl) {
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) return [];
        return response.json();
      })
      .catch(() => []);
  }

  initState(state) {
    this.state = new Proxy(state || {}, {
      set: (obj, prop, value) => {
        obj[prop] = value;

        this.render();

        return true;
      }
    });
  }

  setState(newPartialState) {
    this.state = Object.assign({}, this.state, newPartialState);

    this.render();
  }

  createComponent(selector, type, props) {
    const classes = { InputControl, SelectControl, NumberControl, ButtonControl };

    return new classes[type](
      selector,
      Object.assign({}, props, { setState: this.setState.bind(this) })
    );
  }

  init() {
    this.initState(this.config.initialState);

    this.components.push(
      this.createComponent('.header__search', 'InputControl', { valueName: 'searchbar' }),
      this.createComponent('.filters__sort', 'SelectControl', { valueName: 'sort' }),
      this.createComponent('.filters__gender', 'SelectControl', { valueName: 'gender' }),
      this.createComponent('.filters__age-from', 'NumberControl', { valueName: 'ageFrom' }),
      this.createComponent('.filters__age-to', 'NumberControl', { valueName: 'ageTo' }),
      this.createComponent('.filters__button', 'ButtonControl', {
        eventHandler: this.onResetHandler.bind(this)
      })
    );

    this.fetchData(this.config.apiUrl)
      .then(data => data.results || [])
      .then(data => {
        this.usersData = data;

        this.render();
      });
  }
}

// const app = new FriendApp('https://randomuser.me/api/?results=50');
const app = new FriendApp('http://httpstat.us/500');
app.init();
