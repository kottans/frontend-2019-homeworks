import React from 'react';
import './style.scss';

const InputWrapper = ({ updateComics, limit, orderBy }) => {
  const onSubmit = ev => {
    ev.preventDefault();
    updateComics({
      orderBy: ev.target.orderBy.value,
      limit: ev.target.limit.value,
      titleStartsWith: ev.target.titleStartsWith.value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <select
        defaultValue={orderBy}
        className="search__item search__select"
        name="orderBy"
      >
        <option value="modified">Order by: modified</option>
        <option value="-modified">Order by: -modified</option>
        <option value="title">Order by: title</option>
        <option value="-title">Order by: -title</option>
      </select>
      <select
        defaultValue={limit}
        className="search__item search__select"
        name="limit"
      >
        <option value="10">Comics per page: 10</option>
        <option value="20">Comics per page: 20</option>
        <option value="30">Comics per page: 30</option>
        <option value="40">Comics per page: 40</option>
        <option value="50">Comics per page: 50</option>
      </select>

      <input
        className="search__item search__input"
        placeholder="title starts with ....."
        name="titleStartsWith"
      />
      <button name="button" className="search__item search__button">
        search
      </button>
    </form>
  );
};
export default InputWrapper;
