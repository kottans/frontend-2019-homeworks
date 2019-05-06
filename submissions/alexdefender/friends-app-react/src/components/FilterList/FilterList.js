import React, { Component } from "react";
import "./style.scss";

const statusFilter = ["All", "Alive", "Dead", "unknown"];
const genderFilter = ["All", "Male", "Female", "unknown"];

class FilterList extends Component {
  render() {
    const statusFilterRender = statusFilter.map((status, i) => (
      <label key={i} className="checkbox-label-wrapper">
        <input
          type="radio"
          value={status}
          name="status"
          onChange={this.props.sortFilter}
        />
        <span>{status}</span>
      </label>
    ));
    const genderFilterRender = genderFilter.map((gender, i) => (
      <label key={i} className="checkbox-label-wrapper">
        <input
          type="radio"
          value={gender}
          name="gender"
          onChange={this.props.sortFilter}
        />
        <span className="checkbox-label">{gender}</span>
      </label>
    ));

    return (
      <section className="filters">
        <section className="search">
          <input
            type="search"
            placeholder="Search..."
            onChange={this.props.findCardsFromSearch}
          />
        </section>
        <section className="sort-wrapper">
          <button
            className="sort-btn"
            value="asc"
            onClick={this.props.sortDescAsc}
          >
            Asc
          </button>
          <button
            className="sort-btn"
            value="desc"
            onClick={this.props.sortDescAsc}
          >
            Desc
          </button>
        </section>
        <section className="filter">
          <div>
            <strong>Status:</strong>
          </div>
          {statusFilterRender}
        </section>

        <section className="filter">
          <div>
            <strong>Gender:</strong>
          </div>
          {genderFilterRender}
        </section>
      </section>
    );
  }
}

export default FilterList;
