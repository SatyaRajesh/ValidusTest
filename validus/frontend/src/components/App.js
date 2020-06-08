import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";
import Dashboard from "./capitalcall/Dashboard";
import NewCall from "./capitalcall/Newcall";

import {
  HashRouter as Router,
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <Route exact path="/capitalcall" component={Dashboard} />
              <Route exact path="/capitalcall/newcall" component={NewCall} />
            </Switch>
          </Fragment>
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
