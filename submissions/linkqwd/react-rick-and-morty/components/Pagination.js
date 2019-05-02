import React from "react";

export const Pagination = props => {
  if (!props.pagesCount || props.pagesCount === 1) return "";

  let paginationElements = [];

  for (let i = 1; i <= props.pagesCount; i++) {
    paginationElements.push(
      <li
        onClick={props.onClick}
        className={
          "pagination__item" +
          (props.currentPage === i ? " pagination__item_active" : "")
        }
        id={i}
        key={i}
      >
        {i}
      </li>
    );
  }

  return <ul className="pagination">{paginationElements}</ul>;
};
