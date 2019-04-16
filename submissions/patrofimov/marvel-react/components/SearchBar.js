import React from "react";

const SearchBar = ({ handleSearch, handleFilter, handleSort }) => {
  const onSubmit = ev => {
    const { elements } = ev.target;

    ev.preventDefault();

    const value = Array.from(elements).reduce((acc, input) => {
      if (input.name) {
        return { ...acc, [input.name]: input.value };
      }
      return acc;
    }, {});

    handleSearch(value);
  };

  const onChange = ev => {
    const { name, value } = ev.target;
    console.log({ [name]: value });
    handleSearch({ [name]: value });
  };

  const onSort = ev => {
    const { name, value } = ev.target;
    console.log({ [name]: value });
    handleSort({ [name]: value });
  };

  const onFilter = ev => {
    const { elements } = ev.currentTarget;
    console.log("hy, ", { target: ev.target }, { curtarget: ev.currentTarget });
    const value = Array.from(elements).reduce((acc, input) => {
      if (input.name) {
        return {
          ...acc,
          [input.name]: input.type === "checkbox" ? input.checked : input.value
        };
      }
      return acc;
    }, {});

    console.log({ value });
    handleFilter(value);
  };

  return (
    <div className="search-form-wrapper">
      <form className="search-form" onSubmit={onSubmit} onChange={onChange}>
        <input placeholder="name" name="name" />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      <fieldset>
        <legend>Sort:</legend>
        <label htmlFor="nameUp">Asc</label>
        <input
          type="radio"
          name="sortName"
          id="nameUp"
          value="asc"
          defaultChecked={true}
          onChange={onSort}
        />
        <label htmlFor="nameDown">Desc</label>
        <input
          type="radio"
          name="sortName"
          id="nameDown"
          value="desc"
          onChange={onSort}
        />

        <label htmlFor="oldest">Old</label>
        <input
          type="radio"
          name="sortName"
          id="oldest"
          value="old"
          onChange={onSort}
        />
        <label htmlFor="newest">New</label>
        <input
          type="radio"
          name="sortName"
          id="newest"
          value="new"
          onChange={onSort}
        />
      </fieldset>

      <fieldset onChange={onFilter}>
        <legend>Filter:</legend>
        <div className="date-wrapper">
          <input type="checkbox" name="filterDateFrom" id="filter-from" />
          <label htmlFor="dateFrom" className="date-filter">
            From:
          </label>
        </div>
        <input
          type="date"
          name="dateFrom"
          id="dateFrom"
          defaultValue="2010-01-01"
        />

        <div className="date-wrapper">
          <input type="checkbox" name="filterDateTo" id="filterDateTo" />
          <label htmlFor="dateTo" className="date-filter date-filter-to">
            To:
          </label>
        </div>
        <input
          type="date"
          name="dateTo"
          id="dateTo"
          defaultValue="2100-01-01"
        />
      </fieldset>
    </div>
  );
};

export default SearchBar;
