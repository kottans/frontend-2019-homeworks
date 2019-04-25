import React from 'react';
import propTypes from 'prop-types'
import './style.css';

const SortButton = ({ title, name, active }) => {
  let classList = 'sort-btn'
  if(active) 
    classList += ' active'
    
  return <button type='button' name={name} className={classList}> {title} </button>
}

SortButton.propTypes = {
  title: propTypes.string,
  name: propTypes.string,
  active: propTypes.bool
}

const Sorter = ({ order, apllySort }) => {
  const formOnClick = ( event ) => {
    apllySort(event.target.name)
  }

  return (
    <form className='sorter-section' onClick={formOnClick}>
      <SortButton title='asc' name='asc' active={order === 'asc'}/>
      <SortButton title='desc' name='desc' active={order === 'desc'}/>
    </form>
  )
}

Sorter.propTypes = {
  order: propTypes.string,
  apllySort: propTypes.func,
}

export default Sorter;
