import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav__item">
          <Link to="/character/">Characters</Link>
        </li>
        <li className="nav__item">
          <Link to="/location/">Locations</Link>
        </li>
        <li className="nav__item">
          <Link to="/episode/">Episodes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
