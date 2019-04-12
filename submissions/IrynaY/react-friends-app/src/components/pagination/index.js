import React from 'react';
import propTypes from 'prop-types'
import './style.css';

const Pagination = ({ page, total, goToNextPage, goToPrevPage }) => {
  return(
    <div className='page-list'>
      {(page > 1) && <button onClick={goToPrevPage}> Back </button>}
      <button>{page}</button>
      {(page < total) &&  <button onClick={goToNextPage}>  Next </button>}
    </div>
  )
}

Pagination.propTypes = {
  page: propTypes.number,
  total: propTypes.number,
  goToNextPage: propTypes.func,
  goToPrevPage: propTypes.func,
}

export default Pagination
