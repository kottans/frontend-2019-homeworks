import React from "react";
import "./Filters.css";

const Filters = props => {
  return (
    <div className="filters-wrapper">
      <form
        onChange={event => {
          props.handleFilter(event);
        }}
      >
        <div className="filters">
          <input
            name="name"
            type="text"
            placeholder="Search by Name"
            className="input-field"
          />
          <div className="input-group">
            Gender
            <select name="gender">
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="input-group">
            Species
            <select name="species">
              <option value="all">All</option>
              <option value="human">Human</option>
              <option value="alien">Alien</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="input-group">
            Location
            <select name="location">
              <option value="all">All</option>
              <option value="Earth (Replacement Dimension)">
                Earth (Replacement Dimension)
              </option>
              <option value="Anatomy Park">Anatomy Park</option>
              <option value="Citadel of Ricks">Citadel of Ricks</option>
              <option value="Interdimensional Cable">
                Interdimensional Cable
              </option>
              <option value="unknown">unknown</option>
            </select>
          </div>
          <div className="sorting">
            <button onClick={props.handleSorting} name="sort-name-acs">
              Sort by Name ASC
            </button>
            <button onClick={props.handleSorting} name="sort-name-desc">
              Sort by Name DESC
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Filters;
