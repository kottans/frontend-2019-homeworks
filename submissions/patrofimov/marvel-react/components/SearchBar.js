import React from "react";
import { DATE_FROM_DEFAULT, DATE_TO_DEFAULT, formatDate } from "../utils/utils";

const SearchBar = ({ handleSearch, handleFilter, handleSort }) => {
 
  const onChange = ev => {
    const { name, value } = ev.target;
    handleSearch({ [name]: value });
  };

  const onSort = ev => {
    const { name, value } = ev.target;
    handleSort({ [name]: value });
  };

  const onFilter = ev => {
    const { elements } = ev.currentTarget;
    const value = Array.from(elements).reduce((acc, input) => {
      if (input.name) {
        return {
          ...acc,
          [input.name]:
            input.type === "checkbox" ? input.checked : new Date(input.value)
        };
      }
      return acc;
    }, {});
   handleFilter(value);
  };

  return (
    <div className="search-form-wrapper">
      <div className="search-form">
        <input
          placeholder="name"
          name="name"
          onChange={onChange}          
        />
       </div>

      <fieldset>
        <legend>Sort:</legend>
        <label htmlFor="nameUp">Asc</label>
        <input
          type="radio"
          name="sortName"
          id="nameUp"
          value="asc"
          defaultChecked
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
          <input
            type="checkbox"
            name="filterByDateFrom"
            id="filterByDateFrom"
          />
          <label htmlFor="dateFrom" className="date-filter">
            From:
          </label>
        </div>
        <input
          type="date"
          name="dateFrom"
          id="dateFrom"
          defaultValue={formatDate(DATE_FROM_DEFAULT)}
        />

        <div className="date-wrapper">
          <input type="checkbox" name="filterByDateTo" id="filterByDateTo" />
          <label htmlFor="dateTo" className="date-filter date-filter-to">
            To:
          </label>
        </div>
        <input
          type="date"
          name="dateTo"
          id="dateTo"
          defaultValue={formatDate(DATE_TO_DEFAULT)}
        />
      </fieldset>
    </div>
  );
};

export default SearchBar;
