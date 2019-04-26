import React from 'react';
import propTypes from 'prop-types'
import './style.css';

const Pagination = ({ page, total, onClick }) => {

  const goToPage = ( event ) => {
    if(event.target.name === 'next' && page !== total)
      return onClick(++page)
    else if(event.target.name === 'back' && page !== 1)
      return onClick(--page)
  }

  return (
    <div className='page-list'>
      {(page > 1) && <button name='back' onClick={goToPage}> Back </button>}
      <span className='current-page'>{page}</span>
      {(page < total) &&  <button name='next' onClick={goToPage}> Next </button>}
    </div>
  )
}

Pagination.propTypes = {
  page: propTypes.number,
  total: propTypes.number,
  onClick: propTypes.func,
}

export default Pagination
