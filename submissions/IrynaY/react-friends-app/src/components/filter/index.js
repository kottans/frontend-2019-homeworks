import React from 'react'
import propTypes from 'prop-types'
import './style.css';

const Filter = ({ formOnChange }) => {

  const handleChange = (event) => {
    const {name, value} = event.target
    formOnChange({key: name, value})
  }

  return (
    <form className='filter-section' onChange={handleChange}>
      <fieldset>
        <input type='search' name='name' placeholder='Name' />
        <input type='search' name='species' placeholder='Species' />
      </fieldset>
      
      <fieldset>
        <span>Status: </span>
        <label>
          <input type='radio' name='status' value='Alive'/> Alive
        </label>
        <label>
          <input type='radio' name='status' value='Dead'/> Dead
        </label>
        <label>
          <input type='radio' name='status' value='unknown'/> Unknown
        </label>
        <label>
          <input type='radio' name='status' value='' defaultChecked/> All
        </label>
      </fieldset>

      <fieldset>
        <span>Gender: </span>
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
          <input type='radio' name='gender' value='' defaultChecked/> All
        </label>
      </fieldset>
    </form>
  )
}

Filter.propTypes = {
  formOnChange: propTypes.func,
}

export default Filter
