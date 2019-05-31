import React, { Component } from "react";
import "./Filters.css";

const Filters = props => {
  return (
    <div className="filters">
      <form className="filters__form">
        <div className="filters__item search">
          <div className="input-wrapper">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={props.searchName}
            />
          </div>

          <button
            className="btn less__btn"
            type="button"
            onClick={props.addItems}
            disabled={props.addFlag}
          >
            More
          </button>

          <button
            className="btn more__btn"
            type="button"
            onClick={props.removeItems}
            disabled={props.removeFlag}
          >
            Remove
          </button>
        </div>

        <div className="filters__item filter">
          <select
            className="form-control"
            type="button"
            onChange={props.filterLocation}
            id="desc"
          >
            <option value="" disabled>
              Race
            </option>
            <option value="All" defaultValue="All">
              All
            </option>
            <option value="Human">Human</option>

            <option value="Alien">Alien</option>
          </select>
        </div>

        <div className="filters__item sort">
          <button
            className="btn sort__btn"
            type="button"
            onClick={props.sortName}
            id="asc"
          >
            Sort
          </button>
          <button
            className="btn sort__btn"
            type="button"
            onClick={props.sortName}
            id="desc"
          >
            Sort
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
