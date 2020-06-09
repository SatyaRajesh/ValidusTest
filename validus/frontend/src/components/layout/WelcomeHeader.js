import React, { Component } from "react";

export class WelcomeHeader extends Component {
  render() {
    console.log("Welcome Header");
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
      </nav>
    );
  }
}

export default WelcomeHeader;
