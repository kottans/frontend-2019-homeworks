import React from 'react';

const Options = ({ optionsValuesArr, description }) =>
  optionsValuesArr.map(val => (
    <option key={val} value={val}>
      {description}: {val}
    </option>
  ));
const InputWrapper = ({ updateComics, limit, orderBy }) => {
  const onSubmit = ev => {
    ev.preventDefault();

    const { elements } = ev.target;
    const value = [...elements].reduce((acc, el) => {
      if (!el.name.toLowerCase().includes('button')) {
        return { ...acc, [el.name]: el.value };
      }
      return acc;
    }, {});
    updateComics(value);
  };
  const onChange = ev => {
    const { name, value } = ev.target;
    updateComics({ [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <select
        onChange={onChange}
        defaultValue={orderBy}
        className="search__item search__select"
        name="orderBy"
      >
        <Options
          optionsValuesArr={['modified', '-modified', 'title', '-title']}
          description="Order by"
        />
      </select>
      <select
        onChange={onChange}
        defaultValue={limit}
        className="search__item search__select"
        name="limit"
      >
        <Options
          optionsValuesArr={[10, 20, 30, 40, 50]}
          description="Comics per page"
        />
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
