const PAGER_SIZE = 5;
const MIDDLE_OF_PAGER = Math.ceil(PAGER_SIZE / 2);

const createOrderedArray = size =>
  Array.from(new Array(size)).map((el, index) => index + 1);

let currentPage, lastPage;

export const getPager = (itemsPerPage, offsetItems, totalItems) => {
  currentPage = Math.ceil((offsetItems + 1) / itemsPerPage);
  lastPage = Math.ceil(totalItems / itemsPerPage);

  if (lastPage < 1) {
    return { pagesArray: [], currentPage };
  }
  if (1 <= lastPage && lastPage <= PAGER_SIZE) {
    return { pagesArray: createOrderedArray(lastPage), currentPage };
  }
  if (lastPage > PAGER_SIZE) {
    if (currentPage <= MIDDLE_OF_PAGER) {
      return {
        pagesArray: [...createOrderedArray(PAGER_SIZE), '...', lastPage],
        currentPage,
      };
    }
    let pagerArray = createOrderedArray(PAGER_SIZE).map(
      el => currentPage - MIDDLE_OF_PAGER + el,
    );

    if (currentPage === MIDDLE_OF_PAGER + 1) {
      return { pagesArray: [1, ...pagerArray, '...', lastPage], currentPage };
    }

    if (currentPage === lastPage - MIDDLE_OF_PAGER) {
      return { pagesArray: [1, '...', ...pagerArray, lastPage], currentPage };
    }
    let orderedArrayBelowLastPage = createOrderedArray(PAGER_SIZE)
      .map(el => lastPage - el + 1)
      .reverse();
    if (currentPage > lastPage - MIDDLE_OF_PAGER) {
      return {
        pagesArray: [1, '...', ...orderedArrayBelowLastPage],
        currentPage,
      };
    }
    return {
      pagesArray: [1, '...', ...pagerArray, '...', lastPage],
      currentPage,
    };
  }
};
export const removeEmptyStrings = object => {
  return Object.keys(object).reduce((newObject, key) => {
    if (object[key] !== '') {
      newObject[key] = object[key];
    }
    return newObject;
  }, {});
};
