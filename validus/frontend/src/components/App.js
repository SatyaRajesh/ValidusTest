import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Welcome from "./capitalcall/Welcome";
import Dashboard from "./capitalcall/Dashboard";
import NewCall from "./capitalcall/Newcall";

import {
  HashRouter as Router,
  Route,
  Redirect,
  BrowserRouter,
  Switch,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    console.log("App Component");
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/ccdashboard" component={Dashboard} />
            <Route exact path="/ccnewcall" component={NewCall} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
