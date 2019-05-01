import React from 'react';
import { getPager } from '../../utils';
import './style.scss';

const Pagination = ({ limit, offset, total, handleClick }) => {
  if (!total) {
    return null;
  }
  const { pagesArray, currentPage } = getPager(limit, offset, total);

  const onClick = page => {
    if (page !== '...') {
      handleClick({ offset: (page - 1) * limit });
    }
  };

  return (
    <ul className="pagination_list">
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
          <li key={index} value={page} onClick={() => onClick(page)}>
            {page}
          </li>
        );
      })}
    </ul>
  );
};
export default Pagination;
