import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { calculateFunds, getCommittedFunds } from "../../actions/addnewcall";

export class CapitalPlan extends Component {
  static propTypes = {
    submittedFunds: PropTypes.object.isRequired,
    getCommittedFunds: PropTypes.func.isRequired,
    calculateFunds: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log("CapitalPlan componentDidUpdate");
    this.props.getCommittedFunds();
  }

  render() {
    console.log("CapitalPlan Render");
    console.log("Submt:" + JSON.stringify(this.props.submittedFunds));
    return (
      <Fragment>
        <table className="table table-stripped table-sm" key="datacall_newcall">
          <thead>
            <tr key="CPTHead">
              <th>Commitment_ID</th>
              <th>Fund_ID</th>
              <th>Date</th>
              <th>Fund</th>
              <th>Commited Amounts</th>
              <th>Undrawn Capital Commitment before Current Drawdown Notice</th>
              <th>Total Drawdown Notice</th>
              <th>Undrawn Capital Commitment after Current Drawdown Notice</th>
            </tr>
          </thead>
          <tbody>
            {this.props.submittedFunds.commits.map((fund) => (
              <tr key={fund.commitId}>
                <td>{fund.commitId}</td>
                <td>{fund.fund_id}</td>
                <td>{fund.date}</td>
                <td>{fund.fundname}</td>
                <td>{fund.amount}</td>
                <td>{fund.availAmt}</td>
                <td>{fund.investedAmt}</td>
                <td>{fund.uninvestedAmt}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
})(CapitalPlan);
