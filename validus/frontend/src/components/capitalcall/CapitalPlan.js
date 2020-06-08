import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNewCallInv, loadCallValues } from "../../actions/addnewcall";
import {
  getInvestedFunds,
  getDataFund,
  getDataCall,
  getDataCommitment,
  getUdatedInvStatus,
} from "../../actions/investedfunds";

// callName:
// callInvAmount:
// callFundAmount:
// callFundId:
// callCommitId:

export class CapitalPlan extends Component {
  state = {
    callValue: [],
  };

  remainingFunds = -1;
  remainingBal = 0;
  currentBal = 0;

  static propTypes = {
    investedfunds: PropTypes.array.isRequired,
    datacalls: PropTypes.array.isRequired,
    datafunds: PropTypes.array.isRequired,
    datacommitments: PropTypes.array.isRequired,
    callValues: PropTypes.array.isRequired,
    isUpdated: PropTypes.bool.isRequired,
    newInvData: PropTypes.array.isRequired,
  };
  componentWillUpdate() {
    this.remainingBal = -1;
  }

  componentDidUpdate() {
    //this.props.getUdatedInvStatus(true);
    this.props.loadCallValues(this.state.callValue);
    this.state = {
      callValue: [],
    };
  }

  renderFundName(fundId) {
    return this.props.datafunds.map((Dfund) => {
      if (Dfund.fund_id == fundId) {
        //this.props.newcallfunds.push(fund_id, Dfund.fund_name);
        return Dfund.fund_name;
      }
    });
    return;
  }

  renderNewFundCallAmount(fundId) {
    return this.props.newcallfunds.map((Nfund) => {
      if (Nfund.fund_id == fundId) {
        return Nfund.amount;
      }
    });
    return;
  }

  renderUndrawnCapital(commitmentId, TotalCommAmount) {
    var undrawnAmount = TotalCommAmount;
    this.props.investedfunds.map((InvFund) => {
      if (commitmentId == InvFund.commitment_id) {
        undrawnAmount -= InvFund.investment_amount;
      }
    });

    if (undrawnAmount < 0) {
      //Handle Error or Pop Aert message
      return "-";
    }
    return undrawnAmount;
  }

  fillRemainingAmounts(commitId, commitAmt, fundId) {
    var availableAmt = this.renderUndrawnCapital(commitId, commitAmt);
    this.remainingBal = 0;
    this.currentBal = 0;
    console.log(
      "fillRemainingAmounts Bef -> RemBal:" +
        this.remainingBal +
        " currBal" +
        this.currentBal +
        " RemFunds" +
        this.remainingFunds +
        " AvailableAmount" +
        availableAmt
    );

    if (typeof this.props.newInvData.newInvAmount == "undefined") {
      return;
    }

    if (this.remainingFunds < 0) {
      this.remainingFunds = this.props.newInvData.newInvAmount;
    }
    console.log(
      "fillRemainingAmounts Aft -> RemBal:" +
        this.remainingBal +
        " currBal" +
        this.currentBal +
        " RemFunds" +
        this.remainingFunds
    );

    if (this.remainingFunds >= availableAmt) {
      this.remainingBal = availableAmt;
      this.remainingFunds = this.remainingFunds - availableAmt;
    } else {
      this.remainingBal = this.remainingFunds;
      this.currentBal = availableAmt - this.remainingFunds;
      this.remainingFunds = 0;
    }
    // callName:
    // callInvAmount:
    // callFundAmount:
    // callFundId:
    // callCommitId:
    if (this.remainingBal > 0) {
      var invName = this.props.newInvData.newInvName;
      var invAmount = this.props.newInvData.newInvAmount;
      var fundAmount = this.remainingBal;
      var oneCallValue = {
        invName,
        invAmount,
        fundAmount,
        fundId,
        commitId,
      };
      this.state.callValue.push(oneCallValue);
    }
    console.log(
      " fillRemainingAmounts Don -> RemBal:" +
        this.remainingBal +
        " currBal" +
        this.currentBal +
        " RemFunds" +
        this.remainingFunds
    );
    return;
  }

  resetAndUpdateState(fundId) {
    this.remainingBal = 0;
    this.currentBal = 0;
    console.log(
      " resetAndUpdateState Reset -> RemBal:" +
        this.remainingBal +
        " currBal" +
        this.currentBal +
        " RemFunds" +
        this.remainingFunds
    );
    return;
  }

  renderEachRow(Dcomm) {
    var row;
    row["comm_id"] = Dcomm.commitment_id;
    row["fund_id"] = Dcomm.fund_id;
    row["date"] = Dcomm.date;
    row["fund_name"] = this.renderFundName(Dcomm.fund_id);
    row["Amount"] = Dcomm.amount;
    row["UndrawnAmount"] = this.renderUndrawnCapital(
      Dcomm.commitment_id,
      Dcomm.amount
    );
    this.fillRemainingAmounts(Dcomm.commitment_id, Dcomm.amount);
    row["remaininBal"] = this.remainingBal;
    row["currentBal"] = this.currentBal;
    this.resetAndUpdateState(Dcomm.fund_id);
    console.log("Print Amount:" + Dcomm.amount);
    console.log("Print Whole Row:" + row);
    console.log("Print Comm:" + Dcomm);
    return row;
  }

  render() {
    // var dynData = [];
    // this.props.datacommitments.map((Dcomm) =>
    //   dynData.push(this.renderEachRow(Dcomm))
    // );
    // console.log("print WholeTable:" + dynData);
    return (
      <Fragment>
        <table className="table table-stripped" key="datacall_newcall">
          <thead>
            <th>Commitment_ID</th>
            <th>Fund_ID</th>
            <th>Date</th>
            <th>Fund</th>
            <th>Commited Amounts</th>
            <th>Undrawn Capital Commitment before Current Drawdown Notice</th>
            <th>Total Drawdown Notice</th>
            <th>Undrawn Capital Commitment after Current Drawdown Notice</th>
          </thead>
          <tbody>
            {this.props.datacommitments.map((Dcomm) => (
              <tr>
                <td>{Dcomm.commitment_id}</td>
                <td>{Dcomm.fund_id}</td>
                <td>{Dcomm.date}</td>
                <td>{this.renderFundName(Dcomm.fund_id)}</td>
                <td>{Dcomm.amount}</td>
                <td>
                  {this.renderUndrawnCapital(Dcomm.commitment_id, Dcomm.amount)}
                </td>
                {this.fillRemainingAmounts(
                  Dcomm.commitment_id,
                  Dcomm.amount,
                  Dcomm.fund_id
                )}
                <td>{this.remainingBal}</td>
                <td>{this.currentBal}</td>
                {this.resetAndUpdateState(Dcomm.fund_id)}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  investedfunds: state.investedfunds.investedfunds,
  datacalls: state.investedfunds.datacall,
  datafunds: state.investedfunds.datafund,
  datacommitments: state.investedfunds.datacommitment,
  isUpdated: state.investedfunds.isUpdated,
  newInvData: state.addnewcall.newcallInv,
});

export default connect(mapStateToProps, {
  addNewCallInv,
  loadCallValues,
  getInvestedFunds,
  getDataFund,
  getDataCall,
  getDataCommitment,
  getUdatedInvStatus,
})(CapitalPlan);
