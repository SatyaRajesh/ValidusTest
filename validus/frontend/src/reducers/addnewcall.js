import { ADD_NEW_CALL_INV, LOAD_CALL_VALUES } from "../actions/types.js";

const initialState = {
  newcallInv: [],
  insertCallValues: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_CALL_INV:
      return {
        ...state,
        newcallInv: action.payload,
      };
    case LOAD_CALL_VALUES:
      return {
        ...state,
        insertCallValues: action.payload,
      };
    default:
      return state;
  }
}
