import React from "react";
import logo from "./images/logo.png";
import "./style.css";

export const Header = ({ handleSubmit }) => {
  const onSubmit = ev => {
    ev.preventDefault();
    let input = document.querySelector(".search-input");
    handleSubmit(input.value);
  };
  const onClick = ({ target }) => {
      handleSubmit(target.getAttribute('data-sort'));
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/Kottanterest">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="search-form">
        <form action="" onChange={onSubmit}>
          <label>
            <input
              name="search"
              className="search-input"
              type="text"
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      <div className="sorting-buttons">
        <button className="decrease" id="decrease" data-sort="decrease" onClick={onClick}>
          &darr;
        </button>
        <button className="increase" id="increase" data-sort="increase" onClick={onClick}>
          &uarr;
        </button>
      </div>
    </header>
  );
};
