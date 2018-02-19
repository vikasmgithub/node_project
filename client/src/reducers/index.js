import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import regReducer from "./register_reducer";

export default combineReducers({
  auth: authReducer,
  reg: regReducer
});
