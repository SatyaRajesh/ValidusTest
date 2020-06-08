import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <div className="w-25 flex-grow-1">
            <a className="navbar-brand justify-content-start" href="#">
              Validus
            </a>
          </div>
          <div className="w-50 justify-content-start text-center">
            <div className="w-25 font-weight-bold border bg-info text-dark ">
              Capital Call
            </div>
          </div>
          <ul className="w-25 navbar-nav justify-content-end mr-auto mt-2 mt-lg-0 nav-tabs">
            <li className="nav-item active">
              <Link to="/capitalcall">Dashboard </Link>
            </li>
            <li className="nav-item">
              <Link to="/capitalcall/newcall">New Call</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
