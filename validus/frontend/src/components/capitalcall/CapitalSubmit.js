import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  calculateFunds,
  getCommittedFunds,
  confirmCallDetails,
} from "../../actions/addnewcall";

export class CapitalSubmit extends Component {
  constructor(props) {
    super(props);
    this.onSubmitNewCallData = this.onSubmitNewCallData.bind(this);
  }

  static propTypes = {
    submittedFunds: PropTypes.object.isRequired,
    dashboardfunds: PropTypes.object.isRequired,
    getCommittedFunds: PropTypes.func.isRequired,
    calculateFunds: PropTypes.func.isRequired,
    confirmCallDetails: PropTypes.func.isRequired,
  };

  onSubmitNewCallData = (e) => {
    console.log("Submit Call Data Triggered");
    e.preventDefault();
    this.props.confirmCallDetails();
    console.log("Call Details Added");
    props.history.push("ccdashboard");
  };

  render() {
    return (
      <Fragment>
        <table
          className="table table-stripped bg-warning"
          key="datacall_newcall"
        >
          <thead>
            <tr key="CSTHead">
              <th></th>
              <th>Total Drawdwn Notice</th>
            </tr>
          </thead>
          <tbody>
            {this.props.submittedFunds.fundwiseTotal.map((fundData) => (
              <tr key={fundData.fund_name}>
                <td>{fundData.fund_name}</td>
                <td>{fundData.totafunds}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="btn btn-primary"
          variant="primary"
          onClick={this.onSubmitNewCallData}
        >
          Confirm
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  submittedFunds: state.addnewcall.submittedFunds,
  dashboardfunds: state.investedfunds.dashboardfunds,
});

export default connect(mapStateToProps, {
  calculateFunds,
  getCommittedFunds,
  confirmCallDetails,
})(CapitalSubmit);
