export const getPager = (limit, offset, total) => {
  const getPageNumber = itemsPerPage => Math.ceil(itemsPerPage / limit);
  let currentPage = getPageNumber(offset) + 1;
  const lastPage = getPageNumber(total);
  let pagerSize = 5;
  const middleOfPager = Math.ceil(pagerSize / 2);
  const createOrderedArray = size =>
    Array.from(new Array(size)).map((el, index) => index + 1);
  const orderedPagerSizeArray = createOrderedArray(pagerSize);
  if (lastPage < 1) {
    return { pagesArray: [], currentPage };
  }
  if (1 <= lastPage && lastPage <= pagerSize) {
    return { pagesArray: createOrderedArray(lastPage), currentPage };
  }
  if (lastPage > pagerSize) {
    if (currentPage <= middleOfPager) {
      return {
        pagesArray: [...orderedPagerSizeArray, '...', lastPage],
        currentPage,
      };
    }
    let pagerArray = orderedPagerSizeArray.map(
      el => currentPage - middleOfPager + el,
    );

    if (currentPage === middleOfPager + 1) {
      return { pagesArray: [1, ...pagerArray, '...', lastPage], currentPage };
    }

    if (currentPage === lastPage - middleOfPager) {
      return { pagesArray: [1, '...', ...pagerArray, lastPage], currentPage };
    }
    let orderedArrayBelowLastPage = orderedPagerSizeArray
      .map(el => lastPage - el + 1)
      .reverse();
    if (currentPage > lastPage - middleOfPager) {
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
