import axios from "axios";
import { GET_DASHBOARDFUNDS } from "./types";

export const getDashboardFunds = () => (dispatch) => {
  console.log("Calculating Dashboard Funds");
  axios
    .all([
      axios.get("/datafund/"),
      axios.get("/datacall/"),
      axios.get("/datafundinvestment/"),
    ])
    .then(
      axios.spread((...res) => {
        let dfunds = res[0].data;
        let dcalls = res[1].data;
        let dinvfunds = res[2].data;

        console.log("dfunds" + JSON.stringify(dfunds));
        console.log("dcalls" + JSON.stringify(dcalls));
        console.log("dinvfunds" + JSON.stringify(dinvfunds));
        let rowObjs = [];
        let rowHeader = [];
        rowHeader.push("date");
        rowHeader.push("call#");
        let headerDone = false;
        for (let i = 0; i < dcalls.length; i++) {
          let dcall = dcalls[i];
          let rowObj = {};
          rowObj.date = dcall.date;
          rowObj.call_id = dcall.call_id;
          let validFundDetails = [];
          for (let j = 0; j < dinvfunds.length; j++) {
            let dinvfund = dinvfunds[j];
            if (dcall.call_id == dinvfund.call_id) {
              let fundDet = {};
              fundDet.amount = dinvfund.investment_amount;
              fundDet.fundId = dinvfund.fund_id;
              validFundDetails.push(fundDet);
            }
          }

          console.log("ValidateFunds" + JSON.stringify(validFundDetails));
          let dynFunds = [];
          let fundAmount = 0;
          for (let k = 0; k < dfunds.length; k++) {
            let dfund = dfunds[k];
            fundAmount = 0;
            for (let l = 0; l < validFundDetails.length; l++) {
              let fundDet = validFundDetails[l];
              if (dfund.fund_id == fundDet.fundId) {
                fundAmount = fundDet.amount;
              }
            }
            if (fundAmount > 0) {
              dynFunds.push(fundAmount);
            } else {
              dynFunds.push("-");
            }
            if (!headerDone) {
              rowHeader.push(dfund.fund_id + "->" + dfund.fund_name);
            }
          }
          rowObj.funds = dynFunds;
          rowObjs.push(rowObj);
          headerDone = true;
        }

        let dispTableData = {};
        dispTableData.header = rowHeader;
        dispTableData.rows = rowObjs;

        console.log("TableData" + JSON.stringify(dispTableData));

        dispatch({
          type: GET_DASHBOARDFUNDS,
          payload: dispTableData,
        });
      })
    )
    .catch((err) => console.log(err));
};
