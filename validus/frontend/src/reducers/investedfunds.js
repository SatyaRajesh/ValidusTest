import { GET_DASHBOARDFUNDS } from "../actions/types.js";

const initialState = {
  dashboardfunds: { header: [], rows: [] },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARDFUNDS:
      return {
        ...state,
        dashboardfunds: action.payload,
      };
    default:
      return state;
  }
}
