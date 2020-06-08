import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getInvestedFunds,
  getDataFund,
  getDataCall,
  getDataCommitment,
  getUdatedInvStatus,
} from "../../actions/investedfunds";

export class InvestedFunds extends Component {
  static propTypes = {
    investedfunds: PropTypes.array.isRequired,
    datacalls: PropTypes.array.isRequired,
    datafunds: PropTypes.array.isRequired,
    datacommitments: PropTypes.array.isRequired,
    isUpdated: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getInvestedFunds();
    this.props.getDataCall();
    this.props.getDataFund();
    this.props.getDataCommitment();
    //this.props.getUdatedInvStatus();
  }

  renderHeader() {
    return this.props.datafunds.map((Dfund) => {
      return (
        <th key={Dfund.fund_id}>
          <p class="text-muted">{Dfund.fund_id}</p>
          <br />
          {Dfund.fund_name}
        </th>
      );
    });
    return;
  }

  renderFundAmount(call_id, fund_id) {
    console.log("renderFundAmount CallId:" + call_id + " FundId:" + fund_id);
    return this.props.investedfunds.map((DInv) => {
      if (call_id == DInv.call_id && fund_id == DInv.fund_id) {
        console.log("renderFundAmount Found Amount for " + "FundId:" + fund_id);
        return <td>{DInv.investment_amount}</td>;
      } else {
        console.log(
          "renderFundAmount No Found Amount for " + "FundId:" + fund_id
        );
        return <td>-</td>;
      }
    });
    return;
  }

  renderFunds(call_id) {
    console.log("renderFunds CallId:" + call_id);
    return this.props.datafunds.map((Dfund) => {
      return this.renderFundAmount(call_id, Dfund.fund_id);
    });
    return;
  }

  render() {
    return (
      <Fragment>
        <table className="table table-stripped" key="datacall_dashboard">
          <thead key="thead">
            <tr key="rowheader">
              <th key="th1">Date</th>
              <th key="th2">Call #</th>
              {this.renderHeader()}
            </tr>
          </thead>
          <tbody key="tbody">
            {this.props.datacalls.map((Dcall) => (
              <tr>
                <td>{Dcall.date}</td>
                <td>{Dcall.call_id}</td>
                {this.renderFunds(Dcall.call_id)}
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
});

export default connect(mapStateToProps, {
  getInvestedFunds,
  getDataCall,
  getDataFund,
  getDataCommitment,
  getUdatedInvStatus,
})(InvestedFunds);
