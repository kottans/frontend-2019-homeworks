import React from 'react';
import './searchfilter.css';

const SearchFilter = ({ handleSort, handleSearch, handleFilter }) => {
  const onSearchSortFilter = ({ target }) => {
    const searchInputValue = target.name === 'searchInput' ? target.value : '';

    if (target.name === 'searchInput') {
      handleSearch({
        searchInputValue: searchInputValue
      });
    }
    if (target.checked && target.name === 'sortOrder') {
      handleSort({
        [target.name]: target.value
      });
    }
    if (target.checked && target.name === 'filterSpecies') {
      handleFilter({
        [target.name]: target.value
      });
    }
  };

  return (
    <form className='form__main' onChange={onSearchSortFilter}>
      <div className='radio-buttons'>
        <div className='sort-asc-desc'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='sortOrder'
              id='inlineRadio1'
              value='asc'
            />
            <label className='form-check-label' htmlFor='inlineRadio1'>
              Sort by Asc
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='sortOrder'
              id='inlineRadio2'
              value='desc'
            />
            <label className='form-check-label' htmlFor='inlineRadio2'>
              Sort by Desc
            </label>
          </div>
        </div>
        <div className='sort-asc-desc'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='filterSpecies'
              id='inlineRadio3'
              value='Human'
            />
            <label className='form-check-label' htmlFor='inlineRadio3'>
              Filter by Human
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='filterSpecies'
              id='inlineRadio4'
              value='Alien'
            />
            <label className='form-check-label' htmlFor='inlineRadio4'>
              Filter by Alien
            </label>
          </div>
        </div>
      </div>

      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          name='searchInput'
          placeholder='search by name... '
          aria-label="Recipient's username"
          aria-describedby='button-addon2'
        />
      </div>
    </form>
  );
};

export default SearchFilter;
