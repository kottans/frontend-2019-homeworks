import React, { Component } from "react";

import "./Pagination.css";

class Pagination extends Component {

  getPaginationArray = (current, total) => {
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

  render() {
    const { currentPage, pages } = this.props;
    const paginationArray = this.getPaginationArray(currentPage, pages);
    
    return (
      <ul onClick={this.props.handleClick} className="pagination">
        {paginationArray.map(pageNumber => (
          (pageNumber === this.props.currentPage) ?
          <li key={pageNumber} className="pagination-item active">{pageNumber}</li>
          :
          <li key={pageNumber} className="pagination-item">{pageNumber}</li>
        ))}
      </ul>
    );
  }
}

export default Pagination;
