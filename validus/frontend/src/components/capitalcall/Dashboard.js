import React, { Fragment } from "react";
import InvestedFunds from "./InvestedFunds";
import Header from "../layout/Header";

export default function Dashboard() {
  return (
    <Fragment>
      <Header />
      <InvestedFunds />
    </Fragment>
  );
}
