import React from 'react';
import { getPager } from '../../utils';
import './style.scss';

const Pagination = ({ limit, offset, total, handleClick }) => {
  if (total && limit && total > limit) {
    const { pagesArray, currentPage } = getPager(limit, offset, total);

    const onClick = e => {
      const pageNumber = e.target.value;
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
        {pagesArray.map((page, index) => {
          return page === currentPage ? (
            <li
              className="pagination_selected-list-item"
              key={index}
              value={page}
            >
              {page}
            </li>
          ) : (
            <li key={index} value={page}>
              {page}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};
export default Pagination;
