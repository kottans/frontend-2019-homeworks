import React, { Component } from "react";
import logo from "./images/logo.png";
import "./style.css";

class Header extends Component {
  constructor(handleSubmit) {
    super(handleSubmit);
    this.state = {
      value: ""
    };
  }
  onSubmit = ev => {
    ev.preventDefault();
    this.props.handleSubmit(this.state.value);
  };
  onClick = ({ target }) => {
    this.props.handleSubmit(target.getAttribute("data-sort"));
  };
  handleChange = event => {
    this.setState({ value: event.target.value.toLowerCase().trim() }, () =>
      console.log("state ", this.state.value)
    );
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
            onChange={this.onSubmit}
            onSubmit={this.handleSubmitForm}
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
            id="decrease"
            data-sort="decrease"
            onClick={this.onClick}
          >
            &darr;
          </button>
          <button
            className="increase"
            id="increase"
            data-sort="increase"
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
