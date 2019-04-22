import React from "react";

import "./Filters.css";

const Filters = props => {
  return (
    <form onSubmit={props.handleSubmit} className="filter-form">
      <input
        name="search"
        type="text"
        className="filter-search"
        placeholder="Enter name"
        onChange={props.handleChange}
        defaultValue={props.searchValue}
      />
      <select
        name="gender"
        className="filter-select"
        onChange={props.handleChange}
        defaultValue={props.genderValue}
      >
        <option value="">All</option>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="genderless">genderless</option>
        <option value="unknown">unknown</option>
      </select>
      <select
        name="species"
        className="filter-select"
        onChange={props.handleChange}
        defaultValue={props.speciesValue}
      >
        <option value="">All</option>
        <option value="human">human</option>
        <option value="alien">alien</option>
      </select>
      <input type="submit" value="Filter" className="filter-submit" />
    </form>
  );
};

export default Filters;
