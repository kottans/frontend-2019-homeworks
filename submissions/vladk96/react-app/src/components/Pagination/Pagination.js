import React from "react";

import classNames from "classnames/bind";

import "./Pagination.css";

const getPaginationArray = (current, total) => {
  let list = [];
  let lowerLimit = Math.min(current, total);
  let upperLimit = Math.min(current, total);
  const PAGE_LIMIT = 3;

  for (let b = 1; b < PAGE_LIMIT && b < total; b++) {
    if (lowerLimit > 1) {
      lowerLimit--;
    }
    if (b < PAGE_LIMIT && upperLimit < total) {
      upperLimit++;
    }
  }

  for (let i = lowerLimit; i <= upperLimit; i++) {
    list.push(i);
  }
  return list;
};

const Pagination = props => {
  const paginationArray = getPaginationArray(props.currentPage, props.pages);

  return (
    <ul onClick={props.handleClick} className="pagination">
      {paginationArray.map(pageNumber => (
        <li
          key={pageNumber}
          className={classNames("pagination-item", {
            active: pageNumber === props.currentPage
          })}
        >
          {pageNumber}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
