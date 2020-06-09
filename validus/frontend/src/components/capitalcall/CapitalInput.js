import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { calculateFunds, getCommittedFunds } from "../../actions/addnewcall";

export class CapitalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newInvName: "",
      newInvAmount: "",
      newCaclType: "",
      newInvDate: "",
    };
  }

  static propTypes = {
    calculateFunds: PropTypes.func.isRequired,
    getCommittedFunds: PropTypes.func.isRequired,
    submittedFunds: PropTypes.object,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    console.log("OnSubmit called");
    e.preventDefault();
    const { newInvName, newInvAmount, newCaclType, newInvDate } = this.state;
    let calReqValue = {
      newInvName,
      newInvAmount,
      newCaclType,
      newInvDate,
    };
    this.props.calculateFunds(calReqValue);
    this.setState({
      newInvName: "",
      newInvAmount: "",
      newCaclType: "",
      newInvDate: "",
    });
  };

  render() {
    console.log("Capital Input Render");
    const { newInvName, newInvAmount, newCaclType, newInvDate } = this.state;
    return (
      <div className="card">
        <form onSubmit={this.onSubmit}>
          <div className="form-group form-control-sm">
            <Row>
              <Col>
                <label style={{ fontWeight: "bold" }}>Date</label>
              </Col>
              <Col>
                <input
                  className="form-control-sm"
                  type="date"
                  value={newInvDate}
                  onChange={this.onChange}
                  name="newInvDate"
                />
              </Col>
            </Row>
          </div>
          <div className="form-group form-control-sm">
            <Row>
              <Col>
                <label>Rules</label>
              </Col>
              <Col>
                <select
                  className="form-control-sm"
                  id="sel1"
                  onChange={this.OnChange}
                  name="newCaclType"
                >
                  <option>First In First Out (FIFO)</option>
                </select>
              </Col>
            </Row>
          </div>
          <div className="form-group form-control-sm">
            <Row>
              <Col>
                <label>Investment Name</label>
              </Col>
              <Col>
                <input
                  className="form-control-sm"
                  type="text"
                  value={newInvName}
                  onChange={this.onChange}
                  name="newInvName"
                />
              </Col>
            </Row>
          </div>
          <div className="form-group form-control-sm">
            <Row>
              <Col>
                <label>Capital Required for Investment</label>
              </Col>
              <Col>
                <input
                  className="form-control-sm"
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
  submittedFunds: state.addnewcall.submittedFunds,
});

export default connect(null, { calculateFunds, getCommittedFunds })(
  CapitalInput
);
