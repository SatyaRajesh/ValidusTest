import axios from "axios";

import {
  GET_INVESTEDFUNDS,
  GET_DATAFUND,
  GET_DATACALL,
  GET_DATACOMMITMENT,
  UPDATE_INV_STATUS,
} from "./types";

// GET INVESTED FUNDS
export const getInvestedFunds = () => (dispatch) => {
  console.log("getInvestedFunds-3 in Actions");
  axios
    .get("/datafundinvestment/")
    .then((res) => {
      dispatch({
        type: GET_INVESTEDFUNDS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET DATA FUND
export const getDataFund = () => (dispatch) => {
  console.log("getDataFund in Actions");
  axios
    .get("/datafund/")
    .then((res) => {
      dispatch({
        type: GET_DATAFUND,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET DATA FUND
export const getDataCall = () => (dispatch) => {
  console.log("getDataCall in Actions");
  axios
    .get("/datacall/")
    .then((res) => {
      dispatch({
        type: GET_DATACALL,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// GET DATA COMMITMENT
export const getDataCommitment = () => (dispatch) => {
  console.log("getDataCommitment in Actions");
  axios
    .get("/datacommitment/")
    .then((res) => {
      dispatch({
        type: GET_DATACOMMITMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getUdatedInvStatus = (invStatus) => (dispatch) => {
  console.log("Updating Status in Actions");
  dispatch({
    type: UPDATE_INV_STATUS,
    payload: !invStatus,
  });
};
