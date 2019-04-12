import React from 'react';
import propTypes from 'prop-types'
import './style.css';

function Pagination(props){
  return(
    <div className='page-list'>
      
      <button>
      set page state -1
      </button>

      <button>
        {props.currentPage}
      </button>

      <button>
        set page state +1
      </button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number,
  // next: propTypes.number,
  // prev: propTypes.number
}

export default Pagination