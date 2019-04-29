export const getPager = (limit, offset, total) => {
  const getPageNumber = itemsPerPage => Math.ceil(itemsPerPage / limit);
  let currentPage = getPageNumber(offset) + 1;
  const lastPage = getPageNumber(total);
  let pagerSize = 5;
  pagerSize = pagerSize % 2 ? pagerSize++ : pagerSize;
  const middleOfPager = Math.ceil(pagerSize / 2);
  const createOrderedArr = size =>
    Array.from(new Array(size)).map((el, index) => index + 1);
  const orderedPagerSizeArr = createOrderedArr(pagerSize);
  if (lastPage < 1) {
    return { pagesArr: [], currentPage };
  }
  if (1 <= lastPage && lastPage <= pagerSize) {
    return { pagesArr: createOrderedArr(lastPage), currentPage };
  }
  if (lastPage > pagerSize) {
    if (currentPage <= middleOfPager) {
      return {
        pagesArr: [...orderedPagerSizeArr, '...', lastPage],
        currentPage,
      };
    }
    let pagerArr = orderedPagerSizeArr.map(
      el => currentPage - middleOfPager + el,
    );

    if (currentPage === middleOfPager + 1) {
      return { pagesArr: [1, ...pagerArr, '...', lastPage], currentPage };
    }

    if (currentPage === lastPage - middleOfPager) {
      return { pagesArr: [1, '...', ...pagerArr, lastPage], currentPage };
    }
    let orderedArrBelowLastPage = orderedPagerSizeArr
      .map(el => lastPage - el + 1)
      .reverse();
    if (currentPage > lastPage - middleOfPager) {
      return { pagesArr: [1, '...', ...orderedArrBelowLastPage], currentPage };
    }
    return { pagesArr: [1, '...', ...pagerArr, '...', lastPage], currentPage };
  }
};
