import React, { Component } from "react";
import {SORT} from "../../utils/helpers.js"
import logo from "./images/logo.png";
import "./style.css";

class Header extends Component {
  state = {
    value: ""
  };
  onClick = ({ target }) => {
    this.props.handleSubmit(target.getAttribute("data-sort"));
  };
  handleChange = event => {
    event.preventDefault();
    this.setState({ value: event.target.value.toLowerCase().trim() });
    this.props.handleSubmit(this.state.value);
  };
  handleSubmitForm = event => {
    event.preventDefault();
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <header className="header">
        <div className="logo">
          <a href="/Kottanterest">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="search-form">
          <form
            onSubmit={this.handleSubmitForm}
            autoComplete='off'
          >
            <label>
              <input
                name="search"
                className="search-input"
                type="text"
                placeholder="Search"
                onChange={this.handleChange}
              />
            </label>
          </form>
        </div>
        <div className="sorting-buttons">
          <button
            className="decrease"
            data-sort={SORT.dec}
            onClick={this.onClick}
          >
            &darr;
          </button>
          <button
            className="increase"
            data-sort={SORT.inc}
            onClick={this.onClick}
          >
            &uarr;
          </button>
        </div>
      </header>
    );
  }
}
export default Header;
