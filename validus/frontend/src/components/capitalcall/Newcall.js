import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CapitalInput from "./CapitalInput";
import CapitalSubmit from "./CapitalSubmit";
import CapitalPlan from "./CapitalPlan";
import Header from "../layout/Header";

export class Newcall extends Component {
  render() {
    console.log("New Call Component Render");
    return (
      <Fragment>
        <Header />
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
            <Col>
              <CapitalSubmit />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Newcall;
