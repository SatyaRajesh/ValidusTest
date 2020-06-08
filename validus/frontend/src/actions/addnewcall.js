import { ADD_NEW_CALL_INV, LOAD_CALL_VALUES } from "./types";

// Add New Call Calculation
export const addNewCallInv = (newInvValue) => (dispatch, getState) => {
  dispatch({
    type: ADD_NEW_CALL_INV,
    payload: newInvValue,
  });
};

export const loadCallValues = (insertCallValues) => (dispatch, getState) => {
  dispatch({
    type: LOAD_CALL_VALUES,
    payload: insertCallValues,
  });
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
