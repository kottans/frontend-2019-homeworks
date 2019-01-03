let FiltersContainer = (function() {
  const filterGroup = document.getElementById('filter');
  const searchField = filterGroup.querySelector('input[type=search]');
  const filterSexGroup = filterGroup.querySelector('.filter-sex');
  const maxAgeValue = filterGroup.querySelector('.filter-age .max');
  const ageRangeSlider = document.getElementById('age-range');
  const searchType = document.getElementById('search-type');

  const DEF_SEARCH_NAME = '';
  const DEF_SEARCH_TYPE = 'Name';
  const DEF_MIN_AGE = '21';
  const DEF_MAX_AGE = '75';
  const DEF_ORDER = 'name-asc';
  const DEF_SEX = 'all';

  const ORDER_BY_AGE = 'age';
  const ORDER_BY_NAME = 'name';
  const ORDER_BY_DATE = 'date';
  const BACK_SPACE_CODE = 8;

  const ORDER_ASC = 'asc';
  const SEARCH_NAME = 'Name';
  const SEARCH_CITY = 'City';
  const SEARCH_EMAIL = 'Email';

  const filterCondition = {
    name: DEF_SEARCH_NAME,
    min: DEF_MIN_AGE,
    max: DEF_MAX_AGE,
    order: DEF_ORDER,
    sex: DEF_SEX,
    type: DEF_SEARCH_TYPE,
  };

  let filterResult,
    filterResultChange,
    isOrderedBy = {};

  const prevFilterValue = {
    name: DEF_SEARCH_NAME,
    sex: DEF_SEX,
    max: DEF_MAX_AGE,
    order: DEF_ORDER,
  };

  const filterData = data => {
    originalData = data;
    filterResult = data;
    resetOrderFilter();
    applyFilter();
  };

  const onChange = callback => {
    filterResultChange = callback;
  };

  const applyFilter = () => {
    filter(filterCondition);
    const orderCond = filterCondition.order.split('-');
    order(orderCond[0], orderCond[1] == ORDER_ASC);
    filterResultChange(filterResult);
  };

  searchField.addEventListener('keyup', event => {
    if (event.code.indexOf('Key') != 0 && event.keyCode != BACK_SPACE_CODE)
      return;
    filterCondition.name = `${event.target.value}`;
    filterCondition.type = getSearchType();
    applyFilter();
  });

  searchField.addEventListener('search', ({ target }) => {
    filterCondition.name = '';
    filterCondition.type = getSearchType();
    applyFilter();
  });

  const getSearchType = () => {
    return searchType.options[searchType.selectedIndex].value;
  };

  ageRangeSlider.addEventListener('change', ({ target }) => {
    filterCondition.max = target.value;
    applyFilter();
  });

  filterSexGroup.addEventListener('click', ({ target }) => {
    if (target.type == 'button') {
      filterCondition.sex = `${target.value}`;
      handleRadioButton(target, '.checked', filterSexGroup);
    }
  });

  filterGroup.addEventListener('input', ({ target }) => {
    if (target.type == 'radio') {
      filterCondition.order = `${target.value}`;
      handleRadioButton(target, 'input.checked');
    } else if (target.type == 'range') {
      handleAgeRangeInput(target);
    }
  });

  maxAgeValue.innerHTML = ageRangeSlider.value;
  const handleAgeRangeInput = ({ value }) => {
    maxAgeValue.innerHTML = value;
  };

  const handleRadioButton = (button, selector, group = filterGroup) => {
    let buttonStyles = button.classList;
    if (buttonStyles.contains('checked')) return;
    group.querySelector(selector).classList.remove('checked');
    buttonStyles.add('checked');
    applyFilter();
  };

  const resetOrderFilter = ({
    age = false,
    name = true,
    date = false,
    asc = true,
  } = {}) => {
    isOrderedBy.age = age;
    isOrderedBy.name = name;
    isOrderedBy.date = date;
    isOrderedBy.asc = asc;
  };

  const orderByAge = asc => {
    return ({ dob: { age: age1 } }, { dob: { age: age2 } }) =>
      asc ? age1 - age2 : age2 - age1;
  };

  const orderByDate = asc => {
    return ({ registered: reg1 }, { registered: reg2 }) => {
      date1 = new Date(reg1.date);
      date2 = new Date(reg2.date);
      return asc ? date1 - date2 : date2 - date1;
    };
  };

  const orderByName = asc => {
    return ({ name: n1 }, { name: n2 }) => {
      let fullName1 = `${n1.first} ${n1.last}`,
        fullName2 = `${n2.first} ${n2.last}`;
      if (fullName1 < fullName2) return asc ? -1 : 1;
      if (fullName1 > fullName2) return asc ? 1 : -1;
    };
  };

  const orderBy = (prop, asc) => {
    return prop == ORDER_BY_AGE
      ? orderByAge(asc)
      : prop == ORDER_BY_NAME
      ? orderByName(asc)
      : orderByDate(asc);
  };

  const order = function(prop, asc = true) {
    let comparator;

    if (isOrderedBy[prop] && asc != isOrderedBy.asc) {
      return filterResult.reverse();
    }
    comparator = orderBy(prop, asc);
    resetOrderFilter({
      age: prop == ORDER_BY_AGE,
      name: prop == ORDER_BY_NAME,
      date: prop == ORDER_BY_DATE,
      asc: asc,
    });
    filterResult.sort(comparator);
    prevFilterValue.order = `${prop}-${asc}`;
    return filterResult;
  };

  const filterName = ({ name }, searchPattern) => {
    return `${name.first} ${name.last}`.search(searchPattern) >= 0;
  };

  const filterEmail = ({ email }, searchPattern) => {
    return email.search(searchPattern) >= 0;
  };

  const filterCity = ({ location: { city } }, searchPattern) => {
    return city.search(searchPattern) >= 0;
  };

  const filterAge = ({ dob: { age } }, min, max) => {
    return age >= min && age <= max;
  };

  const filterSex = ({ gender }, searchPattern) => {
    return gender.search(searchPattern) >= 0;
  };

  const getSearchPattern = (type, name) => {
    return type == 'Email'
      ? RegExp(`\\b${name}[A-Za-z@.]*`, 'ig')
      : new RegExp(`\\b${name}\\w*`, 'ig');
  };

  const getSearchFilter = (type, name) => {
    let pattern = getSearchPattern(type, name);
    let filter;
    if (type == SEARCH_NAME) filter = filterName;
    if (type == SEARCH_EMAIL) filter = filterEmail;
    if (type == SEARCH_CITY) filter = filterCity;
    return value => filter(value, pattern);
  };

  const filter = function({ min, max, name, sex, type }) {
    if (
      prevFilterValue.name.length > name.length ||
      sex != prevFilterValue.sex ||
      max > prevFilterValue.max
    ) {
      resetOrderFilter();
      filterResult = originalData.slice();
    }
    const searchSexPattern =
      sex == DEF_SEX ? /(fe)?male/i : new RegExp(`\\b${sex}`, 'i');
    const filterSearch = getSearchFilter(type, name);

    filterResult = filterResult.filter(value => {
      return (
        filterAge(value, min, max) &&
        filterSearch(value) &&
        filterSex(value, searchSexPattern)
      );
    });
    prevFilterValue.name = name;
    prevFilterValue.sex = sex;
    prevFilterValue.max = max;
    return filterResult;
  };

  return {
    filterData: filterData,
    onChange: onChange,
  };
})();
