import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { calculateFunds, getCommittedFunds } from "../../actions/addnewcall";

export class CapitalSubmit extends Component {
  static propTypes = {
    submittedFunds: PropTypes.object.isRequired,
    getCommittedFunds: PropTypes.func.isRequired,
    calculateFunds: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log("Submit Button is Pressed");
    // this.props.insertNewDataCalls(this.props.callValues);
  };

  render() {
    return (
      <Fragment>
        <table className="table table-stripped" key="datacall_newcall">
          <thead>
            <tr key="CSTHead">
              <th>Funds</th>
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
          onClick={this.onSubmit}
        >
          Confirm
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  submittedFunds: state.addnewcall.submittedFunds,
});

export default connect(mapStateToProps, {
  calculateFunds,
  getCommittedFunds,
})(CapitalSubmit);
