import React from 'react';
import { getPager } from './utils';

const Pagination = ({ limit, offset, total, handleClick }) => {
  if (total && limit) {
    const { pagesArr, currentPage } = getPager(limit, offset, total);

    const onClick = e => {
      const pageNumber = e.target.innerHTML;
      if (
        e.target.matches('li') &&
        pageNumber !== '...' &&
        // eslint-disable-next-line
        pageNumber != currentPage
      ) {
        handleClick({ offset: (pageNumber - 1) * limit });
      }
    };

    return (
      <ul className="pagination_list" onClick={onClick}>
        {pagesArr.map((page, index) => {
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
