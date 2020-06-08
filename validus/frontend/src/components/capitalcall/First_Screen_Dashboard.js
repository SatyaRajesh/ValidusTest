import React, { Component, Fragment } from "react";
import InvestedFunds from "./InvestedFunds";
import { Provider } from "react-redux";
import store from "../../store";
import {
  HashRouter as Router,
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import Header from "../layout/Header";
import ReactDOM from "react-dom";

export class Dashboard extends Component {
  componentDidMount() {
    ReactDOM.unmountComponentAtNode(WelcomeHeader);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <Switch>
              <InvestedFunds />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default Dashboard;
