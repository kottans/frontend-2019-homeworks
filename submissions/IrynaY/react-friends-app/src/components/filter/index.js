import React from 'react'
import propTypes from 'prop-types'
import './style.css';

const Filter = ({ formSubmit }) => {

  const handleChage = (e) => {
    const {name, value} = e.target
    formSubmit({key: name, value})
  }

  return(
    <form className='filter-section' onChange={handleChage}>
      <input type='search' name='name' placeholder='Name' />
      <input type='search' name='species' placeholder='Species' />
      <hr/>
      
      <span>Status: </span>
      <label>
        <input type='radio' name='status' value='Alive'/> Alive
      </label>
      <label>
        <input type='radio' name='status'  value='Dead'/> Dead
      </label>
      <label>
        <input type='radio' name='status' value='unknown'/> Unknown
      </label>
      <label>
        <input type='radio' name='status'  value=''/> All
      </label>

      <hr/>
      <span>Gendet: </span>
      <label>
        <input type='radio' name='gender' value='Male'/> Male
      </label>
      <label>
        <input type='radio' name='gender' value='Female'/> Female
      </label>
      <label>
        <input type='radio' name='gender' value='Genderless'/> Genderless
      </label>
      <label>
        <input type='radio' name='gender' value='unknown'/> unknown
      </label>
      <label>
        <input type='radio' name='gender' value=''/> All
      </label>
    </form>
  )
}

Filter.propTypes = {
  formSubmit: propTypes.func,
}

export default Filter
