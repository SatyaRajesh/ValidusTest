import React, { Component } from "react";
import { SingleDatePicker } from "react-dates";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { addNewCallInv } from "../../actions/addnewcall";
import {
  getInvestedFunds,
  getDataFund,
  getDataCall,
  getDataCommitment,
  getUdatedInvStatus,
} from "../../actions/investedfunds";

export class CapitalInput extends Component {
  state = {
    newInvName: "",
    newInvAmount: "",
    newCaclType: "",
    newInvDate: "",
    isUpdated: true,
  };

  static propTypes = {
    addNewCallInv: PropTypes.func.isRequired,
    isUpdated: true,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { newInvName, newInvAmount, newCaclType, newInvDate } = this.state;
    const newInvValue = { newInvName, newInvAmount, newCaclType, newInvDate };
    this.props.addNewCallInv(newInvValue);
    console.log("Value of Status:" + this.props.isUpdated);
    this.props.getUdatedInvStatus(true);
    this.setState({
      newInvName: "",
      newInvAmount: "",
      newCaclType: "",
      newInvDate: "",
      isUpdated: true,
    });
  };

  render() {
    const { newInvName, newInvAmount, newCaclType, newInvDate } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <Row>
              <Col>
                <label>Date</label>
              </Col>
              <Col>
                <input
                  type="text"
                  value={newInvDate}
                  onChange={this.onChange}
                  name="newInvDate"
                />
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <label>Rules</label>
              </Col>
              <Col>
                <select
                  class="form-control"
                  id="sel1"
                  onChange={this.OnChange}
                  name="newCaclType"
                >
                  <option>First In First Out (FIFO)</option>
                </select>
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <label>Investment Name</label>
              </Col>
              <Col>
                <input
                  type="text"
                  value={newInvName}
                  onChange={this.onChange}
                  name="newInvName"
                />
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <label>Capital Required for Investment</label>
              </Col>
              <Col>
                <input
                  type="number"
                  id="inlineFormInputGroup-1"
                  name="newInvAmount"
                  value={newInvAmount}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col>
                <button type="submit" className="btn btn-primary">
                  Calculate
                </button>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  investedfunds: state.investedfunds.investedfunds,
  datacalls: state.investedfunds.datacall,
  datafunds: state.investedfunds.datafund,
  datacommitments: state.investedfunds.datacommitment,
  isUpdated: state.investedfunds.isUpdated,
  newCallAmount: state.addnewcall.newInvAmount,
});

export default connect(mapStateToProps, {
  addNewCallInv,
  getInvestedFunds,
  getDataFund,
  getDataCall,
  getDataCommitment,
  getUdatedInvStatus,
})(CapitalInput);
