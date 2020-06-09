import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="w-25 flex-grow-1 collapse navbar-collapse"
          id="navbarTogglerDemo01"
        >
          <a className="navbar-brand justify-content-start">
            <img
              alt="Validus"
              src="../../static/img/ValidusImg.png"
              height="60"
              width="200"
            />
          </a>
        </div>
        <div className="w-50 justify-content-start text-center">
          <div className="w-25 font-weight-bold border bg-info text-dark ">
            Capital Call
          </div>
        </div>
        <div className="w-25 justify-content-start text-center">
          <ul className="navbar-nav justify-content-end mr-auto mt-2 mt-lg-0 nav-tabs">
            <li className="w-50 nav-item active">
              <a className="nav-link" href="/#/ccdashboard">
                Dashboard <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="w-50 nav-item">
              <a className="nav-link" href="/#/ccnewcall">
                New Call <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
