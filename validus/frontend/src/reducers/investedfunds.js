import {
  GET_INVESTEDFUNDS,
  GET_DATAFUND,
  GET_DATACALL,
  GET_DATACOMMITMENT,
  UPDATE_INV_STATUS,
} from "../actions/types.js";

const initialState = {
  investedfunds: [],
  datacall: [],
  datafund: [],
  datacommitment: [],
  isUpdated: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVESTEDFUNDS:
      console.log("Reducer of InvestFunds");
      return {
        ...state,
        investedfunds: action.payload,
      };
    case GET_DATAFUND:
      return {
        ...state,
        datafund: action.payload,
      };
    case GET_DATACALL:
      return {
        ...state,
        datacall: action.payload,
      };
    case GET_DATACOMMITMENT:
      return {
        ...state,
        datacommitment: action.payload,
      };
    case UPDATE_INV_STATUS:
      return {
        ...state,
        isUpdated: action.payload,
      };
    default:
      return state;
  }
}
