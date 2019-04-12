import React from 'react';
import propTypes from 'prop-types'
import './style.css';

const Sorter = ({ apllySort, list}) => {
  const sortDESC = () => {
      list.sort(( current, next ) =>  current.name < next.name ? 1 : -1)
      apllySort(list)
  }

  const sortASC = () => {
    list.sort(( current, next ) => current.name < next.name ? -1 : 1)
    apllySort(list)
  }

  return(
    <>
      <button type='button' name='desc' onClick={sortDESC}> DESC </button>
      <button type='button' name='acs' onClick={sortASC}> ASC </button>
    </>
  )
}

Sorter.propTypes = {
  apllySort: propTypes.func,
  list: propTypes.array,
}

export default Sorter
