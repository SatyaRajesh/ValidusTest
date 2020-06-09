import { SUBMITTED_FUNDS } from "../actions/types.js";

const initialState = {
  submittedFunds: { commits: [], calcVal: [], fundwiseTotal: [] },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMITTED_FUNDS:
      return {
        ...state,
        submittedFunds: action.payload,
      };
    default:
      return state;
  }
}
