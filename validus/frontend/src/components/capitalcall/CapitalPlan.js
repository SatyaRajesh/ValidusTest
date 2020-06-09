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
              <th style={{ fontWeight: "normal" }}>Commitment_ID</th>
              <th style={{ fontWeight: "normal" }}>Fund_ID</th>
              <th style={{ fontWeight: "normal" }}>Date</th>
              <th style={{ fontWeight: "normal" }}>Fund</th>
              <th style={{ fontWeight: "normal" }}>Commited Amounts</th>
              <th style={{ fontWeight: "normal" }}>
                Undrawn Capital Commitment before Current Drawdown Notice
              </th>
              <th className="bg-warning" style={{ fontWeight: "normal" }}>
                Total Drawdown Notice
              </th>
              <th className="bg-warning" style={{ fontWeight: "normal" }}>
                Undrawn Capital Commitment after Current Drawdown Notice
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.submittedFunds.commits.map((fund) => (
              <tr key={fund.commitId}>
                <td style={{ fontWeight: "bold" }}>{fund.commitId}</td>
                <td style={{ fontWeight: "bold" }}>{fund.fund_id}</td>
                <td>{fund.date}</td>
                <td>{fund.fundname}</td>
                <td>{fund.amount}</td>
                <td>{fund.availAmt}</td>
                <td className="bg-warning">{fund.investedAmt}</td>
                <td className="bg-warning">{fund.uninvestedAmt}</td>
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
