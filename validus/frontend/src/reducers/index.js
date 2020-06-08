import { combineReducers } from "redux";
import investedfunds from "./investedfunds";
import addnewcall from "./addnewcall";

export default combineReducers({
  investedfunds,
  addnewcall,
});
