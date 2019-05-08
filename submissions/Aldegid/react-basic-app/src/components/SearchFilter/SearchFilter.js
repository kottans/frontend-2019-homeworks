import React from 'react';
import './searchfilter.css';

const SearchFilter = ({ handleSortFilter }) => {
  const searchInput = 'searchInput';
  const onSearchSortFilter = ({ target }) => {
    const searchInputValue = target.name === searchInput ? target.value : '';

    if (target.name === searchInput) {
      handleSortFilter({ searchInputValue });
    }
    if (target.checked && target.type === 'radio') {
      handleSortFilter({
        [target.name]: target.value
      });
    }
  };

  return (
    <form className='form__main'>
      <div className='radio-buttons'>
        <div className='sort-asc-desc'>
          <div className='form-check'>
            <input
              onChange={onSearchSortFilter}
              className='form-check-input'
              type='radio'
              name='sortOrder'
              id='sortByAsc'
              value='asc'
            />
            <label className='form-check-label' htmlFor='sortByAsc'>
              Sort by Asc
            </label>
          </div>
          <div className='form-check'>
            <input
              onChange={onSearchSortFilter}
              className='form-check-input'
              type='radio'
              name='sortOrder'
              id='sortByDesc'
              value='desc'
            />
            <label className='form-check-label' htmlFor='sortByDesc'>
              Sort by Desc
            </label>
          </div>
        </div>
        <div className='sort-asc-desc'>
          <div className='form-check'>
            <input
              onChange={onSearchSortFilter}
              className='form-check-input'
              type='radio'
              name='filterSpecies'
              id='filterByHuman'
              value='Human'
            />
            <label className='form-check-label' htmlFor='filterByHuman'>
              Filter by Human
            </label>
          </div>
          <div className='form-check'>
            <input
              onChange={onSearchSortFilter}
              className='form-check-input'
              type='radio'
              name='filterSpecies'
              id='filterByAlien'
              value='Alien'
            />
            <label className='form-check-label' htmlFor='filterByAlien'>
              Filter by Alien
            </label>
          </div>
        </div>
      </div>

      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          name={searchInput}
          onChange={onSearchSortFilter}
          placeholder='search by name... '
          aria-label="Recipient's username"
          aria-describedby='button-addon2'
        />
      </div>
    </form>
  );
};

export default SearchFilter;
