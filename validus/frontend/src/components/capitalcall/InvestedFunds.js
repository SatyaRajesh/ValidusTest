import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getDashboardFunds } from "../../actions/investedfunds";

export class InvestedFunds extends Component {
  static propTypes = {
    dashboardfunds: PropTypes.object.isRequired,
    getDashboardFunds: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log("InvestedFunds ComponentDMount");
    this.props.getDashboardFunds();
  }

  render() {
    return (
      <Fragment>
        <table
          className="w-50 table table-stripped table-sm"
          key="datacall_dashboard"
        >
          <thead key="thead">
            <tr key="rowheader">
              {this.props.dashboardfunds.header.map((headerValue) => (
                <th key={headerValue}>{headerValue}</th>
              ))}
            </tr>
          </thead>
          <tbody key="tbody">
            {this.props.dashboardfunds.rows.map((row) => (
              <tr>
                <td>{row.date}</td>
                <td>{row.call_id}</td>
                {row.funds.map((fundValue) => (
                  <td>{fundValue}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboardfunds: state.investedfunds.dashboardfunds,
});

export default connect(mapStateToProps, {
  getDashboardFunds,
})(InvestedFunds);
