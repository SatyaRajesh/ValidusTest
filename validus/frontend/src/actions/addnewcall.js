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

      let total = 0;
      for (let i = 0; i < submitttedValues.length; i++) {
        total += parseInt(submitttedValues[i].amount) || 0;
      }

      console.log("Total Funds" + total);

      if (Amount > total) {
        Amount = 0;
      }

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

        if (mytotalfunds > 0) {
          eachfundTotal.totafunds = mytotalfunds;
        } else {
          eachfundTotal.totafunds = "-";
        }
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
export const confirmCallDetails = () => (dispatch, getState) => {
  console.log("inserting New CapitalCall data in action in Actions");
  const newCallData = getState().addnewcall.submittedFunds;

  let invdate = newCallData.calcVal.newInvAmount;
  //let invdate = Date.parse(newCallData.calcVal.newInvDate) || 0;
  let today = new Date();
  today = today.toISOString().substring(0, 10);
  //Add Logic to stop entering future date
  //if (!invdate || invdate > today) {
  if (!invdate || today > invdate) {
    invdate = today;
  }
  let investmentName = newCallData.calcVal.newInvName;
  let capitalRequiement = parseInt(newCallData.calcVal.newInvAmount) || 0;

  if (capitalRequiement > 0) {
    let NewCallobj = {
      date: invdate,
      investment_name: investmentName,
      capital_requiement: capitalRequiement,
    };

    console.log("Request Data:" + JSON.stringify(NewCallobj));

    axios
      .post("/datacall/", NewCallobj)
      .then((res) => {
        let newCallRes = res.data;
        console.log("Inserted DataCall:" + newCallRes);

        let newCallId = parseInt(newCallRes.call_id) || 0;

        for (let k = 0; k < newCallData.commits.length; k++) {
          let commitmentDataInvestment = newCallData.commits[k];
          let newDataInvRes = {};
          let amount = parseInt(commitmentDataInvestment.investedAmt) || 0;
          if (amount > 0) {
            let newDataInvobj = {
              call_id: newCallId,
              commitment_id: commitmentDataInvestment.commitId,
              fund_id: commitmentDataInvestment.fund_id,
              investment_amount: amount,
            };

            console.log(
              "Request Data Investment:" + JSON.stringify(newDataInvobj)
            );

            axios
              .post("/datafundinvestment/", newDataInvobj)
              .then((res) => {
                newDataInvRes = res.data;
                console.log("Inserted DataFundInvestment:" + newDataInvRes);
              })
              .catch((err) => console.log(err));
          } else {
            console.log(
              "Error while inserting datafundinvestment, Invalid Amount of investment"
            );
          }
        }
      })
      .catch((err) => console.log(err));
  } else {
    console.log("Invlid Amount Specified While Inserting DataCall");
  }
};
