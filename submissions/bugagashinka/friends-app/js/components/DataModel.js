let DataModel = (function() {
  const DEF_SEARCH_NAME = '';
  const DEF_MIN_AGE = '21';
  const DEF_MAX_AGE = '75';
  const DEF_ORDER = 'name-asc';
  const DEF_SEX = 'all';

  const ORDER_BY_AGE = 'age';
  const ORDER_BY_NAME = 'name';

  let searchResult,
    isOrderedBy = {};

  const prevFilterValue = {
    name: DEF_SEARCH_NAME,
    sex: DEF_SEX,
    max: DEF_MAX_AGE,
    order: DEF_ORDER,
  };

  function Data(data) {
    this.originalData = data;
    searchResult = data;
    resetOrderFilter();
  }

  Data.prototype.getData = function() {
    return searchResult;
  };

  const orderByAge = asc => {
    return ({ dob: { age: age1 } }, { dob: { age: age2 } }) =>
      asc ? age1 - age2 : age2 - age1;
  };

  const orderByName = asc => {
    return ({ name: n1 }, { name: n2 }) => {
      let fullName1 = `${n1.first} ${n1.last}`,
        fullName2 = `${n2.first} ${n2.last}`;
      if (fullName1 < fullName2) return asc ? -1 : 1;
      if (fullName1 > fullName2) return asc ? 1 : -1;
    };
  };

  const resetOrderFilter = ({ age = false, name = false, asc = true } = {}) => {
    isOrderedBy.age = age;
    isOrderedBy.name = name;
    isOrderedBy.asc = asc;
  };

  const orderBy = (prop, asc) => {
    return prop == ORDER_BY_AGE ? orderByAge(asc) : orderByName(asc);
  };

  Data.prototype.order = function(prop, asc = true) {
    console.log(prop, asc);
    let comparator;

    if (isOrderedBy[prop] && asc != isOrderedBy.asc) {
      return searchResult.reverse();
    }
    comparator = orderBy(prop, asc);
    const isOrderByAge = prop == ORDER_BY_AGE;
    resetOrderFilter({ age: isOrderByAge, name: !isOrderByAge, asc: asc });
    searchResult.sort(comparator);
    prevFilterValue.order = `${prop}-${asc}`;
    return searchResult;
  };

  const filterName = ({ name }, searchPattern) => {
    return `${name.first} ${name.last}`.search(searchPattern) >= 0;
  };

  const filterAge = ({ dob: { age } }, min, max) => {
    return age >= min && age <= max;
  };

  const filterSex = ({ gender }, searchPattern) => {
    return gender.search(searchPattern) >= 0;
  };

  Data.prototype.filter = function({ min, max, name, sex }) {
    console.log('FILTER ', name, sex, min, max);

    if (
      prevFilterValue.name.length > name.length ||
      sex != prevFilterValue.sex ||
      max > prevFilterValue.max
    ) {
      resetOrderFilter();
      searchResult = this.originalData.slice();
    }

    const searchNamePattern = new RegExp(`\\b${name}\\w*`, 'ig');
    const searchEmailPattern = /^\w*@[a-zA-Z_]*\.[a-zA-Z]*$/;
    const searchSexPattern =
      sex == 'all' ? /(fe)?male/i : new RegExp(`\\b${sex}`, 'i');

    searchResult = searchResult.filter(value => {
      return (
        filterAge(value, min, max) &&
        filterName(
          value,
          searchNamePattern,
        ) /*||
          filterEmail(value, searchEmailPattern) ||
          filterLocation(value, searchNamePattern)*/ &&
        filterSex(value, searchSexPattern)
      );
    });
    //console.log('inside filter', searchResult);
    prevFilterValue.name = name;
    prevFilterValue.sex = sex;
    prevFilterValue.max = max;
    return searchResult;
  };

  return {
    Data: Data,
    DEF_SEARCH_NAME: DEF_SEARCH_NAME,
    DEF_MIN_AGE: DEF_MIN_AGE,
    DEF_MAX_AGE: DEF_MAX_AGE,
    DEF_ORDER: DEF_ORDER,
    DEF_SEX: DEF_SEX,
  };
})();

/*
    if (
      min == 21 &&
      max == 75 &&
      name == '' &&
      sex == 'all' //&&
      //order == prevFilterValue.order
    ) {
      searchResult = this.originalData.slice();
      clearOrderFilter();
      return searchResult;
    }
    */

// const filterEmail = ({ email }, searchPattern) => {
//   return email.search(searchPattern) >= 0;
// };

// const filterLocation = ({ location: { city } }, searchPattern) => {
//   return city.search(searchPattern) >= 0;
// };

/*
    if (prop == ORDER_BY_AGE) {
      if (isOrdered.byAge && asc != isOrdered.asc) {
        return searchResult.reverse();
      }
      comparator = orderByAge(asc);
      isOrdered.byAge = true;
      isOrdered.byName = false;
    } else if (prop == ORDER_BY_NAME) {
      if (isOrdered.byName && asc != isOrdered.asc) {
        return searchResult.reverse();
      }
      comparator = orderByName(asc);
      isOrdered.byAge = false;
      isOrdered.byName = true;
    }*/
/////
/*isOrdered.asc = asc;
    searchResult.sort(comparator);
    console.log(searchResult);

    prevFilterValue.order = `${prop}-${asc}`;
    return searchResult;*/
