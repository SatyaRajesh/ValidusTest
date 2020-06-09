import axios from "axios";
import { SUBMITTED_FUNDS } from "./types";

// Add New Call Calculation
export const calculateFunds = (calReqValue) => (dispatch, getState) => {
  axios
    .get("/datafund/")
    .then((res) => {
      console.log("calculateFunds Called");
      let submitttedValues = getState().addnewcall.submittedFunds.commits;
      let dfunds = res.data;
      console.log("submitted Funds:" + JSON.stringify(submitttedValues));

      let Amount = calReqValue.newInvAmount;
      console.log(" Amount:" + Amount);
      for (let i = 0; i < submitttedValues.length; i++) {
        console.log("Working on CommiID:" + submitttedValues[i].commitId);
        let availbleAmount = parseInt(submitttedValues[i].availAmt) || 0;
        if (availbleAmount <= 0) {
          console.log("Oho fund amount less");
          submitttedValues[i].investedAmt = "-";
          submitttedValues[i].uninvestedAmt = "-";
        } else if (Amount <= 0) {
          console.log("Oho Amount less");
          submitttedValues[i].investedAmt = "-";
          submitttedValues[i].uninvestedAmt = "-";
        } else if (Amount >= availbleAmount) {
          console.log("Good take full");
          submitttedValues[i].investedAmt = availbleAmount;
          submitttedValues[i].uninvestedAmt = "-";
          Amount = Amount - availbleAmount;
        } else {
          console.log("ok Take some and have some");
          submitttedValues[i].investedAmt = Amount;
          submitttedValues[i].uninvestedAmt = availbleAmount - Amount;
          Amount = 0;
        }
      }

      let allFundsWiseTotal = [];
      for (let i = 0; i < dfunds.length; i++) {
        let dfund = dfunds[i];
        let eachfundTotal = {};

        eachfundTotal.fund_name = dfund.fund_name;
        let mytotalfunds = 0;
        for (let k = 0; k < submitttedValues.length; k++) {
          let eachCommitRec = submitttedValues[k];
          console.log(
            "commitFund:" + eachCommitRec.fund_id + " dFundId:" + dfund.fund_id
          );
          if (eachCommitRec.fund_id == dfund.fund_id) {
            console.log(
              "InvAmt:" +
                eachCommitRec.investedAmt +
                " Parsed:" +
                parseInt(eachCommitRec.investedAmt)
            );
            mytotalfunds += parseInt(eachCommitRec.investedAmt) || 0;
          }
        }
        eachfundTotal.totafunds = mytotalfunds;
        console.log(
          "Fund Name:" +
            eachfundTotal.fund_name +
            " Total:" +
            eachfundTotal.totafunds
        );
        allFundsWiseTotal.push(eachfundTotal);
      }

      let tableObj = {};
      tableObj.commits = submitttedValues;
      tableObj.calcVal = calReqValue;
      tableObj.fundwiseTotal = allFundsWiseTotal;

      // console.log(
      //   "Updating submitted Funds:" + JSON.stringify(submitttedValues)
      // );
      dispatch({
        type: SUBMITTED_FUNDS,
        payload: tableObj,
      });
    })
    .catch((err) => console.log(err));
};

export const getCommittedFunds = () => (dispatch) => {
  axios
    .all([
      axios.get("/datafund/"),
      axios.get("/datacommitment/"),
      axios.get("/datafundinvestment/"),
    ])
    .then(
      axios.spread((...res) => {
        let dfunds = res[0].data;
        let dcommitments = res[1].data;
        let dinvfunds = res[2].data;

        let rowObjects = [];
        for (let i = 0; i < dcommitments.length; i++) {
          let dcommit = dcommitments[i];
          let row = {};

          row.commitId = dcommit.commitment_id;
          row.fund_id = dcommit.fund_id;
          row.date = dcommit.date;
          let fundname = "-";
          for (let j = 0; j < dfunds.length; j++) {
            if (dfunds[j].fund_id == dcommit.fund_id) {
              fundname = dfunds[j].fund_name;
              break;
            }
          }
          row.fundname = fundname;

          row.amount = dcommit.amount;

          let unDrawnFunds = 0;
          for (let k = 0; k < dinvfunds.length; k++) {
            if (dinvfunds[k].commitment_id == dcommit.commitment_id) {
              unDrawnFunds += dinvfunds[k].investment_amount;
            }
          }

          let availableFundsAfterDrawn = dcommit.amount - unDrawnFunds;
          if (availableFundsAfterDrawn > 0) {
            row.availAmt = availableFundsAfterDrawn;
          } else {
            row.availAmt = "-";
          }

          row.investedAmt = "-";
          row.uninvestedAmt = "-";

          rowObjects.push(row);
        }

        let tableObj = {};
        tableObj.commits = rowObjects;
        tableObj.calcVal = [];
        tableObj.fundwiseTotal = [];

        dispatch({
          type: SUBMITTED_FUNDS,
          payload: tableObj,
        });
      })
    )
    .catch((err) => console.log(err));
};

// GET DATA COMMITMENT
export const insertNewDataCalls = (dataCall) => (dispatch) => {
  console.log("insertNewDataCalls in Actions");
  axios
    .put("/datacall/", dataCall)
    .then((res) => {
      dispatch({
        type: GET_DATACOMMITMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
