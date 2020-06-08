import React, { Fragment } from "react";
import WelcomeHeader from "./layout/WelcomeHeader";
import Dashboard from "./capitalcall/First_Screen_Dashboard";

import {
  HashRouter as Router,
  Route,
  BrowserRouter,
  Switch,
  Link,
} from "react-router-dom";

export default function Welcome() {
  return (
    <Fragment>
      <WelcomeHeader />
      <Router>
        <Link to="/capitalcall">
          <button type="button" class="btn btn-primary btn-lg">
            Capital Call
          </button>
        </Link>
        <Route exact path="/capitalcall" component={Dashboard} />
      </Router>
    </Fragment>
  );
}
