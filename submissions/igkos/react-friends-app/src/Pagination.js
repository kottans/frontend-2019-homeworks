import React from 'react';

const Pagination = ({ limit, offset, total, handleClick }) => {
  if (total && limit) {
    const getPageNumber = itemsPerPage => Math.ceil(itemsPerPage / limit);
    let currentPage = getPageNumber(offset) + 1;
    currentPage = !currentPage ? 1 : currentPage;
    const lastPage = getPageNumber(total) - 1;
    const getPager = () => {
      let pagerSize = 5;
      pagerSize = pagerSize % 2 ? pagerSize++ : pagerSize;
      const middleOfPager = Math.ceil(pagerSize / 2);
      const createOrderedArr = size =>
        Array.from(new Array(size)).map((el, index) => index + 1);
      const orderedPagerSizeArr = createOrderedArr(pagerSize);
      if (lastPage < 1) {
        return [];
      }
      if (1 <= lastPage && lastPage <= pagerSize) {
        return createOrderedArr(lastPage);
      }
      if (lastPage > pagerSize) {
        if (currentPage <= middleOfPager) {
          return [...orderedPagerSizeArr, '...', lastPage];
        }
        let pagerArr = orderedPagerSizeArr.map(
          el => currentPage - middleOfPager + el,
        );

        if (currentPage === middleOfPager + 1) {
          return [1, ...pagerArr, '...', lastPage];
        }

        if (currentPage === lastPage - middleOfPager) {
          return [1, '...', ...pagerArr, lastPage];
        }
        let orderedArrBelowLastPage = orderedPagerSizeArr
          .map(el => lastPage - el + 1)
          .reverse();
        if (currentPage > lastPage - middleOfPager) {
          return [1, '...', ...orderedArrBelowLastPage];
        }
        return [1, '...', ...pagerArr, '...', lastPage];
      }
    };
    const pager = getPager();

    const onClick = e => {
      const pageNumber = e.target.innerHTML;
      if (
        e.target.matches('li') &&
        pageNumber !== '...' &&
        pageNumber !== currentPage
      )
        console.log(pageNumber);
      handleClick({ offset: (pageNumber - 1) * limit });
    };

    return (
      <ul className="pagination_list" onClick={onClick}>
        {pager.map((page, index) => {
          return page === currentPage ? (
            <li className="pagination_selected-list-item" key={index}>
              {page}
            </li>
          ) : (
            <li key={index}>{page}</li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};
export default Pagination;
