import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Button, InputGroup } from "react-bootstrap";
import { insertNewDataCalls } from "../../actions/addnewcall";

export class CapitalSubmit extends Component {
  static propTypes = {
    callValues: PropTypes.array,
    datafunds: PropTypes.array.isRequired,
    insertNewDataCalls: PropTypes.func.isRequired,
  };

  renderFundName(fundId) {
    return this.props.datafunds.map((Dfund) => {
      if (Dfund.fund_id == fundId) {
        return Dfund.fund_name;
      }
    });
    return;
  }

  renderNewFundCallAmount(fundId) {
    if (typeof this.props.callValues == "undefined") {
      return;
    }

    for (var i = 0; i < this.props.callValues.length; i++) {
      var FundX = this.props.callValues[i];

      if (FundX.fundId == fundId) {
        return FundX.fundAmount;
      }
    }
    return;
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("Submit Button is Pressed");
    this.props.insertNewDataCalls(this.props.callValues);
  };

  render() {
    return (
      <Fragment>
        <table className="table table-stripped" key="datacall_newcall">
          <thead>
            <th>Funds</th>
            <th>Total Drawdwn Notice</th>
          </thead>
          <tbody>
            {this.props.datafunds.map((Dfund) => (
              <tr>
                <td>{this.renderFundName(Dfund.fund_id)}</td>
                <td>{this.renderNewFundCallAmount(Dfund.fund_id)}</td>
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
          Submit
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  callValues: state.addnewcall.insertCallValues,
  datafunds: state.investedfunds.datafund,
});

export default connect(mapStateToProps, { insertNewDataCalls })(CapitalSubmit);
