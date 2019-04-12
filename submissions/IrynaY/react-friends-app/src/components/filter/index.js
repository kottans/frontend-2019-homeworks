import React from 'react';
import propTypes from 'prop-types'

import './style.css';

function Filter(props){

  const onSubmit = event => {
    event.preventDefault()
    props.handleSubmit()
  }

  return(
    <div className='filter-section'>
      <h1>Filter</h1>

      <form onSubmit={onSubmit}>
        <input name='name' placeholder='Name'/>
        <button>Search</button>
      </form>

    </div>
  )
}

Filter.propTypes = {
  handleSubmit: propTypes.func,
}

export default Filter