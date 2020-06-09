import React, { Component, Fragment } from "react";
import WelcomeHeader from "../layout/WelcomeHeader";

const Welcome = (props) => {
  function goToCapitalPage() {
    console.log("Clicked Capital Call");
    props.history.push("ccdashboard");
  }
  console.log("Welcome Page");
  return (
    <Fragment>
      <WelcomeHeader />
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-primary"
              height="100"
              width="250"
              onClick={goToCapitalPage}
            >
              Capital Call
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Welcome;
