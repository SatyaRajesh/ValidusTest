import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CapitalInput from "./CapitalInput";
import CapitalSubmit from "./CapitalSubmit";
import CapitalPlan from "./CapitalPlan";

export class Newcall extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <CapitalInput />
            </Col>
            <Col>
              <CapitalPlan />
            </Col>
          </Row>
          <Row>
            <CapitalSubmit />
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Newcall;
