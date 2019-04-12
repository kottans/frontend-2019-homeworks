import React from "react";
import "./searchfilter.css";

const SearchFilter = ({ handleSort, handleSearch, handleFilter }) => {
  //console.log(handleChange, handleSearch)

  const onSubmit = e => {
    e.preventDefault();
    const { elements } = e.target;

    const value = Array.from(elements).reduce((acc, input) => {
      if (input.name) {
        return { ...acc, [input.name]: input.value };
      }
      return acc;
    }, {});
    handleSearch(value);
    //console.log(value);
  };
  const onChange = e => {
    const target = e.target;
    const value = target.name === 'change' ? target.value : ''

    handleSearch({
      [target.name]: value
    });
  };
  const onSort = e => {
    const target = e.target;
    const radioState = () => {
      if(target.checked && target.type === 'radio') {
        return true
      }
    }
    handleSort({
      [target.value]: radioState()
    });
  };
  const onFilter = e => {
    const target = e.target;
    const radioState = () => {
      if(target.checked && target.type === 'radio') {
        return true
      }
    }
    handleFilter({
      [target.value]: radioState()
    });
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="sort-asc-desc d-inline-flex ml-2 mr-2">
        <div className="form-check form-check-inline m-2">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="asc"
            onChange={onSort}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Sort by Asc
          </label>
        </div>
        <div className="form-check form-check-inline m-2">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="desc"
            onChange={onSort}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Sort by Desc
          </label>
        </div>
      </div>
      <div className="sort-asc-desc d-inline-flex ml-2 mr-2">
        <div className="form-check form-check-inline m-2">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioFilter"
            id="inlineRadio3"
            value="human"
            onChange={onFilter}
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Filter by Human
          </label>
        </div>
        <div className="form-check form-check-inline m-2">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioFilter"
            id="inlineRadio4"
            value="alien"
            onChange={onFilter}
          />
          <label className="form-check-label" htmlFor="inlineRadio4">
            Filter by Alien
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="onSubmit filter by name... "
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary">Button</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              name="change"
              placeholder="onChange filter by name... "
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchFilter;
