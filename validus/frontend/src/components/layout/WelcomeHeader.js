import React, { Component } from "react";
import { Link } from "react-router-dom";

export class WelcomeHeader extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        id="WelcomeHeader"
      >
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
        </div>
      </nav>
    );
  }
}

export default WelcomeHeader;
